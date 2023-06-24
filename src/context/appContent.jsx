import { Header } from '../components/header';
import { Navbar } from '../components/Navbar';
import { useAppContext } from './context';

export function AppContent({children}){
  const context = useAppContext();
  return (
   <>
  <div className=''>
    <Header/>
    <div className='h-[100%] flex flex-row w-[100%] relative'>
       <Navbar/>
       <div className={`z-8 h-[94vh] overflow-auto  ${context.toggle ? "w-[100%] md:w-[100%]" : "md:w-[85%] w-[100%] mx-auto" }`}>
      {children}
       </div>
    </div>
    </div>
   </>
  )
}