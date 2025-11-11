import { User, Order, OrderStatus, PortfolioVideo, PricingPackage, Testimonial } from './types';

export const users: User[] = [
  { id: 'u1', name: 'John Doe', email: 'customer@example.com', role: 'customer' },
  { id: 'u2', name: 'Navaneethan', email: 'admin@example.com', role: 'admin' },
];

// FIX: Renamed properties to match PricingPackage type and added missing description. Changed delivery time to a number.
export const pricingPackages: PricingPackage[] = [
  {
    id: 'pkg1',
    name: 'Essential Highlight',
    price: 450,
    description: 'A punchy 3-5 minute highlight video, perfect for sharing key moments.',
    deliverables: ['3-5 Minute Highlight Video', '1 Round of Revisions', 'Royalty-Free Music', 'Basic Color Correction'],
    deliveryTimeDays: 10,
  },
  {
    id: 'pkg2',
    name: 'Cinematic Story',
    price: 950,
    description: 'An 8-12 minute feature film that tells the story of your event.',
    deliverables: ['8-12 Minute Feature Film', '30-60 Second Teaser', '2 Rounds of Revisions', 'Advanced Color Grading', 'Licensed Music'],
    deliveryTimeDays: 21,
  },
  {
    id: 'pkg3',
    name: 'The Director\'s Cut',
    price: 1800,
    description: 'The ultimate 15-20 minute cinematic experience with all the extras.',
    deliverables: ['15-20 Minute Feature Film', 'Full Ceremony Edit', 'Social Media Teasers', 'Unlimited Revisions', 'Premium Color Grading & Sound Design', 'Drone Footage Integration'],
    deliveryTimeDays: 42,
  },
];

// FIX: Updated Order objects to match the Order type definition.
// Changed `userId` to `user` object, `serviceType` to `service` object, `instructions` to `notes`, etc.
export const orders: Order[] = [
  {
    id: 'ord1',
    user: users[0],
    service: pricingPackages[2],
    footageLinks: ['https://link.to/footage1'],
    notes: 'Please focus on cinematic shots and color grade with a warm tone.',
    priceEstimate: 1200,
    status: OrderStatus.Review,
    adminNotes: 'Footage received, starting the edit. The first draft is ready for your review!',
    finalDeliveryLinks: ['https://link.to/draft_video_v1'],
    createdAt: '2023-10-25T09:00:00Z',
    updatedAt: '2023-10-28T15:00:00Z',
  },
  {
    id: 'ord2',
    user: users[0],
    service: pricingPackages[0],
    footageLinks: ['https://link.to/event_footage'],
    notes: 'Quick turnaround needed. Just a 5-minute highlight reel.',
    priceEstimate: 450,
    status: OrderStatus.Completed,
    adminNotes: 'Final video delivered.',
    finalDeliveryLinks: ['https://link.to/final_video'],
    createdAt: '2023-09-12T11:00:00Z',
    updatedAt: '2023-09-15T14:00:00Z',
  },
  {
    id: 'ord3',
    user: users[0],
    service: pricingPackages[1],
    footageLinks: ['https://link.to/footage3'],
    notes: 'Include drone shots at the beginning.',
    priceEstimate: 800,
    status: OrderStatus.Pending,
    finalDeliveryLinks: [],
    createdAt: '2023-10-27T12:00:00Z',
    updatedAt: '2023-10-27T12:00:00Z',
  },
];

// FIX: Added missing 'date' property to match PortfolioVideo type.
export const portfolioVideos: PortfolioVideo[] = [
  {
    id: 'vid1',
    title: 'Serene Beach Wedding',
    category: 'Wedding Candid',
    thumbnail: 'https://picsum.photos/seed/wedding1/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A beautiful and emotional wedding ceremony captured by the coast.',
    tags: ['beach', 'cinematic', 'romantic'],
    date: '2023-08-15',
  },
  {
    id: 'vid2',
    title: 'Urban Corporate Gala',
    category: 'Events',
    thumbnail: 'https://picsum.photos/seed/event1/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Highlights from the annual tech gala in the city center.',
    tags: ['corporate', 'highlights', 'professional'],
    date: '2023-09-20',
  },
  {
    id: 'vid3',
    title: 'Rustic Vineyard Vows',
    category: 'Wedding Candid',
    thumbnail: 'https://picsum.photos/seed/wedding2/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'An intimate wedding set in the picturesque countryside vineyards.',
    tags: ['rustic', 'vineyard', 'emotional'],
    date: '2023-06-10',
  },
  {
    id: 'vid4',
    title: 'Product Launch Showcase',
    category: 'Events',
    thumbnail: 'https://picsum.photos/seed/event2/600/400',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Dynamic coverage of a major product launch event.',
    tags: ['tech', 'launch', 'dynamic'],
    date: '2023-10-05',
  },
];

// FIX: Updated objects to match Testimonial type with user, comment, and rating.
export const testimonials: Testimonial[] = [
    {
        id: 't1',
        user: { id: 'tu1', name: 'Priya & Rohan', email: 'pr@example.com', role: 'customer' },
        comment: 'Navaneethan turned our wedding footage into a masterpiece. The emotion, the storytelling... it was beyond our wildest dreams. We couldn\'t be happier!',
        rating: 5,
    },
    {
        id: 't2',
        user: { id: 'tu2', name: 'Marketing Director, TechCorp', email: 'md@techcorp.com', role: 'customer' },
        comment: 'The highlight video for our annual conference was sharp, professional, and delivered ahead of schedule. Navaneethan Editor is our go-to for all corporate video needs.',
        rating: 5,
    },
    {
        id: 't3',
        user: { id: 'tu3', name: 'Anjali Sharma', email: 'as@example.com', role: 'customer' },
        comment: 'As an event planner, I need reliable partners. Navaneethan always delivers exceptional quality that impresses my clients. Highly recommended!',
        rating: 5,
    }
];
