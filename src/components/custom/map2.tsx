import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, ViewState } from 'react-map-gl';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface Map2Props {
  width?: string;
  height?: string;
  className?: string;
}

const Map2: React.FC<Map2Props> = ({ width = '100%', height = '50vh', className = '' }) => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const [mapStyle, setMapStyle] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const updateMapStyle = () => {
    const storageKey = 'theme';
    const theme = localStorage.getItem(storageKey) || 'light';

    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark') || theme === 'dark';

    const style = isDark
      ? 'mapbox://styles/mapbox/dark-v10'
      : 'mapbox://styles/mapbox/light-v11';

    setMapStyle(style);
  };

  useEffect(() => {
    // Initial setup
    updateMapStyle();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      updateMapStyle();
    };

    window.addEventListener('storage', handleStorageChange);

    // Observe changes in the root element's class list
    const observer = new MutationObserver(() => {
      updateMapStyle();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Cleanup event listeners and observers
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setViewport((prev) => ({
          ...prev,
          latitude,
          longitude,
          zoom: 15, // Zoom closer to the user's location
        }));
        setUserLocation({ latitude, longitude }); // Save user location
      },
      (err) => {
        console.error('Error getting location:', err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!MAPBOX_TOKEN) {
    throw new Error('Mapbox access token is not defined');
  }

  return (
    <div className={className} style={{ width, height }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        // viewState={viewport} // Sync view state with viewport
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width, height }}
        mapStyle={mapStyle}
      >
        {/* Display marker for user's current location */}
        {userLocation && (
          <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='35'
              height='35'
              viewBox='0 0 100 100'
            >
              <circle cx="50" cy="50" r="10" fill="red" />
            </svg>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default Map2;
