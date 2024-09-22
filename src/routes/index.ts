import protectedRoutes from '@routes/protected'
import publicRoutes from '@routes/public'
import { createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes])

export default router
