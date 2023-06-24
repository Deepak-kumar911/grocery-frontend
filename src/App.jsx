import { Routes, Route } from 'react-router-dom'
import { CreateProduct } from './pages/CreateProduct'
// import { AdminPage } from './pages/AdminPage';
import { Dashboard } from './components/dashboard';
import { createContext } from 'react'
import { useReducer } from 'react'
import { Home } from './pages/Home';
import { AppWrapper } from './context/context'
import { AppContent } from './context/appContent'

const mainContext = createContext()

function App() {
  const initialState = []
  const reducer = (state, action) => {
    if (action.type === "add") {
      return [...state, action.payload]
    } else if (action.type === "remove") {
      const filterData = state.filter(item => item._id !== action.payload);
      return [...filterData]
    }
    else if (action.type === "clearAll") {
      return state = []
    }
    return state;
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <mainContext.Provider value={{ state, dispatch }}>
          <AppWrapper>
        <AppContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/create new product" element={<CreateProduct />} />
              {/* <Route path="/admin page" element={<AdminPage />} /> */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path='*' element={<Home/>}/> 

            </Routes>
        </AppContent>
          </AppWrapper>
      </mainContext.Provider>
    </>
  )
}


export default App
export { mainContext }
