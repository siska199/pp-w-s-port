import { pdfjs } from 'react-pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof window !== 'undefined') {
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
}
