import {Navigate, Outlet} from "react-router-dom";
import {UserData} from "./UserData.tsx";


type Props = {
    user?:UserData
}
export default function ProtectedRoutes(props:Props){

    const isAuthenticated = props.user !== undefined && props.user.name !== 'anonymousUser';

    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}