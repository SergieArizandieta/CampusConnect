import { Outlet,Navigate } from 'react-router-dom'
import NavBar from '../components/NavBar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const usr = cookies.get('usuario')


export const ProctectedRouteNoSesion = () => {
  if(usr !== undefined){
    return <><NavBar/><Outlet/></>
  }else{
    
    return <Navigate to="/SingIn"/>
    
  }
}


