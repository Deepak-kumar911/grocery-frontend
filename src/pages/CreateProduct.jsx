import React, { useEffect, useState } from 'react'
import { allCategory,createProduct } from '../services/utilites'
import { TailSpin } from 'react-loader-spinner'
import {toast} from 'react-toastify'

export const CreateProduct = () => {
    const [Categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [product,setProduct] = useState({name:"",categoryId:"",stock:"",price:"", details:""})

    useEffect(() => {
        async function fetch() {
            const res = await allCategory()
            // console.log(res,"response");
            if (Array.isArray(res)) {
                // console.log(res,"result");
                setCategories([...res])
                setLoading(false)
            }
        } fetch()
    }, [])

    // console.log(Categories,"categories");

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name,categoryId,stock,price,details} = product
        if(name && categoryId && stock && price && details && !isNaN(stock) && !isNaN(price)){
          const res = await createProduct(product);
          if(res){
            toast.success("Product Created!")
            setProduct({name:"",categoryId:"",stock:"",price:"", details:""})
          }
            // console.log(product,"product");
        }else{
            toast.error("Please fill all fields")
        }
    }
    
    return (
        <div className='flex flex-col justify-center items-center h-[80vh] w-[90%] md:w-[40%] mx-auto'>
            {loading ? <TailSpin height="80" width="80" color='#4fa94d' ariaLabel='tail-spin-loading' radius="1" wrapperStyle={{}} wrapperClass='' visible={true}/> 
            : <div className='h-fit w-[100%]'>
                <h3 className='text-xl text-indigo-600 mb-3 font-semibold'>Create New Product</h3>
                <form onSubmit={handleSubmit} className='flex flex-col  gap-y-3 w-[100%]'>
                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3  w-[100%]' placeholder='Product Name' />
                    <select name="categoryId" id="category" value={product.categoryId} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3  w-[100%]'>
                        <option value="">--Select</option>
                        {Categories.map(category=><option key={category._id} value={category._id} className='capitalize'>{category.name}</option>)}
                    </select>
                    <input type="number" name="stock" id="stock" value={product.stock} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3  w-[100%]' placeholder='No. of Stock' />
                    <input type="number" name="price" id="price" value={product.price} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-[2rem] px-3  w-[100%]' placeholder='Product Price' />
                    <textarea name="details" id="details" cols="30" rows="5" value={product.details} onChange={handleChange} className='outline-none border border-green-500 rounded-md h-fit px-3  w-[100%]' placeholder='Product Details...'></textarea>
                    <button type="submit" className='bg-green-500 text-lg text-white hover:bg-indigo-500 h-[2rem] rounded-md'>Create Product</button>
                </form>
            </div>
            }
        </div>
    )
}
