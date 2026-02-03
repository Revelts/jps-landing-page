/**
 * WeeklySchedule Component
 * Interactive weekly event schedule display
 */
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Calendar, MapPin, Music, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface ScheduleEvent {
  id: number;
  date: string; // YYYY-MM-DD format
  venue: string;
  address: string;
  dj: string;
  genres: string[];
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_ID = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export function WeeklySchedule() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Monday
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week
  const [isChanging, setIsChanging] = useState(false); // Animation state
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current week dates
  const weekDates = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday
    const monday = new Date(today);
    
    // Adjust to Monday of current week
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + diff + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [weekOffset]);

  // Fetch events from API when week changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get start and end date of current week
        const startDate = weekDates[0].toISOString().split('T')[0];
        const endDate = weekDates[6].toISOString().split('T')[0];

        const response = await fetch(`/api/schedule?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.data || []);
        } else {
          setError(data.message || 'Failed to load schedule');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [weekOffset, weekDates]);

  // Get events for selected day
  const selectedDayEvents = useMemo(() => {
    const selectedDate = weekDates[selectedDay];
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Debug logging
    console.log('Selected date:', dateStr);
    console.log('All events:', events);
    console.log('Events for this date:', events.filter(event => event.date === dateStr));
    
    return events.filter(event => event.date === dateStr);
  }, [selectedDay, events, weekDates]);

  // Handle day change with animation
  const handleDayChange = (dayIndex: number) => {
    if (dayIndex !== selectedDay) {
      setIsChanging(true);
      setTimeout(() => {
        setSelectedDay(dayIndex);
        setIsChanging(false);
      }, 150);
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12 sm:py-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-accent/5 animate-gradient-shift bg-[length:200%_200%]" />
      </div>
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-3 sm:mb-4">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-xs sm:text-sm font-medium text-secondary">Weekly Schedule</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 gradient-text leading-tight">
            This Week's Lineup
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto px-4">
            Discover the hottest parties and top DJs across Jakarta's best venues
          </p>
        </div>

        {/* Week Navigation */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="relative flex items-center justify-between mb-4 sm:mb-6">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-secondary/10 active:bg-secondary/20 transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary group-hover:text-secondary transition-colors" />
            </button>
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs sm:text-sm text-text-tertiary mb-0.5 sm:mb-1 whitespace-nowrap">
                {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-text-primary whitespace-nowrap">
                {weekOffset === 0 ? 'This Week' : weekOffset === 1 ? 'Next Week' : weekOffset === -1 ? 'Last Week' : `Week ${weekOffset > 0 ? '+' : ''}${weekOffset}`}
              </h3>
            </div>
            
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-secondary/10 active:bg-secondary/20 transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-text-secondary group-hover:text-secondary transition-colors" />
            </button>
          </div>

          {/* Day Tabs */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {DAYS.map((day, index) => {
              const date = weekDates[index];
              const isSelected = selectedDay === index;
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={day}
                  onClick={() => handleDayChange(index)}
                  className={cn(
                    'relative p-2 sm:p-3 lg:p-4 rounded-lg sm:rounded-xl transition-all duration-300',
                    'border-2 min-h-[60px] sm:min-h-[70px]',
                    'active:scale-95',
                    isSelected
                      ? 'bg-secondary/20 border-secondary shadow-glow-sm scale-105'
                      : 'bg-surface/30 border-transparent hover:border-secondary/30 hover:bg-surface/50'
                  )}
                  aria-label={`${DAYS_ID[index]}, ${date.getDate()}`}
                  aria-pressed={isSelected}
                >
                  {isToday && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent rounded-full animate-pulse ring-2 ring-bg-secondary" />
                  )}
                  
                  <div className="text-center flex flex-col items-center justify-center h-full">
                    <p className={cn(
                      'text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1 transition-colors uppercase tracking-wide',
                      isSelected ? 'text-secondary' : 'text-text-tertiary'
                    )}>
                      {DAYS_ID[index].slice(0, 3)}
                    </p>
                    <p className={cn(
                      'text-base sm:text-lg lg:text-xl font-bold transition-colors leading-none',
                      isSelected ? 'text-text-primary' : 'text-text-secondary'
                    )}>
                      {date.getDate()}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Selected Day Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 px-1">
          <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-secondary to-accent rounded-full flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
              {DAYS_ID[selectedDay]}
            </h2>
            <p className="text-xs sm:text-sm text-text-tertiary mt-0.5">
              {formatDate(weekDates[selectedDay])} • {selectedDayEvents.length} Event{selectedDayEvents.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16">
            <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mb-4" />
            <p className="text-text-secondary text-sm sm:text-base">Loading events...</p>
          </div>
        ) : error ? (
          /* Error State */
          <Card className="p-6 sm:p-8 text-center border-2 border-red-500/20 bg-red-500/5">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-400 mb-2">Oops! Something went wrong</h3>
            <p className="text-text-secondary text-sm">{error}</p>
          </Card>
        ) : selectedDayEvents.length > 0 ? (
          /* Events List */
          <div 
            className={cn(
              'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-200',
              isChanging ? 'opacity-0' : 'opacity-100'
            )}
          >
            {selectedDayEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-glow-lg transition-all duration-500 overflow-hidden border-2 border-secondary/20 hover:border-secondary/40 active:scale-[0.98]"
                hoverable
                padding="none"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4">
                    {/* Header: Venue + Genres */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* Music Icon */}
                        <div className="p-2 sm:p-2.5 rounded-lg bg-secondary/10 flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                        </div>
                        
                        {/* Venue Name */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-secondary transition-colors leading-tight">
                            {event.venue}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Genre Badges */}
                      <div className="flex flex-wrap gap-1.5 justify-end max-w-[140px]">
                        {event.genres.slice(0, 2).map((genre, idx) => (
                          <span 
                            key={idx}
                            className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-accent/20 text-accent whitespace-nowrap flex-shrink-0 uppercase tracking-wide"
                          >
                            {genre}
                          </span>
                        ))}
                        {event.genres.length > 2 && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-accent/10 text-accent/70 whitespace-nowrap flex-shrink-0">
                            +{event.genres.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-text-tertiary flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-text-secondary line-clamp-2 leading-relaxed">
                        {event.address}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-secondary/10" />

                    {/* DJ Info */}
                    <div className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/10">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/10 to-accent/10 flex-shrink-0">
                          <Music className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs text-text-tertiary uppercase tracking-wider font-medium">
                            Main Artist / DJ
                          </p>
                          <p className="text-sm sm:text-base font-bold text-text-primary mt-0.5 truncate">
                            {event.dj}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <button 
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-gradient-to-r from-secondary to-accent text-bg-primary font-bold text-sm sm:text-base hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5 active:scale-95 min-h-[48px] flex items-center justify-center gap-2"
                    aria-label={`Get tickets for ${event.venue}`}
                  >
                    <span>Get Tickets</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 sm:py-16">
            <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-text-tertiary mx-auto mb-3 sm:mb-4 opacity-50" />
            <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 px-4">
              No Events Scheduled
            </h3>
            <p className="text-sm sm:text-base text-text-secondary px-4">
              Check back later for updates on {DAYS_ID[selectedDay]}'s lineup
            </p>
          </Card>
        )}

        {/* Quick Stats - Only show if not loading */}
        {!loading && !error && (
          <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Card className="text-center p-4 sm:p-5 hover:border-secondary/30 transition-colors">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1 sm:mb-2">
                {events.length}
              </p>
              <p className="text-xs sm:text-sm text-text-tertiary font-medium uppercase tracking-wide">
                Total Events
              </p>
            </Card>
            <Card className="text-center p-4 sm:p-5 hover:border-secondary/30 transition-colors">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1 sm:mb-2">
                {new Set(events.map(e => e.venue)).size}
              </p>
              <p className="text-xs sm:text-sm text-text-tertiary font-medium uppercase tracking-wide">
                Venues
              </p>
            </Card>
            <Card className="text-center p-4 sm:p-5 hover:border-secondary/30 transition-colors">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1 sm:mb-2">
                {new Set(events.map(e => e.dj)).size}
              </p>
              <p className="text-xs sm:text-sm text-text-tertiary font-medium uppercase tracking-wide">
                Artists
              </p>
            </Card>
            <Card className="text-center p-4 sm:p-5 hover:border-secondary/30 transition-colors">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-black gradient-text mb-1 sm:mb-2">
                {selectedDayEvents.length}
              </p>
              <p className="text-xs sm:text-sm text-text-tertiary font-medium uppercase tracking-wide">
                Today
              </p>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
}
