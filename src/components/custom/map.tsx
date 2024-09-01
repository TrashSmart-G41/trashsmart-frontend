import Map, { Marker } from 'react-map-gl' // GeolocateControl // ScaleControl, // FullscreenControl, // NavigationControl, // Popup, // Marker,
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

  // const BinLogo = () => (
  //   <svg
  //     xmlns='http://www.w3.org/2000/svg'
  //     width='18'
  //     height='18'
  //     viewBox='0 0 16 16'
  //   >
  //     <path
  //       fill='currentColor'
  //       fill-rule='evenodd'
  //       d='M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75'
  //       clip-rule='evenodd'
  //     />
  //   </svg>
  // )

  const markerLongitude = 79.8614
  const markerLatitude = 6.902

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
        >
          <Marker longitude={markerLongitude} latitude={markerLatitude}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='35'
              height='35'
              viewBox='0 0 100 100'
            >
              <path
                fill='currentColor'
                d='M50 10.417c-15.581 0-28.201 12.627-28.201 28.201a28.07 28.07 0 0 0 5.602 16.873L45.49 86.823c.105.202.21.403.339.588l.04.069l.011-.006a5.06 5.06 0 0 0 4.135 2.111c1.556 0 2.912-.708 3.845-1.799l.047.027l.179-.31c.264-.356.498-.736.667-1.155L72.475 55.65a28.07 28.07 0 0 0 5.726-17.032c0-15.574-12.62-28.201-28.201-28.201m-.279 42.498c-7.677 0-13.895-6.221-13.895-13.895s6.218-13.895 13.895-13.895s13.895 6.222 13.895 13.895s-6.218 13.895-13.895 13.895'
              />
            </svg>
          </Marker>
        </Map>
      </div>
    </>
  )
}

export default GoogleMap
