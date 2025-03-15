import React from 'react';
import { PulseLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="text-center mt-5">
      <PulseLoader color="#FFB6A1" size={20} margin={5} />
    </div>
  );
}
