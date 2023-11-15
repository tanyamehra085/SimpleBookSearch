import React,{useState} from 'react'
import { useAppDispatch } from '../redux/useTypedSelector';
import {useNavigate} from "react-router-dom"
import { AddBookcall } from '../redux/reducers/menuSlice';
import { countryData } from '../utils/countryData';
import languageData from '../utils/languageData.json';
import bookImg from '../assets/books.png';
import toast from 'react-hot-toast';


type props={
    author:string,
country:string,
language:string,
link:string,
pages:number | string,
title:string,
year:number | string,

  }

const AddBook = () => {
    const [newload, setNewLoad] =useState(false)
    const [inputs,setInputs]= useState<props>({
        author:"",
        country:"",
        language:"",
        link:"",
        pages:"",
        title:"",
        year:"",
      
    })
  
      const navigate = useNavigate()
      const dispatch = useAppDispatch()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
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
        let res = await dispatch(AddBookcall(inputs))
        console.log('res', res)
        if(res?.payload?.message === "Data Added Successfully"){
            toast.success('Book Added Successfully.')
            navigate('/search')
        }else{
            toast.error(res?.payload?.response?.data?.message)
        }
        setNewLoad(false)
    }
  return (
    <div className='mt-32  flex items-center justify-center p-4 flex-wrap'>

        <div className='w-full md:w-[500px] max-sm:w-[97%] flex justify-center shadow-2xl rounded-lg relative'>

<img src={bookImg} alt='image' className='w-[200px] object-contain mx-auto mt-[-150px] absolute'/>

          <div className='p-4  w-full flex flex-col'>
            <p className='text-center my-5 text-blue-700 text-3xl font-bold'>Fill Details of New Book.</p>
         
            <div className=' flex flex-col justify-center items-center gap-6'>

              <input className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.title} name='title' placeholder='Enter Book Name' type="text" />
              <input className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.author} name='author' placeholder='Enter author name' type="text" />
              


              <select className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.language} name='language' placeholder='Enter Book language'>
                <option value=''>Select Language</option>
                {languageData?.map((item, index)=>(
                  <option key={index}>{`${item?.name}`}</option>
                ))}
              </select>

              <select className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.country} name='country' placeholder='Enter Book country'>
              <option value=''>Select Country</option>
              {countryData.map((item, index)=>(
                  <option key={index}>{`${item?.name}`}</option>
                ))}
              </select>
              <input className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.link} name='link' placeholder='Enter Book link' type="text" />
              <input className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.year} name='year' max='9999' placeholder='Enter Book year' type="number" />
              <input className='border-2 border-blue-200 w-11/12 p-2 rounded-xl outline-red-500 ' onChange={handleChange} value={inputs.pages} name='pages' placeholder='Enter Book pages' type="number" />
        
            <button disabled={newload ? true : false} onClick={()=>handleSubmit()} className='bg-blue-500 p-2 text-white hover:bg-blue-800 transition-all duration-300 shadow-lg rounded-full '>{newload ? "Submitting..." :  "Add Book"}</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddBook