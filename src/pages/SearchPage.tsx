import {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../redux/useTypedSelector'
import BookCard from '../components/BookCard'
import { getAllBooks } from '../redux/reducers/menuSlice'
import Spinner from '../components/Spinner'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';



const SearchPage = () => {
    const {data, loading} = useAppSelector((state)=> state.book)
    const location = useLocation()
    let searchText = location?.state && location?.state?.searchText
   const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [serchTerm, setSearchTerm] = useState("")
    const [sortValue, setSortValue] = useState("")
    const dispatch = useAppDispatch()

    useEffect(()=>{
        if(!data?.data){
            dispatch(getAllBooks('page=1'))
        }
    },[data])

    useEffect(()=>{
        if(searchText){
            console.log('searchText', searchText)
            setSearchTerm(searchText)
            dispatch(getAllBooks(`title=${searchText}`))
        }
    },[searchText])

    const handlePage = (val:number) =>{
        setPage(val)
        dispatch(getAllBooks(`page=${val}`))
    }


    const handleSubmit = (e:any) =>{
            e.preventDefault()
            dispatch(getAllBooks(`title=${serchTerm}`))
    }

    const handleReset = ()=>{
        setSearchTerm("")
        dispatch(getAllBooks('page=1'))
        navigate('/search',{state:null})
    }

    const handleSort = (value:string) =>{
        setSortValue(value)
        dispatch(getAllBooks(`page=${page}&DIR=${value}`))
    }

  return (
    <div className='p-4'>
        <div className='py-24 w-full bg-gradient-to-r from-cyan-300 to-blue-300 h-[340px] text-center'>
        <h1 className='text-4xl text-blue-700 font-bold mb-2'>Read It</h1>
        <p className='text-white'>Search your favourite book.</p>
        <form className='px-12 w-full md:w-1/2 mx-auto flex' onSubmit={handleSubmit}>
            <input type='search' className='w-[90%] rounded-full shadow h-[50px] px-5' placeholder='Enter book name to search' onChange={(e)=>setSearchTerm(e.target.value)} value={serchTerm}/>
            <button className='w-[120px] h-[50px] bg-blue-700 text-white rounded-full shadow' type='submit'>Search</button>
        </form>
        </div>
        

        <div className=''>
           <div className='flex justify-between items-center'>
            <div>
            <h3 className='text-lg my-4 text-gray-400'>Book List</h3>
            </div>
            <div className='flex items-center'>
                <p>Sort By </p>
                <select className='px-4 py-2 rounded-full shadow' onChange={(e)=> handleSort(e.target.value)} value={sortValue}>
                    <option disabled selected>Select Option</option>
                    <option value='ASC'>Ascending</option>
                    <option value='DESC'>Descending</option>
                    <option value=''>None</option>
                </select>
            </div>
           </div>

            <div className='flex flex-wrap justify-center items-center gap-4'>
                {loading ?
                <Spinner/>
                : !data?.data?.length ?
                <div>
                    <h1 className='my-10 text-red-600 text-center'>No Books Found.</h1>
                <div className='flex justify-center'>
                    <button className='bg-gray-400 shadow rounded-full px-5 py-2 text-white' onClick={handleReset}>Reset</button>
                </div>
                </div>
                    :
                    data?.data.map((item,index)=>(
                        <BookCard item={item} key={index}/>
                    ))
                }
            </div>
            {
            data?.data &&
      <div className='w-[300px] mx-auto my-5'>
      <ResponsivePagination
      current={data?.pagination?.currentPage}
      total={data?.pagination?.totalPages}
      onPageChange={(e)=>handlePage(e)}
        />
      </div>
      }
        </div>
    </div>
  )
}

export default SearchPage