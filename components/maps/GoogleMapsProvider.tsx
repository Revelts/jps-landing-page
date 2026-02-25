'use client';

import { useLoadScript } from '@react-google-maps/api';
import { createContext, useContext, ReactNode } from 'react';

interface GoogleMapsContextValue {
  isLoaded: boolean;
  loadError: Error | undefined;
  hasApiKey: boolean;
}

const GoogleMapsContext = createContext<GoogleMapsContextValue | undefined>(undefined);

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

export function GoogleMapsProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const hasApiKey = Boolean(apiKey);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError, hasApiKey }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

export function useGoogleMaps() {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
}
