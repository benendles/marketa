export type UserRole = "buyer" | "seller" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  location?: string;
  rating: number;
  reviewCount: number;
  joinedAt: string;
  isVerified: boolean;
  totalSales?: number;
  totalEarnings?: number;
}

export type ListingCategory =
  | "Electronics"
  | "Fashion"
  | "Home & Garden"
  | "Sports"
  | "Vehicles"
  | "Services"
  | "Real Estate"
  | "Jobs"
  | "Others";

export type ListingCondition = "New" | "Like New" | "Good" | "Fair" | "Poor";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  condition: ListingCondition;
  location: string;
  images: string[];
  seller: User;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  saves: number;
  tags: string[];
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  listing: Listing;
  buyer: User;
  seller: User;
  status: BookingStatus;
  startDate: string;
  endDate?: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  receiver: User;
  conversationId: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  listing?: Listing;
  unreadCount: number;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: User;
  listing?: Listing;
  createdAt: string;
}

export interface Notification {
  id: string;
  type:
    | "booking"
    | "message"
    | "review"
    | "payment"
    | "system";
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalListings: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  newListingsThisMonth: number;
  revenueThisMonth: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface SearchFilters {
  query?: string;
  category?: ListingCategory;
  minPrice?: number;
  maxPrice?: number;
  condition?: ListingCondition;
  location?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "rating";
  page?: number;
  limit?: number;
}
