
import {useNavigate} from "react-router-dom"
import { useAppDispatch } from '../redux/useTypedSelector';
import { editdata } from '../redux/reducers/menuSlice';

type Props = {
    author: string;
    country: string;
    language: string;
    link: string;
    pages: string;
    title: string;
    year: string;
    id: number;
}

type item={
    item:Props;
}

const BookCard = ({item}: item) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
  return (
    <div onClick={()=>(navigate(`/edit/${item.id}`),dispatch(editdata(item)))} className='w-full md:w-1/2 lg:w-1/3 h-100 shadow-lg p-4 rounded-lg bg-white cursor-pointer hover:scale-105 transition-all delay-500'>
        <div className='flex gap-2'>
        <div className='text-gray-500 text-lg'>
        <p>Book:</p>
        <p>Author:</p>
        <p>Language:</p>
        <p>Country:</p>
        <p>Pages:</p>
        <p>Link:</p>
        <p>Year:</p>
        </div>
        <div className='text-black text-lg'>
        <p>{item?.title}</p>
        <p>{item?.author}</p>
        <p>{item?.language}</p>
        <p>{item?.country}</p>
        <p>{item?.pages}</p>
        <p>{item?.link}</p>
        <p>{item?.year}</p>
        </div>
        </div>
        
    </div>
  )
}

export default BookCard