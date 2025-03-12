import React from 'react';
import { PulseLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="text-center mt-5">
      <PulseLoader
        color="#FFB6A1" // Peach color from your palette (use any color from your scheme)
        size={20} // Adjust the size as needed
        margin={5} // Adjust space between pulses
      />
    </div>
  );
}
