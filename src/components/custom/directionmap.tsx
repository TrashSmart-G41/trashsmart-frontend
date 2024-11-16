import React, { useState, useRef, useEffect } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMapHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DirectionMapProps {
  apiKey?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const DirectionMap: React.FC<DirectionMapProps> = ({
  apiKey = import.meta.env.VITE_GOOGLEMAP_ACCESS_TOKEN || '',
  width = '100%',
  height = 400,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [markers, setMarkers] = useState<{ position: google.maps.LatLngLiteral; id: string; label: string }[]>([]);
  const [currentMarkerType, setCurrentMarkerType] = useState<'start' | 'end' | 'stop' | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    loadGoogleMapsScript(apiKey)
      .then(() => setIsScriptLoaded(true))
      .catch((error) => console.error(error));
  }, [apiKey]);

  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || !window.google || !window.google.maps) return;

    const initializedMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 6.902, lng: 79.8614 },
      zoom: 14,
    });

    setMap(initializedMap);
    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer({ map: initializedMap });

    // Add click listener for the map
    initializedMap.addListener('click', handleMapClick);
  }, [isScriptLoaded]);

  const addMarker = (position: google.maps.LatLngLiteral, label: string) => {
    if (!map) return;

    const id = `${position.lat}-${position.lng}-${label}`;
    const marker = new google.maps.Marker({
      position,
      map,
      label,
      draggable: true,
    });

    setMarkers((prev) => [...prev, { position, id, label }]);
    marker.addListener('dragend', updateRoute);
    updateRoute();
  };

  const updateRoute = () => {
    if (markers.length < 2 || !directionsService.current || !directionsRenderer.current) return;

    const waypoints = markers.slice(1, -1).map((marker) => ({
      location: marker.position,
      stopover: true,
    }));

    const origin = markers[0].position; // Start marker
    const destination = markers[markers.length - 1].position; // End marker

    directionsService.current.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.current?.setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng || markers.length >= 10) return;

    const position = event.latLng.toJSON();
    if (currentMarkerType) {
      if (currentMarkerType === 'start') {
        addMarker(position, 'S');
        setCurrentMarkerType(null); // Reset after adding start marker
      } else if (currentMarkerType === 'end') {
        addMarker(position, 'E');
        setCurrentMarkerType(null); // Reset after adding end marker
      } else {
        addMarker(position, `${markers.length}`); // Add stop marker
      }
    }
  };

  const reorderMarkers = (result: any) => {
    if (!result.destination) return;

    const reorderedMarkers = Array.from(markers);
    const [removed] = reorderedMarkers.splice(result.source.index, 1);
    reorderedMarkers.splice(result.destination.index, 0, removed);
    setMarkers(reorderedMarkers);
    updateRoute();
  };

  const clearAllMarkers = () => {
    setMarkers([]);
    directionsRenderer.current?.set('directions', null);
  };

  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      <div className="map-toolbar">
        <button onClick={() => setCurrentMarkerType('start')}>Set Start</button>
        <button onClick={() => setCurrentMarkerType('end')}>Set End</button>
        <button onClick={() => setCurrentMarkerType('stop')}>Add Stop</button>
        <button onClick={clearAllMarkers}>Clear All</button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '80%' }} />
      <div className="marker-reorder">
        <DragDropContext onDragEnd={reorderMarkers}>
          <Droppable droppableId="markers">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {markers.map((marker, i) => (
                  <Draggable key={marker.id} draggableId={marker.id} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-marker"
                      >
                        {marker.label}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DirectionMap;
