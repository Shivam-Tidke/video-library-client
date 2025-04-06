import { Link } from "react-router-dom";

export function VideoHome(){
    return(
        <div className="flex justify-center items-center" style={{height:'80vh'}} >
            <Link to='/admin-login' className="p-2 bg-gray-500 text-white rounded m-2 font-bold hover:bg-black">Admin Login</Link>
            <Link  to='/user-login' className="p-2 bg-gray-500 text-white rounded m-2 font-bold hover:bg-black">User Login</Link>
        </div>
    )   
}