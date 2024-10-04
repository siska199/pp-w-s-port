import { route } from "@lib/data/global"
import Portofolio from "@pages/portofolio/portofolio"
import { RouteObject } from "react-router-dom"

const portofolioRouter: RouteObject[] = [
    {
      path: route.portofolio.name,
      children : [
        {
            path : ':id',
            element: <Portofolio/>,
            handle : {
              name : 'portofolio'
            }
        }
      ]
    }
  ]
export default portofolioRouter