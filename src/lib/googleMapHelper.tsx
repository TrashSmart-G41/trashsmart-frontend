export const loadGoogleMapsScript = (
  apiKey: string,
  libraries: string[] = []
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Construct the script URL with optional libraries
    const librariesParam = libraries.length
      ? `&libraries=${libraries.join(',')}`
      : ''
    const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}`

    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (existingScript) {
      resolve()
      return
    }

    // Create the script element
    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.defer = true

    // Set an ID for the script (optional, if needed for future reference)
    script.id = 'google-maps-script'

    // Resolve the promise when the script is loaded
    script.onload = () => {
      resolve()
    }

    // Reject the promise if there's an error loading the script
    script.onerror = () => {
      reject(new Error('Failed to load the Google Maps script'))
    }

    // Append the script to the document head
    document.head.appendChild(script)
  })
}

// export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       // Check if the script is already loaded
//       if (document.getElementById('google-maps-script')) {
//         resolve();
//         return;
//       }

//       // Create the script element
//       const script = document.createElement('script');
//       script.id = 'google-maps-script';
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
//       script.async = true;
//       script.defer = true;

//       // Resolve the promise when the script is loaded
//       script.onload = () => {
//         resolve();
//       };

//       // Reject the promise if there's an error loading the script
//       script.onerror = () => {
//         reject(new Error('Failed to load the Google Maps script'));
//       };

//       // Append the script to the document head
//       document.head.appendChild(script);
//     });
//   };

// src/lib/mapThemes.ts

export const MapLightTheme = [
  // {
  //     "featureType": "administrative",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //         {
  //             "color": "#444444"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "landscape",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "color": "#f2f2f2"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "poi",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "visibility": "off"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "road",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "saturation": -100
  //         },
  //         {
  //             "lightness": 45
  //         }
  //     ]
  // },
  // {
  //     "featureType": "road.highway",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "visibility": "simplified"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "road.arterial",
  //     "elementType": "labels.icon",
  //     "stylers": [
  //         {
  //             "visibility": "off"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "transit",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "visibility": "off"
  //         }
  //     ]
  // },
  // {
  //     "featureType": "water",
  //     "elementType": "all",
  //     "stylers": [
  //         {
  //             "color": "#bad1da"
  //         },
  //         {
  //             "visibility": "on"
  //         }
  //     ]
  // }
]

export const MapDarkTheme = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
]
