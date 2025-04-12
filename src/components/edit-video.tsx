import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CategoriesContract } from "../contract/categoreisContract";
import { useFormik } from "formik";
import axios from "axios";
import { VideoContract } from "../contract/videoContract";

export function EditVideo(){
    const [categories, setCategories] = useState<CategoriesContract[]>();
    const [video, setVideo] = useState<VideoContract>({ _id:"", Title:'', URL:'', Description:'', Likes:0, Dislikes:0,Views:0, Comments:[], CategoryId:""})

    let param =useParams();
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            _id:video._id,
            Title:video.Title,
            URL:video.URL,
            Description:video.Description,
            Likes:video.Likes,
            Dislikes:video.Dislikes,
            Views:video.Views,
            CategoryId:video.CategoryId

        },
        onSubmit:(values)=>{
            axios.put(`http://localhost:5050/api/v1/videos/edit-video/${param.id}`, values);
            alert("Video Edited Successfully")
            navigate("/admin-dash")
        },
        enableReinitialize:true
    })
    

    function loadCategories(){
        axios.get('http://localhost:5050/api/v1/category')
        .then(response=>{

            const formated = response.data.data.map((category:any)=>({
                CategoryId: category._id,
                CategoryName: category.name
            }));
            formated.unshift({CategoryId:"-1", CategoryName:'Select a Category'});
            setCategories(formated);
        })
    }

    useEffect(()=>{
        loadCategories()
        axios.get(`http://localhost:5050/api/v1/videos/get-video/${param.id}`)
        .then(response=>{
            setVideo(response.data.data)
        })

    },[])

    return(
        <div className="bg-white w-sm rounded p-4 m-4 h-130 overflow-auto ">
            <form onSubmit={formik.handleSubmit}>
                <label className="text-2xl font-bold text-gray-500 flex justify-center ">Edit Video</label>
                <dl>
                   
                    <dt className="text-base font-bold  text-gray-500 drop-shadow-lg  my-3">Video Title</dt>
                    <dd><input type="text" value={formik.values.Title} className="formControl" name="Title" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-3">URL</dt>
                    <dd><input type="text" value={formik.values.URL} className="formControl" name="URL" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg  my-3">Description</dt>
                    <dd>
                        <textarea name="Description" value={formik.values.Description} cols={40} rows={4} className="formControl" onChange={formik.handleChange}  ></textarea>
                    </dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Likes</dt>
                    <dd><input type="number"  value={formik.values.Likes}className="formControl" name="Likes" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes} className="formControl" name="Dislikes" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2" >View</dt>
                    <dd><input type="number" value={formik.values.Views} className="formControl"  name="Views" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Select a Category</dt>
                    <dd>
                        <select className="formControl" value={formik.values.CategoryId} name="CategoryId" onChange={formik.handleChange} >
                            {
                                categories?.map(category=>
                                    <option value={category.CategoryId} key={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>

                    </dd>
                </dl>

                
                <div className="mt-8">
             <button type="submit" className="btnSuccess" >Update</button>
             <Link to="/admin-dash"><button className="btnError ml-4" >Cancel</button></Link>
             </div>
            </form>
        </div>
    )
}