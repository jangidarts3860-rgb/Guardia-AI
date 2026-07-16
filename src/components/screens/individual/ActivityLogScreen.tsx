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
    if (selected > new Date()) return;
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
    <div className="flex flex-col min-h-full bg-transparent text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/home')} className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-bold">Activity Log</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowDatePicker(true)} className={`p-2 rounded-xl border transition ${dateRange.start ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' : 'bg-slate-900 border-slate-800 text-slate-400'} hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500`} aria-label="Filter by date">
              <Calendar className="w-4 h-4" />
            </button>
            <button onClick={() => { setActivities([]); setDateRange({ start: null, end: null }); }} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-bold hover:text-white transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Clear activity log">
              Clear
            </button>
            <button onClick={handleShare} className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition focus-visible:ring-2 focus-visible:ring-sky-500" aria-label="Share activity log">
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="relative">
          <div className="flex space-x-2 overflow-x-auto scrollbar-none pb-1">
            {(['All', 'Blocked', 'Verified', 'Cancelled'] as const).map((cat) => (
              <button key={cat} onClick={() => setActivityFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition relative whitespace-nowrap ${activityFilter === cat ? 'border-sky-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'} focus-visible:ring-2 focus-visible:ring-sky-500`}
                aria-pressed={activityFilter === cat}
              >
                <span className="relative z-10">{cat}</span>
                {activityFilter === cat && <motion.div layoutId="activityTab" className="absolute inset-0 bg-sky-500 rounded-full shadow-md shadow-sky-500/10" />}
              </button>
            ))}
          </div>
          {/* Scroll Hint Overlay */}
          <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Activity List */}
      <motion.div
        className="flex-1 overflow-y-auto px-4 pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        role="list"
        aria-label="Activity list"
      >
        {filteredActivities.length === 0 ? (
          <motion.div variants={itemVariants}>
            <EmptyState icon="shield" title="No security events yet" description="Scan a QR code or link a bank account to log security activities." />
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredActivities.map((act) => (
              <motion.div key={act.id} variants={itemVariants} layout whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/receipt-dark')}
                className="p-3.5 bg-slate-900 border border-slate-800/80 rounded-2xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition"
                role="listitem"
              >
                <div className="flex items-center space-x-3 text-left flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : act.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'}`}>
                    {act.status === 'Blocked' && <XCircle className="w-4 h-4" />}
                    {act.status === 'Verified' && <CheckCircle2 className="w-4 h-4" />}
                    {act.status === 'Cancelled' && <Trash2 className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">{act.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{act.description}</p>
                  </div>
                </div>
                <div className="flex items-center shrink-0 ml-2">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono block">{act.time}</span>
                    <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded mt-1 uppercase ${act.status === 'Blocked' ? 'bg-red-500/10 text-red-400' : act.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {act.status}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 ml-1.5" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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
                    <span key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</span>
                  ))}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const selectedDate = new Date(calendarYear, calendarMonth, day);
                    const isFuture = selectedDate > new Date();
                    const selected = isInRange(day);
                    const isToday = new Date().toDateString() === selectedDate.toDateString();
                    return (
                      <button key={day} onClick={() => !isFuture && handleDateSelect(day)}
                        className={`w-8 h-8 rounded-full text-xs font-bold transition flex items-center justify-center focus-visible:ring-2 focus-visible:ring-sky-500 ${isFuture ? 'text-slate-700 cursor-not-allowed opacity-50' : selected ? 'bg-sky-500 text-white' : isToday ? 'border border-sky-500/30 text-sky-400' : 'text-slate-300 hover:bg-slate-800'}`}
                        aria-label={`${day} ${months[calendarMonth]} ${calendarYear}`}
                        disabled={isFuture}>
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Range Display */}
                <div className="flex items-center justify-between text-xs text-slate-400 bg-transparent/50 rounded-xl px-3 py-2 border border-slate-800/60">
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
