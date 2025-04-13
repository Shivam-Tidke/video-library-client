import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../contract/videoContract";
import { IoIosEye, IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export function UserDash(){
    const [cookie, _setCookie, removeCookie] = useCookies(['username']);
    const [videos, setVideos] = useState<VideoContract[]> ();
    
    let navigate = useNavigate();

    const handlesignout = async ()=>{
        try {
            await axios.post("http://localhost:5050/api/v1/users/logout", {},{
                withCredentials:true
            })

            removeCookie("username", {path:"/"});
            navigate("/user-login")
        } catch (error) {
            console.log("logout failed", error);
            
        }
    };

    useEffect(()=>{
        axios.get("http://localhost:5050/api/v1/videos", {
            withCredentials:true
        })
        .then(response=>{
            setVideos(response.data.data);
        })
        .catch(err => console.error("failed to fatch video:", err));
    }, [])

    return(
      <div className="m-4 p-4 rounded bg-white">
        <h3 className="flex justify-between"><div className=" text-gray-500 text-2xl font-bold  p-2"><span> {cookie['username']} </span><span className="">Dashboard</span></div> <div><button className="btnError" onClick={handlesignout}>Signout</button></div></h3>
          <div className="grid grid-cols-5">
            <div className=" col-span-1">
                <div className=" text-gray-500 ">
                    <label className="text-2xl font-bold  p-2"><IoSearch className=" inline-block "/> Search Video</label>
                    <div className="mt-4 flex justify-between">
                        <input type="text" className=" rounded bg-gray-200 appearance-none border-2 border-gray-200 rounded- w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:drop-shadow-sm focus:border-lime-200"/>
                        <button className=" bg-lime-500 py-1 px-4 text-white font-bold rounded-l-none rounded hover:bg-lime-600 hover:drop-shadow-lg transition duration-150 ease-in-out  " ><IoSearch className="inline-block text-2xl"/></button>
                    </div>
                    <div className="mt-5">

                     <label className="text-2xl font-bold " >Select a Category</label>
                     <select name="" id="" className="formControl mt-4">
                        <option>Select a Category</option>
                        <option value="">Web Devloper</option>
                        <option value="">UI-UX</option>
                     </select>
                    </div>
                </div>

            </div>
            <div className="col-span-4  ">
                <section className="m-4 p-4 flex justify-between text-gray-500">
                    {
                        videos?.map(video=>
                            <div className="max-w-xs rounded drop-shadow-lg overflow-hidden shadow-2xl">
                                <div>
                                    <h2 className="text-gray-500 p-4 text-2xl font-bold">{video.Title}</h2>
                                </div>
                                <div>
                                    <iframe src={video.URL} className=" p-6 w-full" ></iframe>
                                </div>  
                                <div className="p-4 font-bold">
                                    <span><IoIosThumbsUp className="inline-block text-2xl mx-2 "/>{video.Likes}</span>
                                    <span><IoIosThumbsDown className="inline-block text-lg mx-2"/>{video.Dislikes}</span>
                                    <span><IoIosEye className="inline-block text-2xl mx-2" />{video.Views}</span>
                                </div>

                            </div>
                        )
                    }
                </section>
            </div>
        </div>
      </div>
    )
}