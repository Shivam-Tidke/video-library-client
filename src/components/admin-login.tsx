import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AdminLogin() {
    let navigate = useNavigate();
    const [, setCookie] = useCookies(['admin-id']);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },

        onSubmit: async (admin) => {

            try {
                const response = await axios.post(
                    "https://video-library-server.onrender.com/api/v1/admins/login",
                    {
                        username: admin.username,
                        password: admin.password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    }
                );

                const admindata = response.data?.data?.admin;

                if (admindata) {
                    setCookie("admin-id", admindata.username, { path: "/" })
                    navigate('/admin-dash')
                }



            } catch (error:any) {
                console.log("Login error:", error);
                alert(error?.response?.data?.message||"Login failed")
            }
        }
    })
    return (
        <div className="w-sm m-8 p-4 ">

            <form className="shadow-md rounded  p-4 bg-white" onSubmit={formik.handleSubmit}>
                <label className="font-bold text-gray-500 m-3 text-2xl text-center block" >Admin Login</label>
                <dl>
                    <dt className="font-bold text-gray-500 text-base my-3 ">User
                        Id</dt>
                    <dd><input className="formControl" type="text" name="username" onChange={formik.handleChange} /></dd>
                    <dt className="text-gray-500 font-bold text-base my-3">Password</dt>
                    <dd><input type="password" className="formControl" name="password" onChange={formik.handleChange} /></dd>

                </dl>
                <div className="mt-8">
                    <button className="btnSuccess">Login</button>
                    <Link to="/"><button className="btnError ml-3">Cancel</button></Link>
                </div>
                <div className="mt-4 p">
                    <Link to="/register-admin"><button className="py-0.5 rounded  px-4 bg-cyan-800 text-white hover:drop-shadow-lg hover:-translate-y-1 hover:scale-105 hover:bg-cyan-900 transition duration-150 ease-in-out"  >Register New User!</button></Link>
                </div>

            </form>
        </div>
    )
}