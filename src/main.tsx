import Providers from '@components/providers.tsx';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css';
import './assets/styles/slider.css';
import './assets/styles/tooltip.css';

createRoot(document.getElementById('root')!).render(
  <>
    <Providers />
  </>
);
