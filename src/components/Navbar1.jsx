import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsShop, BsPersonCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import { useState } from 'react';
import { mainContext } from '../App';
import { useContext } from 'react';

export const Navbar = () => {
    const [toggle,setToggle] = useState(false)
    const context = useContext(mainContext)
    return (
        <div className='bg-green-500 text-white'>
        <div className='flex justify-between bg-green-500 text-white h-[5vh] px-5 items-center'>
            <div className='flex items-center text-xl gap-2'><h2>Grocery</h2><BsShop /></div>
            <div className='flex gap-3'>
                <ul className='md:flex gap-2 hidden md:visible'>
                    <Link to="/" className=''><li >Home</li></Link>
                    <Link to="/create new product"><li >New Product</li></Link>
                    <Link to="/admin page"><li >Admin</li></Link>
                </ul>
                <div className='flex gap-2 text-xl items-center'>
                    <div className='relative'>
                  <AiOutlineShoppingCart/>
                  {context?.state?.length>0 && <div className='bg-indigo-600 absolute top-0 right-0 w-[0.5rem] h-[0.5rem] rounded-full'></div> }
                    </div>
                  <BsPersonCircle/>
                  <GiHamburgerMenu className='md:hidden' onClick={()=>setToggle(!toggle)}/>
                </div>
            </div>
        </div>
        <ul className={`${toggle ? "flex flex-col px-5 py-2 gap-2" : "hidden"}  md:hidden`}>
                    <Link to="/" className='' onClick={()=>setToggle(false)}><li >Home</li></Link>
                    <Link to="/create new product" onClick={()=>setToggle(false)}><li >New Product</li></Link>
                    <Link to="/admin page" onClick={()=>setToggle(false)}><li >Admin</li></Link>
                </ul>
        </div>
    )
}
