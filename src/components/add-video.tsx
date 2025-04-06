import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesContract } from "../contract/categoreisContract";
import { useFormik } from "formik";
import axios from "axios";

export function AddVideo(){
    const[categories, setCategories] = useState<CategoriesContract[]>();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            URL:'',
            Description:'',
            Likes:0,
            DisLikes:0,
            Views:0,
            CategoryId:0,
        
        },
        onSubmit:(video)=>{
            axios.post('http://127.0.0.1:5050/add-video', video)
            .then(()=>{
                alert("Video Added Successfully");
                navigate('/admin-dash')
            })
            
        }
    })

    function loadCategories(){
        axios.get('http://127.0.0.1:5050/get-categories')
        .then(response=>{
            response.data.unshift({CategoryId:"-1", CategoryName:'Select a Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])
    return(
        <div className="bg-white w-sm rounded p-4 m-4 h-130 overflow-auto ">
            <form onSubmit={formik.handleSubmit}>
                <label className="text-2xl font-bold text-gray-500 flex justify-center "> Add New Video</label>
                <dl>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-3" >Video Id</dt>
                    <dd><input type="number" className="formControl" name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg  my-3">Video Title</dt>
                    <dd><input type="text" className="formControl" name="Title" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-3">URL</dt>
                    <dd><input type="text" className="formControl" name="URL" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg  my-3">Description</dt>
                    <dd>
                        <textarea name="Description" cols={40} rows={4} className="formControl" onChange={formik.handleChange}  ></textarea>
                    </dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Likes</dt>
                    <dd><input type="number" className="formControl" name="Likes" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Dislikes</dt>
                    <dd><input type="number" className="formControl" name="Dislikes" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2" >View</dt>
                    <dd><input type="number" className="formControl"  name="Views" onChange={formik.handleChange} /></dd>
                    <dt className="text-base font-bold text-gray-500 drop-shadow-lg my-2">Select a Category</dt>
                    <dd>
                        <select className="formControl" name="CategoryId" onChange={formik.handleChange} >
                            {
                                categories?.map(category=>
                                    <option value={category.CategoryId} key={category.CategoryId}>{category.CategoryName}</option>
                                )
                            }
                        </select>

                    </dd>
                </dl>

                
                <div className="mt-8">
             <button className="btnSuccess" >Add</button>
             <Link to="/admin-dash"><button className="btnError ml-4" >Cancel</button></Link>
             </div>
            </form>
        </div>
    )
}