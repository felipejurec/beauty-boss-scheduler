
export type User = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  isSubscribed?: boolean;
  stripeCustomerId?: string;
};

export type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  professionalId: string;
};

export type Professional = {
  id: string;
  name: string;
  userId?: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  professionalId: string;
};

export type Appointment = {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  datetime: string;
  status: 'scheduled' | 'completed' | 'canceled';
};

export type BusinessType = 
  | 'hair_salon'
  | 'nail_salon'
  | 'spa'
  | 'barber_shop'
  | 'esthetician'
  | 'makeup_artist'
  | 'other';

export type OnboardingState = {
  step: number;
  businessType: BusinessType | null;
  professionals: { name: string }[];
  services: { name: string; duration: number; price: number }[];
  schedule: {
    days: {
      [key: string]: {
        enabled: boolean;
        start: string;
        end: string;
      }
    }
  }
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};
