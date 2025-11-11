import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetAllOrders, apiGetMyOrders, apiGetOrderById, apiGetPortfolio, apiGetServices, apiGetTestimonials, apiSubmitContactForm, apiUpdateOrder, apiAddPortfolioVideo, apiDeletePortfolioVideo, apiCreateOrder } from './api';
import { Button, LoadingSpinner, OrderCard, OrderStatusBadge, PortfolioCard, PricingCard, SectionTitle, TestimonialCard, VideoCameraIcon, FaceAwareImage } from './components';
import { Order, OrderStatus, PortfolioVideo, PricingPackage, Testimonial } from './types';
import { profileData } from './profileData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<PortfolioVideo[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [portfolioData, testimonialData] = await Promise.all([
          apiGetPortfolio(),
          apiGetTestimonials()
        ]);
        setVideos(portfolioData);
        setTestimonials(testimonialData);
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-text leading-tight">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-brand-gold">Cinematic</span> Stories
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-300">
                Professional video editing services that transform your raw footage into a masterpiece. Specializing in weddings, events, and corporate projects.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button onClick={() => navigate('/portfolio')} variant="primary" className="text-lg">View My Work</Button>
                <Button onClick={() => navigate('/pricing')} variant="secondary" className="text-lg">Get a Quote</Button>
              </div>
            </div>

            {/* Professional Photo */}
            <div className="flex justify-center">
              <div className="relative w-96 h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-shadow duration-300 border-2 border-brand-gold/30 bg-gradient-to-br from-brand-gold/30 to-brand-surface">
                    <FaceAwareImage
                        src={profileData.photo}
                        alt="Navaneethan - Professional Video Editor"
                        className="w-full h-full hover:scale-105 transition-transform duration-300"
                        crossOrigin="anonymous"
                        loading="lazy"
                    />
                <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
            </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
        <SectionTitle title="What Clients Say" subtitle="Testimonials" />
        {loading ? <LoadingSpinner/> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t}/>)}
            </div>
        )}
      </section>
    </div>
  );
};

export const PortfolioPage: React.FC = () => {
    const [videos, setVideos] = useState<PortfolioVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const data = await apiGetPortfolio();
                setVideos(data);
            } catch (error) {
                console.error("Failed to fetch portfolio", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionTitle title="Our Portfolio" subtitle="Creative Works" />
            {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map(video => <PortfolioCard key={video.id} video={video} />)}
                </div>
            )}
        </div>
    );
};

export const PricingPage: React.FC = () => {
    const [packages, setPackages] = useState<PricingPackage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                const data = await apiGetServices();
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch pricing packages", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionTitle title="Pricing Plans" subtitle="Find Your Perfect Package" />
            {loading ? <LoadingSpinner /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <PricingCard key={pkg.id} pkg={pkg} isPopular={index === 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const CheckoutPage: React.FC = () => {
    const { packageId } = useParams<{packageId: string}>();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState<PricingPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [footageLinks, setFootageLinks] = useState('');
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const services = await apiGetServices();
                const found = services.find(s => String(s.id) === String(packageId));
                setPkg(found || null);
            } catch (err) {
                console.error('Failed to load package', err);
                setError('Failed to load package details');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [packageId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pkg) return;
        
        setError('');
        setSuccess('');
        setSubmitting(true);
        
        try {
            const links = footageLinks.split(',').map(s => s.trim()).filter(Boolean);
            if (links.length === 0) {
                throw new Error('Please provide at least one footage link');
            }
            
            await apiCreateOrder(String(pkg.id), links, notes, pkg.price);
            setSuccess('✓ Order placed successfully! Redirecting to dashboard...');
            
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
            console.error('Order creation failed:', errorMsg);
            setError(`❌ ${errorMsg}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!pkg) return <div className="container mx-auto px-4 py-16">Package not found.</div>;

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <SectionTitle title={`Order: ${pkg.name}`} subtitle="Checkout" />
            
            {error && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-300">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="mb-4 p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-300">
                    {success}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">Footage Links (comma separated)</label>
                    <input value={footageLinks} onChange={e => setFootageLinks(e.target.value)} className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text" placeholder="https://drive.google.com/..., https://youtube.com/..." required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-300 mb-2">Instructions / Notes</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text" rows={5} />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-brand-text">${pkg.price}</span>
                        <p className="text-sm text-gray-400">Delivery in ~{pkg.deliveryTimeDays} days</p>
                    </div>
                    <Button type="submit" disabled={submitting || success !== ''}>{submitting ? 'Placing Order...' : 'Place Order'}</Button>
                </div>
            </form>
        </div>
    );
};

export const AboutPage: React.FC = () => (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
        <SectionTitle title="About Navaneethan Editor" subtitle="My Story"/>
        
        {/* Photo and Bio Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Professional Photo */}
            <div className="flex justify-center">
                <div className="relative w-96 h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-shadow duration-300 border-2 border-brand-gold/30 bg-gradient-to-br from-brand-gold/30 to-brand-surface">
                    <FaceAwareImage
                        src={profileData.photo}
                        alt="Navaneethan - Professional Video Editor"
                        className="w-full h-full hover:scale-105 transition-transform duration-300"
                        crossOrigin="anonymous"
                        loading="lazy"
                    />
                    {/* Decorative glow border */}
                    <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-2xl pointer-events-none"></div>
                </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Welcome!</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        I'm Navaneethan, a professional video editor dedicated to bringing your vision to life. With years of experience in the industry, I specialize in transforming raw footage from weddings, corporate events, and personal projects into compelling, cinematic narratives.
                    </p>
                </div>
                <div>
                    <h4 className="text-xl font-serif font-bold text-brand-gold mb-2">My Approach</h4>
                    <p className="text-gray-300 leading-relaxed">
                        Every project is unique and deserves a personalized touch. I work closely with clients to understand their style, preferences, and core message. From color grading and sound design to pacing and visual effects, I meticulously craft each element.
                    </p>
                </div>
            </div>
        </div>

        {/* Full Bio Section */}
        <div className="text-lg text-gray-300 space-y-6 leading-relaxed bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
            <p>
                Welcome to Navaneethan Editor, where passion for storytelling meets technical excellence. My editing philosophy is simple: every frame tells a story, and every story deserves to be told beautifully.
            </p>
            <p>
                My editing philosophy is simple: every project is unique and deserves a personalized touch. I work closely with my clients to understand their style, preferences, and the core message they want to convey. From color grading and sound design to pacing and visual effects, I meticulously craft each element to create a final product that not only looks stunning but also evokes genuine emotion.
            </p>
            <p>
                Thank you for considering Navaneethan Editor. I look forward to the opportunity to collaborate with you and create something truly unforgettable.
            </p>
        </div>
    </div>
);

export const ContactPage: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFeedback('');
        try {
            await apiSubmitContactForm(formState.name, formState.email, formState.message);
            setFeedback('Thank you for your message! I will get back to you shortly.');
            setFormState({ name: '', email: '', message: '' });
        } catch (error) {
            setFeedback('There was an error sending your message. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <SectionTitle title="Get In Touch" subtitle="Contact Me" />
            <form onSubmit={handleSubmit} className="space-y-6 bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800">
                {feedback && <p className="bg-green-900/50 text-green-300 p-3 rounded-md mb-4 text-sm">{feedback}</p>}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input type="text" id="name" value={formState.name} onChange={handleChange} className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" value={formState.email} onChange={handleChange} className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"/>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                    <textarea id="message" rows={4} value={formState.message} onChange={handleChange} className="mt-1 block w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-2 px-3 text-brand-text focus:outline-none focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div>
                    <Button type="submit" className="w-full" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</Button>
                </div>
            </form>
        </div>
    );
};

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const user = await login(email, password);
        if (user) {
            navigate('/dashboard');
        } else {
            setError('Invalid credentials. Please check your email and password.');
        }
    };

    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-brand-surface/50 backdrop-blur-sm shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-800">
                    <SectionTitle title="Login" subtitle="Welcome Back" />
                    {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Sign In'}</Button>
                    </div>
                    <p className="text-center mt-4 text-gray-400 text-sm">
                        Don't have an account? <a href="#/signup" className="text-brand-gold hover:text-yellow-300">Sign up here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { signup, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const user = await signup(name, email, password);
        if (user) {
            setSuccess('Account created successfully! Redirecting to dashboard...');
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } else {
            setError('Signup failed. Please try again or use a different email.');
        }
    };

    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-brand-surface/50 backdrop-blur-sm shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-800">
                    <SectionTitle title="Create Account" subtitle="Join Us" />
                    {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm">{error}</p>}
                    {success && <p className="bg-green-900/50 text-green-300 p-3 rounded-md mb-4 text-sm">{success}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="name" type="text" placeholder="Your Name" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="email" type="email" placeholder="Email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="password" type="password" placeholder="At least 6 characters" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="confirmPassword" type="password" placeholder="Confirm your password" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" disabled={loading}>{loading ? 'Creating Account...' : 'Sign Up'}</Button>
                    </div>
                    <p className="text-center mt-4 text-gray-400 text-sm">
                        Already have an account? <a href="#/login" className="text-brand-gold hover:text-yellow-300">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};


// --- DASHBOARD PAGES ---

const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await apiGetMyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch user orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <LoadingSpinner />;
    
    const activeOrders = orders.filter(o => o.status !== OrderStatus.Completed && o.status !== OrderStatus.Cancelled);
    const pastOrders = orders.filter(o => o.status === OrderStatus.Completed || o.status === OrderStatus.Cancelled);

    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-serif mb-6 border-b-2 border-brand-gold/30 pb-2">Active Orders</h2>
          {activeOrders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-brand-surface/50 backdrop-blur-sm rounded-lg border border-dashed border-gray-700">
                <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-xl font-medium text-brand-text">No Active Orders</h3>
                <p className="mt-1 text-sm text-gray-400">Ready to start a new project? Place an order to get started.</p>
                <div className="mt-6">
                    <Button onClick={() => navigate('/pricing')}>View Pricing</Button>
                </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-serif mb-6 border-b-2 border-brand-gold/30 pb-2">Past Orders</h2>
          {pastOrders.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pastOrders.map(order => <OrderCard key={order.id} order={order} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-brand-surface/50 backdrop-blur-sm rounded-lg border border-dashed border-gray-700">
                <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-xl font-medium text-brand-text">No Past Orders</h3>
                <p className="mt-1 text-sm text-gray-400">Your completed projects will appear here.</p>
            </div>
          )}
        </div>
      </div>
    );
};

const AdminDashboard: React.FC = () => {
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                setLoading(true);
                const data = await apiGetAllOrders();
                setAllOrders(data);
            } catch (error) {
                console.error("Failed to fetch all orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            const updatedOrder = await apiUpdateOrder(orderId, { status: newStatus });
            setAllOrders(prevOrders => prevOrders.map(o => o.id === orderId ? {...o, status: updatedOrder.status} : o));
        } catch (error) {
            console.error("Failed to update order status", error);
            alert("Error: Could not update order status.");
        }
    };

    if(loading) return <LoadingSpinner />;

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Admin Dashboard</h2>
            <div className="bg-brand-surface/50 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-4">All Orders</h3>
                <div className="space-y-2">
                    {allOrders.map(order => (
                        <div key={order.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-3 bg-brand-surface rounded-md">
                           <div>
                                <p className="font-semibold text-brand-text">{order.service.name}</p>
                                <p className="text-xs text-gray-400">User: {order.user.name}</p>
                           </div>
                           <p className="text-sm">${order.priceEstimate}</p>
                           <OrderStatusBadge status={order.status} />
                           <div>
                            <select 
                                value={order.status} 
                                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                className="bg-gray-700 border border-gray-600 text-brand-text text-sm rounded-lg focus:ring-brand-gold focus:border-brand-gold block w-full p-2"
                            >
                                {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const DashboardPage: React.FC = () => {
    const { currentUser } = useAuth();
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-serif text-brand-text mb-2">Welcome, {currentUser?.name}</h1>
            <p className="text-brand-gold mb-8">This is your dashboard.</p>
            {currentUser?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
};

export const OrderDetailPage: React.FC = () => {
    const { orderId } = useParams<{orderId: string}>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const data = await apiGetOrderById(orderId);
                setOrder(data);
            } catch (error) {
                console.error("Failed to fetch order details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);
    
    if (loading) return <div className="container mx-auto py-16"><LoadingSpinner /></div>;

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-serif">Order Not Found</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-4xl font-serif text-brand-text">{order.service.name}</h1>
                    <p className="text-gray-400">Order ID: {order.id}</p>
                </div>
                <OrderStatusBadge status={order.status} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Admin Notes */}
                    {order.adminNotes && (
                         <div className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                             <h3 className="text-xl font-bold mb-4">Notes from the Editor</h3>
                             <p className="text-sm text-gray-300 italic">{order.adminNotes}</p>
                         </div>
                    )}
                    
                    {/* Delivery Section */}
                     {(order.status === OrderStatus.Completed || order.finalDeliveryLinks?.length) && (
                         <div className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                             <h3 className="text-xl font-bold mb-4">Final Delivery</h3>
                             <p className="text-gray-300 mb-4">Your final video is ready for download.</p>
                             <div className="flex flex-col space-y-2">
                                {order.finalDeliveryLinks?.map((link, index) => (
                                     <Button key={index} onClick={() => window.open(link, '_blank')}>Download Link {index + 1}</Button>
                                ))}
                             </div>
                         </div>
                     )}
                </div>
                <div className="space-y-6">
                     <div className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-bold mb-4">Order Details</h3>
                        <div className="space-y-2 text-sm text-gray-300">
                            <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                            <p><strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                            <p><strong>Price:</strong> ${order.priceEstimate}</p>
                        </div>
                    </div>
                     <div className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800">
                        <h3 className="text-xl font-bold mb-4">Your Instructions</h3>
                        <p className="text-sm text-gray-300 italic">{order.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PORTFOLIO MANAGEMENT PAGE ---
export const PortfolioManagementPage: React.FC = () => {
    const { currentUser } = useAuth();
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Wedding',
        description: '',
        tags: '',
        videoUrl: '',
        thumbnail: ''
    });

    useEffect(() => {
        // Load current videos
        const loadVideos = async () => {
            try {
                const data = await apiGetPortfolio();
                setVideos(data);
            } catch (error) {
                console.error("Failed to load videos", error);
            }
        };
        loadVideos();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddVideo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newVideo: any = {
                id: `video_${Date.now()}`,
                title: formData.title,
                category: formData.category,
                description: formData.description,
                tags: formData.tags.split(',').map(tag => tag.trim()),
                videoUrl: formData.videoUrl,
                thumbnail: formData.thumbnail || 'https://via.placeholder.com/500x300?text=' + formData.title,
                date: new Date().toISOString().split('T')[0]
            };

            // Add to Supabase
            await apiAddPortfolioVideo(newVideo);
            
            setVideos([...videos, newVideo]);
            setFormData({ title: '', category: 'Wedding', description: '', tags: '', videoUrl: '', thumbnail: '' });
            setShowForm(false);
            alert('Video added successfully!');
        } catch (error) {
            console.error("Failed to add video:", error);
            alert('Failed to add video. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVideo = async (videoId: string) => {
        if (confirm('Are you sure you want to delete this video?')) {
            try {
                setLoading(true);
                await apiDeletePortfolioVideo(videoId);
                setVideos(videos.filter(v => v.id !== videoId));
                alert('Video deleted successfully!');
            } catch (error) {
                console.error("Failed to delete video:", error);
                alert('Failed to delete video. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Only show to admin
    if (currentUser?.role !== 'admin') {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl text-red-400">Access Denied</h2>
                <p className="text-gray-400 mt-2">Only administrators can manage portfolio videos.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionTitle title="Portfolio Management" subtitle="Manage Your Videos" />

            <div className="max-w-4xl mx-auto">
                {!showForm ? (
                    <Button onClick={() => setShowForm(true)} variant="primary" className="mb-8">
                        + Add New Video
                    </Button>
                ) : (
                    <form onSubmit={handleAddVideo} className="bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 mb-8">
                        <h3 className="text-2xl font-bold mb-6">Add New Video</h3>
                        
                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Video Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                                placeholder="e.g., Beautiful Wedding Ceremony"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Category *</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                            >
                                <option>Wedding</option>
                                <option>Corporate</option>
                                <option>Event</option>
                                <option>Travel</option>
                                <option>Music</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                                placeholder="Describe your video..."
                                rows={4}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Tags (comma-separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                                placeholder="e.g., wedding, cinematic, emotional"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 font-bold mb-2">Video URL (YouTube/Vimeo/Google Drive) *</label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                                placeholder="https://youtube.com/embed/VIDEO_ID or Google Drive link"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 font-bold mb-2">Thumbnail URL (optional)</label>
                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-brand-surface border border-gray-700 rounded text-brand-text focus:outline-none focus:border-brand-gold"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={loading} variant="primary">
                                {loading ? 'Adding...' : 'Add Video'}
                            </Button>
                            <Button type="button" onClick={() => setShowForm(false)} variant="secondary">
                                Cancel
                            </Button>
                        </div>
                    </form>
                )}

                <div>
                    <h3 className="text-2xl font-bold mb-6">Your Videos ({videos.length})</h3>
                    {videos.length === 0 ? (
                        <p className="text-gray-400">No videos yet. Add your first video!</p>
                    ) : (
                        <div className="space-y-4">
                            {videos.map(video => (
                                <div key={video.id} className="bg-brand-surface/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800 flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-brand-text">{video.title}</h4>
                                        <p className="text-sm text-gray-400 mt-1">{video.category} • {video.date}</p>
                                        <p className="text-gray-300 mt-2">{video.description}</p>
                                    </div>
                                    <Button
                                        onClick={() => handleDeleteVideo(video.id)}
                                        disabled={loading}
                                        variant="secondary"
                                        className="ml-4 text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};