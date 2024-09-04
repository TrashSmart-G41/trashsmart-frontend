import React, { useEffect } from 'react'

interface MapMarkerProps {
  map?: google.maps.Map | null
  latitude: number
  longitude: number
}

const MapMarker: React.FC<MapMarkerProps> = ({ map, latitude, longitude }) => {
  useEffect(() => {
    if (!map) return

    const marker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      icon: {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 4.25 7 11 7 11s7-6.75 7-11c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
        fillColor: 'currentColor',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#FFFFFF',
        scale: 1.5,
        anchor: new google.maps.Point(18, 24),
      },
    })

    return () => {
      marker.setMap(null) // Cleanup marker on unmount
    }
  }, [map, latitude, longitude])

  return null
}

export default MapMarker
