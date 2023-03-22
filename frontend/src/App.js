// import './App.css';
import { Routes, Route, HashRouter  } from "react-router-dom";


import Dashboard from './pages/Dashboard';
import SingIn from './pages/SingIn';
import SingUp from "./pages/SingUp";
import ResetPass from "./pages/ResetPass";
import Profile from "./pages/Profile";

import  {ProctectedRouteInSesion}  from "./security/ProctectedRouteInSesion";
import { ProctectedRouteNoSesion } from "./security/ProctectedRouteNoSesion";
import './styles/styles.scss'


function App() {
  return (
  
    <HashRouter>
      
    <Routes>

      <Route element={// eslint-disable-next-line
        <ProctectedRouteInSesion/>}>

          <Route path="/SingIn" element={<SingIn/>} />
          <Route path="/SingUp" element={<SingUp/>} />
          <Route path="/ResetPass" element={<ResetPass/>} />
        
      </Route>

      <Route element={// eslint-disable-next-line
         <ProctectedRouteNoSesion/>}>
          
        <Route path="/" element={<Dashboard/>} />
        <Route path="/Perfil/:carnet" element={<Profile/>} />

      </Route>
       

    </Routes>
  </HashRouter>  

  );
}

export default App;
