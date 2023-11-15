import {Link} from "react-router-dom"


const Navbar = () => {
  return (
    <div className='w-full bg-sky-200 shadow '>
        <div className='p-4 w-11/12 flex justify-between items-center'>
            <Link to='/' className="text-2xl font-bold text-blue-900">Read It</Link>
            <div className="flex gap-4">
            <Link to='/addbook' className="text-1xl hover:text-blue-500 transition-all duration-300">Add book</Link>

            </div>
           
        </div>
    </div>
  )
}

export default Navbar