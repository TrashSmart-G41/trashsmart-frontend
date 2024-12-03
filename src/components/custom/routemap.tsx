import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'

// Default coordinates if geolocation is unavailable
// const defaultLat = 6.9271
// const defaultLng = 79.8612

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=directions`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(error)
    document.head.appendChild(script)
  })
}

interface RouteMapProps {
  apiKey?: string
  route: {
    start: { lat: number; lng: number }
    stops?: { lat: number; lng: number }[]
    end: { lat: number; lng: number }
  }
}

const RouteMap = forwardRef<google.maps.Map | null, RouteMapProps>(
  ({ apiKey, route }, ref) => {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
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

    // Expose map instance to parent via ref
    //@ts-ignore
    useImperativeHandle(ref, () => map, [map])

    // Load Google Maps script and initialize map
    useEffect(() => {
      // @ts-ignore
      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (mapRef.current && !map) {
            const initialPosition = route.start

            // Initialize the map
            const newMap = new google.maps.Map(mapRef.current, {
              center: initialPosition,
              zoom: 12,
              styles: mapStyle, // Apply initial theme
            })

            // Initialize DirectionsService and DirectionsRenderer
            const directionsService = new google.maps.DirectionsService()
            const directionsRenderer = new google.maps.DirectionsRenderer({
              map: newMap,
              polylineOptions: {
                strokeColor: 'green', // Set polyline (route) color to green
                strokeWeight: 5, // Set thickness of the route line
              },
            })

            // Prepare the route request
            const waypoints =
              route.stops?.map((stop) => ({
                location: new google.maps.LatLng(stop.lat, stop.lng),
                stopover: true,
              })) || []

            const request = {
              origin: new google.maps.LatLng(route.start.lat, route.start.lng),
              destination: new google.maps.LatLng(route.end.lat, route.end.lng),
              waypoints,
              travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, etc.
            }

            // Calculate and display the route
            directionsService.route(request, (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result)
              } else {
                console.error('Directions request failed due to ' + status)
              }
            })

            // Create markers for start, stops, and end
            const createMarker = (
              position: { lat: number; lng: number },
              title: string
            ) => {
              return new google.maps.Marker({
                position,
                map: newMap,
                title,
              })
            }

            // Start marker
            createMarker(route.start, 'Start')

            // Stop markers
            route.stops?.forEach((stop, index) => {
              createMarker(stop, `Stop ${index + 1}`)
            })

            // End marker
            createMarker(route.end, 'End')

            // Update state
            setMap(newMap)
          }
        })
        .catch((error) => {
          console.error('Error loading Google Maps script:', error)
        })
    }, [mapStyle, apiKey, route])

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
        <div ref={mapRef} style={{ height: '500px', width: '100%' }} />
        {/* <button onClick={toggleTheme} style={{ marginTop: '10px' }}>
          Toggle Theme
        </button> */}
      </div>
    )
  }
)

export default RouteMap
