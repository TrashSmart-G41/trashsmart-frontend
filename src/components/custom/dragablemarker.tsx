import React, { useEffect, useRef, useState } from 'react'

// Default coordinates if geolocation is unavailable
const defaultLat = 6.9271
const defaultLng = 79.8612

declare global {
  interface Window {
    google: any
  }
}

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(error)
    document.head.appendChild(script)
  })
}

const DragableMarker: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const apiKey = import.meta.env.VITE_GOOGLEMAP_ACCESS_TOKEN || ''

  useEffect(() => {
    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (mapRef.current && !map) {
          const initialPosition = { lat: defaultLat, lng: defaultLng }

          // Initialize the map
          const newMap = new google.maps.Map(mapRef.current, {
            center: initialPosition,
            zoom: 12,
          })

          // Create the draggable marker
          const newMarker = new google.maps.Marker({
            position: initialPosition,
            map: newMap,
            draggable: true,
          })

          // Event listener for marker drag
          newMarker.addListener('dragend', () => {
            const position = newMarker.getPosition()
            if (position) {
              console.log(
                `Marker moved to: ${position.lat()}, ${position.lng()}`
              )
            }
          })

          setMap(newMap)
          setMarker(newMarker)

          console.log(
            `Initial marker position: ${initialPosition.lat}, ${initialPosition.lng}`
          )

          // Try to get the user's location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude
                const userLng = position.coords.longitude
                const userPosition = { lat: userLat, lng: userLng }

                // Update map center and marker position to user's location
                newMap.setCenter(userPosition)
                newMarker.setPosition(userPosition)

                console.log(`User location: ${userLat}, ${userLng}`)
              },
              () => {
                console.log('Geolocation not available, using default location')
              }
            )
          }
        }
      })
      .catch((error) => {
        console.error('Error loading Google Maps script:', error)
      })
  }, [map, marker, apiKey])

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
}

export default DragableMarker
