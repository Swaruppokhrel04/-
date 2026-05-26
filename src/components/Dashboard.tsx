import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  User, 
  History, 
  Settings, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Award,
  Bell,
  Download,
  Camera,
  Trash2,
  Video,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';
import { DashboardBooking } from '../types';
import { generateGoogleCalendarLink, downloadICal } from '../lib/calendarUtils';
import { VideoPromoGenerator } from './VideoPromoGenerator.tsx';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export const Dashboard = () => {
  const { user, signOut, auth } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'profile' | 'promotions'>('upcoming');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth?.currentUser?.uid,
        email: auth?.currentUser?.email,
        emailVerified: auth?.currentUser?.emailVerified,
        isAnonymous: auth?.currentUser?.isAnonymous,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    const path = 'bookings';
    try {
      const q = query(
        collection(db, path),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) { // 500KB limit for Firestore Base64 storage
        alert("Image too large. Please select an image under 500KB.");
        return;
      }
      
      setUploadLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setPhotoURL(base64String);
        setUploadLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoURL('');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdating(true);
    const path = `users/${user.uid}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        photoURL,
        updatedAt: new Date()
      });
      // In a real app we'd broadcast an update event or use a listener
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setIsUpdating(false);
    }
  };

  const upcomingBookings = bookings.filter(b => {
    if (!b.date) return false;
    return new Date(b.date) >= new Date();
  });

  const historyBookings = bookings.filter(b => {
    if (!b.date) return true;
    return new Date(b.date) < new Date();
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-50 text-green-600 border-green-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gold/5 text-gold border-gold/10';
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-maroon mb-4">{t.dashboard.accessDenied}</h2>
        <p className="text-gray-600 mb-8">{t.dashboard.loginRequired}</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-paper-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80"
          >
            <div className="bg-white rounded-3xl p-8 border border-gold/10 shadow-xl shadow-maroon/5 lg:sticky lg:top-32">
              <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-24 h-24 bg-paper-dark rounded-full p-1 border-2 border-gold/20 mb-5 relative group">
                  {photoURL ? (
                    <img src={photoURL} alt="" className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-maroon flex items-center justify-center text-cream text-3xl font-bold">
                      {displayName?.[0]?.toUpperCase() || user.displayName?.[0]?.toUpperCase() || 'Y'}
                    </div>
                  )}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 bg-gold text-maroon p-1.5 rounded-full border-2 border-white"
                  >
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-maroon font-serif">{displayName || user.displayName || 'Yajman'}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2 px-4 py-1 bg-paper-dark rounded-full">{t.dashboard.welcome}</p>
              </div>

              <nav className="space-y-1.5">
                {[
                  { id: 'upcoming', icon: Calendar, label: t.dashboard.upcoming },
                  { id: 'history', icon: History, label: t.dashboard.history },
                  { id: 'profile', icon: User, label: t.dashboard.profile },
                  { id: 'promotions', icon: Video, label: t.videoGenerator.title }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all relative overflow-hidden group ${
                      activeTab === item.id 
                      ? 'bg-maroon text-cream shadow-lg shadow-maroon/20' 
                      : 'text-gray-500 hover:bg-maroon/5 hover:text-maroon'
                    }`}
                  >
                    <item.icon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                    {activeTab === item.id && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gold"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
                
                <div className="pt-6 border-t border-gold/5 mt-6">
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    {t.nav.logout}
                  </button>
                </div>
              </nav>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-6 md:p-10 border border-gold/10 shadow-xl shadow-maroon/5 min-h-[600px]"
              >
                
                {activeTab === 'upcoming' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-maroon font-serif">{t.dashboard.upcoming}</h2>
                        <p className="text-gray-400 text-sm mt-1">{upcomingBookings.length} {t.dashboard.ritualsFound}</p>
                      </div>
                    </div>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-gold/20 border-t-maroon rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-maroon/40 uppercase tracking-widest">{t.dashboard.loadingSchedule}</p>
                      </div>
                    ) : upcomingBookings.length > 0 ? (
                      <div className="grid gap-6">
                        {upcomingBookings.map((booking, idx) => (
                          <motion.div 
                            key={booking.id} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group bg-paper-dark/50 hover:bg-white p-6 rounded-3xl border border-gold/10 hover:border-gold/30 hover:shadow-xl hover:shadow-maroon/5 transition-all duration-300"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-start md:items-center gap-6">
                                <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center border border-gold/10 shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                                  <span className="text-[10px] uppercase font-black text-gold tracking-widest leading-none mb-1">
                                    {booking.date ? format(new Date(booking.date), 'MMM') : ''}
                                  </span>
                                  <span className="text-2xl font-black text-maroon leading-none">
                                    {booking.date ? format(new Date(booking.date), 'dd') : ''}
                                  </span>
                                </div>

                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-maroon text-xl leading-tight">{booking.pujaType}</h4>
                                    <span className="px-2 py-0.5 bg-maroon/5 text-maroon/40 text-[9px] font-black uppercase tracking-widest rounded-md border border-maroon/10">
                                      {booking.category || 'Ritual'}
                                    </span>
                                  </div>
                                  
                                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                                      <Clock className="w-3.5 h-3.5 text-gold" /> {booking.time || 'Morning Muhurta'}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                                      <MapPin className="w-3.5 h-3.5 text-gold" /> {booking.address || 'Rupandehi, Nepal'}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a 
                                      href={generateGoogleCalendarLink(booking)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[10px] font-bold text-saffron hover:text-maroon transition-colors flex items-center gap-1.5 uppercase tracking-tighter"
                                    >
                                      <Calendar className="w-3.5 h-3.5" /> Google Sync
                                    </a>
                                    <button 
                                      onClick={() => downloadICal(booking)}
                                      className="text-[10px] font-bold text-saffron hover:text-maroon transition-colors flex items-center gap-1.5 uppercase tracking-tighter border-l border-gold/20 pl-4"
                                    >
                                      <Download className="w-3.5 h-3.5" /> Export iCal
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gold/5">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest ${getStatusColor(booking.status)}`}>
                                  {booking.status?.toLowerCase() === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                  {booking.status || t.dashboard.pending}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-paper-dark group-hover:bg-maroon transition-colors flex items-center justify-center">
                                  <ChevronRight className="w-5 h-5 text-gold group-hover:text-cream transition-colors" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-24 bg-paper-dark/30 rounded-[2rem] border border-dashed border-gold/10">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                          <Calendar className="w-10 h-10 text-gold/20" />
                        </div>
                        <p className="text-maroon/40 font-bold tracking-tight">{t.dashboard.noBookingsTitle}</p>
                        <p className="text-gray-400 text-xs mt-2">{t.dashboard.noBookingsDesc}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-maroon font-serif">{t.dashboard.history}</h2>
                    {loading ? (
                      <div className="flex justify-center py-24">
                        <div className="w-12 h-12 border-4 border-gold/20 border-t-maroon rounded-full animate-spin"></div>
                      </div>
                    ) : historyBookings.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-gold/10">
                              <th className="pb-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">{t.dashboard.date}</th>
                              <th className="pb-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">{t.dashboard.service}</th>
                              <th className="pb-6 text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 text-right">{t.dashboard.status}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gold/5">
                            {historyBookings.map((booking) => (
                              <tr key={booking.id} className="group hover:bg-paper-dark/50 transition-colors">
                                <td className="py-6">
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-maroon">
                                      {booking.date ? format(new Date(booking.date), 'MMMM d, yyyy') : 'N/A'}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium">{t.dashboard.completedVia}</span>
                                  </div>
                                </td>
                                <td className="py-6">
                                  <span className="text-sm font-bold text-maroon/70 group-hover:text-maroon transition-colors">{booking.pujaType}</span>
                                </td>
                                <td className="py-6 text-right">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {t.dashboard.completed}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-24">
                        <History className="w-20 h-20 text-gold/10 mx-auto mb-6" />
                        <p className="text-maroon/40 font-bold tracking-tight">{t.dashboard.noBookings}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-10">
                    <div>
                      <h2 className="text-3xl font-bold text-maroon font-serif">{t.dashboard.profile}</h2>
                      <p className="text-gray-400 text-sm mt-1">{t.dashboard.manageProfile}</p>
                    </div>
                    
                    <div className="grid lg:grid-cols-5 gap-12">
                      <form onSubmit={handleUpdateProfile} className="lg:col-span-3 space-y-8">
                        {/* Avatar Upload */}
                        <div className="flex items-center gap-8 p-8 bg-paper-dark/50 rounded-3xl border border-gold/5 group">
                          <div className="relative">
                            <div className="w-28 h-28 bg-white rounded-[2rem] p-1 border-2 border-gold/10 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-gold/30 transition-all">
                              {photoURL ? (
                                <img src={photoURL} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                              ) : (
                                <div className="w-full h-full bg-paper-dark flex items-center justify-center text-gold/20">
                                  <User className="w-14 h-14" />
                                </div>
                              )}
                              {uploadLoading && (
                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                                  <div className="w-8 h-8 border-3 border-maroon border-t-transparent rounded-full animate-spin"></div>
                                </div>
                              )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 bg-maroon text-cream p-2.5 rounded-2xl border-2 border-white cursor-pointer hover:bg-saffron transition-all shadow-xl hover:scale-110 active:scale-95">
                              <Camera className="w-5 h-5" />
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold text-maroon text-lg">{t.dashboard.sacredIdentity}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">{t.dashboard.profileImageDesc}</p>
                            {photoURL && (
                              <button 
                                type="button"
                                onClick={removePhoto}
                                className="text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-2 hover:text-red-500 transition-colors pt-2"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> {t.dashboard.removeImage}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon/40 ml-1">{t.dashboard.displayName}</label>
                            <div className="relative">
                              <input 
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full bg-paper-dark/30 border border-gold/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-maroon/10 focus:bg-white text-maroon font-bold transition-all"
                                placeholder="Your Dharma Name"
                                required
                              />
                              <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/30" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-maroon/40 ml-1">{t.dashboard.contactEssence}</label>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="relative">
                                <input 
                                  type="email"
                                  value={user.email || ''}
                                  readOnly
                                  className="w-full bg-gray-50 border border-gold/5 rounded-2xl px-6 py-4 text-gray-400 font-bold cursor-not-allowed text-sm"
                                />
                                <Settings className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
                              </div>
                              <div className="relative">
                                <input 
                                  type="tel"
                                  value={user.phoneNumber || ''}
                                  readOnly
                                  placeholder="Phone Not Added"
                                  className="w-full bg-gray-50 border border-gold/5 rounded-2xl px-6 py-4 text-gray-400 font-bold cursor-not-allowed text-sm"
                                />
                                <Settings className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          type="submit"
                          disabled={isUpdating || uploadLoading}
                          className="w-full bg-maroon text-cream py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-maroon/10 hover:bg-saffron hover:shadow-saffron/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                          {isUpdating ? (
                            <div className="w-6 h-6 border-3 border-cream border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <Award className="w-6 h-6" />
                              {t.dashboard.updateProfile}
                            </>
                          )}
                        </button>
                      </form>

                      <div className="lg:col-span-2 space-y-6">
                        <section className="bg-maroon/5 rounded-[2rem] p-8 border border-maroon/10 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-20 h-20 text-maroon" />
                          </div>
                          
                          <div className="flex items-center gap-5 mb-8 relative z-10">
                            <div className="w-14 h-14 bg-saffron text-white rounded-2xl flex items-center justify-center shadow-lg shadow-saffron/20">
                              <Bell className="w-7 h-7" />
                            </div>
                            <div>
                              <h4 className="font-bold text-maroon leading-tight">Yajman Karma</h4>
                              <p className="text-[10px] text-maroon/40 font-black uppercase tracking-widest mt-1">Spiritual Activity</p>
                            </div>
                          </div>

                          <div className="space-y-6 relative z-10">
                            {[
                              { label: t.dashboard.memberSince, value: '2024', icon: Calendar },
                              { label: t.dashboard.totalRituals, value: bookings.length, icon: Award },
                              { label: t.dashboard.lastBlessing, value: historyBookings.length > 0 ? format(new Date(historyBookings[0].date), 'MMM d') : 'N/A', icon: History }
                            ].map((stat, i) => (
                              <div key={i} className="flex justify-between items-center group/item">
                                <span className="text-gray-500 text-sm flex items-center gap-2">
                                  <stat.icon className="w-4 h-4 text-gold/40 group-hover/item:text-gold transition-colors" />
                                  {stat.label}
                                </span>
                                <span className="font-bold text-maroon text-sm bg-white px-3 py-1 rounded-lg border border-maroon/5 shadow-sm">
                                  {stat.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-10 p-5 bg-white/50 rounded-2xl border border-maroon/5 backdrop-blur-sm">
                            <p className="text-[10px] text-gray-400 font-medium italic leading-relaxed text-center">
                              {t.footer.mantra}
                            </p>
                          </div>
                        </section>
                        
                        <div className="p-6 bg-paper-dark rounded-[1.5rem] border border-gold/10">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-maroon/40 mb-3 ml-1">{t.dashboard.needAssistant}</h5>
                          <button className="w-full py-4 text-maroon font-bold text-sm bg-white rounded-xl border border-gold/10 hover:border-gold transition-all shadow-sm">
                            {t.dashboard.connectPandit}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'promotions' && (
                  <VideoPromoGenerator />
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
