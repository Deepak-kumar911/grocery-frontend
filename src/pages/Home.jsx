import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner'
import { IoMdArrowDropup } from 'react-icons/io';
import { IoMdArrowDropdown } from 'react-icons/io';
import { getAllProducts } from '../services/utilites';
import { MdOutlineCancel } from 'react-icons/md'
import { CiFilter } from 'react-icons/ci'
import { allCategory } from '../services/utilites';
import { mainContext } from '../App';
import { useContext } from 'react';
import {VscAdd} from 'react-icons/vsc';
import {AiOutlineMinus} from 'react-icons/ai'
import { orderProducts } from '../services/utilites';
import { toast } from 'react-toastify';


export const Home = () =>{
    const context = useContext(mainContext)
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    const [popup, setPopup] = useState(false);
    const [popupContent, setPopupContent] = useState([])
    const [SearchQuery, setSearch] = useState("")
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState({ category: "", price: "" })
    const [filterData, setFilterData] = useState([])
    const [toggleFilter, setToggleFilter] = useState(false)
    const [orderAsc,setOrderAsc] = useState('')
    const [orderDsc,setOrderDsc] = useState('')
    
    
    useEffect(() => {
        async function fetch() {
            const res = await getAllProducts()
            const result = await allCategory()
            // console.log(res,"response");
            if (Array.isArray(res) && Array.isArray(result)) {
                // console.log(res,"result");
                setProducts([...res])
                setCategories([...result])
                setLoading(false)
                setFilterData([...res])
            }
        } fetch()
    }, [])
    
    useEffect(() => {
        if (SearchQuery.length > 2) {
            const result = filterData.filter(data => data.name.includes(SearchQuery.toLowerCase()) || data.category.includes(SearchQuery.toLowerCase()));
            setFilterData([...result])
        } else {
            setFilterData([...products])
        }
    }, [SearchQuery])
    
    // console.log(context,"context");
    
    const addProduct = (product)=>{
        const qtyProduct = {...product,qty:1}
        context.dispatch({type:"add",payload:qtyProduct})
        // console.log(qtyProduct,"addproduct");
        // console.log(context,"context");
    }


    const handlePopup = (product) => {
        setPopupContent(product);
        setPopup(true)
    }

    const cancelPopup = () => {
        setPopupContent([]);
        setPopup(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value })
    }

    const handleApply = () => {
        // setSearch("")
        if ((filter.category && filter.price)) {
            // console.log("calling both");
            const categoryData = products.filter(product => product.category === filter.category);
            if (filter.price === "HighToLow") {
                const HighToLow = categoryData.sort((a, b) => b.price - a.price);
                setFilterData([...HighToLow])
            } else {
                const LowToHigh = categoryData.sort((a, b) => a.price - b.price);
                setFilterData([...LowToHigh])
            }
        } else if (filter.category) {
            const categoryData = products.filter(product => product.category === filter.category);
            setFilterData([...categoryData])
        } else if (filter.price) {
            if (filter.price === "HighToLow") {
                const HighToLow = filterData.sort((a, b) => b.price - a.price);
                setFilterData([...HighToLow])
            } else {
                const LowToHigh = filterData.sort((a, b) => a.price - b.price);
                setFilterData([...LowToHigh])
            }
        }
        setToggleFilter(false)
    }

    const handleReset = () => {
        setFilter({ category: "", price: "" });
        setFilterData([...products])
        setToggleFilter(false)
    }

    const handleClickFilter = () => {
        setToggleFilter(!toggleFilter)
        setSearch("")
    }

    const handleDescending = (elm)=>{
        const data = filterData.sort((a, b) => {
            const elm1 = a[elm].toLowerCase();
            const elm2 = b[elm].toLowerCase();
            let comparison = 0;
            if (elm1 < elm2) {
              comparison = 1
            } else if (elm1 > elm2) {
              comparison = -1
            }
            return comparison;
          })
          setOrderAsc('')
          setOrderDsc(elm)
          setFilterData([...data])
    }

    const handlAscending = (elm)=>{
            const data = filterData.sort((a, b) => {
              const elm1 = a[elm].toLowerCase();
              const elm2 = b[elm].toLowerCase();
              let comparison = 0;
              if (elm1 > elm2) {
                comparison = 1
              } else if (elm1 < elm2) {
                comparison = -1
              }
              return comparison;
            })
            setFilterData([...data])
            setOrderAsc(elm)
            setOrderDsc('')
    }
   
    const handleOrder = async() =>{
        if(context?.state.length>0){
         const res =  await orderProducts(context?.state);
        //  console.log("resultOrder",res);
         if(res?.success===true && res.value){
            context.dispatch({type:"clearAll"})
            toast.success("Your order has placed!")
            //  {success: true, value: {…}}
         }else if(res.success===false){
            toast.error(res.reason)
         }
         }
    }


    return (
        <div className='flex flex-col  justify-center items-center  w-[90%]  mx-auto'>
            {loading ? <div className='h-[90vh] flex flex-col justify-center items-center'> <TailSpin height="80" width="80" color='#4fa94d' ariaLabel='tail-spin-loading' radius="1" wrapperStyle={{}} wrapperClass='' visible={true} /></div>
                : <div className='w-[100%] '>
                    <div className='relative'>
                        <div className='flex justify-between items-center my-5 w-[100%]'>
                            <h2 className='text-xl text-green-600'>Grocery List</h2>
                            <div className='flex items-center justify-center gap-x-2 w-[60%] md:w-[20%]'>
                                <input type="text" name="search" value={SearchQuery} onChange={(e) => setSearch(e.target.value)} className='outline-none border border-green-500 rounded-md h-[2rem] px-3 w-[85%] ' placeholder='Search' />
                                <div className={` ${toggleFilter ? "bg-indigo-600" : "bg-green-500"} h-[2rem] flex justify-center items-center px-2 py-1 text-white rounded-md`}>
                                    <CiFilter className='text-xl ' onClick={handleClickFilter} />
                                </div>
                            </div>
                        </div>
                        <div className={`${toggleFilter ? 'absolute right-0 z-40 bg-indigo-500 p-3 rounded-md w-[30%]' : "hidden"}`}>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex justify-between w-[100%]'>
                                    <h2>Category:</h2>
                                    <select name="category" id="category" value={filter.category} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3 w-[70%]'>
                                        <option value="">--Select</option>
                                        {categories.map(category => <option key={category._id} value={category.name} className='capitalize'>{category.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='flex justify-between w-[100%]'>
                                    <h2>Price:</h2>
                                    <select name="price" id="price" value={filter.price} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3 w-[70%]'>
                                        <option value="">--Select</option>
                                        <option value="HighToLow" className='capitalize'>High to Low</option>
                                        <option value="LowToHigh" className='capitalize'>Low to High</option>
                                    </select>
                                </div>
                                <div className='flex gap-x-3 text-white'>
                                    <button className='bg-green-500 px-2 py-1 rounded-md' onClick={handleApply}>Apply</button>
                                    <button className='bg-green-500 px-2 py-1 rounded-md' onClick={handleReset}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* tablelayout */}
                    <div className="relative overflow-x-auto w-[100%]">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        S.No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center gap-x-2">
                                            Category
                                            <div className='flex flex-col '>
                                                <IoMdArrowDropup className={`${orderAsc === "category" ? "text-slate-800" : "text-slate-400"} cursor-pointer`} onClick={() => handlAscending("category")} />
                                                <IoMdArrowDropdown className={`${orderDsc === "category" ? "text-slate-800" : "text-slate-400"} cursor-pointer`} onClick={() => handleDescending("category")} />
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center gap-x-2">
                                            Product
                                            <div className='flex flex-col '>
                                                <IoMdArrowDropup className={`${orderAsc === "name" ? "text-slate-800" : "text-slate-400"} cursor-pointer`} onClick={() => handlAscending("name")} />
                                                <IoMdArrowDropdown className={`${orderDsc === "name" ? "text-slate-800" : "text-slate-400"} cursor-pointer`} onClick={() => handleDescending("name")} />
                                            </div>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                       {context?.state.length>0 ?  <button className='bg-green-500 px-3 py-2 rounded-md text-white' onClick={handleOrder}>Order Now</button> : "Add"} 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData.map((product, ind) => <tr key={product?._id} className="bg-white border-b capitalize cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4" onClick={() => handlePopup(product)}>
                                        {ind + 1}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={() => handlePopup(product)}>
                                        {product?.category}
                                    </th>
                                    <td className="px-6 py-4" onClick={() => handlePopup(product)}>
                                        {product?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(context?.state?.length> 0 && context?.state?.filter(item=>item._id===product._id).length>0) ?
                                        <button className='px-3 py-2 rounded-md bg-green-500 text-white' onClick={()=>context.dispatch({type:"remove",payload:product._id})}><AiOutlineMinus/></button>:
                                        <button className='px-3 py-2 rounded-md bg-red-500 text-white' onClick={()=>addProduct(product)}><VscAdd/></button>
                                        }
                                        </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        <div className={`${popup ? "fixed top-1/2 w-[100%]" : "hidden"} `}>
                            <div className='bg-indigo-700 p-4 rounded-md capitalize text-white text-sm w-[80%] md:w-[30%] mx-auto'>
                                <div className='flex justify-between items-center mb-2'>
                                    <h5 className='text-xl'>Product Details</h5>
                                    <MdOutlineCancel className='text-white text-2xl cursor-pointer' onClick={cancelPopup} />
                                </div>
                                <p>Product Name: {popupContent?.name}</p>
                                <p>Category: {popupContent?.category}</p>
                                <p>Price: {popupContent?.price}</p>
                                <p>Stock: {popupContent?.stock}</p>
                                <p>Details: {popupContent?.details}</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
