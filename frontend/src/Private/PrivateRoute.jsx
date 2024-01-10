import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRouter=()=>{
    const user = useSelector((state)=>state.user.user)
    return user?<Outlet/> :<Navigate to='/login' replace />
}
export const adminPrivateRouter=()=>{
    const admin = useSelector((state)=>state.user.admin)
    return admin?<Outlet/> :<Navigate to='/admin/login' replace />
}
