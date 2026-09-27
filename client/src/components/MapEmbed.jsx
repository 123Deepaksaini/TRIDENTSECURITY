import React from 'react';
import IndiaMapPresence from './IndiaMapPresence';

export default function MapEmbed() {
  return (
    <div id="locations-map-section" className="space-y-4">
      {/* Real Geographic Map of India with 3 Red State Marks */}
      <IndiaMapPresence />
    </div>
  );
}


