import React, { useRef, useEffect, useState } from 'react';
import type { KeyboardEvent, ClipboardEvent } from 'react';
import '../css/OTPInput.css';

interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  debounceMs?: number;
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  inputType?: 'numeric' | 'alphanumeric';
  label?: string;
  helperText?: string;
  id?: string;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  debounceMs = 300,
  disabled = false,
  error,
  autoFocus = true,
  inputType = 'numeric',
  label,
  helperText,
  id = 'otp-input',
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const debouncedOtp = useDebounce(otp.join(''), debounceMs);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Sync external value prop
  useEffect(() => {
    if (value !== undefined) {
      const newOtp = value.split('').slice(0, length);
      while (newOtp.length < length) {
        newOtp.push('');
      }
      setOtp(newOtp);
    }
  }, [value, length]);

  // Handle debounced completion
  useEffect(() => {
    if (debouncedOtp.length === length && !debouncedOtp.includes('')) {
      onComplete?.(debouncedOtp);
    }
  }, [debouncedOtp, length, onComplete]);

  // Auto focus first input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const isValidChar = (char: string): boolean => {
    if (inputType === 'numeric') {
      return /^\d$/.test(char);
    }
    return /^[a-zA-Z0-9]$/.test(char);
  };

  const handleChange = (index: number, newValue: string) => {
    if (disabled) return;

    // Extract only the last character typed
    const char = newValue.slice(-1);

    if (char && !isValidChar(char)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    // Auto-advance to next input
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        // Clear current cell
        newOtp[index] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
      } else if (index > 0) {
        // Move to previous cell and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Arrow Left
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    // Arrow Right
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    const pastedData = e.clipboardData.getData('text/plain').trim();
    const pastedChars = pastedData.split('').filter(isValidChar).slice(0, length);

    if (pastedChars.length > 0) {
      const newOtp = [...otp];
      pastedChars.forEach((char, idx) => {
        if (idx < length) {
          newOtp[idx] = char;
        }
      });
      setOtp(newOtp);
      onChange?.(newOtp.join(''));

      // Focus last filled input or next empty
      const lastFilledIndex = Math.min(pastedChars.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // Select content on focus for better UX
    inputRefs.current[index]?.select();
  };

  return (
    <div className="otp-field">
      {label && (
        <label htmlFor={`${id}-0`} className="otp-label">
          {label}
        </label>
      )}
      
      <div 
        className="otp-group" 
        role="group" 
        aria-label={label || "One time password"}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            id={`${id}-${index}`}
            type="text"
            inputMode={inputType === 'numeric' ? 'numeric' : 'text'}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            disabled={disabled}
            className={`otp-cell ${error ? 'otp-cell--error' : ''} ${disabled ? 'otp-cell--disabled' : ''}`}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={!!error}
          />
        ))}
      </div>

      {helperText && !error && (
        <p className="otp-helper-text">{helperText}</p>
      )}

      {error && (
        <p className="otp-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default OTPInput;