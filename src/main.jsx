import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './utils/errorHandler.js' // Global error handler for extension errors
import './theme.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
