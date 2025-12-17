import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../css/Slider.css';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onChange?: (value: any) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  disabled = false,
  orientation = 'horizontal'
}: SliderProps) => {
  // Determine if it's a range slider based on input
  const isRange = Array.isArray(value || defaultValue);
  
  // Internal state management
  const [values, setValues] = useState<[number, number]>(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    const singleVal = value ?? defaultValue ?? 0;
    return [Number(singleVal), max];
  });

  const isControlled = value !== undefined;
  const currentValues = isControlled ? (Array.isArray(value) ? value : [value as number, max]) : values;

  // Calculate percentage for CSS positioning
  const getPercent = useCallback((val: number) => 
    Math.round(((val - min) / (max - min)) * 100), [min, max]);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isControlled) setValues([val, values[1]]);
    onChange?.(val);
  };

  const handleRangeChange = (index: 0 | 1, e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    const newValues: [number, number] = [...currentValues] as [number, number];
    
    // Prevent thumbs from crossing
    if (index === 0) newValues[0] = Math.min(newVal, currentValues[1] - step);
    else newValues[1] = Math.max(newVal, currentValues[0] + step);

    if (!isControlled) setValues(newValues);
    onChange?.(newValues);
  };

  const minPercent = getPercent(currentValues[0]);
  const maxPercent = isRange ? getPercent(currentValues[1]) : 0;

  return (
    <div 
      className={`slider-container ${orientation} ${disabled ? 'disabled' : ''}`}
      style={{
        // Custom properties for the CSS track background
        '--min-percent': `${minPercent}%`,
        '--max-percent': `${maxPercent}%`,
      } as React.CSSProperties}
    >
      {isRange ? (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValues[0]}
            disabled={disabled}
            onChange={(e) => handleRangeChange(0, e)}
            className="thumb thumb--left"
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValues[1]}
            disabled={disabled}
            onChange={(e) => handleRangeChange(1, e)}
            className="thumb thumb--right"
          />
        </>
      ) : (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValues[0]}
          disabled={disabled}
          onChange={handleSingleChange}
          className="thumb thumb--single"
        />
      )}

      {/* Visual Track Architecture */}
      <div className="slider-track-bg" />
      <div className="slider-range-highlight" />
    </div>
  );
};