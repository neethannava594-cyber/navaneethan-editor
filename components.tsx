import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioVideo, PricingPackage, Testimonial, Order, OrderStatus } from './types';

// --- ERROR BOUNDARY - Simple Error Handler ---

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught:', event.error?.message);
      setHasError(true);
      // Prevent default error handling
      event.preventDefault();
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled rejection:', event.reason);
      // Don't show error to user
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-gold mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c.055.266.115.532.185.796m18.236-3.596a9.75 9.75 0 0 0-5.534-2.202m0 0a9.75 9.75 0 0 0-7.5 3.75m7.5-3.75a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm0 0H21m.516 4.224a2.25 2.25 0 0 0-1.898-1.113h-2.268a2.25 2.25 0 0 0-1.898 1.113m0 0H3.375m10.125 0a9.75 9.75 0 0 1-9.962 7.5h-3.75a2.25 2.25 0 0 1-2.25-2.25v-1.372c0-.516.21-.978.578-1.328m0 0H2.25m0 0H21m-9 3.75Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">Oops!</h1>
          <p className="text-gray-400 mb-6">Something went wrong. Please refresh the page to continue.</p>
          <button
            onClick={() => {
              setHasError(false);
              window.location.href = '/';
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-brand-gold to-yellow-600 text-brand-black font-semibold rounded-md hover:shadow-[0_0_15px_rgba(212,160,23,0.4)] transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// --- ICONS ---

export const VideoCameraIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
  </svg>
);

const UserIcon: React.FC<{className?: string}> = ({className="h-6 w-6"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);


// --- UI ELEMENTS ---

export const Logo: React.FC = () => (
  <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
    <VideoCameraIcon className="h-6 sm:h-8 w-6 sm:w-8 text-brand-gold" />
    <span className="text-lg sm:text-2xl font-serif font-bold tracking-wider text-white truncate">Navaneethan</span>
  </Link>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "px-4 sm:px-6 py-3 sm:py-2.5 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] sm:min-h-auto flex items-center justify-center";
  const variantClasses = variant === 'primary'
    ? "bg-gradient-to-r from-brand-gold to-yellow-600 text-brand-black hover:shadow-[0_0_15px_rgba(212,160,23,0.4)] focus:ring-brand-gold active:scale-95"
    : "bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black active:scale-95";
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const SectionTitle: React.FC<{title: string, subtitle: string}> = ({ title, subtitle }) => (
  <div className="text-center mb-8 sm:mb-12 px-4">
    <h3 className="text-xs sm:text-sm uppercase text-brand-gold tracking-widest">{subtitle}</h3>
    <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mt-2 leading-tight">{title}</h2>
  </div>
);

// --- CARDS ---

export const PortfolioCard: React.FC<{ video: PortfolioVideo }> = ({ video }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEmbedUrl = (url: string) => {
    // Handle YouTube URLs
    const youtubeMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\s]{11})/);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
    }
    
    // Handle Vimeo URLs
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    
    return url;
  };
  
  const embedUrl = getEmbedUrl(video.videoUrl);

  const handlePlay = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Portfolio Card */}
      <div className="group bg-brand-surface/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] border border-transparent hover:border-brand-gold/30 flex flex-col cursor-pointer">
        <div className="relative w-full h-48 bg-black" onClick={handlePlay}>
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-opacity group-hover:opacity-75" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-white">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <h3 className="text-xl font-serif font-bold text-brand-text">{video.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{video.category}</p>
            <p className="text-gray-300 text-sm mt-3">{video.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {video.tags && video.tags.map((tag, idx) => (
              <span key={idx} className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-4xl bg-black rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="p-6 bg-brand-surface/50 backdrop-blur-sm">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">{video.title}</h3>
              <p className="text-gray-300 mb-4">{video.description}</p>
              <div className="flex flex-wrap gap-2">
                {video.tags && video.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-brand-gold/20 text-brand-gold px-3 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const PricingCard: React.FC<{ pkg: PricingPackage; isPopular?: boolean }> = ({ pkg, isPopular }) => (
  <div className={`relative bg-brand-surface/50 backdrop-blur-sm border-2 rounded-lg p-8 flex flex-col transition-all duration-300 ${isPopular ? 'border-brand-gold shadow-[0_0_25px_rgba(212,175,55,0.2)]' : 'border-gray-700 hover:border-gray-600'}`}>
    {isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-black px-3 py-1 text-sm font-bold rounded-full uppercase tracking-wider">Most Popular</span>}
    <h3 className="text-2xl font-serif font-bold text-brand-text">{pkg.name}</h3>
    <p className="text-gray-400 mt-2 h-12">{pkg.description}</p>
    <div className="my-6">
        <span className="text-5xl font-bold text-brand-text">${pkg.price}</span>
    </div>
    <ul className="space-y-4 text-gray-300 flex-grow">
      {pkg.deliverables.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          <span>{feature}</span>
        </li>
      ))}
       <li className="flex items-start">
          <svg className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          <span>Delivery in ~{pkg.deliveryTimeDays} days</span>
        </li>
    </ul>
  <div className="mt-8">
    <Button className="w-full" onClick={() => window.location.assign('#/checkout/' + pkg.id)}>Choose Plan</Button>
  </div>
  </div>
);

export const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-brand-surface/50 backdrop-blur-sm p-8 rounded-lg border border-gray-800 h-full flex flex-col">
        <p className="text-gray-300 italic flex-grow">"{testimonial.comment}"</p>
        <div className="flex items-center mt-6">
            <div className="h-14 w-14 rounded-full bg-brand-black flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-brand-gold"/>
            </div>
            <div className="ml-4">
                <p className="font-bold text-brand-text font-serif">{testimonial.user.name}</p>
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const statusStyles: { [key in OrderStatus]: string } = {
  [OrderStatus.Pending]: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
  [OrderStatus.Editing]: "bg-blue-900/50 text-blue-300 border-blue-700",
  [OrderStatus.DraftReady]: "bg-cyan-900/50 text-cyan-300 border-cyan-700",
  [OrderStatus.Review]: "bg-purple-900/50 text-purple-300 border-purple-700",
  [OrderStatus.Completed]: "bg-green-900/50 text-green-300 border-green-700",
  [OrderStatus.Revision]: "bg-orange-900/50 text-orange-300 border-orange-700",
  [OrderStatus.Cancelled]: "bg-red-900/50 text-red-300 border-red-700",
};

export const OrderStatusBadge: React.FC<{status: OrderStatus}> = ({ status }) => (
    <span className={`px-3 py-1 text-xs font-medium rounded-full border capitalize ${statusStyles[status] || 'bg-gray-700'}`}>
        {status.replace('_', ' ')}
    </span>
);

const statusProgressMap: { [key in OrderStatus]: { percent: number; label: string; color: string } } = {
    [OrderStatus.Pending]: { percent: 10, label: "Order Placed", color: "bg-yellow-500" },
    [OrderStatus.Editing]: { percent: 40, label: "Editing in Progress", color: "bg-blue-500" },
    [OrderStatus.DraftReady]: { percent: 65, label: "Draft Ready", color: "bg-cyan-500" },
    [OrderStatus.Review]: { percent: 75, label: "Ready for Review", color: "bg-purple-500" },
    [OrderStatus.Revision]: { percent: 65, label: "Revisions in Progress", color: "bg-orange-500" },
    [OrderStatus.Completed]: { percent: 100, label: "Completed", color: "bg-green-500" },
    [OrderStatus.Cancelled]: { percent: 100, label: "Cancelled", color: "bg-red-500" },
};

export const OrderProgressBar: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const progress = statusProgressMap[status] || statusProgressMap[OrderStatus.Pending];

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-300">{progress.label}</span>
                <span className="text-sm font-medium text-gray-300">{status === OrderStatus.Completed || status === OrderStatus.Cancelled ? '' : `${progress.percent}%`}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className={`${progress.color} h-2.5 rounded-full transition-all duration-500`} 
                    style={{ width: `${progress.percent}%` }}
                ></div>
            </div>
        </div>
    );
};


export const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="bg-brand-surface/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6 flex flex-col justify-between h-full group transition-all duration-300 hover:border-brand-gold/50 hover:shadow-2xl hover:shadow-brand-gold/10">
        <div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold font-serif text-brand-text group-hover:text-brand-gold transition-colors">{order.service.name}</h3>
                <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-400 mb-6">Order ID: {order.id}</p>
            
            <OrderProgressBar status={order.status} />
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-300">
                <p><strong className="font-semibold">Created:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong className="font-semibold">Price:</strong> ${order.priceEstimate}</p>
            </div>
            <Link to={`/dashboard/order/${order.id}`} className="px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 bg-gray-700 text-brand-text hover:bg-brand-gold hover:text-brand-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-gold">
                View Details
            </Link>
        </div>
    </div>
);

export const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold"></div>
    </div>
);

// Face-aware image: uses the browser Face Detection API when available to
// center/crop the image on the detected face. Falls back to centered image.
export const FaceAwareImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, alt, className, style, ...rest }) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [objectPosition, setObjectPosition] = React.useState<string>('50% 50%');
  const [objectFit, setObjectFit] = React.useState<'cover' | 'contain'>('contain');

  const handleLoad = async () => {
    const img = imgRef.current;
    if (!img) return;

    // Prefer the native FaceDetector API when available (Chromium browsers).
    const FaceDetector = (window as any).FaceDetector;
    if (FaceDetector) {
      try {
        const detector = new FaceDetector();
        const faces = await detector.detect(img);
        if (faces && faces.length > 0) {
          const box = faces[0].boundingBox;
          // boundingBox coordinates are relative to the image's intrinsic size.
          const naturalW = img.naturalWidth || img.width;
          const naturalH = img.naturalHeight || img.height;
          if (naturalW && naturalH) {
            const centerX = ((box.x + box.width / 2) / naturalW) * 100;
            const centerY = ((box.y + box.height / 2) / naturalH) * 100;
            // Clamp values between 0 and 100
            const px = Math.max(0, Math.min(100, centerX));
            const py = Math.max(0, Math.min(100, centerY));
            setObjectPosition(`${px}% ${py}%`);
            setObjectFit('cover');
            return;
          }
        }
      } catch (err) {
        // detection failed; fall through to default
        console.debug('Face detection failed or not supported on this image', err);
      }
    }

    // Fallback: show the whole image centered
    setObjectPosition('50% 50%');
    setObjectFit('contain');
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      onLoad={handleLoad}
      className={className}
      style={{ ...(style as React.CSSProperties), objectFit, objectPosition }}
      {...rest}
    />
  );
};

// --- SOCIAL ICONS ---

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-12H8c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm-4 6c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm2-5h-1v-1h1v1z" />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);