import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/rachanaUI/css/BrandSetting.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
