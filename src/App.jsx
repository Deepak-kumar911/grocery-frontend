import {Routes,Route} from 'react-router-dom'
import { CreateProduct } from './pages/CreateProduct'
import { AdminPage } from './pages/AdminPage'
import { Navbar } from './components/Navbar'
import { createContext } from 'react'
import { useReducer } from 'react'
import { Home } from './pages/home'

const mainContext = createContext()

function App() {
  const initialState = []
  const reducer = (state,action)=>{
       if(action.type==="add"){
         return [...state,action.payload]
       }else if(action.type==="remove"){
        const filterData = state.filter(item=>item._id!==action.payload);
        return [...filterData]
       }
       else if(action.type==="clearAll"){
        return state =[]
       }
       return state;
  }

 const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <>
    <mainContext.Provider value={{state,dispatch}}>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create new product" element={<CreateProduct/>} />
        <Route path="/admin page" element={<AdminPage/>} />
      </Routes>
    </mainContext.Provider>
    </>
  )
}

export default App
export {mainContext}
