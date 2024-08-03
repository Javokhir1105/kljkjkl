import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Cities from "./Components/Cities";
import Home from "./Components/Home/home";
import Dashboard from "./Components/Dashboard";
import Settings from "./Components/Settings";
import Brands from "./Components/Brands";
import Models from "./Components/Models";
import Location from "./Components/Location";
import Cars from "./Components/Cars";
import Login from "./Components/Login";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [{
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/brands',
            element: <Brands />
        },
        {
            path: '/models',
            element: <Models />
        },
        {
            path: '/location',
            element: <Location/>
        },
        {
            path: '/cities',
            element: <Cities />
        },
        {
            path: '/cars',
            element: <Cars/>
        },
        ],
    },
    {
        path: '/login',
        element: <Login />
    }
])
export default router