import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { VideoContract } from "../contract/videoContract";
import { IoIosEye, IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export function UserDash(){
    const [cookie, , removeCookie] = useCookies(['username']);
    const [videos, setVideos] = useState<VideoContract[]> ([]);

     const [searchTerm, setSearchTerm] = useState("");
     const [category, setCategory] = useState ("")

     const filteredVideos = videos.filter (video =>
        video.Title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (category === ""|| video.CategoryId === category)
     )



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
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className=" rounded bg-gray-200 appearance-none border-2 border-gray-200 rounded- w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:drop-shadow-sm focus:border-lime-200"/>
                        <button className=" bg-lime-500 py-1 px-4 text-white font-bold rounded-l-none rounded hover:bg-lime-600 hover:drop-shadow-lg transition duration-150 ease-in-out  " ><IoSearch className="inline-block text-2xl"/></button>
                    </div>
                    <div className="mt-5">

                     <label className="text-2xl font-bold " >Select a Category</label>
                     <select value={category} onChange={(e)=> setCategory(e.target.value)} className="formControl mt-4">
                        <option value="">Select a Category</option>
                        <option value="67e8abc98a4f582b54dc2688">Web Developer</option>
                        <option value="67e8abdd8a4f582b54dc268b">UI-UX</option>
                     </select>
                    </div>
                </div>

            </div>
            <div className="col-span-4  ">
                <section className="m-4 p-4 flex justify-between text-gray-500">
                    {
                        filteredVideos?.map(video=>
                            <div key={video._id} className="max-w-xs rounded drop-shadow-lg overflow-hidden shadow-2xl">
                                <div>
                                    <h2 className="text-gray-500 p-4 text-2xl font-bold h-25">{video.Title}</h2>
                                </div>
                                <div>
                                    <iframe src={video.URL} className=" p-6 w-full" allowFullScreen></iframe>
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