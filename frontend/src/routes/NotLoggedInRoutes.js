import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";

const NotLoggedInRoutes = () => {

   const {user} = useSelector((state)=>({...state}));

   return user ? <Navigate to="/"/> : <Outlet/>
}

export default NotLoggedInRoutes;