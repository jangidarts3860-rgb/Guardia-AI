import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import React from 'react';
import { ArrowLeft, Share2, XCircle, CheckCircle2, Trash2, ChevronRight, Calendar, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { showToast } from '../../ui/shared/Toast';
import EmptyState from '../../ui/shared/EmptyState';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function ActivityLogScreen() {
  const navigate = useNavigate();
  const {
    activities, setActivities,
  } = useStore();

  const [activityFilter, setActivityFilter] = useState<'All' | 'Blocked' | 'Verified' | 'Cancelled'>('All');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();

  const handleDateSelect = (day: number) => {
    const selected = new Date(calendarYear, calendarMonth, day);
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: selected, end: null });
    } else if (selected >= dateRange.start) {
      setDateRange({ start: dateRange.start, end: selected });
    } else {
      setDateRange({ start: selected, end: dateRange.start });
    }
  };

  const isInRange = (day: number) => {
    const d = new Date(calendarYear, calendarMonth, day).getTime();
    if (dateRange.start && dateRange.end) {
      return d >= dateRange.start.getTime() && d <= dateRange.end.getTime();
    }
    if (dateRange.start) {
      return d === dateRange.start.getTime();
    }
    return false;
  };

  const handleApplyFilter = () => {
    setShowDatePicker(false);
    showToast('success', `Filter applied: ${dateRange.start ? dateRange.start.toLocaleDateString() : '...'} → ${dateRange.end ? dateRange.end.toLocaleDateString() : '...'}`);
  };

  const formatDate = (d: Date) => `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Guardia AI Activity Log', text: 'View my security activity on Guardia AI.' });
      } else {
        await navigator.clipboard.writeText('View my security activity on Guardia AI.');
        showToast('success', 'Link copied to clipboard!');
      }
    } catch { /* user cancelled */ }
  };

  const filteredActivities = activities.filter(a => activityFilter === 'All' || a.status === activityFilter);

  return (
    <div className="flex flex-col min-h-full bg-slate-950 text-white pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/80 backdrop-blur-xl px-4 pt-4 pb-4 border-b border-slate-800/30 space-y-4">
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')} 
              className="p-2.5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" 
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </motion.button>
            <div>
              <h2 className="text-xl font-black tracking-tight">Activity Log</h2>
              <p className="text-xs text-slate-400 mt-0.5">{filteredActivities.length} events</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDatePicker(true)} 
              className={`p-2.5 rounded-lg border backdrop-blur-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                dateRange.start 
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                  : 'bg-slate-900/60 border-slate-800/60 text-slate-400 hover:border-cyan-500/30'
              }`} 
              aria-label="Filter by date"
            >
              <Calendar className="w-4 h-4" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare} 
              className="p-2.5 rounded-lg bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" 
              aria-label="Share activity log"
            >
              <Share2 className="w-4 h-4 text-slate-400 hover:text-cyan-400 transition-colors" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActivities([]); setDateRange({ start: null, end: null }); }} 
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-bold hover:bg-red-500/15 hover:border-red-500/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-red-500" 
              aria-label="Clear activity log"
            >
              Clear
            </motion.button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {(['All', 'Blocked', 'Verified', 'Cancelled'] as const).map((cat) => (
            <motion.button 
              key={cat} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivityFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 whitespace-nowrap relative focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                activityFilter === cat 
                  ? 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' 
                  : 'bg-slate-900/60 border-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
              aria-pressed={activityFilter === cat}
            >
              <span className="relative z-10">{cat}</span>
              {activityFilter === cat && <motion.div layoutId="activityTab" className="absolute inset-0 bg-cyan-500/5 rounded-full" />}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 px-4 pt-4">
        {filteredActivities.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-[300px]"
          >
            <EmptyState icon="shield" title="No activity found" description={dateRange.start ? 'No events in this date range' : 'You're all clear.'} />
          </motion.div>
        ) : (
          <motion.div
            className="space-y-3 pb-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            role="list"
            aria-label="Activity list"
          >
            {filteredActivities.map((act, idx) => (
              <motion.div 
                key={act.id} 
                variants={itemVariants} 
                layout 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/receipt-dark')}
                className="group p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 cursor-pointer flex items-center justify-between hover:border-cyan-500/30 overflow-hidden relative"
                role="listitem"
              >
                {/* Status-based border */}
                <div className={`absolute inset-0 border-l-2 transition-colors duration-300 ${
                  act.status === 'Blocked' 
                    ? 'border-l-red-500' 
                    : act.status === 'Verified' 
                    ? 'border-l-emerald-500' 
                    : 'border-l-slate-600'
                }`} />
                
                <div className="flex items-center gap-3 text-left flex-1 min-w-0 relative z-10">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                      act.status === 'Blocked' 
                        ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                        : act.status === 'Verified' 
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300'
                    }`}
                  >
                    {act.status === 'Blocked' && <XCircle className="w-5 h-5" />}
                    {act.status === 'Verified' && <CheckCircle2 className="w-5 h-5" />}
                    {act.status === 'Cancelled' && <Trash2 className="w-5 h-5" />}
                  </motion.div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">{act.title}</p>
                    <p className="text-xs text-slate-400 mt-1 truncate">{act.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0 ml-3 relative z-10">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-mono block">{act.time}</span>
                    <motion.span 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`inline-block text-[10px] font-bold px-2 py-1 rounded-full mt-1 uppercase ${
                        act.status === 'Blocked' 
                          ? 'bg-red-500/15 text-red-300 border border-red-500/30' 
                          : act.status === 'Verified' 
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800/60 text-slate-300 border border-slate-700/40'
                      }`}
                    >
                      {act.status}
                    </motion.span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Date Picker Overlay */}
      <AnimatePresence>
        {showDatePicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowDatePicker(false)}>
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">Select Date Range</h3>
                <button onClick={() => setShowDatePicker(false)} className="p-1.5 rounded-lg hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Close date picker">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Calendar */}
              <div className="px-4 pt-3 pb-2 space-y-3">
                <div className="flex items-center justify-between">
                  <button onClick={() => { if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(cy => cy - 1); } else setCalendarMonth(m => m - 1); }} className="p-1.5 rounded-lg hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Previous month">
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>
                  <span className="text-xs font-bold text-white">{months[calendarMonth]} {calendarYear}</span>
                  <button onClick={() => { if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(cy => cy + 1); } else setCalendarMonth(m => m + 1); }} className="p-1.5 rounded-lg hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Next month">
                    <ChevronRightIcon className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <span key={d} className="text-[10px] font-bold text-slate-500 py-1">{d}</span>
                  ))}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const selected = isInRange(day);
                    const isToday = new Date().toDateString() === new Date(calendarYear, calendarMonth, day).toDateString();
                    return (
                      <button key={day} onClick={() => handleDateSelect(day)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition flex items-center justify-center focus-visible:ring-2 focus-visible:ring-sky-500 ${selected ? 'bg-sky-500 text-white' : isToday ? 'border border-sky-500/30 text-sky-400' : 'text-slate-300 hover:bg-slate-800'}`}
                        aria-label={`${day} ${months[calendarMonth]} ${calendarYear}`}>
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Range Display */}
                <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/50 rounded-xl px-3 py-2 border border-slate-800/60">
                  <span>{dateRange.start ? formatDate(dateRange.start) : 'Start date'}</span>
                  <span className="text-slate-600">→</span>
                  <span>{dateRange.end ? formatDate(dateRange.end) : 'End date'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 pb-4 pt-1 space-y-2">
                <button onClick={handleApplyFilter} disabled={!dateRange.start || !dateRange.end}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${dateRange.start && dateRange.end ? 'bg-sky-500 hover:bg-sky-400 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
                  Apply Filter
                </button>
                <button onClick={() => { setDateRange({ start: null, end: null }); setShowDatePicker(false); }} className="w-full py-2 text-xs text-slate-400 hover:text-white transition font-semibold focus-visible:ring-2 focus-visible:ring-sky-500 rounded-xl">
                  Reset & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
