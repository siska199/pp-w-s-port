import Providers from '@components/providers.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
)
