
export interface FAQ {
  question: string;
  answer: string;
}

export interface PujaService {
  id: string;
  name: string;
  description: string;
  duration?: string;
  deity?: string;
  mantra?: string;
  image: string;
  category: 'Regular' | 'Special' | 'Sanskara' | 'Astrology' | 'Recitation';
  rituals?: string[];
  benefits?: string[];
  audioUrl?: string;
  faqs?: FAQ[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  pujaType: string;
  date: string;
  time: string;
  location: string;
  message: string;
}

export interface AuspiciousDate {
  date: string; // ISO string YYYY-MM-DD
  label: string;
  type: 'Highly Auspicious' | 'Auspicious' | 'Tithi';
}

export interface DashboardBooking extends BookingFormData {
  id: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: any;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  image?: string;
  serviceId?: string;
}
