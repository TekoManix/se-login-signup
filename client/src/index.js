import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import CreateProject from './CreateProject';
import CreateTeam from './CreateTeam';
import ViewProjects from './ViewProjects';
import ViewTeams from './ViewTeams';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/CreateProject" element={<CreateProject />} />
            <Route path="/CreateTeam" element={<CreateTeam />} />
            <Route path="/ViewProjects" element={<ViewProjects />} />
            <Route path="/ViewTeams" element={<ViewTeams />} />
        </>
    )
);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </React.StrictMode>
);

reportWebVitals();