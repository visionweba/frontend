export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  mrp: number;
  discountPercent?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  rating: number;
  numReviews: number;
  isActive: boolean;
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  _id: string;
  items: {
    product: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  shippingInfo: Address;
  status: string;
  statusHistory: { status: string; updatedAt: string }[];
  paymentMethod: string;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    lastCity?: string;
    lastState?: string;
  };
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isBlocked: boolean;
  lastIp?: string;
  lastDevice?: string;
  lastBrowser?: string;
  lastOs?: string;
  lastCity?: string;
  lastState?: string;
  lastCountry?: string;
  lastActiveAt?: string;
  createdAt: string;
  loginHistory: {
    ip: string;
    device: string;
    browser: string;
    os: string;
    city: string;
    state: string;
    country: string;
    loginAt: string;
  }[];
}
