import { createRoot } from 'react-dom/client';
import './lib/sw/pdf-worker';
import Providers from '@components/Providers';

createRoot(document.getElementById('root')!).render(<Providers />);
