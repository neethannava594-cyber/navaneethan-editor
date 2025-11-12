import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetAllOrders, apiGetMyOrders, apiGetOrderById, apiGetPortfolio, apiGetServices, apiGetTestimonials, apiSubmitContactForm, apiUpdateOrder, apiAddPortfolioVideo, apiDeletePortfolioVideo, apiCreateOrder, apiExportToExcel, downloadExcelFile, apiGetAuditLogs, apiGetRecentChanges, downloadAuditLogsExcel } from './api';
import { Button, LoadingSpinner, OrderCard, OrderStatusBadge, PortfolioCard, PricingCard, SectionTitle, TestimonialCard, VideoCameraIcon, FaceAwareImage } from './components';
import { codeExamples, CodeExample } from './codeExamples';
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
    const [formState, setFormState] = useState({ 
        name: '', 
        email: '', 
        phone: '',
        service_interest: '',
        message: '' 
    });
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
            setFeedback('Please fill in all required fields');
            setFeedbackType('error');
            return;
        }

        setSubmitting(true);
        setFeedback('');
        
        try {
            await apiSubmitContactForm(
                formState.name, 
                formState.email, 
                formState.message,
                formState.phone,
                formState.service_interest
            );
            setFeedback('✅ Thank you for your enquiry! I will get back to you within 24 hours.');
            setFeedbackType('success');
            setFormState({ name: '', email: '', phone: '', service_interest: '', message: '' });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Failed to submit enquiry';
            setFeedback(`❌ ${errorMsg}`);
            setFeedbackType('error');
            console.error('Enquiry submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <div className="container mx-auto px-4 py-8 sm:py-16 max-w-2xl">
            <SectionTitle title="Get In Touch" subtitle="Contact Me" />
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-brand-surface/50 backdrop-blur-sm p-4 sm:p-8 rounded-lg border border-gray-800">
                {feedback && (
                    <div className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${feedbackType === 'success' 
                        ? 'bg-green-900/20 border border-green-700 text-green-300' 
                        : 'bg-red-900/20 border border-red-700 text-red-300'}`}>
                        {feedback}
                    </div>
                )}
                
                <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formState.name} 
                        onChange={handleChange} 
                        required
                        className="w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-3 px-3 sm:py-2 sm:px-3 text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[44px] sm:min-h-auto"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email *</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formState.email} 
                        onChange={handleChange} 
                        required
                        className="w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-3 px-3 sm:py-2 sm:px-3 text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[44px] sm:min-h-auto"
                        placeholder="your@email.com"
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Phone (Optional)</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        value={formState.phone} 
                        onChange={handleChange}
                        className="w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-3 px-3 sm:py-2 sm:px-3 text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[44px] sm:min-h-auto"
                        placeholder="Your phone number"
                        autoComplete="tel"
                    />
                </div>

                <div>
                    <label htmlFor="service_interest" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Service Interest</label>
                    <select 
                        id="service_interest" 
                        value={formState.service_interest} 
                        onChange={handleChange}
                        className="w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-3 px-3 sm:py-2 sm:px-3 text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[44px] sm:min-h-auto"
                    >
                        <option value="">Select a service...</option>
                        <option value="reel">Reel ($2000)</option>
                        <option value="vertical">Vertical ($3000)</option>
                        <option value="slide">Slide ($2500)</option>
                        <option value="general">General Enquiry</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Message *</label>
                    <textarea 
                        id="message" 
                        rows={6} 
                        value={formState.message} 
                        onChange={handleChange} 
                        required
                        className="w-full bg-brand-surface border border-gray-700 rounded-md shadow-sm py-3 px-3 sm:py-2 sm:px-3 text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold min-h-[120px]"
                        placeholder="Tell me about your project..."
                    ></textarea>
                </div>

                <div>
                    <Button 
                        type="submit" 
                        className="w-full text-base" 
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Send Enquiry'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setShowError(false);
        const user = await login(email, password);
        if (user) {
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } else {
            setError('Invalid credentials. Please check your email and password.');
            setShowError(true);
        }
    };

    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-brand-surface/50 backdrop-blur-sm shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-800">
                    <SectionTitle title="Login" subtitle="Welcome Back" />
                    
                    {/* Success Animation */}
                    {showSuccess && (
                        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-l-4 border-green-500 text-green-300 p-4 rounded-md flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="font-semibold">Login successful! Redirecting...</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Error Animation */}
                    {showError && error && (
                        <div className="mb-4 animate-in fade-in shake duration-500">
                            <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border-l-4 border-red-500 text-red-300 p-4 rounded-md flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm">{error}</span>
                            </div>
                        </div>
                    )}
                    
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 bg-brand-surface border-gray-700 text-brand-text mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-brand-gold" id="password" type="password" placeholder="******************" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" disabled={loading || showSuccess} className={showSuccess ? 'opacity-75' : ''}>{loading ? '🔄 Logging in...' : showSuccess ? '✅ Logged in!' : 'Sign In'}</Button>
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
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { signup, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setShowError(false);
        setShowSuccess(false);

        if (password !== confirmPassword) {
            setError('❌ Passwords do not match.');
            setShowError(true);
            return;
        }

        if (password.length < 6) {
            setError('❌ Password must be at least 6 characters long.');
            setShowError(true);
            return;
        }

        const user = await signup(name, email, password);
        if (user) {
            setSuccess('✅ Account created successfully! Redirecting to dashboard...');
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);
        } else {
            setError('❌ Signup failed. Please try again or use a different email.');
            setShowError(true);
        }
    };

    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="bg-brand-surface/50 backdrop-blur-sm shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-800">
                    <SectionTitle title="Create Account" subtitle="Join Us" />
                    
                    {/* Success Animation */}
                    {showSuccess && success && (
                        <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border-l-4 border-green-500 text-green-300 p-4 rounded-md flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="font-semibold">{success}</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Error Animation */}
                    {showError && error && (
                        <div className="mb-4 animate-in fade-in shake duration-500">
                            <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 border-l-4 border-red-500 text-red-300 p-4 rounded-md flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-sm">{error}</span>
                            </div>
                        </div>
                    )}
                    
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
                        <Button type="submit" disabled={loading || showSuccess} className={showSuccess ? 'opacity-75' : ''}>{loading ? '🔄 Creating Account...' : showSuccess ? '✅ Account Created!' : 'Sign Up'}</Button>
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

// --- Customer Data Export Page ---
export const CustomerDataExportPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Check if user is admin (for now, just check if logged in)
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleExportData = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');
            console.log('📊 Exporting customer data...');

            const exportData = await apiExportToExcel();
            setData(exportData);
            setSuccess(`✅ Data ready! Enquiries: ${exportData.enquiriesCount}, Orders: ${exportData.ordersCount}, Sign-ins: ${exportData.signInCount}`);
        } catch (err) {
            console.error('Export error:', err);
            setError(err instanceof Error ? err.message : 'Failed to export data');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setLoading(true);
            setError('');
            console.log('📥 Downloading Excel file...');

            await downloadExcelFile('customer-data');
            setSuccess('✅ File downloaded successfully!');
        } catch (err) {
            console.error('Download error:', err);
            setError(err instanceof Error ? err.message : 'Failed to download file');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-surface to-brand-dark p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-400 mb-4">
                        📊 Export Customer Data
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Export all customer enquiries, orders, and sign-in logs to Excel
                    </p>
                </div>

                {/* Status Messages */}
                {success && (
                    <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
                        ❌ {error}
                    </div>
                )}

                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {/* Export Data Card */}
                    <div className="bg-brand-surface border-2 border-brand-gold/20 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-brand-text mb-4">📥 Step 1: Prepare Data</h2>
                        <p className="text-gray-300 mb-6">
                            Click to fetch all customer data from the database:
                        </p>
                        <ul className="text-gray-400 text-sm mb-6 space-y-2">
                            <li>✓ All customer enquiries</li>
                            <li>✓ All orders</li>
                            <li>✓ All sign-in logs</li>
                        </ul>
                        <Button
                            onClick={handleExportData}
                            disabled={loading}
                            variant="primary"
                            className="w-full"
                        >
                            {loading ? '🔄 Preparing...' : '📊 Prepare Data'}
                        </Button>
                    </div>

                    {/* Download Card */}
                    <div className="bg-brand-surface border-2 border-brand-gold/20 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-brand-text mb-4">⬇️ Step 2: Download Excel</h2>
                        <p className="text-gray-300 mb-6">
                            Download the prepared data as an Excel file:
                        </p>
                        <ul className="text-gray-400 text-sm mb-6 space-y-2">
                            <li>✓ Excel format (.xlsx)</li>
                            <li>✓ Multiple sheets</li>
                            <li>✓ Ready to analyze</li>
                        </ul>
                        <Button
                            onClick={handleDownload}
                            disabled={loading || !data}
                            variant="primary"
                            className="w-full"
                        >
                            {loading ? '🔄 Downloading...' : '⬇️ Download Excel'}
                        </Button>
                    </div>
                </div>

                {/* Data Summary */}
                {data && (
                    <div className="bg-brand-surface border-2 border-brand-gold/20 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-brand-text mb-6">📈 Data Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-900/30 border border-blue-500/30 rounded p-4">
                                <p className="text-gray-400 text-sm">Customer Enquiries</p>
                                <p className="text-3xl font-bold text-blue-300 mt-2">{data.enquiriesCount}</p>
                            </div>
                            <div className="bg-green-900/30 border border-green-500/30 rounded p-4">
                                <p className="text-gray-400 text-sm">Customer Orders</p>
                                <p className="text-3xl font-bold text-green-300 mt-2">{data.ordersCount}</p>
                            </div>
                            <div className="bg-purple-900/30 border border-purple-500/30 rounded p-4">
                                <p className="text-gray-400 text-sm">Sign-In Logs</p>
                                <p className="text-3xl font-bold text-purple-300 mt-2">{data.signInCount}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Information Section */}
                <div className="mt-12 bg-brand-surface border-2 border-brand-gold/20 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-text mb-6">ℹ️ What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-brand-gold mb-4">📋 Customer Enquiries</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>✓ Customer name & email</li>
                                <li>✓ Phone number</li>
                                <li>✓ Message content</li>
                                <li>✓ Service interest</li>
                                <li>✓ Status (new/replied)</li>
                                <li>✓ Submission date</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-brand-gold mb-4">🛒 Customer Orders</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>✓ Order ID</li>
                                <li>✓ Customer information</li>
                                <li>✓ Service ordered</li>
                                <li>✓ Current status</li>
                                <li>✓ Price estimate</li>
                                <li>✓ Admin notes</li>
                            </ul>
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold text-brand-gold mb-4">🔐 Sign-In Logs</h3>
                            <ul className="text-gray-300 space-y-2">
                                <li>✓ Customer email & name</li>
                                <li>✓ Device type (mobile/tablet/desktop)</li>
                                <li>✓ Login & logout times</li>
                                <li>✓ Session duration</li>
                                <li>✓ Complete activity history</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 bg-gradient-to-r from-brand-gold/10 to-yellow-400/10 border-2 border-brand-gold/30 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-text mb-6">✨ Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div>✅ Real-time data export</div>
                        <div>✅ Multiple data sources</div>
                        <div>✅ Excel compatible format</div>
                        <div>✅ Easy to analyze</div>
                        <div>✅ One-click download</div>
                        <div>✅ Timestamped files</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Customer Update Tracking Page - Track all customer data changes in real-time
export const UpdateTrackingPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [recentChanges, setRecentChanges] = useState<any>(null);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [autoRefresh, setAutoRefresh] = useState(true);

    // Redirect if not authenticated
    if (!user) {
        navigate('/');
        return null;
    }

    useEffect(() => {
        // Initial load
        handleLoadChanges();

        // Set up auto-refresh every 30 seconds
        if (autoRefresh) {
            const interval = setInterval(() => {
                handleLoadChanges();
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [autoRefresh]);

    const handleLoadChanges = async () => {
        try {
            setLoading(true);
            setError('');

            // Get recent changes
            const changes = await apiGetRecentChanges(24);
            setRecentChanges(changes);

            // Get all audit logs
            const logs = await apiGetAuditLogs(selectedType === 'all' ? undefined : selectedType, 50);
            setAuditLogs(logs);

            console.log('✅ Update tracking data loaded');
        } catch (err: any) {
            setError(err.message || 'Failed to load tracking data');
            console.error('❌ Error loading tracking data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTracking = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            const result = await downloadAuditLogsExcel('customer-update-history');
            setSuccess(`✅ Downloaded ${result.count} tracking records!`);
        } catch (err: any) {
            setError(err.message || 'Failed to download tracking data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getChangeTypeColor = (type: string) => {
        switch (type) {
            case 'CREATE': return 'bg-green-900/30 border-green-600';
            case 'UPDATE': return 'bg-blue-900/30 border-blue-600';
            case 'DELETE': return 'bg-red-900/30 border-red-600';
            default: return 'bg-gray-900/30 border-gray-600';
        }
    };

    const getRecordTypeIcon = (type: string) => {
        switch (type) {
            case 'enquiry': return '📨';
            case 'order': return '📦';
            case 'signin_log': return '🔐';
            default: return '📝';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-gold to-yellow-400 bg-clip-text text-transparent mb-4">
                        📊 Customer Update Tracking
                    </h1>
                    <p className="text-xl text-gray-300">
                        Real-time tracking of all customer data changes and updates
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-900/30 border-l-4 border-green-500 text-green-200 rounded">
                        {success}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border-l-4 border-red-500 text-red-200 rounded">
                        {error}
                    </div>
                )}

                {/* Controls */}
                <div className="mb-8 bg-gray-800/40 border border-gray-700 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Filter by Type:</label>
                            <select
                                value={selectedType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                    handleLoadChanges();
                                }}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-brand-gold"
                            >
                                <option value="all">All Changes</option>
                                <option value="enquiry">Enquiries Only</option>
                                <option value="order">Orders Only</option>
                                <option value="signin_log">Sign-in Logs Only</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoRefresh}
                                    onChange={(e) => setAutoRefresh(e.target.checked)}
                                    className="w-4 h-4"
                                />
                                <span>Auto-refresh (30s)</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleLoadChanges}
                                disabled={loading}
                                className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium disabled:opacity-50"
                            >
                                {loading ? '🔄 Loading...' : '🔄 Refresh'}
                            </button>
                            <button
                                onClick={handleDownloadTracking}
                                disabled={loading}
                                className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium disabled:opacity-50"
                            >
                                {loading ? '⬇️ Downloading...' : '⬇️ Download History'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                {recentChanges && (
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-600 rounded-lg p-6">
                            <div className="text-4xl font-bold text-green-400 mb-2">{recentChanges.enquiries?.length || 0}</div>
                            <div className="text-green-300">Enquiry Changes (24h)</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-600 rounded-lg p-6">
                            <div className="text-4xl font-bold text-blue-400 mb-2">{recentChanges.orders?.length || 0}</div>
                            <div className="text-blue-300">Order Changes (24h)</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-600 rounded-lg p-6">
                            <div className="text-4xl font-bold text-purple-400 mb-2">{recentChanges.signin_logs?.length || 0}</div>
                            <div className="text-purple-300">Sign-in Changes (24h)</div>
                        </div>
                    </div>
                )}

                {/* Audit Logs List */}
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-gold/10 to-yellow-400/10 border-b border-gray-700 px-6 py-4">
                        <h2 className="text-2xl font-bold">
                            📝 Recent Updates
                            {auditLogs.length > 0 && <span className="text-lg text-gray-400 ml-2">({auditLogs.length})</span>}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <LoadingSpinner />
                            <p className="mt-4 text-gray-300">Loading tracking data...</p>
                        </div>
                    ) : auditLogs.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            <div className="text-4xl mb-2">📭</div>
                            <p>No updates found for this period</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
                            {auditLogs.map((log) => (
                                <div key={log.id} className={`p-4 border-l-4 transition-colors ${getChangeTypeColor(log.change_type)}`}>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{getRecordTypeIcon(log.record_type)}</span>
                                            <div>
                                                <div className="font-semibold text-white">
                                                    {log.record_type.toUpperCase()} #{log.record_id}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {log.change_type} • {log.field_name} by {log.changed_by_email || 'system'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(log.created_at)}
                                        </div>
                                    </div>

                                    {log.old_value && (
                                        <div className="text-sm text-gray-400 ml-10 mt-2">
                                            <span className="text-red-400">Before:</span> {log.old_value}
                                        </div>
                                    )}
                                    {log.new_value && (
                                        <div className="text-sm text-gray-400 ml-10">
                                            <span className="text-green-400">After:</span> {log.new_value}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-gradient-to-r from-brand-gold/10 to-yellow-400/10 border-2 border-brand-gold/30 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-text mb-4">🎯 What's Tracked?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div className="flex gap-3">
                            <span className="text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-white">Customer Enquiries</div>
                                <div className="text-sm">Name, email, status changes</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-white">Customer Orders</div>
                                <div className="text-sm">Status, price, notes updates</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-white">Sign-in Activity</div>
                                <div className="text-sm">Login/logout events</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-xl">✓</span>
                            <div>
                                <div className="font-semibold text-white">Full History</div>
                                <div className="text-sm">Before/after values, timestamps</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-600/30 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-text mb-6">✨ Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div>✅ Real-time tracking</div>
                        <div>✅ Auto-refresh every 30s</div>
                        <div>✅ Filter by type</div>
                        <div>✅ Download full history</div>
                        <div>✅ Before/after values</div>
                        <div>✅ Timestamp tracking</div>
                        <div>✅ User identification</div>
                        <div>✅ Excel export</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Professional Code Showcase Page - Display coding expertise across multiple languages
export const CodeShowcasePage: React.FC = () => {
    const [selectedExample, setSelectedExample] = useState<CodeExample | null>(codeExamples[0]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
    const [copied, setCopied] = useState(false);

    const languages = ['All', 'JavaScript', 'TypeScript', 'Python', 'Java'];
    const filteredExamples = selectedLanguage === 'All' 
        ? codeExamples 
        : codeExamples.filter(ex => ex.language === selectedLanguage);

    const handleCopyCode = () => {
        if (selectedExample) {
            navigator.clipboard.writeText(selectedExample.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-900/30 text-green-300';
            case 'Intermediate': return 'bg-yellow-900/30 text-yellow-300';
            case 'Advanced': return 'bg-red-900/30 text-red-300';
            default: return 'bg-gray-700';
        }
    };

    const getLanguageColor = (language: string) => {
        switch (language) {
            case 'TypeScript': return '#3178C6';
            case 'JavaScript': return '#F7DF1E';
            case 'Python': return '#3776AB';
            case 'Java': return '#007396';
            default: return '#888888';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        💻 Professional Code Showcase
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Expertise across multiple programming languages with modern design patterns, best practices, and production-ready code examples.
                    </p>
                </div>

                {/* Language Filter */}
                <div className="mb-12 flex flex-wrap gap-3 justify-center">
                    {languages.map(lang => (
                        <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                selectedLanguage === lang
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Code Examples List */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800/40 border border-gray-700 rounded-lg overflow-hidden sticky top-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                                <h2 className="text-lg font-bold">
                                    📚 Code Examples {filteredExamples.length > 0 && `(${filteredExamples.length})`}
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {filteredExamples.map(example => (
                                    <button
                                        key={example.id}
                                        onClick={() => setSelectedExample(example)}
                                        className={`w-full text-left px-4 py-3 border-b border-gray-700 transition-colors ${
                                            selectedExample?.id === example.id
                                                ? 'bg-blue-900/40 border-l-4 border-l-blue-500'
                                                : 'hover:bg-gray-700/30'
                                        }`}
                                    >
                                        <div className="font-semibold text-sm">{example.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">{example.language}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Code Display */}
                    <div className="lg:col-span-2">
                        {selectedExample ? (
                            <div className="space-y-6">
                                {/* Info Header */}
                                <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{selectedExample.title}</h3>
                                            <p className="text-gray-300">{selectedExample.description}</p>
                                        </div>
                                        <div
                                            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                                            style={{ backgroundColor: getLanguageColor(selectedExample.language) + '20', color: getLanguageColor(selectedExample.language) }}
                                        >
                                            {selectedExample.language.substring(0, 2).toUpperCase()}
                                        </div>
                                    </div>
                                    
                                    {/* Tags and Difficulty */}
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(selectedExample.difficulty)}`}>
                                            {selectedExample.difficulty}
                                        </span>
                                        <span className="text-gray-400 text-sm">•</span>
                                        <span className="text-gray-400 text-sm">{selectedExample.category}</span>
                                        {selectedExample.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Code Block */}
                                <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden">
                                    <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b border-gray-700">
                                        <span className="text-sm font-mono text-gray-400">{selectedExample.language}</span>
                                        <button
                                            onClick={handleCopyCode}
                                            className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                                                copied
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {copied ? '✓ Copied!' : '📋 Copy Code'}
                                        </button>
                                    </div>
                                    <pre className="p-6 text-sm text-gray-300 overflow-x-auto max-h-96">
                                        <code className="font-mono text-sm leading-relaxed">{selectedExample.code}</code>
                                    </pre>
                                </div>

                                {/* Explanation */}
                                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6">
                                    <h4 className="text-lg font-bold text-white mb-3">💡 Explanation</h4>
                                    <p className="text-gray-300 leading-relaxed">{selectedExample.explanation}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <p>Select a code example to view details</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">📊 Expertise Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-600/30 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">{codeExamples.filter(e => e.language === 'TypeScript' || e.language === 'JavaScript').length}</div>
                            <div className="text-gray-300">JavaScript / TypeScript</div>
                            <div className="text-xs text-gray-500 mt-2">Frontend & React</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 border border-yellow-600/30 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">{codeExamples.filter(e => e.language === 'Python').length}</div>
                            <div className="text-gray-300">Python</div>
                            <div className="text-xs text-gray-500 mt-2">Backend & ML</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 border border-red-600/30 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-red-400 mb-2">{codeExamples.filter(e => e.language === 'Java').length}</div>
                            <div className="text-gray-300">Java</div>
                            <div className="text-xs text-gray-500 mt-2">Enterprise & Patterns</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-600/30 rounded-lg p-6 text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">{codeExamples.length}</div>
                            <div className="text-gray-300">Total Examples</div>
                            <div className="text-xs text-gray-500 mt-2">Production-Ready</div>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-gradient-to-r from-brand-gold/10 to-yellow-400/10 border-2 border-brand-gold/30 rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-brand-text mb-8">🎯 Core Competencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">🔧 Languages & Frameworks</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-400">✓</span> TypeScript & JavaScript (React, Node.js)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-yellow-400">✓</span> Python (Django, FastAPI, Async)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-400">✓</span> Java (Spring, Design Patterns)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> SQL & Database Design
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">🏗️ Design Patterns & Architecture</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">✓</span> Builder, Observer, Strategy Patterns
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">✓</span> Microservices & Event-Driven
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">✓</span> Async/Await & Reactive Programming
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">✓</span> Clean Code & SOLID Principles
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};