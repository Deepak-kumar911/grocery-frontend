import {FaChartArea} from 'react-icons/fa';
import { getWeekOrder } from '../services/utilites';
import { useEffect,useState } from 'react';
import { TailSpin } from 'react-loader-spinner'


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
        position: 'top',
      }
    },
  };
  
  
  
  
  

export const Barchart = () => {
  const [weekData,setWeekData] = useState({})
  const [loading,setLoading] = useState(true)
  const [label,setLabel] = useState([]);
  const [value,setValue] = useState([])

  useEffect(()=>{
     async function fetch(){
       const result = await getWeekOrder()
      //  console.log("result",result);
      if(result?.success===true){
        setWeekData({...result?.orderData})
        //  console.log("keys",Object.keys(result.value).reverse());
        setLabel(Object.keys(result.orderData).reverse())
        setValue(Object.values(result.orderData).reverse())
        
        setLoading(false);
      }
    }fetch()
  },[])
  
  const labels = label;
  
   const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'No. of Product',
        data: value,
        borderColor: 'rgb(60, 60, 255)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        pointRadius:5,
        pointBackgroundColor:'rgb(0,0,255)',
        pointBorderColor:'rgb(255,255,255)',

      },
    ],
  };

  return (
    <div className="border rounded-sm">
    <div className="flex justify-center items-center gap-x-2 bg-slate-100 px-2 py-1"> 
        <FaChartArea/>
        <h6>No. of Product Add</h6>
    </div>
    <div className="p-2 w-[100%]">
    {loading ? <TailSpin height="80" width="80" color='#4fa94d' ariaLabel='tail-spin-loading' radius="1" wrapperStyle={{}} wrapperClass='' visible={true}/>   
    :<Line options={options} data={data} />
    }
  </div>
</div>
  )
}
