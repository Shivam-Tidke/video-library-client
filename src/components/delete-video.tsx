import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteVideo(){
    const [vid, setVid] =   useState([{VideoId:0, Title:'', Description:'' }])
    let param = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-video/${param.id}`)
        .then(response=>{
            setVid(response.data);
        })
    },[])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-video/${param.id}`)
        navigate('/admin-dash')
    }
    return(
        <div className="p-4 m-8 bg-white rounded w-sm">
            <h3 className="text-gray-500 drop-shadow-lg font-bold text-base ">Are you sure, want to delete?</h3>
            <dl>
                <dt >Title</dt>
                <dd className="text-gray-500 py-4 font-bold drop-shadow-lg">{vid[0].Title}</dd>
                <dd className="text-gray-500 py-4 font-bold drop-shadow-lg">{vid[0].Description}</dd>
            
            </dl>
            <button onClick={handleDeleteClick} className="btnError mr-5">Delete</button>
            <Link to="/admin-dash"><button className="btnSuccess">Cancel</button></Link>
        </div>
    )
}