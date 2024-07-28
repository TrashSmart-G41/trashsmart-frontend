import Map from // ScaleControl, // FullscreenControl, // NavigationControl, // Popup, // Marker,
// GeolocateControl
'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useState } from 'react'
// import { cn } from '@/lib/utils';
// import Pin from '@/components/custom/pin';

// const insitutes = [
//   {
//     insitute: "University of Colombo School of Computing",
//     longitude: 79.86140,
//     latitude: 6.90200,
//   },
//   // Add more city objects here if needed
// ];

const GoogleMap = ({ width = '100%', height = 400, className = '' }) => {
  const [mapStyle, setMapStyle] = useState<string>('')

  const updateMapStyle = () => {
    const storageKey = 'theme'
    const theme = localStorage.getItem(storageKey) || 'light'

    const root = window.document.documentElement
    const isDark = root.classList.contains('dark') || theme === 'dark'

    const style = isDark
      ? 'mapbox://styles/mapbox/dark-v10'
      : 'mapbox://styles/mapbox/light-v11'

    setMapStyle(style)
  }

  useEffect(() => {
    // Initial setup
    updateMapStyle()

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      updateMapStyle()
    }

    window.addEventListener('storage', handleStorageChange)

    // Observe changes in the root element's class list
    const observer = new MutationObserver(() => {
      updateMapStyle()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Cleanup event listeners and observers
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      observer.disconnect()
    }
  }, [])

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  if (!mapboxAccessToken) {
    throw new Error('Mapbox access token is not defined')
  }

  // Use the mapboxAccessToken in your code

  return (
    <>
      <div className={className}>
        <Map
          mapboxAccessToken={mapboxAccessToken}
          initialViewState={{
            longitude: 79.8614,
            latitude: 6.902,
            zoom: 15,
          }}
          style={{ width, height }}
          mapStyle={mapStyle}
        ></Map>
      </div>
    </>
  )
}

export default GoogleMap
