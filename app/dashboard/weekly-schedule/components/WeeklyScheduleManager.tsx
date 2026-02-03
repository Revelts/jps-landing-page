'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Plus, Trash2, Calendar, Music, MapPin, Save, X } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface EventForm {
  id: string; // Temporary ID for form management
  event_date: string;
  venue_name: string;
  artist_dj: string;
  venue_address: string;
  genres: string[];
  genreInput: string; // For input field
}

interface WeeklyScheduleManagerProps {
  user: User;
}

export default function WeeklyScheduleManager({ user }: WeeklyScheduleManagerProps) {
  const [events, setEvents] = useState<EventForm[]>([
    {
      id: crypto.randomUUID(),
      event_date: new Date().toISOString().split('T')[0], // Today's date
      venue_name: '',
      artist_dj: '',
      venue_address: '',
      genres: [],
      genreInput: '',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  const addEvent = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        id: crypto.randomUUID(),
        event_date: today,
        venue_name: '',
        artist_dj: '',
        venue_address: '',
        genres: [],
        genreInput: '',
      },
    ]);
  };

  const removeEvent = (id: string) => {
    setEvents((prevEvents) => {
      if (prevEvents.length === 1) {
        setMessage({ type: 'error', text: 'You must have at least one event' });
        setTimeout(() => setMessage(null), 3000);
        return prevEvents;
      }
      return prevEvents.filter((event) => event.id !== id);
    });
  };

  const updateEvent = (id: string, field: keyof EventForm, value: any) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, [field]: value } : event
      )
    );
  };

  const addGenre = (id: string) => {
    setEvents((prevEvents) => {
      const event = prevEvents.find((e) => e.id === id);
      if (!event || !event.genreInput.trim()) return prevEvents;

      const newGenre = event.genreInput.trim();
      if (event.genres.includes(newGenre)) {
        setMessage({ type: 'error', text: 'Genre already added' });
        setTimeout(() => setMessage(null), 3000);
        return prevEvents;
      }

      // Update the specific event with new genre and clear input
      return prevEvents.map((e) =>
        e.id === id
          ? { ...e, genres: [...e.genres, newGenre], genreInput: '' }
          : e
      );
    });
  };

  const removeGenre = (eventId: string, genre: string) => {
    setEvents((prevEvents) => {
      return prevEvents.map((e) =>
        e.id === eventId
          ? { ...e, genres: e.genres.filter((g) => g !== genre) }
          : e
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate all events
    for (const event of events) {
      if (!event.event_date || !event.venue_name || !event.artist_dj || !event.venue_address) {
        setMessage({
          type: 'error',
          text: 'Please fill in all required fields for each event',
        });
        setTimeout(() => setMessage(null), 5000);
        return;
      }

      if (event.genres.length === 0) {
        setMessage({
          type: 'error',
          text: 'Please add at least one genre for each event',
        });
        setTimeout(() => setMessage(null), 5000);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API (remove temporary fields)
      const eventsData = events.map(({ id: _id, genreInput: _genreInput, ...event }) => event);

      const response = await fetch('/api/admin/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: eventsData }),
      });

      const data = await response.json();

      if (data.success) {
        const eventCount = events.length;
        
        setMessage({
          type: 'success',
          text: `Successfully added ${eventCount} event(s) to the schedule!`,
        });
        
        // Reset form to single empty event
        setEvents([
          {
            id: crypto.randomUUID(),
            event_date: today,
            venue_name: '',
            artist_dj: '',
            venue_address: '',
            genres: [],
            genreInput: '',
          },
        ]);

        // Clear message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save events' });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="xl" className="py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center justify-between mb-4">
          <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl">
            Weekly Schedule Manager
          </Heading>
        </div>
        <Text className="text-text-secondary max-w-2xl">
          Add venue events to the weekly schedule. You can add multiple events for the same day,
          but each event must be for a different venue.
        </Text>
        <div className="mt-4 flex items-center gap-2 text-sm text-text-tertiary">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Logged in as: <strong>{user.name}</strong> ({user.role})</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <Card
          className={`mb-6 p-4 border-2 ${
            message.type === 'success'
              ? 'border-green-500/50 bg-green-500/10'
              : 'border-red-500/50 bg-red-500/10'
          }`}
        >
          <p
            className={`text-center font-semibold ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        </Card>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Events List */}
        {events.map((event, index) => (
          <Card key={event.id} padding="lg" className="relative">
            {/* Remove Button */}
            {events.length > 1 && (
              <button
                type="button"
                onClick={() => removeEvent(event.id)}
                className="absolute top-4 right-4 p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                title="Remove event"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            {/* Event Header */}
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Event {index + 1}
              </h3>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Date */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={event.event_date}
                  onChange={(e) => updateEvent(event.id, 'event_date', e.target.value)}
                  min={today}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Venue Name */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Venue Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={event.venue_name}
                  onChange={(e) => updateEvent(event.id, 'venue_name', e.target.value)}
                  placeholder="e.g., Noya Bar"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Artist/DJ */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Artist / DJ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={event.artist_dj}
                  onChange={(e) => updateEvent(event.id, 'artist_dj', e.target.value)}
                  placeholder="e.g., DJ Alpha"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Venue Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={event.venue_address}
                  onChange={(e) => updateEvent(event.id, 'venue_address', e.target.value)}
                  placeholder="e.g., Jl. Kemang Raya No. 123, Jakarta"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                />
              </div>

              {/* Genres */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Music Genres <span className="text-red-500">*</span>
                </label>
                
                {/* Genre Input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={event.genreInput}
                    onChange={(e) => updateEvent(event.id, 'genreInput', e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addGenre(event.id);
                      }
                    }}
                    placeholder="e.g., House, Techno, Hip Hop"
                    className="flex-1 px-4 py-3 rounded-lg bg-surface/50 border border-secondary/20 text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  />
                  <Button
                    type="button"
                    onClick={() => addGenre(event.id)}
                    variant="secondary"
                    className="min-w-[100px]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Genre Tags */}
                {event.genres.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {event.genres.map((genre) => (
                      <span
                        key={genre}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 text-sm font-medium text-secondary"
                      >
                        <Music className="w-3.5 h-3.5" />
                        {genre}
                        <button
                          type="button"
                          onClick={() => removeGenre(event.id, genre)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-tertiary italic">
                    No genres added yet. Please add at least one genre.
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}

        {/* Add Another Event Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            onClick={addEvent}
            variant="outline"
            className="min-w-[200px]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Event
          </Button>
        </div>

        {/* Submit Button */}
        <Card padding="lg" className="bg-surface/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-text-primary">
                Ready to publish {events.length} event(s)?
              </p>
              <p className="text-sm text-text-tertiary">
                Events will appear on the public weekly schedule page
              </p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[180px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Events
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>

      {/* Info Card */}
      <Card padding="lg" className="mt-8 bg-secondary/5 border border-secondary/20">
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-text-primary mb-1">Tips for Adding Events</h4>
            <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
              <li>You can add multiple events for the same date</li>
              <li>Each event must be for a different venue</li>
              <li>Add at least one genre for each event</li>
              <li>Press Enter or click "Add" to add a genre tag</li>
              <li>All fields are required</li>
            </ul>
          </div>
        </div>
      </Card>
    </Container>
  );
}
