import React, { useState } from 'react';
import { Slider } from '../components/rachanaUI/ui/Slider';

export default function SliderDemo() {
  const [val, setVal] = useState(45);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <div style={{ padding: '40px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Single Slider */}
      <div>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          Single Value: {val}
        </label>
        <Slider 
          min={0} 
          max={100} 
          value={val} 
          onChange={setVal} 
        />
      </div>

      {/* Range Slider */}
      <div>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          Price Range: ${range[0]} - ${range[1]}
        </label>
        <Slider 
          min={0} 
          max={100} 
          value={range} 
          onChange={setRange} 
        />
      </div>

      {/* Disabled Example */}
      <div>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '10px', opacity: 0.5 }}>
          Disabled Slider
        </label>
        <Slider defaultValue={30} disabled />
      </div>

    </div>
  );
}