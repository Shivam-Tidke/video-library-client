
import axios from "axios";
import { useFormik } from "formik";
import { IoPerson } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export function RegisterUser(){
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      username:'',
      fullName:'',
      password:'',
      email:'',
      mobile:'',

    },
    onSubmit:(user)=>{
      axios.post("http://localhost:5050/api/v1/users/register", user)
      alert("User register successfully")
      navigate("/user-login")

    }
  })
  return(
    <div className="w-sm m-8 p-4 ">
      <form className="bg-white rounded p-4 shadow-2xl h-120 overflow-auto" onSubmit={formik.handleSubmit}>
        <label className="text-gray-500 drop-shadow-lg font-bold text-2xl text-center flex justify-center items-center"> <IoPerson   className="mr-2"/> Register User</label>
        <dl>
          <dt className="font-bold text-base text-gray-500 my-3 drop-shadow-lg">User Name</dt>
          <dd><input type="text" className="formControl" name="username" onChange={formik.handleChange} /></dd>
          <dt className="font-bold text-base text-gray-500 my-3 drop-shadow-lg">Full Name</dt>
          <dd><input type="text" className="formControl" name="fullName" onChange={formik.handleChange} /></dd>
          <dt className="font-bold text-base text-gray-500 my-3 drop-shadow-lg">Password</dt>
          <dd><input type="text" className="formControl" name="password" onChange={formik.handleChange} /></dd>
          <dt className="font-bold text-base text-gray-500 my-3 drop-shadow-lg">Email Id</dt>
          <dd><input type="email" className="formControl" name="email" onChange={formik.handleChange} /></dd>
          <dt className="font-bold text-base text-gray-500 my-3 drop-shadow-lg">Mobile</dt>
          <dd><input type="text" className="formControl" name="mobile" onChange={formik.handleChange} /></dd>
        </dl>

       <div className="mt-5">
       <button className="btnSuccess mr-4">Register</button>
       <Link to="/user-login"><button className="btnError">Existing User Login</button></Link>
       </div>

      </form>
        
    </div>
  )
}