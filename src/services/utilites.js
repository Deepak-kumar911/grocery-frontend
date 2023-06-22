import axios from 'axios';
import { toast } from 'react-toastify';
const BackendUrl = "https://grocery-backend-olive.vercel.app"


const allCategory =async ()=>{
      try {
        const res = await axios.get(`${BackendUrl}/api/category/all`)
        if(res?.data){
        return res.data
        }
      } catch (err) {
        console.log(err);
      }
}

const createProduct =async (data) =>{
    try {
        const res = await axios.post(`${BackendUrl}/api/product/createNew`,data)
        if(res?.data){
            return res.data
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllProducts =async()=>{
    try {
        const res = await axios.get(`${BackendUrl}/api/product/all`)
        if(res.data){
            return res.data
        }
    } catch (err) {
        console.log(err);
    }
}

const orderProducts = async (products)=>{
//    console.log(products,"order products");
   let orderQty = 0;
   let orderAmt = 0;
   products.forEach(item => {
      orderQty= orderQty+item.qty,
      orderAmt = orderAmt+ (item.qty*item.price)
   });
   const order = {orders:[...products],orderQty,orderAmt}
   try {
      const res = await axios.post(`${BackendUrl}/api/order/createOrder`,order);
      return res?.data;
   } catch (err) {
    if(err && err.response && err.response.status===400){
        console.log("err data",err?.response?.data);
        return err?.response?.data
    }else{
        toast.error("Please try order later")
    }
     console.log("err",err);
   }
//    console.log(order);
}

const getWeekOrder = async ()=>{
    try {
        const res = await axios.get(`${BackendUrl}/api/order/weekOrder`)
        // console.log("res",res);
         return res?.data
    } catch (err) {
        if(err && err.response && err.response.status===500){
            // console.log("err data",err?.response?.data);
            toast.error("Please try later")
        }else{
            toast.error("Some internal issue")
        }
         console.log("err",err);
       }
    }


export {allCategory,
createProduct,
getAllProducts,
orderProducts,
getWeekOrder
}