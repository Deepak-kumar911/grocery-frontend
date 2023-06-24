import { RxHamburgerMenu } from 'react-icons/rx';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiCaretDown } from 'react-icons/bi';
import { HiOutlineSearch } from 'react-icons/hi'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useAppContext } from '../context/context';
import { useState } from 'react';
import { mainContext } from '../App';
import { useContext } from 'react';

export const Header = () => {
    const context = useAppContext()
    const [toggle,setToogle] =useState(false);
    const maincontext = useContext(mainContext)

    return (
        <header className="flex bg-green-500 h-[2.8rem] justify-between text-white items-center p-5">
            <h2 className='md:w-[15%] text-lg'>Grocery</h2>
            <div className='md:w-[85%] flex md:justify-between gap-x-2 md:gap-0 md:items-center'>
                <RxHamburgerMenu className='order-2 md:order-1 text-lg text-white' onClick={()=>context.setToggle(!context.toggle)}  />
                <div className='flex items-center gap-x-4 order-1 md:order-2'>
                    <div className='md:flex hidden md:visible bg-white pl-1 h-7 rounded-sm justify-between'>
                        <input type="text" className='px-2 w-[80%] text-slate-500 outline-none'  name="search" id="" placeholder='Search for...' />
                        <div className='flex rounded-r-sm items-center justify-center bg-indigo-500 w-[15%]'>
                            <HiOutlineSearch className='text-white' />
                        </div>
                    </div>
                    <div className='relative'>
                  <AiOutlineShoppingCart/>
                  {maincontext?.state?.length>0 && <div className='bg-indigo-600 absolute top-0 right-0 w-[0.5rem] h-[0.5rem] rounded-full'></div> }
                    </div>

                    <div className='flex relative items-center text-lg text-white cursor-pointer' onClick={()=>setToogle(!toggle)}>
                        <BsFillPersonFill />
                        <div className=''>
                        <BiCaretDown className='text-md' />
                        <div  className={`${toggle ? "visible" : "hidden"} flex flex-col gap-y-2 z-10 bg-white text-indigo-600 absolute mt-2 rounded-md w-fit text-md  -ml-[7rem] border border-slate-300`}>
                            <li className='list-none px-3 hover:bg-slate-200 '>Setting</li>
                            <li className='list-none px-3 hover:bg-slate-200 '>Activity Log</li>
                            <li className='list-none border-t px-3 border-slate-400 hover:bg-slate-200 '>Logout</li>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
