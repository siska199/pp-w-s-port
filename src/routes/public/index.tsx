import authRouter from '@routes/public/authRouter'
import { RouteObject } from 'react-router-dom'

const publicRoutes: RouteObject[] = [...authRouter]

export default publicRoutes
