// components/InteractiveMap.js
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export default function InteractiveMap({ campuses }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // India coordinates
      zoom: 4
    });

    campuses.forEach(campus => {
      new mapboxgl.Marker()
        .setLngLat([campus.lng, campus.lat])
        .setPopup(new mapboxgl.Popup().setHTML(
          `<h3>${campus.name}</h3>
           <p>${campus.events.length} upcoming events</p>`
        ))
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-96 rounded-3xl shadow-xl border dark:border-white/20"
    />
  );
}