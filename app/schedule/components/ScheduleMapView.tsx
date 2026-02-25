/**
 * Schedule Map View Component
 * Interactive map-based event discovery with split view
 */
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMaps } from '@/components/maps/GoogleMapsProvider';
import { 
  Calendar, MapPin, Music, Clock,
  ChevronLeft, ChevronRight, MapPinned 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface ScheduleEvent {
  id: number;
  date: string;
  venue: string;
  venue_id?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  dj: string;
  genres: string[];
  time?: string;
  price?: string;
}

const DAYS_ID = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -6.2293867, // Jakarta SCBD
  lng: 106.8174194,
};

export function ScheduleMapView() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(true); // Toggle for mobile
  const eventRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const { isLoaded, loadError, hasApiKey } = useGoogleMaps();

  // Get current week dates
  const weekDates = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
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

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const startDate = weekDates[0].toISOString().split('T')[0];
        const endDate = weekDates[6].toISOString().split('T')[0];

        const response = await fetch(`/api/schedule?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
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
    return events.filter(event => event.date === dateStr);
  }, [selectedDay, events, weekDates]);

  // Get events with valid coordinates
  const eventsWithCoords = useMemo(() => {
    return selectedDayEvents.filter(
      event => event.latitude && event.longitude && !isNaN(event.latitude) && !isNaN(event.longitude)
    );
  }, [selectedDayEvents]);

  // Calculate map center
  const mapCenter = useMemo(() => {
    if (eventsWithCoords.length === 0) return defaultCenter;
    
    const avgLat = eventsWithCoords.reduce((sum, e) => sum + (e.latitude || 0), 0) / eventsWithCoords.length;
    const avgLng = eventsWithCoords.reduce((sum, e) => sum + (e.longitude || 0), 0) / eventsWithCoords.length;
    
    return { lat: avgLat, lng: avgLng };
  }, [eventsWithCoords]);

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  // Handle event click - scroll to event and highlight
  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId);
    setShowMap(true); // Show map on mobile when event clicked
    
    // Scroll to event in list
    const element = eventRefs.current[eventId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle marker click - highlight event in list
  const handleMarkerClick = (eventId: number) => {
    setSelectedEvent(eventId);
    setShowMap(false); // Switch to list on mobile
    
    // Scroll to event
    const element = eventRefs.current[eventId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Create custom marker icon with music note
  const createMarkerIcon = (event: ScheduleEvent, isHovered: boolean, isSelected: boolean) => {
    const fillColor = isSelected ? '#E94560' : isHovered ? '#FF6B8A' : '#E94560';
    const scale = isHovered || isSelected ? 1.15 : 1;
    const opacity = isHovered || isSelected ? 1 : 0.9;
    
    return {
      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad${event.id}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${fillColor};stop-opacity:${opacity}" />
              <stop offset="100%" style="stop-color:#C41E3A;stop-opacity:${opacity}" />
            </linearGradient>
            <filter id="shadow${event.id}" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="0" dy="3" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Drop shadow -->
          <ellipse cx="18" cy="44" rx="8" ry="2" fill="black" opacity="0.3"/>
          
          <!-- Main pin shape -->
          <g filter="url(#shadow${event.id})">
            <path d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 30 18 30s18-16.5 18-30C36 8.059 27.941 0 18 0z" 
                  fill="url(#grad${event.id})" stroke="white" stroke-width="1.5"/>
            
            <!-- Inner circle background -->
            <circle cx="18" cy="18" r="9" fill="white" opacity="0.95"/>
            
            <!-- Music note icon -->
            <g transform="translate(18, 18)">
              <path d="M3 -6 L3 2 C3 3.105 2.105 4 1 4 C-0.105 4 -1 3.105 -1 2 C-1 0.895 -0.105 0 1 0 L3 0 L3 -2 L5 -3 L5 1 C5 2.105 4.105 3 3 3 C1.895 3 1 2.105 1 1 C1 -0.105 1.895 -1 3 -1 L5 -1 L5 -6 L3 -6 Z" 
                    fill="${fillColor}" stroke="${fillColor}" stroke-width="0.5" stroke-linejoin="round"/>
            </g>
          </g>
        </svg>
      `),
      scale,
      anchor: { x: 18, y: 48 } as google.maps.Point,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary py-8 lg:py-12">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <MapPinned className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Map-Based Discovery</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 gradient-text">
            Explore Events on Map
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover parties near you with our interactive map view
          </p>
        </div>

        {/* Week Navigation */}
        <div className="bg-surface/95 backdrop-blur-xl rounded-2xl border-2 border-secondary/20 p-4 lg:p-6 mb-6">
          {/* Week Selector */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="p-2 rounded-lg hover:bg-secondary/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-text-secondary" />
            </button>
            
            <div className="text-center">
              <p className="text-sm text-text-tertiary">
                {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
              </p>
              <h3 className="text-lg font-semibold text-text-primary">
                {weekOffset === 0 ? 'This Week' : weekOffset === 1 ? 'Next Week' : `Week ${weekOffset > 0 ? '+' : ''}${weekOffset}`}
              </h3>
            </div>
            
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-2 rounded-lg hover:bg-secondary/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-text-secondary" />
            </button>
          </div>

          {/* Day Tabs */}
          <div className="grid grid-cols-7 gap-2">
            {DAYS_ID.map((day, index) => {
              const date = weekDates[index];
              const isSelected = selectedDay === index;
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={cn(
                    'relative p-3 rounded-xl transition-all duration-300 border-2',
                    isSelected
                      ? 'bg-secondary/20 border-secondary shadow-glow-sm scale-105'
                      : 'bg-surface/30 border-transparent hover:border-secondary/30'
                  )}
                >
                  {isToday && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                  )}
                  <p className={cn(
                    'text-xs font-semibold mb-1 uppercase',
                    isSelected ? 'text-secondary' : 'text-text-tertiary'
                  )}>
                    {day.slice(0, 3)}
                  </p>
                  <p className={cn(
                    'text-xl font-bold',
                    isSelected ? 'text-text-primary' : 'text-text-secondary'
                  )}>
                    {date.getDate()}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden flex gap-2 mb-4">
          <button
            onClick={() => setShowMap(false)}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl font-semibold transition-all',
              !showMap
                ? 'bg-secondary text-bg-primary'
                : 'bg-surface/50 text-text-secondary border border-secondary/20'
            )}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Events ({selectedDayEvents.length})
          </button>
          <button
            onClick={() => setShowMap(true)}
            className={cn(
              'flex-1 py-3 px-4 rounded-xl font-semibold transition-all',
              showMap
                ? 'bg-secondary text-bg-primary'
                : 'bg-surface/50 text-text-secondary border border-secondary/20'
            )}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Map ({eventsWithCoords.length})
          </button>
        </div>

        {/* Split View: Events List + Map */}
        <div className="grid lg:grid-cols-[450px_1fr] gap-6 h-[calc(100vh-400px)] min-h-[600px]">
          {/* Left: Compact Events List */}
          <div className={cn(
            'bg-surface/95 backdrop-blur-xl rounded-2xl border-2 border-secondary/20 overflow-hidden',
            showMap && 'hidden lg:block'
          )}>
            <div className="h-full overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading events...</p>
                  </div>
                </div>
              ) : selectedDayEvents.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <Calendar className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      No Events Scheduled
                    </h3>
                    <p className="text-text-secondary">
                      Check back later for updates on {DAYS_ID[selectedDay]}'s lineup
                    </p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-secondary/10">
                  {selectedDayEvents.map((event) => (
                    <div
                      key={event.id}
                      ref={el => { eventRefs.current[event.id] = el; }}
                      onMouseEnter={() => setHoveredEvent(event.id)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      onClick={() => handleEventClick(event.id)}
                      className={cn(
                        'p-4 transition-all duration-200 cursor-pointer',
                        selectedEvent === event.id
                          ? 'bg-secondary/20 border-l-4 border-l-secondary'
                          : hoveredEvent === event.id
                          ? 'bg-surface/50'
                          : 'hover:bg-surface/30'
                      )}
                    >
                      {/* Compact Event Item */}
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={cn(
                          'p-2 rounded-lg flex-shrink-0 transition-colors',
                          selectedEvent === event.id ? 'bg-secondary/20' : 'bg-secondary/10'
                        )}>
                          <Music className="w-4 h-4 text-secondary" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Venue + Genres */}
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-sm font-bold text-text-primary truncate">
                              {event.venue}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/20 text-accent uppercase flex-shrink-0">
                              {event.genres[0]}
                            </span>
                          </div>
                          
                          {/* DJ */}
                          <p className="text-xs text-text-secondary mb-1 truncate">
                            {event.dj}
                          </p>
                          
                          {/* Region + Time */}
                          <div className="flex items-center gap-3 text-xs text-text-tertiary">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{event.address.split(',')[0]}</span>
                            </div>
                            {event.time && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{event.time}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Google Maps */}
          <div className={cn(
            'bg-surface/95 backdrop-blur-xl rounded-2xl border-2 border-secondary/20 overflow-hidden',
            !showMap && 'hidden lg:block'
          )}>
            {!hasApiKey ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Map Not Available
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Google Maps API key not configured
                  </p>
                </div>
              </div>
            ) : loadError ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-red-400 mb-2">
                    Failed to Load Map
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Please check your internet connection
                  </p>
                </div>
              </div>
            ) : !isLoaded ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-text-secondary">Loading map...</p>
                </div>
              </div>
            ) : eventsWithCoords.length === 0 ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center">
                  <MapPinned className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    No Events with Location Data
                  </h3>
                  <p className="text-text-secondary text-sm">
                    Selected day has no events with valid coordinates
                  </p>
                </div>
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={13}
                options={{
                  styles: [
                    { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                    { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                    { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
                    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
                    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#283d6a' }] },
                  ],
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >
                {eventsWithCoords.map((event) => (
                  <Marker
                    key={event.id}
                    position={{ lat: event.latitude!, lng: event.longitude! }}
                    title={event.venue}
                    onClick={() => handleMarkerClick(event.id)}
                    onMouseOver={() => setHoveredEvent(event.id)}
                    onMouseOut={() => setHoveredEvent(null)}
                    icon={createMarkerIcon(
                      event,
                      hoveredEvent === event.id,
                      selectedEvent === event.id
                    )}
                  >
                    {selectedEvent === event.id && (
                      <InfoWindow
                        position={{ lat: event.latitude!, lng: event.longitude! }}
                        onCloseClick={() => setSelectedEvent(null)}
                      >
                        <div className="p-3 min-w-[240px] max-w-[280px]">
                          {/* Venue Name */}
                          <h3 className="font-bold text-gray-900 text-base mb-2 pr-4">
                            {event.venue}
                          </h3>
                          
                          {/* DJ/Artist */}
                          <div className="flex items-center gap-2 mb-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                            </svg>
                            <span className="text-sm font-medium">{event.dj}</span>
                          </div>
                          
                          {/* Time */}
                          {event.time && (
                            <div className="flex items-center gap-2 mb-3 text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm">{event.time}</span>
                            </div>
                          )}
                          
                          {/* Genres */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {event.genres.slice(0, 3).map((genre, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200"
                              >
                                {genre}
                              </span>
                            ))}
                            {event.genres.length > 3 && (
                              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                +{event.genres.length - 3}
                              </span>
                            )}
                          </div>
                          
                          {/* Divider */}
                          <div className="border-t border-gray-200 my-2"></div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                window.open(`https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`, '_blank');
                              }}
                              className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                              </svg>
                              Directions
                            </button>
                            <button
                              onClick={() => handleMarkerClick(event.id)}
                              className="flex-1 py-2 px-3 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                            >
                              View in List
                            </button>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
            )}
          </div>
        </div>

        {/* Stats */}
        {!loading && selectedDayEvents.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-surface/95 backdrop-blur-xl rounded-xl border-2 border-secondary/20 p-4 text-center">
              <p className="text-3xl font-black gradient-text">{selectedDayEvents.length}</p>
              <p className="text-sm text-text-tertiary uppercase tracking-wide">Events</p>
            </div>
            <div className="bg-surface/95 backdrop-blur-xl rounded-xl border-2 border-secondary/20 p-4 text-center">
              <p className="text-3xl font-black gradient-text">{new Set(selectedDayEvents.map(e => e.venue)).size}</p>
              <p className="text-sm text-text-tertiary uppercase tracking-wide">Venues</p>
            </div>
            <div className="bg-surface/95 backdrop-blur-xl rounded-xl border-2 border-secondary/20 p-4 text-center">
              <p className="text-3xl font-black gradient-text">{new Set(selectedDayEvents.map(e => e.dj)).size}</p>
              <p className="text-sm text-text-tertiary uppercase tracking-wide">Artists</p>
            </div>
            <div className="bg-surface/95 backdrop-blur-xl rounded-xl border-2 border-secondary/20 p-4 text-center">
              <p className="text-3xl font-black gradient-text">{eventsWithCoords.length}</p>
              <p className="text-sm text-text-tertiary uppercase tracking-wide">On Map</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(233, 69, 96, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(233, 69, 96, 0.7);
        }
      `}</style>
    </div>
  );
}
