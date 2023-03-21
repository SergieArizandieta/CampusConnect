import { Outlet,Navigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const usr = cookies.get('usuario')


export const ProctectedRouteInSesion = () => {
  if(usr === undefined){
    return <Outlet/>
  }else{
    
    return <Navigate to="/"/>
    
  }
}


