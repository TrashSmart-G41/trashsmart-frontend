import { useEffect, useRef } from "react"

//@ts-ignore
declare const google: any

type LatLng = { lat: number; lng: number }

export default function TruckRouteMap() {
  const mapRef = useRef<google.maps.Map | null>(null)
  const truckRef = useRef<google.maps.Marker | null>(null)

  const circularRoutePoints: LatLng[] = [
    { lat: 6.9271, lng: 79.8612 }, // Start (Colombo)
    { lat: 6.9098, lng: 79.852 },  // Stop 1
    { lat: 6.905, lng: 79.878 },   // Stop 2
    { lat: 6.9271, lng: 79.8612 }, // End (Back to start)
  ]

  useEffect(() => {
    if (!google || !google.maps) return

    // Initialize Map
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 15, // initial zoom
      center: circularRoutePoints[0],
    })
    mapRef.current = map

    // Initialize Truck Marker
    truckRef.current = new google.maps.Marker({
      position: circularRoutePoints[0],
      map,
      icon: {
        url: `data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="black" d="M48 0C21.5 0 0 21.5 0 48L0 368c0 26.5 21.5 48 48 48l16 0c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L48 0zM416 160l50.7 0L544 237.3l0 18.7-128 0 0-96zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>'
        )}`,
        scaledSize: new google.maps.Size(30, 30),
      },
    })

    // Add stop markers
    circularRoutePoints.forEach((point, idx) => {
      let iconSvg = ""
      if (idx === 0) {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 16 16" height="24" width="24"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>`
      } else if (idx === circularRoutePoints.length - 1) {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 16 16" height="24" width="24"><circle cx="8" cy="8" r="6"/></svg>`
      } else {
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="24" width="24"><path fill-rule="evenodd" d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 01.75-.75h2.5a.75.75 0 01.75.75v1.25h2.25a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25v12.5zM1.75 16A1.75 1.75 0 010 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 00.25-.25V8.285a.25.25 0 00-.111-.208l-1.055-.703a.75.75 0 11.832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0114.25 16h-3.5a.75.75 0 01-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 01-.75-.75V14h-1v1.25a.75.75 0 01-.75.75h-3zM3 3.75A.75.75 0 013.75 3h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 3.75zM3.75 6a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM3 9.75A.75.75 0 013.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 013 9.75zM7.75 9a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM7 6.75A.75.75 0 017.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 6.75zM7.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"/></svg>`
      }

      new google.maps.Marker({
        position: point,
        map,
        icon: {
          url: `data:image/svg+xml,${encodeURIComponent(iconSvg)}`,
          scaledSize: new google.maps.Size(20, 20),
        },
      })
    })

    // Directions Service
    const directionsService = new google.maps.DirectionsService()
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: { strokeColor: "green", strokeWeight: 5 },
    })
    directionsRenderer.setMap(map)

    let animationId: number

    directionsService.route(
      {
        origin: circularRoutePoints[0],
        destination: circularRoutePoints[circularRoutePoints.length - 1],
        waypoints: circularRoutePoints.slice(1, -1).map((p) => ({ location: p })),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result)
          const routePath = result.routes[0].overview_path

          let step = Math.random() * (routePath.length - 2)
          const speed = 0.005

          function moveTruck() {
            if (!truckRef.current || !mapRef.current) return

            step += speed
            if (step >= routePath.length - 1) step = 0

            const index = Math.floor(step)
            const frac = step - index
            const start = routePath[index]
            const end = routePath[index + 1]

            const lat = start.lat() + (end.lat() - start.lat()) * frac
            const lng = start.lng() + (end.lng() - start.lng()) * frac

            const position = new google.maps.LatLng(lat, lng)
            truckRef.current.setPosition(position)
            mapRef.current.setCenter(position)

            animationId = requestAnimationFrame(moveTruck)
          }

          animationId = requestAnimationFrame(moveTruck)
        }
      }
    )

    // CLEANUP
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (truckRef.current) truckRef.current.setMap(null)
      mapRef.current = null
    }
  }, [])

  return <div id="map" className="w-full h-[600px] rounded-lg shadow" />
}
