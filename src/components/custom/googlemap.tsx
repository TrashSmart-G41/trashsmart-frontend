import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  loadGoogleMapsScript,
  MapDarkTheme,
  MapLightTheme,
} from '@/lib/googleMapHelper'

interface GoogleMapProps {
  width?: string | number
  height?: string | number
  className?: string
  scrollable?: boolean
  children?: React.ReactNode
}

interface MarkerProps {
  latitude: number
  longitude: number
  svgIcon?: string
  name: string
}

const Markers: React.FC<{
  map: google.maps.Map | null
  children?: React.ReactNode
}> = ({ map, children }) => {
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    const bounds = new google.maps.LatLngBounds()

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Marker) {
        const { latitude, longitude, svgIcon, name } =
          child.props as MarkerProps

        const position = new google.maps.LatLng(latitude, longitude)

        const icon =
          svgIcon ||
          `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" height="24" width="24">
  <path fill="none" d="M0 0h24v24H0z" />
  <path d="M4 8h16v13a1 1 0 01-1 1H5a1 1 0 01-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 011-1h8a1 1 0 011 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
</svg>`

        // Create marker
        const marker = new google.maps.Marker({
          position,
          map,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(icon)}`,
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 24),
          },
        })

        // Create info window for the marker
        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-size: 14px; font-weight: bold;">${name}</div>`,
        })

        // Add event listeners to show and hide the info window
        marker.addListener('mouseover', () => {
          infoWindow.open(map, marker)
        })
        marker.addListener('mouseout', () => {
          infoWindow.close()
        })

        markersRef.current.push(marker)
        bounds.extend(position)
      }
    })

    // Adjust map bounds to fit all markers
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds)

      // Optional: limit zoom level
      const listener = google.maps.event.addListenerOnce(
        map,
        'bounds_changed',
        () => {
          // @ts-ignore
          if (map.getZoom() > 18) {
            map.setZoom(18) // Maximum zoom level
          }
        }
      )

      // Clean up the listener
      return () => google.maps.event.removeListener(listener)
    }

    // Cleanup on unmount
    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []
    }
  }, [map, children])

  return null
}

const Marker: React.FC<MarkerProps> = () => null

const GoogleMap = forwardRef<google.maps.Map | null, GoogleMapProps>(
  ({ width = '100%', height = 400, className = '', children }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const apiKey = import.meta.env.VITE_GOOGLEMAP_ACCESS_TOKEN || ''

    const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([])

    const updateMapStyle = () => {
      const theme = localStorage.getItem('theme') || 'light'
      const root = window.document.documentElement
      const isDark = root.classList.contains('dark') || theme === 'dark'

      setMapStyle(isDark ? MapDarkTheme : MapLightTheme)
    }

    //@ts-ignore
    useImperativeHandle(ref, () => map, [map])

    useEffect(() => {
      loadGoogleMapsScript(apiKey)
        .then(() => setIsScriptLoaded(true))
        .catch(console.error)
    }, [apiKey])

    useEffect(() => {
      if (!isScriptLoaded || !mapRef.current || !window.google?.maps) return

      const initializedMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.902, lng: 79.8614 },
        zoom: 14,
        styles: mapStyle,
      })

      setMap(initializedMap)
    }, [isScriptLoaded, mapStyle])

    useEffect(() => {
      if (map) {
        map.setOptions({ styles: mapStyle })
      }
    }, [mapStyle, map])

    useEffect(() => {
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

    return (
      <div className={className} style={{ width, height }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        <Markers map={map}>{children}</Markers>
      </div>
    )
  }
)

export { Marker }
export default GoogleMap
