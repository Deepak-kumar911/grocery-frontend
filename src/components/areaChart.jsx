import {FaRegChartBar} from 'react-icons/fa'
import { getWeekOrder } from '../services/utilites';
import { useEffect,useState } from 'react';
import { TailSpin } from 'react-loader-spinner'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    BarController,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    scales:{
      x:{grid:{display:false}}
     },
    responsive: true,
    plugins: {
      legend: {
        display:false,
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  
  export const AreaChart = () => {
    const [weekData,setWeekData] = useState({})
    const [loading,setLoading] = useState(true)
    const [label,setLabel] = useState([]);
    const [value,setValue] = useState([])
  
    useEffect(()=>{
       async function fetch(){
         const result = await getWeekOrder()
        //  console.log("result",result);
        if(result?.success===true){
          setWeekData({...result?.orderRevenue})
          //  console.log("keys",Object.keys(result.value).reverse());
          setLabel(Object.keys(result.orderRevenue).reverse())
          setValue(Object.values(result.orderRevenue).reverse())
          
          setLoading(false);
        }
      }fetch()
    },[])


    const labels = label
    
     const data = {
      labels,
      datasets: [
        {
          fill:false,
          pointBorderColor:'#ffffff',
          pointBackgroundColor:'#0000FF',
          pointBorderWidth:2,
          label: 'Revenue',
          data: value,
          backgroundColor: ' rgb(60, 60, 255)',
        }
      ],
    };
    return (
      <div className="border rounded-sm">
    <div className="flex justify-center items-center gap-x-2 bg-slate-100 px-2 py-1"> 
        <FaRegChartBar/>
        <h6>Total Revenue</h6>
    </div>
    <div className="p-2 w-[100%]">
    {loading ? <TailSpin height="80" width="80" color='#4fa94d' ariaLabel='tail-spin-loading' radius="1" wrapperStyle={{}} wrapperClass='' visible={true}/>   
: <Bar options={options} data={data} />}
    </div>
</div>
  )
}
