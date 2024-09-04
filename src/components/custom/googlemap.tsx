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
import MapMarker from './mapmarker'

interface GoogleMapProps {
  width?: string | number
  height?: string | number
  className?: string
  children?: React.ReactNode
  scrollable?: boolean | false
}

const GoogleMap = forwardRef<google.maps.Map | null, GoogleMapProps>(
  ({ width = '100%', height = 400, className = '',scrollable, children }, ref) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const apiKey = import.meta.env.VITE_GOOGLEMAP_ACCESS_TOKEN || ''

    const [mapStyle, setMapStyle] = useState<google.maps.MapTypeStyle[]>([])
    const markers = useRef<google.maps.Marker[]>([])
    const markerPositions = useRef<google.maps.LatLng[]>([])

    const updateMapStyle = () => {
      const theme = localStorage.getItem('theme') || 'light'
      const root = window.document.documentElement
      const isDark = root.classList.contains('dark') || theme === 'dark'

      setMapStyle(isDark ? MapDarkTheme : MapLightTheme)
    }

    // @ts-ignore
    useImperativeHandle(ref, () => map, [map])

    useEffect(() => {
      loadGoogleMapsScript(apiKey)
        .then(() => {
          setIsScriptLoaded(true)
        })
        .catch((error) => {
          console.error(error)
        })
    }, [apiKey])

    useEffect(() => {
      if (
        !isScriptLoaded ||
        !mapRef.current ||
        !window.google ||
        !window.google.maps
      )
        return

      const initializedMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 6.902, lng: 79.8614 },
        zoom: 14, // Initial zoom level
        styles: mapStyle,
        // restriction: {
        //   latLngBounds: new window.google.maps.LatLngBounds(
        //     new window.google.maps.LatLng(6.788, 79.961), // Southwest coordinates
        //     new window.google.maps.LatLng(6.977, 80.173)  // Northeast coordinates
        //   ),
        //   strictBounds: true,
        // },
      })

      setMap(initializedMap)

      // Render children markers and store their positions
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === MapMarker) {
          const { latitude, longitude } = child.props as any
          const position = new window.google.maps.LatLng(latitude, longitude)

          // Create a marker and add its position to the list
          const marker = new window.google.maps.Marker({
            position,
            map: initializedMap,
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

          markers.current.push(marker)
          markerPositions.current.push(position)
        }
      })

      // Adjust map bounds to fit all markers and constrain zoom level
      if (markerPositions.current.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        markerPositions.current.forEach((position) => bounds.extend(position))
        initializedMap.fitBounds(bounds)

        // Constrain zoom level to a maximum of 14
        google.maps.event.addListenerOnce(
          initializedMap,
          'bounds_changed',
          () => {
            // @ts-ignore
            if (initializedMap && initializedMap.getZoom() > 18) {
              initializedMap.setZoom(18)
              if(!scrollable) 
              {
                // initializedMap.setOptions({ scrollwheel: false })
                initializedMap.setOptions({ draggable: false })
              }
            }
          }
        )
      }
    }, [isScriptLoaded, mapStyle, children])

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
      </div>
    )
  }
)

export default GoogleMap
