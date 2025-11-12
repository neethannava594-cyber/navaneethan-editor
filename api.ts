import { createClient } from '@supabase/supabase-js';
import { OrderStatus, PortfolioVideo, PricingPackage, Testimonial, Order, User } from './types';
import { portfolioVideos } from './portfolioData';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
    url: supabaseUrl ? '✓ SET' : '✗ MISSING',
    key: supabaseAnonKey ? '✓ SET' : '✗ MISSING',
});

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be provided in .env.local or as environment variables in your deployment platform");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Auth Functions ---
export const apiLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
    const token = data.session?.access_token;
    const user = data.user;
    return { user, token };
};

export const apiSignup = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name } } // This metadata will be used by our trigger
    });
    if (error) {
        console.error("Signup Error:", error.message);
        throw error;
    }
    const token = data.session?.access_token;
    const user = data.user;
    return { user, token };
};

export const apiGetMe = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Get Session Error:", error.message);
        throw error;
    }
    return { user: session?.user ?? null };
};

// --- Public Data Functions ---
export const apiGetPortfolio = async (): Promise<PortfolioVideo[]> => {
    // Return mock portfolio data
    return portfolioVideos;
};

export const apiGetServices = async (): Promise<PricingPackage[]> => {
    const { data, error } = await supabase.from('pricing_packages').select('*');
    if (error) {
        console.error("Error fetching services:", error.message);
        throw error;
    }
    return data || [];
};

export const apiGetTestimonials = async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase.from('testimonials').select('*');
    if (error) {
        console.error("Error fetching testimonials:", error.message);
        throw error;
    }
    // Map the DB structure (user_name) to the expected type structure ({ user: { name: ... } })
    return data?.map(t => ({...t, user: { name: t.user_name, id: t.id, email: '', role: 'customer' } })) || [];
};

// --- Contact Form / Customer Enquiry ---
export const apiSubmitContactForm = async (
    name: string, 
    email: string, 
    message: string,
    phone?: string,
    serviceInterest?: string
) => {
    try {
        console.log('🔵 Submitting customer enquiry...');
        
        const { data, error } = await supabase
            .from('enquiries')
            .insert([{
                name,
                email,
                message,
                phone: phone || null,
                service_interest: serviceInterest || null,
                status: 'new',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }])
            .select()
            .single();

        if (error) {
            console.error('🔴 Enquiry submission error:', error);
            throw new Error(`Failed to submit enquiry: ${error.message}`);
        }

        console.log('✅ Enquiry submitted successfully:', data);
        return { success: true, data };
    } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('🔴 apiSubmitContactForm error:', errorMsg);
        throw new Error(errorMsg);
    }
};

// --- Authenticated Order Functions ---
export const apiGetMyOrders = async (): Promise<Order[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('orders')
        .select(`*, service:pricing_packages(*)`) // Select all order fields and join pricing_packages data
        .eq('user_id', user.id);

    if (error) {
        console.error("Error fetching user orders:", error.message);
        throw error;
    }
    // Manually construct the 'user' object for the order from the currently logged-in user
    return data?.map(o => ({ ...o, user: { id: user.id, name: user.user_metadata.name, email: user.email, role: 'customer' } })) || [];
};

export const apiGetOrderById = async (orderId: string): Promise<Order | null> => {
    const { data, error } = await supabase
        .from('orders')
        .select(`*, service:pricing_packages(*)`)
        .eq('id', orderId)
        .single(); // Expect only one result

    if (error) {
        console.error("Error fetching order by ID:", error.message);
        // It's common for .single() to error if no rows are found, so we can return null
        if (error.code === 'PGRST116') return null;
        throw error;
    }
    if (!data) return null;

    // To get user info, we need another query to the profiles table
    const { data: profile } = await supabase
        .from('profiles')
        .select('name, email')
        .eq('id', data.user_id)
        .single();

    const orderUser = profile ? { id: data.user_id, name: profile.name, email: profile.email, role: 'customer' } : { id: data.user_id, name: 'Unknown User', email: '', role: 'customer' };

    return { ...data, user: orderUser };
};

// --- Admin Functions ---
export const apiGetAllOrders = async (): Promise<Order[]> => {
    // This is the corrected function.
    // It joins orders with pricing_packages and our new profiles table.
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            service:pricing_packages(*),
            user:profiles(name, email)
        `);

    if (error) {
        console.error("Error fetching all orders (Admin):", error.message);
        throw error;
    }
    return data || [];
};

export const apiUpdateOrder = async (orderId: string, updateData: { status?: OrderStatus, adminNotes?: string }) => {
    const { data, error } = await supabase
        .from('orders')
        .update({ ...updateData, "updatedAt": new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

    if (error) {
        console.error("Error updating order:", error.message);
        throw error;
    }
    return data;
};

// --- Create Order ---
export const apiCreateOrder = async (serviceId: string | number, footageLinks: string[], notes: string, priceEstimate: number = 0) => {
    try {
        console.log('🔵 Starting order creation...');
        
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
            console.error('🔴 Auth check failed:', authError);
            throw new Error(`Authentication error: ${authError.message}`);
        }
        
        if (!user) {
            console.error('🔴 No user found - user not logged in');
            throw new Error('User must be logged in to create an order');
        }

        console.log('✓ User authenticated:', user.id);

        const serviceIdNum = typeof serviceId === 'number' ? serviceId : Number(serviceId);
        if (Number.isNaN(serviceIdNum)) {
            console.error('🔴 Invalid serviceId:', serviceId);
            throw new Error('serviceId must be a numeric id');
        }

        console.log('✓ Order payload prepared:', { serviceIdNum, user_id: user.id, footageLinks, notes, priceEstimate });

        const payload = {
            user_id: user.id,
            service_id: serviceIdNum,
            footageLinks: footageLinks || [],
            notes: notes || '',
            priceEstimate: priceEstimate || 0,
            status: OrderStatus.Pending,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as any;

        console.log('⏳ Inserting order into Supabase...');

        const { data, error } = await supabase
            .from('orders')
            .insert([payload])
            .select()
            .single();

        if (error) {
            console.error('🔴 Supabase insert error:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint,
            });
            throw new Error(`Failed to create order: ${error.message || 'Unknown error'}`);
        }

        console.log('✅ Order created successfully:', data);
        return data;
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('🔴 apiCreateOrder error:', errorMessage);
        throw new Error(errorMessage);
    }
};

// --- Video Upload Functions ---
export const apiUploadVideo = async (file: File, fileName: string) => {
    try {
        const { data, error } = await supabase.storage
            .from('portfolio-videos')
            .upload(`videos/${fileName}`, file);

        if (error) {
            console.error("Error uploading video:", error.message);
            throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('portfolio-videos')
            .getPublicUrl(`videos/${fileName}`);

        return { url: urlData.publicUrl, path: data.path };
    } catch (error) {
        console.error("Video upload failed:", error);
        throw error;
    }
};

export const apiUploadThumbnail = async (file: File, fileName: string) => {
    try {
        const { data, error } = await supabase.storage
            .from('portfolio-videos')
            .upload(`thumbnails/${fileName}`, file);

        if (error) {
            console.error("Error uploading thumbnail:", error.message);
            throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('portfolio-videos')
            .getPublicUrl(`thumbnails/${fileName}`);

        return { url: urlData.publicUrl, path: data.path };
    } catch (error) {
        console.error("Thumbnail upload failed:", error);
        throw error;
    }
};

export const apiAddPortfolioVideo = async (video: PortfolioVideo) => {
    try {
        const { data, error } = await supabase
            .from('portfolio_videos')
            .insert([video])
            .select()
            .single();

        if (error) {
            console.error("Error adding portfolio video:", error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Failed to add portfolio video:", error);
        throw error;
    }
};

export const apiDeletePortfolioVideo = async (videoId: string) => {
    try {
        const { error } = await supabase
            .from('portfolio_videos')
            .delete()
            .eq('id', videoId);

        if (error) {
            console.error("Error deleting portfolio video:", error.message);
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to delete portfolio video:", error);
        throw error;
    }
};

// --- Sign-In Logging Functions ---

// Helper function to get device type
const getDeviceType = (): string => {
    const ua = navigator.userAgent;
    if (/mobile|android|iphone|ipad|phone/i.test(ua.toLowerCase())) {
        return 'mobile';
    } else if (/tablet|ipad|android/i.test(ua.toLowerCase())) {
        return 'tablet';
    }
    return 'desktop';
};

// Save sign-in data when user logs in
export const apiSaveSignInLog = async (
    userId: string,
    email: string,
    name?: string,
    phone?: string
) => {
    try {
        console.log('🔵 Saving sign-in log for user:', email);

        const signInData = {
            user_id: userId,
            email,
            name: name || null,
            phone: phone || null,
            sign_in_time: new Date().toISOString(),
            ip_address: 'browser', // Note: IP address cannot be reliably obtained from browser
            user_agent: navigator.userAgent,
            device_type: getDeviceType(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from('signin_logs')
            .insert([signInData]);

        if (error) {
            console.error('❌ Error saving sign-in log:', error.message);
            throw error;
        }

        console.log('✅ Sign-in log saved successfully');
        return data;
    } catch (error) {
        console.error('❌ Failed to save sign-in log:', error);
        // Don't throw - this shouldn't block the login flow
        return null;
    }
};

// Save sign-out data when user logs out
export const apiSaveSignOutLog = async (userId: string) => {
    try {
        console.log('🔵 Saving sign-out log for user:', userId);

        // Get the most recent sign-in log for this user that doesn't have a sign_out_time
        const { data: signInLogs, error: fetchError } = await supabase
            .from('signin_logs')
            .select('id, sign_in_time')
            .eq('user_id', userId)
            .is('sign_out_time', null)
            .order('sign_in_time', { ascending: false })
            .limit(1);

        if (fetchError) {
            console.error('❌ Error fetching sign-in log:', fetchError.message);
            return null;
        }

        if (!signInLogs || signInLogs.length === 0) {
            console.warn('⚠️ No active sign-in log found for user');
            return null;
        }

        const signInLog = signInLogs[0];
        const signOutTime = new Date().toISOString();
        
        // Calculate session duration in minutes
        const signInDate = new Date(signInLog.sign_in_time);
        const signOutDate = new Date(signOutTime);
        const sessionDurationMinutes = Math.round((signOutDate.getTime() - signInDate.getTime()) / 60000);

        const { data, error } = await supabase
            .from('signin_logs')
            .update({
                sign_out_time: signOutTime,
                session_duration_minutes: sessionDurationMinutes,
                updated_at: new Date().toISOString(),
            })
            .eq('id', signInLog.id);

        if (error) {
            console.error('❌ Error saving sign-out log:', error.message);
            return null;
        }

        console.log('✅ Sign-out log saved successfully (session duration: ' + sessionDurationMinutes + ' minutes)');
        return data;
    } catch (error) {
        console.error('❌ Failed to save sign-out log:', error);
        return null;
    }
};

// Get all sign-in logs for current user
export const apiGetMySignInLogs = async () => {
    try {
        console.log('🔵 Fetching sign-in logs...');

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error('❌ Error getting current user:', userError?.message);
            throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
            .from('signin_logs')
            .select('*')
            .eq('user_id', user.id)
            .order('sign_in_time', { ascending: false });

        if (error) {
            console.error('❌ Error fetching sign-in logs:', error.message);
            throw error;
        }

        console.log('✅ Retrieved ' + (data?.length || 0) + ' sign-in logs');
        return data || [];
    } catch (error) {
        console.error('❌ Failed to get sign-in logs:', error);
        throw error;
    }
};

// Get all sign-in logs (admin only)
export const apiGetAllSignInLogs = async () => {
    try {
        console.log('🔵 Fetching all sign-in logs (admin)...');

        const { data, error } = await supabase
            .from('signin_logs')
            .select('*')
            .order('sign_in_time', { ascending: false });

        if (error) {
            console.error('❌ Error fetching all sign-in logs:', error.message);
            throw error;
        }

        console.log('✅ Retrieved ' + (data?.length || 0) + ' total sign-in logs');
        return data || [];
    } catch (error) {
        console.error('❌ Failed to get all sign-in logs:', error);
        throw error;
    }
};