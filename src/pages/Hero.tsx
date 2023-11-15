import { useEffect, useRef } from 'react'
import heroimg from "../assets/books.png"
import { getAllBooks } from "../redux/reducers/menuSlice"
import { useAppDispatch, useAppSelector } from "../redux/useTypedSelector"
import {useNavigate} from "react-router-dom"
import Spinner from '../components/Spinner'


const Hero = () => {
    const {data, loading} = useAppSelector((state)=>state.book)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const ref = useRef(null)
    
    useEffect(() => {
        if(!data?.data){
            dispatch(getAllBooks('page=1'))
        }
    }, [])
    
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        // @ts-ignore
        if(ref?.current?.value !== "") navigate('/search', {state:{searchText:ref?.current?.value}})
        

    }

  return (
    <div className="py-24 w-full flex justify-center items-center">
        <div className="bg-gradient-to-r from-blue-100 to-sky-300 w-[96%] lg:w-4/5 h-[90%] py-3 rounded-3xl backdrop-blur-md  shadow-xl flex justify-center flex-wrap">
                <div className="w-full md:w-1/2 flex flex-col items-center ">
                    <img className="w-96" src={heroimg} alt="" />
                    <div className="flex  gap-10 p-2 ">
                        <div className="text-center">
                            {loading ?
                        <Spinner/>
                        :    
                            <p className="text-blue-800 text-5xl font-bold">{data?.pagination?.totalElements}</p>
                            }
                            <p className="text-gray-600 text-xl">Books availaible</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6">
                    <p className="text-3xl text-white text-center"><span className="text-4xl font-semibold text-gray-700 ">Read It</span> where your journey of book hunting ends.</p>
                    <form className="flex gap-4" onSubmit={handleSubmit}>
                    <input className="p-2 rounded-md outline-none w-56" type="search" placeholder="Search you book" ref={ref} />
                        <button type='submit' className="bg-blue-800 text-white p-2 rounded-md shadow">Search</button>
                    </form>
                    <p>or</p>
                    <button onClick={()=>navigate("/search")} className="bg-blue-800 text-white p-2 rounded-md shadow">Browse All</button>
                </div>
        </div>
        </div>
  )
}

export default Hero