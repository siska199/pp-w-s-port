import { createRoot } from 'react-dom/client'

import Providers from '@components/providers'

import '@assets/styles/index.css'
import '@assets/styles/input.css'
import '@assets/styles/modal.css'
import '@assets/styles/slider.css'
import '@assets/styles/tooltip.css'

createRoot(document.getElementById('root')!).render(
  <>
    <Providers />
  </>
)
