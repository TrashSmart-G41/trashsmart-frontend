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
}

const DragableMarker = forwardRef<google.maps.Map | null, DragableMarkerProps>(
  ({ apiKey,height }, ref) => {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [, setMarker] = useState<google.maps.Marker | null>(null)
    const [mapStyle, setMapStyle] =
      useState<google.maps.MapTypeStyle[]>(MapLightTheme)

    // Function to detect and update map style
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

    // Expose map instance to parent via ref
    //@ts-ignore
    useImperativeHandle(ref, () => map, [map])

    // Load Google Maps script and initialize map
    useEffect(() => {
      //@ts-ignore
      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (mapRef.current && !map) {
            const initialPosition = { lat: defaultLat, lng: defaultLng }
            console.log('initialPosition:', initialPosition)
            // set local storage lat_pos and long_pos
            localStorage.setItem('lat_pos', initialPosition.lat.toString())
            localStorage.setItem('long_pos', initialPosition.lng.toString())

            // Initialize the map
            const newMap = new google.maps.Map(mapRef.current, {
              center: initialPosition,
              zoom: 12,
              styles: mapStyle, // Apply initial theme
            })

            // Create a draggable marker
            const newMarker = new google.maps.Marker({
              position: initialPosition,
              map: newMap,
              draggable: true,
            })

            // Handle marker drag end
            newMarker.addListener('dragend', () => {
              const position = newMarker.getPosition()
              if (position) {
                console.log(
                  `Marker moved to: ${position.lat()}, ${position.lng()}`
                )
              }
              // update local storage lat_pos and long_pos
              //@ts-ignore
              localStorage.setItem('lat_pos', position.lat().toString())
              //@ts-ignore
              localStorage.setItem('long_pos', position.lng().toString())
            })

            // Update state
            setMap(newMap)
            setMarker(newMarker)

            // Geolocation: Update map and marker position to user's location if available
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const userLat = position.coords.latitude
                  const userLng = position.coords.longitude
                  const userPosition = { lat: userLat, lng: userLng }

                  newMap.setCenter(userPosition)
                  newMarker.setPosition(userPosition)

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

    // Handle theme changes manually (toggle between light and dark modes)
    // const toggleTheme = () => {
    //   const currentTheme = localStorage.getItem('theme') || 'light'
    //   const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    //   localStorage.setItem('theme', newTheme)
    //   updateMapStyle() // Apply new theme immediately
    // }

    useEffect(() => {
      // Listen for changes in localStorage or DOM to detect theme changes
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
        map.setOptions({ styles: mapStyle }) // Update map style when theme changes
      }
    }, [mapStyle, map])

    return (
      <div>
        <div ref={mapRef} style={{ height: height, width: '100%' }} />
        {/* <button onClick={toggleTheme} style={{ marginTop: '10px' }}>
          Toggle Theme
        </button> */}
      </div>
    )
  }
)

export default DragableMarker
