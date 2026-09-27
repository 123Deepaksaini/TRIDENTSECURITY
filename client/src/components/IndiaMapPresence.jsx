import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { useTheme } from '../context/ThemeContext';
import {
  Compass,
  MapPin,
  Building2,
  Phone,
  Shield,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Star,
  Info,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export default function IndiaMapPresence() {
  const [activeStateId, setActiveStateId] = useState(null); // Card hidden by default
  const [mapTileStyle, setMapTileStyle] = useState('streets'); // 'streets' | 'satellite' | 'dark'
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef([]);
  const { isDark } = useTheme();

  // The 3 Operational States with exact coordinates
  const operationalStates = [
    {
      id: 'madhya-pradesh',
      name: 'Madhya Pradesh',
      title: 'Trident Security Services Pvt. Ltd.',
      role: 'Madhya Pradesh • Central State HQ',
      lat: 23.1815,
      lng: 79.9864,
      zoom: 7,
      isHQ: true,
      address: '54, Indira Awas Colony, Manegaon, Ranjhi, Jabalpur, M.P. – 482005',
      phone: '0761-4035967 / +91 96821 65489',
      rating: '4.9',
      reviews: '248 Google Reviews',
      guards: '850+ Guards Deployed',
      sites: '140+ Active Sites',
      coverage: 'Statewide MP Deployment: Jabalpur (Central HQ), Indore, Bhopal, Gwalior, Ujjain, Katni, Rewa & Singrauli',
      keyZones: ['Jabalpur (Central HQ)', 'Indore Commercial Hub', 'Bhopal Capital Division', 'Pithampur SEZ', 'Katni & Rewa'],
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Trident+Security+Services+54+Indira+Awas+Colony+Manegaon+Ranjhi+Jabalpur+Madhya+Pradesh+482005',
      mapSearchUrl: 'https://www.google.com/maps/search/Trident+Security+Services+Jabalpur+Madhya+Pradesh'
    },
    {
      id: 'uttar-pradesh',
      name: 'Uttar Pradesh',
      title: 'Trident Security Services Pvt. Ltd.',
      role: 'Uttar Pradesh • Northern Division Desk',
      lat: 26.8467,
      lng: 80.9462,
      zoom: 7,
      isHQ: false,
      address: 'Regional Desk: Lucknow & Noida / Greater Noida Industrial Corridor, Uttar Pradesh',
      phone: '+91 96821 65489',
      rating: '4.8',
      reviews: '185 Google Reviews',
      guards: '450+ Guards Deployed',
      sites: '75+ Active Sites',
      coverage: 'Statewide UP Operations: Lucknow, Noida/Greater Noida (NCR), Kanpur, Agra, Varanasi, Prayagraj & Gorakhpur',
      keyZones: ['Lucknow Command Desk', 'Noida NCR Hub', 'Kanpur Logistics', 'Varanasi', 'Agra Industrial Zone'],
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Uttar+Pradesh+India',
      mapSearchUrl: 'https://www.google.com/maps/search/Uttar+Pradesh+India'
    },
    {
      id: 'uttarakhand',
      name: 'Uttarakhand',
      title: 'Trident Security Services Pvt. Ltd.',
      role: 'Uttarakhand • Hill & SIDCUL Command',
      lat: 30.1500,
      lng: 78.1600,
      zoom: 7.5,
      isHQ: false,
      address: 'Regional Desk: Dehradun & Haridwar SIDCUL Industrial Sector, Uttarakhand',
      phone: '+91 96821 65489',
      rating: '4.9',
      reviews: '120 Google Reviews',
      guards: '250+ Guards Deployed',
      sites: '40+ Active Sites',
      coverage: 'Statewide UK Coverage: Dehradun, Haridwar (SIDCUL), Pantnagar, Roorkee, Rishikesh & Haldwani',
      keyZones: ['Dehradun Command', 'Haridwar SIDCUL Sector', 'Pantnagar Industrial Area', 'Roorkee', 'Rishikesh'],
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Uttarakhand+India',
      mapSearchUrl: 'https://www.google.com/maps/search/Uttarakhand+India'
    }
  ];

  const selectedStateData = operationalStates.find(s => s.id === activeStateId);

  // 100% Free, High-Reliability Real Geographic Map Tile Servers (No API Key Required)
  const tileUrls = {
    streets: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
  };

  const tileAttributions = {
    streets: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    satellite: '&copy; Esri, Maxar, Earthstar Geographics',
    dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };

  // Initialize Real Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const currentTileType = mapTileStyle === 'dark' || (mapTileStyle === 'streets' && isDark) ? 'dark' : mapTileStyle;

    // Center map on India with National Bounds
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.0],
      zoom: 4.8,
      minZoom: 4.2,
      maxZoom: 12,
      maxBounds: [
        [6.0, 66.0],   // Southwest corner (South India & Arabian Sea)
        [37.5, 98.0]   // Northeast corner (Kashmir & North East)
      ],
      maxBoundsViscosity: 0.8,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Add Base Tile Layer
    const tileLayer = L.tileLayer(tileUrls[currentTileType] || tileUrls.streets, {
      attribution: tileAttributions[currentTileType] || tileAttributions.streets,
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    layersRef.current = [tileLayer];

    // Add Red Pin Markers and State Coverage Highlights for ALL 3 States (Madhya Pradesh, Uttar Pradesh, Uttarakhand)
    operationalStates.forEach((state) => {
      // 1. Red Translucent State Region Highlight Circle
      const stateAreaCircle = L.circle([state.lat, state.lng], {
        color: '#dc2626',
        fillColor: '#ef4444',
        fillOpacity: 0.2,
        weight: 2,
        dashArray: '5, 5',
        radius: state.id === 'madhya-pradesh' ? 260000 : state.id === 'uttar-pradesh' ? 220000 : 130000
      }).addTo(map);

      // 2. Google Maps style Red Pin Marker with state name text
      const redPinHtml = `
        <div style="position: relative; display: flex; align-items: center; cursor: pointer; user-select: none; transform: translate(-14px, -36px);">
          <!-- Glowing Red Pulse behind Pin -->
          <div style="position: absolute; left: 14px; top: 32px; transform: translate(-50%, -50%); width: 34px; height: 34px; border-radius: 50%; background: rgba(220, 38, 38, 0.4); animation: ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          
          <!-- Authentic Red Location Pin SVG -->
          <div style="position: relative; width: 28px; height: 38px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.35)); transition: transform 0.2s ease;">
            <svg viewBox="0 0 24 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
              <path d="M12 0C5.37258 0 0 5.37258 0 12C0 20.25 10.5 32.5 11.25 33.375C11.625 33.8125 12.375 33.8125 12.75 33.375C13.5 32.5 24 20.25 24 12C24 5.37258 18.6274 0 12 0Z" fill="#dc2626"/>
              <circle cx="12" cy="12" r="5" fill="#7f1d1d"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff"/>
            </svg>
          </div>

          <!-- Red Label Tag beside Pin (Matching Google Maps exact style) -->
          <div style="margin-left: 6px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 8px; border: 1.5px solid rgba(220, 38, 38, 0.6); box-shadow: 0 4px 12px rgba(0,0,0,0.18); white-space: nowrap; pointer-events: auto;">
            <span style="color: #dc2626; font-weight: 800; font-size: 11px; font-family: 'Outfit', sans-serif; display: flex; align-items: center; gap: 4px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #dc2626; display: inline-block;"></span>
              Trident Security (${state.name})
              ${state.isHQ ? '<span style="background: #fbbf24; color: #0f172a; font-size: 8px; font-weight: 900; padding: 1px 4px; border-radius: 4px; margin-left: 2px;">HQ</span>' : ''}
            </span>
          </div>
        </div>
      `;

      const redPinIcon = L.divIcon({
        className: 'google-style-red-marker',
        html: redPinHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([state.lat, state.lng], { icon: redPinIcon }).addTo(map);

      // On Pin Click or Circle Click -> Open the Card for that State!
      const handleStateClick = () => {
        setActiveStateId(state.id);
        map.flyTo([state.lat, state.lng], state.zoom, { duration: 1.0 });
      };

      marker.on('click', handleStateClick);
      stateAreaCircle.on('click', handleStateClick);

      layersRef.current.push(stateAreaCircle, marker);
    });

    // Invalidate size to guarantee crisp tile render
    const t1 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 150);

    const t2 = setTimeout(() => {
      if (mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
    }, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapTileStyle, isDark]);

  // Handle State Pill Button Click
  const handleSelectStatePill = (stateId) => {
    setActiveStateId(stateId);
    if (!mapInstanceRef.current) return;

    if (stateId === null || stateId === 'all') {
      mapInstanceRef.current.flyTo([22.8, 80.0], 4.8, { duration: 1.0 });
      setActiveStateId(null);
    } else {
      const stateObj = operationalStates.find(s => s.id === stateId);
      if (stateObj) {
        mapInstanceRef.current.flyTo([stateObj.lat, stateObj.lng], stateObj.zoom, { duration: 1.0 });
      }
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleResetView = () => {
    setActiveStateId(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.8, 80.0], 4.8, { duration: 1.0 });
    }
  };

  return (
    <div className="space-y-4">

      {/* 1. Top Controls Bar */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        
        {/* State Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => handleSelectStatePill(null)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeStateId === null
                ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/30 scale-105'
                : 'bg-slate-100 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            All 3 States (Tri-State View)
          </button>

          {operationalStates.map((state) => {
            const isSelected = activeStateId === state.id;
            return (
              <button
                key={state.id}
                onClick={() => handleSelectStatePill(state.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-2 cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/30 scale-105'
                    : 'bg-white dark:bg-navy-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-red-300'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span>{state.name}</span>
                {state.isHQ && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold">
                    HQ
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real Map Tile Selector */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/10 w-full sm:w-auto justify-center">
          <button
            onClick={() => setMapTileStyle('streets')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mapTileStyle === 'streets'
                ? 'bg-white dark:bg-navy-800 text-red-600 dark:text-red-400 shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Real Map
          </button>
          <button
            onClick={() => setMapTileStyle('satellite')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mapTileStyle === 'satellite'
                ? 'bg-white dark:bg-navy-800 text-red-600 dark:text-red-400 shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Satellite View
          </button>
          <button
            onClick={() => setMapTileStyle('dark')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mapTileStyle === 'dark'
                ? 'bg-white dark:bg-navy-800 text-red-600 dark:text-red-400 shadow-sm border border-slate-200 dark:border-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dark Radar
          </button>
        </div>

      </div>

      {/* 2. Real Map Container (Compact & Clean Height) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-2xl bg-slate-100 dark:bg-navy-950 min-h-[400px] sm:min-h-[460px]">
        
        {/* Leaflet Map DOM Element */}
        <div
          ref={mapContainerRef}
          className="w-full h-[400px] sm:h-[460px] z-0"
          style={{ width: '100%', height: '460px' }}
        />

        {/* 3. Floating Details Card (ONLY VISIBLE WHEN USER CLICKS A LOCATION PIN, WITH CLOSE BUTTON) */}
        {selectedStateData && (
          <div className="absolute top-4 left-4 z-[400] max-w-[340px] sm:max-w-[380px] w-[calc(100%-2rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-white rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-white/10 space-y-3 animate-fadeIn">
            
            {/* Card Header with Close Button */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                  {selectedStateData.title}
                </h4>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
                    {selectedStateData.role}
                  </span>
                </div>
              </div>

              {/* Close Button (Removes Card from Map) */}
              <button
                onClick={() => setActiveStateId(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 text-slate-500 transition-colors cursor-pointer"
                title="Close Info Card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Address */}
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start space-x-1.5 pt-1 border-t border-slate-100 dark:border-white/5">
              <MapPin className="w-3.5 h-3.5 text-red-600 mr-1 flex-shrink-0 mt-0.5" />
              <span>{selectedStateData.address}</span>
            </div>

            {/* Ratings */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white">{selectedStateData.rating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-slate-400 text-[11px]">({selectedStateData.reviews})</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {selectedStateData.guards}
              </span>
            </div>

            {/* Card Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <a
                href={selectedStateData.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-sm transition-all text-center cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </a>
              <a
                href={`tel:${selectedStateData.phone.split('/')[0].trim()}`}
                className="px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-sm transition-all text-center cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Desk</span>
              </a>
            </div>

          </div>
        )}

        {/* Floating Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col space-y-1.5">
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-slate-800 dark:text-white hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-slate-800 dark:text-white hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-slate-800 dark:text-white hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer"
            title="Reset Tri-State View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Map Status Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200 font-bold">
            <span className="w-3 h-3 rounded-full bg-red-600 border border-white" />
            <span>Red Pins Marked on: Madhya Pradesh, Uttar Pradesh & Uttarakhand</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Click any Red Pin to view state details & directions
          </span>
        </div>

      </div>

    </div>
  );
}

