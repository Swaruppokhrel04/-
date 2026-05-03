
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
