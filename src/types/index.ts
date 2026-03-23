/**
 * Dryspace Waterproofing - Core Type Definitions
 * Type-safe domain modeling for waterproofing services
 */

// ============================================================================
// Branded Types for Type Safety
// ============================================================================

export type CustomerId = string & { __brand: 'CustomerId' };
export type QuoteId = string & { __brand: 'QuoteId' };
export type ServiceId = string & { __brand: 'ServiceId' };
export type InvoiceId = string & { __brand: 'InvoiceId' };
export type TechnicianId = string & { __brand: 'TechnicianId' };

// ============================================================================
// Enums for Fixed Domain Values
// ============================================================================

export enum ServiceType {
  EXTERIOR_WATERPROOFING = 'exterior_waterproofing',
  INTERIOR_WATERPROOFING = 'interior_waterproofing',
  FOUNDATION_REPAIR = 'foundation_repair',
  SUMP_PUMP_INSTALLATION = 'sump_pump_installation',
  FRENCH_DRAIN = 'french_drain',
  BASEMENT_LOWERING = 'basement_lowering',
  CRACK_INJECTION = 'crack_injection',
  EMERGENCY_SERVICE = 'emergency_service'
}

export enum Severity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum PropertyType {
  DETACHED = 'detached',
  SEMI_DETACHED = 'semi_detached',
  TOWNHOUSE = 'townhouse',
  CONDO = 'condo',
  COMMERCIAL = 'commercial'
}

export enum QuoteStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CONVERTED = 'converted'
}

export enum City {
  TORONTO = 'toronto',
  MISSISSAUGA = 'mississauga',
  BRAMPTON = 'brampton',
  VAUGHAN = 'vaughan',
  MARKHAM = 'markham',
  RICHMOND_HILL = 'richmond-hill',
  OAKVILLE = 'oakville',
  BURLINGTON = 'burlington',
  HAMILTON = 'hamilton'
}

// ============================================================================
// Core Domain Interfaces
// ============================================================================

export interface Address {
  street: string;
  city: City | string;
  province: 'ON';
  postalCode: string;
  country: 'Canada';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Customer {
  id: CustomerId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: Address;
  propertyType: PropertyType;
  preferredContactMethod: 'phone' | 'email' | 'text';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: ServiceId;
  type: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  pricePerSqFt?: number;
  estimatedDuration: {
    min: number;
    max: number;
    unit: 'hours' | 'days';
  };
  warrantyYears: number;
  isEmergency: boolean;
}

export interface Quote {
  id: QuoteId;
  customerId: CustomerId;
  services: QuoteService[];
  status: QuoteStatus;
  totalAmount: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    reason: string;
  };
  validUntil: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteService {
  serviceId: ServiceId;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations?: Record<string, unknown>;
}

// ============================================================================
// Form Types
// ============================================================================

export interface QuoteFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Property Information
  address: Partial<Address>;
  propertyType: PropertyType;
  
  // Service Requirements
  serviceType: ServiceType;
  urgency: 'immediate' | 'this_week' | 'this_month' | 'planning';
  
  // Problem Description
  issueDescription: string;
  severity: Severity;
  
  // Additional Information
  squareFootage?: number;
  yearBuilt?: number;
  previousWaterDamage?: boolean;
  insuranceClaim?: boolean;
  
  // Preferences
  preferredContactMethod: 'phone' | 'email' | 'text';
  preferredContactTime?: 'morning' | 'afternoon' | 'evening';
  
  // Optional
  referralSource?: string;
  additionalNotes?: string;
}

// ============================================================================
// API Types
// ============================================================================

export type ApiResponse<T> = 
  | { success: true; data: T; timestamp: number }
  | { success: false; error: ApiError; timestamp: number };

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  schema?: Record<string, unknown>;
}

export interface CTAProps {
  variant: 'primary' | 'secondary' | 'emergency';
  text: string;
  href?: string;
  onClick?: () => void;
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface TestimonialProps {
  id: string;
  customerName: string;
  location: City | string;
  service: ServiceType;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: Date;
  verified: boolean;
  image?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// ============================================================================
// Type Guards
// ============================================================================

export function isCustomer(obj: unknown): obj is Customer {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'address' in obj
  );
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
}

export function isEmergencyService(service: Service): boolean {
  return service.isEmergency || service.type === ServiceType.EMERGENCY_SERVICE;
}

// ============================================================================
// Constants
// ============================================================================

export const EMERGENCY_PHONE = '437-545-0067' as const;
export const BUSINESS_HOURS = {
  weekday: { open: '07:00', close: '19:00' },
  saturday: { open: '08:00', close: '17:00' },
  sunday: { open: '09:00', close: '16:00' }
} as const;

export const WARRANTY_YEARS = {
  [ServiceType.EXTERIOR_WATERPROOFING]: 25,
  [ServiceType.INTERIOR_WATERPROOFING]: 25,
  [ServiceType.FOUNDATION_REPAIR]: 25,
  [ServiceType.SUMP_PUMP_INSTALLATION]: 10,
  [ServiceType.FRENCH_DRAIN]: 25,
  [ServiceType.BASEMENT_LOWERING]: 25,
  [ServiceType.CRACK_INJECTION]: 10,
  [ServiceType.EMERGENCY_SERVICE]: 5
} as const;

// ============================================================================
// Route Types
// ============================================================================

export type ServiceRoute = `/services/${ServiceType}`;
export type LocationRoute = `/locations/${City}`;
export type BlogRoute = `/blog/${string}`;
export type ApiRoute = `/api/${string}`;

export type AppRoute = 
  | '/'
  | '/about'
  | '/contact'
  | '/services'
  | '/locations'
  | '/blog'
  | '/calculator'
  | '/emergency'
  | ServiceRoute
  | LocationRoute
  | BlogRoute
  | ApiRoute;