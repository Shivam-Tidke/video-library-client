
import { useEffect, useState } from "react";
import {  IoPencil, IoTrashBin, IoVideocam } from "react-icons/io5";
import { VideoContract } from "../contract/videoContract";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function AdminDash(){
    const [videos, setVideos] = useState<VideoContract[]>();
    const [cookies, , removeCookie] = useCookies(['admin-id'])

    const navigate = useNavigate();

    function LoadVideo():void{
        axios.get("http://localhost:5050/api/v1/videos")
        .then(response=>{
            setVideos(response.data.data

            )
        })
    }

    function handlesignout(){
        try {
            axios.post("http://localhost:5050/api/v1/admins/logout", {},{
                withCredentials:true
            })
            removeCookie('admin-id');
            navigate("/")
        } catch (error) {
            console.log("Logout Failed", error );
        }
    }

    useEffect(()=>{
      LoadVideo();
      
    },[]);


    return(
        <div className="w-80vh bg-white text-gray-500 rounded p-4 m-8">
           <header className="flex justify-between items-center font-bold " >
            <div className="text-2xl">Admin Dashboard - {cookies['admin-id']}</div>
            <button className="btnSuccess" onClick={handlesignout} >Signout</button>
             </header>
             <div>
                <Link to="/add-video" ><button  className="btnSuccess  mt-4 flex justify-center items-center"><IoVideocam className="mr-2"/> Add Video</button></Link>
             </div>
             <table className="table-auto min-w-full border-collapse">
                <thead>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Preview</th>
                    <th className="px-4 py-2 text-left">Action</th>
                </thead>
                <tbody>
                    {
                        videos?.map(video=>
                            <tr key={video._id} className="border-t bg-gray-100">
                                <td className="py-2 px-4">{video.Title}</td>
                                <td className="py-2 px-4"><iframe src={video.URL} width="200" height="100" ></iframe></td>
                                <td className="flex justify-center items-center h-32 px-4 py-2 ">
                                    <Link to={`/edit-video/${video._id}`} ><  IoPencil className="mr-4 text-2xl"/></Link>
                                    <Link to={`/delete-video/${video._id}`}>< IoTrashBin className="mr-4 text-2xl"/></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
             </table>
        </div>
    )
}