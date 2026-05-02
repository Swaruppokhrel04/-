import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Trash2
} from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../LanguageContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';
import { DashboardBooking } from '../types';
import { generateGoogleCalendarLink, downloadICal } from '../lib/calendarUtils';

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
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'profile'>('upcoming');
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

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-maroon mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8">Please login to view your dashboard.</p>
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
            className="lg:w-80"
          >
            <div className="bg-white rounded-3xl p-8 border border-gold/10 shadow-xl shadow-maroon/5">
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-maroon/5 rounded-full p-1 border-2 border-gold/20 mb-4 relative">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-maroon flex items-center justify-center text-cream text-3xl font-bold">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-gold text-maroon p-1.5 rounded-full border-2 border-white">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-maroon">{user.displayName || user.email}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{t.dashboard.welcome}</p>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'upcoming' ? 'bg-maroon text-cream shadow-lg shadow-maroon/20' : 'text-gray-500 hover:bg-maroon/5'}`}
                >
                  <Calendar className="w-5 h-5" />
                  {t.dashboard.upcoming}
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'history' ? 'bg-maroon text-cream shadow-lg shadow-maroon/20' : 'text-gray-500 hover:bg-maroon/5'}`}
                >
                  <History className="w-5 h-5" />
                  {t.dashboard.history}
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'profile' ? 'bg-maroon text-cream shadow-lg shadow-maroon/20' : 'text-gray-500 hover:bg-maroon/5'}`}
                >
                  <User className="w-5 h-5" />
                  {t.dashboard.profile}
                </button>
                <div className="pt-4 border-t border-gold/5 mt-4">
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    {t.nav.logout}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-gold/10 shadow-xl shadow-maroon/5 min-h-[500px]">
              
              {activeTab === 'upcoming' && (
                <div>
                  <h2 className="text-3xl font-bold text-maroon mb-8 font-serif">{t.dashboard.upcoming}</h2>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : upcomingBookings.length > 0 ? (
                    <div className="grid gap-6">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="group bg-paper-dark p-6 rounded-3xl border border-gold/10 hover:border-gold/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white rounded-2xl flex flex-col items-center justify-center border border-gold/20 shadow-sm">
                              <span className="text-[10px] uppercase font-bold text-gold tracking-widest leading-none">
                                {booking.date ? format(new Date(booking.date), 'MMM') : ''}
                              </span>
                              <span className="text-xl font-bold text-maroon">
                                {booking.date ? format(new Date(booking.date), 'dd') : ''}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-maroon">{booking.pujaType}</h4>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" /> {booking.time || 'Morning'}
                              </p>
                              <div className="flex items-center gap-3 mt-3">
                                <a 
                                  href={generateGoogleCalendarLink(booking)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] font-bold text-saffron hover:text-maroon transition-colors flex items-center gap-1 uppercase tracking-widest"
                                >
                                  <Calendar className="w-3 h-3" /> Google
                                </a>
                                <button 
                                  onClick={() => downloadICal(booking)}
                                  className="text-[10px] font-bold text-saffron hover:text-maroon transition-colors flex items-center gap-1 uppercase tracking-widest"
                                >
                                  <Download className="w-3 h-3" /> iCal
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gold/5">
                            <div className="text-right">
                              <span className="inline-block px-3 py-1 bg-saffron/10 text-saffron rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {booking.status || t.dashboard.pending}
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gold/30 group-hover:text-gold transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <Calendar className="w-16 h-16 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold">{t.dashboard.noBookings}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h2 className="text-3xl font-bold text-maroon mb-8 font-serif">{t.dashboard.history}</h2>
                  {loading ? (
                    <div className="flex justify-center py-20">
                      <div className="w-8 h-8 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : historyBookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gold/10">
                            <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.dashboard.date}</th>
                            <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">{t.dashboard.service}</th>
                            <th className="pb-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">{t.dashboard.status}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/5">
                          {historyBookings.map((booking) => (
                            <tr key={booking.id} className="group">
                              <td className="py-4">
                                <span className="text-sm font-bold text-gray-600">
                                  {booking.date ? format(new Date(booking.date), 'PPP') : 'N/A'}
                                </span>
                              </td>
                              <td className="py-4">
                                <span className="text-sm font-bold text-maroon">{booking.pujaType}</span>
                              </td>
                              <td className="py-4 text-right">
                                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                  {t.dashboard.completed}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <History className="w-16 h-16 text-gold/20 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold">{t.dashboard.noBookings}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-3xl font-bold text-maroon mb-8 font-serif">{t.dashboard.profile}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                      {/* Avatar Upload */}
                      <div className="flex items-center gap-6 p-6 bg-paper-dark rounded-3xl border border-gold/10">
                        <div className="relative">
                          <div className="w-24 h-24 bg-white rounded-full p-1 border-2 border-gold/20 flex items-center justify-center overflow-hidden">
                            {photoURL ? (
                              <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-maroon/5 flex items-center justify-center text-maroon/20">
                                <User className="w-12 h-12" />
                              </div>
                            )}
                            {uploadLoading && (
                              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-maroon border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}
                          </div>
                          <label className="absolute -bottom-1 -right-1 bg-maroon text-cream p-2 rounded-full border-2 border-white cursor-pointer hover:bg-saffron transition-colors shadow-lg">
                            <Camera className="w-4 h-4" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </label>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-maroon mb-1">Profile Photo</h4>
                          <p className="text-xs text-gray-500 mb-3">Upload a clean picture (max 500KB)</p>
                          {photoURL && (
                            <button 
                              type="button"
                              onClick={removePhoto}
                              className="text-xs font-bold text-red-500 flex items-center gap-1 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" /> Remove
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.dashboard.displayName}</label>
                          <div className="relative">
                            <input 
                              type="text"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              className="w-full bg-paper-dark border border-gold/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-maroon/20 text-maroon font-bold"
                              placeholder="Your Name"
                            />
                            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.booking.form.labelEmail}</label>
                          <div className="relative">
                            <input 
                              type="email"
                              value={user.email || ''}
                              readOnly
                              className="w-full bg-gray-50 border border-gold/10 rounded-2xl px-5 py-4 text-gray-400 font-bold cursor-not-allowed"
                            />
                            <Settings className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/20" />
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isUpdating || uploadLoading}
                        className="w-full bg-maroon text-cream py-4 rounded-2xl font-bold shadow-lg shadow-maroon/20 hover:bg-saffron transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? (
                          <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <Award className="w-5 h-5" />
                            {t.dashboard.saveChanges}
                          </>
                        )}
                      </button>
                    </form>

                    <div className="bg-maroon/5 rounded-[2rem] p-8 border border-maroon/10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-saffron text-white rounded-2xl flex items-center justify-center shadow-lg shadow-saffron/20">
                          <Bell className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-maroon tracking-tight">Account Summary</h4>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-maroon/5">
                          <span className="text-gray-500 text-sm">Member Since</span>
                          <span className="font-bold text-maroon text-sm">2024</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-maroon/5">
                          <span className="text-gray-500 text-sm">Total Bookings</span>
                          <span className="font-bold text-maroon text-sm">{bookings.length}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-maroon/5">
                          <span className="text-gray-500 text-sm">Last Puja</span>
                          <span className="font-bold text-maroon text-sm">
                            {historyBookings.length > 0 ? format(new Date(historyBookings[0].date), 'MMM d, yyyy') : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
