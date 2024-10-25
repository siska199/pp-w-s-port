import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import './assets/styles/slider.css'
import './assets/styles/tooltip.css'
import './assets/styles/modal.css'
import Providers from '@components/Providers'

createRoot(document.getElementById('root')!).render(
  <>
    <Providers />
  </>
)
