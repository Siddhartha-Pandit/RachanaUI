import {useState, useEffect} from 'react';
type Device = "mobile" | "tablet" | "desktop";
export function useDevice(): Device {
  const [device, setDevice] = useState<Device>("desktop");

  useEffect(() => {
    function detect() {
      const width = window.innerWidth;
      if (width < 768) setDevice("mobile");
      else if (width < 1024) setDevice("tablet");
      else setDevice("desktop");
    }

    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  return device;

}