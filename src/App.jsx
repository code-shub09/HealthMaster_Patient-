import { useState } from "react";


import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "./compoents/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file
import DataProvider from "./store/contextApi";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";
import Layout from "./Layout";
import Login from "./compoents/Login";
import Appointment from "./compoents/Appointment";
import HistoryAppoint from "./compoents/HistoryAppointment";
import Resgistor from "./compoents/Resgistor";
import SignUp from "./compoents/SignUp";



const router =createBrowserRouter(
  [
    {path:'/',element:<Layout></Layout>, children:[
      {
        path:'/',element:<Home> </Home>
      },
      {
        path:'/login',element:<Login></Login>
      },
      {path:'/appointment',element:<Appointment></Appointment>},
      {path:'/history',element:<HistoryAppoint></HistoryAppoint>},
      
      {path:'/registor',element:<SignUp></SignUp>}
    
    ]}
  ]
)
function App() {


  return (
    <>
      <DataProvider>
       <RouterProvider router={router}></RouterProvider>
       <ToastContainer />
      </DataProvider>
    </>
  );
}

export default App;
