import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'

// Default coordinates if geolocation is unavailable
const defaultLat = 6.9271
const defaultLng = 79.8612

declare global {
  interface Window {
    google: any
  }
}

// Import theme styles from your helper
import { MapDarkTheme, MapLightTheme } from '@/lib/googleMapHelper'

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

interface DragableMarkerProps {
  apiKey?: string
  height?: string
  onPositionChange?: (lat: number, lng: number) => void
}

const DragableMarker = forwardRef<google.maps.Map | null, DragableMarkerProps>(
  ({ apiKey, height, onPositionChange }, ref) => {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [, setMarker] = useState<google.maps.Marker | null>(null)
    const [mapStyle, setMapStyle] =
      useState<google.maps.MapTypeStyle[]>(MapLightTheme)

    const updateMapStyle = () => {
      const theme = localStorage.getItem('theme') || 'light'
      const root = window.document.documentElement
      const isDark = root.classList.contains('dark') || theme === 'dark'
      setMapStyle(isDark ? MapDarkTheme : MapLightTheme)
    }

    if (!apiKey) {
      apiKey = import.meta.env.VITE_GOOGLEMAP_ACCESS_TOKEN || ''
    }

    if (!height) {
      height = '400px'
    }

    //@ts-ignore
    useImperativeHandle(ref, () => map, [map])

    useEffect(() => {
      //@ts-ignore
      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (mapRef.current && !map) {
            const initialPosition = { lat: defaultLat, lng: defaultLng }
            localStorage.setItem('lat_pos', initialPosition.lat.toString())
            localStorage.setItem('long_pos', initialPosition.lng.toString())

            const newMap = new google.maps.Map(mapRef.current, {
              center: initialPosition,
              zoom: 12,
              styles: mapStyle,
            })

            const newMarker = new google.maps.Marker({
              position: initialPosition,
              map: newMap,
              draggable: true,
            })

            newMarker.addListener('dragend', () => {
              const position = newMarker.getPosition()
              if (position) {
                const lat = position.lat()
                const lng = position.lng()
                localStorage.setItem('lat_pos', lat.toString())
                localStorage.setItem('long_pos', lng.toString())

                if (onPositionChange) {
                  onPositionChange(lat, lng) // Notify parent of position change
                }

                console.log(`Marker moved to: ${lat}, ${lng}`)
              }
            })

            setMap(newMap)
            setMarker(newMarker)

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const userLat = position.coords.latitude
                  const userLng = position.coords.longitude
                  const userPosition = { lat: userLat, lng: userLng }

                  newMap.setCenter(userPosition)
                  newMarker.setPosition(userPosition)

                  if (onPositionChange) {
                    onPositionChange(userLat, userLng) // Notify parent of initial position
                  }

                  console.log(`User location: ${userLat}, ${userLng}`)
                },
                () => {
                  console.log(
                    'Geolocation not available, using default location'
                  )
                }
              )
            }
          }
        })
        .catch((error) => {
          console.error('Error loading Google Maps script:', error)
        })
    }, [mapStyle, apiKey])

    useEffect(() => {
      updateMapStyle()

      const handleStorageChange = () => {
        updateMapStyle()
      }

      window.addEventListener('storage', handleStorageChange)

      const observer = new MutationObserver(() => {
        updateMapStyle()
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        observer.disconnect()
      }
    }, [])

    useEffect(() => {
      if (map) {
        map.setOptions({ styles: mapStyle })
      }
    }, [mapStyle, map])

    return <div ref={mapRef} style={{ height: height, width: '100%' }} />
  }
)

export default DragableMarker
