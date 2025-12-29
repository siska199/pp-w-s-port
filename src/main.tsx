import { createRoot } from 'react-dom/client';

import Providers from '@components/Providers';

import './lib/sw/pdf-worker';

createRoot(document.getElementById('root')!).render(<Providers />);
