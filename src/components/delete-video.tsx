import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function DeleteVideo(){
    const [vid, setVid] =   useState({_id:"", Title:"", Description:"" })
    let param = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5050/api/v1/videos/get-video/${param.id}`)
        .then(response=>{
            setVid(response.data.data);
        })
    },[])

    function handleDeleteClick(){
        axios.delete(`http://localhost:5050/api/v1/videos/delete-video/${param.id}`)
        navigate('/admin-dash')
    }
    return(
        <div className="p-4 m-8 bg-white rounded w-sm">
            <h3 className="text-gray-500 drop-shadow-lg font-bold text-base ">Are you sure, want to delete?</h3>
            <dl>
                <dt >Title</dt>
                <dd className="text-gray-500 py-4 font-bold drop-shadow-lg">{vid.Title}</dd>
                <dd className="text-gray-500 py-4 font-bold drop-shadow-lg">{vid.Description}</dd>
            
            </dl>
            <button onClick={handleDeleteClick} className="btnError mr-5">Delete</button>
            <Link to="/admin-dash"><button className="btnSuccess">Cancel</button></Link>
        </div>
    )
}