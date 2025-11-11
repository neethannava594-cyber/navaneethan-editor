export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
}

export enum OrderStatus {
  Pending = 'pending',
  Editing = 'editing',
  DraftReady = 'draft_ready',
  Review = 'review',
  Revision = 'revision',
  Completed = 'completed',
  Cancelled = 'cancelled',
}


export interface Order {
  id: string;
  user: User;
  service: PricingPackage;
  footageLinks: string[];
  notes: string;
  priceEstimate: number;
  status: OrderStatus;
  adminNotes?: string;
  finalDeliveryLinks?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  description: string;
  tags: string[];
  date: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  deliverables: string[];
  deliveryTimeDays: number;
}

export interface Testimonial {
    id: string;
    user: User;
    comment: string;
    rating: number;
}
