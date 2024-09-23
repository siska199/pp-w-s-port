import authRouter from '@routes/public/authRouter'
import { RouteObject } from 'react-router-dom'
import playgroundRouter from './playgroundRouter'

const publicRoutes: RouteObject[] = [...authRouter, ...playgroundRouter]

export default publicRoutes
