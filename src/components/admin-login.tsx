import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AdminLogin(){
    let navigate = useNavigate();
    const[cookie, setCookie, removeCookie] = useCookies('admin-id');

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },

        onSubmit:  (admin) =>{
            axios.get('http://127.0.0.1:5050/get-admin')
            .then(response=>{
                var user = response.data.find((item:any)=>item.UserId===admin.UserId);
                if(user){
                   if(admin.Password===user.Password){
                    setCookie('admin-id',admin.UserId)
                    navigate('/admin-dash')
                   }else{
                    alert('Invalide Password')
                   }
                }else{
                    alert('Invalide UserId ')
                }
            })
        }
    })
    return(
        <div className="w-sm m-8 p-4 ">
            
            <form className="shadow-md rounded  p-4 bg-white" onSubmit={formik.handleSubmit}>
            <label className="font-bold text-gray-500 m-3 text-2xl text-center block" >Admin Login</label>
            <dl>
                <dt className="font-bold text-gray-500 text-base my-3 ">User 
                    Id</dt>
                <dd><input className="formControl" type="text" name="UserId"  onChange={formik.handleChange} /></dd>
                <dt className="text-gray-500 font-bold text-base my-3">Password</dt>
                <dd><input type="text" className="formControl" name="Password" onChange={formik.handleChange} /></dd>
                
            </dl>
             <div className="mt-8">
             <button  className="btnSuccess" >Login</button>
             <Link to="/"><button className="btnError ml-3" >Cancel</button></Link>
             </div>
             <div className="mt-4 p">
                <Link to="/register-admin"><button className="py-0.5 rounded  px-4 bg-cyan-800 text-white hover:drop-shadow-lg hover:-translate-y-1 hover:scale-105 hover:bg-cyan-900 transition duration-150 ease-in-out"  >Register New User!</button></Link>
             </div>

            </form>
        </div>
    )
}