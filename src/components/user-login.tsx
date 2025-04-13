import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { IoMdPersonAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


export function Userlogin() {
    let navigate = useNavigate();
    const [, setCookie] = useCookies(["user-name"]);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        
        onSubmit: async (client) => {
            try {
                const response = await axios.post(
                    "https://video-library-server.onrender.com/api/v1/users/login",
                    {
                      username: client.username,
                      password: client.password,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      withCredentials: true,
                    }
                  );

                const user = response.data?.data?.user;
                
                

                if (user) {
                     
                        setCookie("user-name", user.username, { path: "/" });
                        navigate("/user-dash");
                    } else {
                        alert("Invalid Password");
                    }
    
            } catch (error:any) {
                console.error("login Error:", error);
                alert(error?.response?.data?.message ||"Login failed");
            }
        },
    });





    return(
        <div className="w-sm m-8 p-4">
            
            <form className="shadow-md rounded p-4  bg-white" onSubmit={formik.handleSubmit}>
            <label className="font-bold text-gray-500 m-3 text-2xl  text-center flex justify-center items-center "  > <IoMdPersonAdd className="mr-2"  />
            User Login </label>
            <dl>
                <dt className="font-bold text-gray-500 text-base my-3 ">User Name</dt>
                <dd><input className="formControl" type="text" value={formik.values.username} onChange={formik.handleChange} name="username" /></dd>
                <dt className="text-gray-500 font-bold text-base my-3">Password</dt>
                <dd><input type="password" className="formControl " value={formik.values.password} onChange={formik.handleChange} name="password" /></dd>
            </dl>
             <div className="mt-8">
             <button type="submit" className="btnSuccess">Login</button>
             <Link to="/"><button className="btnError ml-4" >Cancel</button></Link>
             </div>

             <div className="mt-4 p">
                <Link to="/register-user"><button className="py-0.5 rounded  px-4 bg-cyan-800 text-white hover:drop-shadow-lg hover:-translate-y-1 hover:scale-105 hover:bg-cyan-900 transition duration-150 ease-in-out"  >Register New User!</button></Link>
             </div>

            </form>
        </div>
    )
}