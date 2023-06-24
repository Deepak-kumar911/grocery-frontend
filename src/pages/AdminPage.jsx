// import React, { useState } from 'react'
// import { getWeekOrder } from '../services/utilites'
// import { useEffect } from 'react'
// import {FaRegChartBar} from 'react-icons/fa'
// import { TailSpin } from 'react-loader-spinner'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// export const options = {
//   scales:{
//     x:{grid:{display:false}}
//    },
//   responsive: true,
//   plugins: {
//     legend: {
//       display:false,
//       position: 'bottom',
//     },
//     title: {
//       display: false,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };


// export const AdminPage = () => {
//   const [weekData,setWeekData] = useState({})
//   const [loading,setLoading] = useState(true)
//   const [label,setLabel] = useState([]);
//   const [value,setValue] = useState([])

//    useEffect(()=>{
//      async function fetch(){
//        const result = await getWeekOrder()
//       //  console.log("result",result);
//        if(result?.success===true){
//          setWeekData({...result?.orderData})
//         //  console.log("keys",Object.keys(result.value).reverse());
//          setLabel(Object.keys(result.orderData).reverse())
//          setValue(Object.values(result.orderData).reverse())

//         setLoading(false);
//         }
//       }fetch()
//     },[])

//     // console.log("label",label);
//     // console.log("value",value);
    
//     const labels = label;
    
//      const data = {
//       labels,
//       datasets: [
//         {
//           fill:false,
//           pointBorderColor:'#ffffff',
//           pointBackgroundColor:'#0000FF',
//           pointBorderWidth:2,
//           label: 'No. of Product',
//           data: value,
//           backgroundColor: 'rgb(94, 94, 250)',
//         }
//       ],
//     };
//   //  console.log(weekData);

//   return (
//     <div className='flex flex-col justify-center items-center h-[80vh]'> 
//                 {loading ? <TailSpin height="80" width="80" color='#4fa94d' ariaLabel='tail-spin-loading' radius="1" wrapperStyle={{}} wrapperClass='' visible={true}/>    
//     :  <div className="border h-fit rounded-sm w-[90%] md:w-[50%] mx-auto">
//     <div className="flex items-center gap-x-2 bg-slate-100 px-2 py-1"> 
//         <FaRegChartBar/>
//         <h6>Weekly Report</h6>
//     </div>
//     <div className="p-2 w-[100%]">
//     <Line options={options} data={data} />
//     </div>
// </div>
// }
// </div>

//   )
// }
