import React,{useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../redux/useTypedSelector'
import { updateBook } from '../redux/reducers/menuSlice'
import bookImg from '../assets/books.png';
import toast from 'react-hot-toast';


type props={
    author:string | undefined,
country:string | undefined,
language:string | undefined,
link:string | undefined,
pages:number | string | undefined,
title:string | undefined,
year:number | string | undefined,
id:number | undefined

  }

const EditBook = () => {
    const data = useAppSelector((state)=> state.book.edit)

    const [newload, setNewLoad] =useState(false)
    const [inputs,setInputs]= useState<props>({
        author:data?.author,
        country:data?.country,
        language:data?.language,
        link:data?.link,
        pages:data?.pages,
        title:data?.title,
        year:data?.year,
        id:data?.id,
    })
  
      const navigate = useNavigate()
      const dispatch = useAppDispatch()
    const handleChange=(e:React.ChangeEvent<HTMLInputElement> )=>{
  
      
      setInputs((prevstate)=>({
        ...prevstate,
        [e.target.name]: e.target.value
      }))
    }

    const handleSubmit=async()=>{
      setNewLoad(true)
      if(Object.values(inputs).includes("")) {
        setNewLoad(false)
        return toast.error('All Fields Are required')
      }
      let res = await dispatch(updateBook(inputs))

      if(res?.payload?.message === "Data Edited Successfully"){
        toast.success('Book Updated Successfully.')
        navigate('/search')
      }else{
        toast.error(res?.payload?.response?.data?.message)
      }
      setNewLoad(false)
  }

  return (
    <div className='mt-32 flex justify-center items-center'>
        <div className="w-full md:w-[500px] max-sm:w-[97%] shadow-2xl flex justify-center relative">
        <img src={bookImg} alt='image' className='w-[200px] object-contain mx-auto mt-[-150px] absolute'/>
          <div className='relative p-4  w-full flex flex-col'>
          <p className='text-center my-5 text-blue-700 text-3xl font-bold'>Edit {inputs?.title}.</p>
            <div className=' flex flex-col justify-center items-center gap-6'>
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.title} name='title' placeholder='Enter Book Name' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.author} name='author' placeholder='Enter author name' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.language} name='language' placeholder='Enter Book language' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.country} name='country' placeholder='Enter Book country' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.link} name='link' placeholder='Enter Book link' type="text" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.year} name='year' placeholder='Enter Book year' type="number" />
              <input className='border-2 border-red-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.pages} name='pages' placeholder='Enter Book pages' type="number" />
        
            <button disabled={newload ? true : false} onClick={()=>handleSubmit()} className='bg-blue-500 p-2 text-white hover:bg-blue-800 transition-all duration-300 shadow-lg rounded-2xl '>{newload ? "Updating..." :  "Update Book"}</button>
            </div>
          </div>
        </div>
    </div>
  )
}


export default EditBook