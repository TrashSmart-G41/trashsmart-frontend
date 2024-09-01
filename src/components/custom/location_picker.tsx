import React, { useState, useEffect, useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, GeolocateControl, ViewState } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface LocationPickerProps {
  width?: string;
  height?: string;
  className?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ width = '100%', height = '50vh', className = '' }) => {
  const [viewport, setViewport] = useState<ViewState>({
    latitude: 6.9271, // Colombo's latitude
    longitude: 79.8612, // Colombo's longitude
    zoom: 14,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mapStyle, setMapStyle] = useState<string>('');

  const initializeGeocoder = useCallback(() => {
    if (!MAPBOX_TOKEN) {
      throw new Error('Mapbox access token is not defined');
    }

    const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        marker: false,
        mapboxgl: (window as any).mapboxgl,
        countries: 'LK', // 'LK' is the ISO 3166-1 alpha-2 country code for Sri Lanka
        bbox: [79.7836, 6.6533, 80.1441, 7.2163], // Bounding box for western province 
      });

    geocoder.on('result', (e: any) => {
      const { center } = e.result;
      const newLocation = { longitude: center[0], latitude: center[1] };
      setSelectedLocation(newLocation);
      setViewport((prev) => ({
        ...prev,
        longitude: center[0],
        latitude: center[1],
        zoom: 14,
      }));
    });

    const geocoderContainer = document.getElementById('geocoder-container');
    if (geocoderContainer) {
      geocoderContainer.innerHTML = '';
      geocoderContainer.appendChild(geocoder.onAdd((window as any).mapboxgl));
    }

    return geocoder;
  }, []);

  const handleMapClick = (event: any) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ longitude: lng, latitude: lat });
    setViewport((prev) => ({
      ...prev,
      longitude: lng,
      latitude: lat,
    }));
  };

  const handleDragEnd = (event: any) => {
    const { lngLat } = event;
    setSelectedLocation({ longitude: lngLat.lng, latitude: lngLat.lat });
    setViewport((prev) => ({
      ...prev,
      longitude: lngLat.lng,
      latitude: lngLat.lat,
    }));
  };

  const updateMapStyle = () => {
    const theme = localStorage.getItem('theme') || 'light';
    const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';

    setMapStyle(isDark ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v11');
  };

  useEffect(() => {
    initializeGeocoder();
    updateMapStyle();

    const handleStorageChange = () => updateMapStyle();
    window.addEventListener('storage', handleStorageChange);

    const observer = new MutationObserver(updateMapStyle);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setViewport((prev) => ({
          ...prev,
          latitude,
          longitude,
          zoom: 14,
        }));
        setSelectedLocation({ latitude, longitude });
      },
      (err) => console.error('Error getting location:', err),
      { enableHighAccuracy: true }
    );

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, [initializeGeocoder]);

  const logLocation = () => {
    if (selectedLocation) {
      console.log('Selected Location:', selectedLocation);
    } else {
      console.log('No location selected.');
    }
  };

  return (
    <div className={`${className} relative`} style={{ width, height }}>
      <div id="geocoder-container" className="absolute z-10 top-4 right-4 shadow-lg rounded"/>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        style={{ width, height }}
        mapStyle={mapStyle}
        onClick={handleMapClick}
      >
        <GeolocateControl position="top-left" />
        {selectedLocation && (
          <Marker
            longitude={selectedLocation.longitude}
            latitude={selectedLocation.latitude}
            draggable
            onDragEnd={handleDragEnd}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="10" fill="#ff385c" stroke="#fff" strokeWidth="5" />
            </svg>
          </Marker>
        )}
      </Map>
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded shadow-lg transition-all">
          <p className="text-sm font-medium">Selected Location:</p>
          <p className="text-xs">Latitude: {selectedLocation.latitude.toFixed(4)}</p>
          <p className="text-xs">Longitude: {selectedLocation.longitude.toFixed(4)}</p>
        </div>
      )}
      <button
        onClick={logLocation}
        className="absolute bottom-4 right-4 z-10 bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600"
      >
        Log Location
      </button>
    </div>
  );
};

export default LocationPicker;
