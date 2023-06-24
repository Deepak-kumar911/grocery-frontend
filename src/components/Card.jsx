import {IoIosArrowForward} from 'react-icons/io'

export const Card = ({title,color,border}) => {
  return (
    <div className={`text-white ${color} rounded-sm `} >
        <h4  className='py-3 px-2'>{title}</h4>
        <div className={`flex justify-between py-1 px-2 items-center border-t  ${border} `}>
           <h6>View Details</h6>
           <IoIosArrowForward/>
        </div>
    </div>
  )
}
