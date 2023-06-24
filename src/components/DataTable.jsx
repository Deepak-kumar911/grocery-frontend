import { FaTable } from 'react-icons/fa';
import tableData from '@/utilites/tableData'
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import {IoIosArrowBack} from 'react-icons/io'
import {IoIosArrowForward} from 'react-icons/io'


const tablehead = Object.keys(tableData[1])
export const DataTable = () => {
  const [search, setSearch] = useState("")
  const [entries, setEntries] = useState(5)
  const [orderAsc,setOrderAsc] = useState('')
  const [orderDsc,setOrderDsc] = useState('')
  const searchData = search.length === 0 ? tableData : tableData.filter((elm) => elm?.name?.includes(search.toLowerCase()) || elm?.position?.includes(search.toLowerCase()) || elm?.office?.includes(search.toLowerCase())
    || elm?.age?.toString().includes(search.toLowerCase()) || elm?.salary?.toString().includes(search) || elm?.['start date']?.includes(search))
    const [filterData, setFilterData] = useState(searchData)
  const totalPg = Math.ceil(filterData.length / entries);
  const paginationPg = [];
  const [selectedPg, setSelectedPg] = useState(1)
  const firstIndex = (selectedPg - 1) * entries;
  const lastIndex = selectedPg * entries;

  useEffect(() => {
    setSelectedPg(1)
    console.log("calling useeffect");
  }, [filterData])


  for (let i = 1; i <= totalPg; i++) {
    paginationPg.push(i)
  }

  const handleSelectChange = (e) => {
    const { value } = e.target
    setEntries(value)
    setSelectedPg(1)
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
    setSelectedPg(1)
    setFilterData([...searchData])
  }


  const handlAscending = (elm) => {
    if (!(elm === "age" || elm === "salary")) {
      const data = searchData.sort((a, b) => {
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
    } else {
      const datasets = searchData.sort((a, b) => {
        return a[elm] - b[elm]
      })
      setFilterData([...datasets])
      setOrderAsc(elm)
      setOrderDsc('')
    }
  }



  const handleDescending = (elm) => {
    if (!(elm === "age" || elm === "salary")) {
      const data = searchData.sort((a, b) => {
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
    } else {
      const datasets = searchData.sort((a, b) => {
        return b[elm] - a[elm]
      })
      setFilterData([...datasets])
      setOrderAsc('')
      setOrderDsc(elm)
    }
  }

  const handleNext = () => {
    if (selectedPg < totalPg) {
      setSelectedPg(selectedPg + 1)
    }
  }

  const handlePrevious = () => {

    if (selectedPg > 1) {
      setSelectedPg(selectedPg - 1)
    }
  }

  return (
    <div className="border rounded-sm w-[100%]">
      <div className="flex items-center gap-x-2 bg-slate-100 px-2 py-1">
        <FaTable />
        <h6>DataTable Example</h6>
      </div>
      {/* table */}
      <div className="p-2">
        <div className='flex gap-y-3 md:flex-row flex-col md:justify-between'>
          <div className='flex gap-x-3'>
            <p>Show <select name="selectOption" onChange={handleSelectChange} value={entries} className='border outline-none px-3 py-1 focus:border focus:shadow-blue-500 focus:shadow  rounded-md'>
              <option value={5}> 5</option>
              <option value={10}> 10</option>
              <option value={15}> 15</option>
              <option value={20}> 20</option>
            </select> entries</p>
          </div>
          <div className='flex gap-x-2'><h6>Search:</h6> <input type="text" name="search" value={search} onChange={handleSearch} placeholder='Search...' className=' border border-slate-300 px-2 py-1 focus:border focus:shadow-blue-500 focus:shadow outline-none rounded-md' /></div>
        </div>


        {/* tablelayout */}

         <div className="relative my-3 overflow-x-auto  sm:rounded-sm">
          <table className="w-full text-sm border-collapse border border-slate-400 text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tablehead.map(elm => <th key={elm} scope="col" className="px-6 py-3 border border-slate-300">
                  <div className="flex items-center gap-x-2">
                    {elm}
                    <div className='flex flex-col '>
                      <IoMdArrowDropup className={`${orderAsc===elm ? "text-slate-800" : "text-slate-400" } cursor-pointer`} onClick={() => handlAscending(elm)} />
                      <IoMdArrowDropdown className={`${orderDsc===elm ? "text-slate-800" : "text-slate-400" } cursor-pointer`} onClick={() => handleDescending(elm)} />
                    </div>

                  </div>
                </th>)}
              </tr>
            </thead>
            <tbody>
              {filterData.slice(firstIndex, lastIndex).map((user, ind) => <tr key={ind} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user.name}
                </td>
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user.position}
                </td>
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user.office}
                </td>
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user.age}
                </td>
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user["start date"]}
                </td>
                <td className="capitalize px-6 py-4 border border-slate-300">
                  {user.salary}
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div> 


        <div className='md:flex md:justify-between md:items-center'>
          <p>Showing {filterData.length===0 ? firstIndex : firstIndex + 1} to {(filterData.length > lastIndex) ? lastIndex : lastIndex - (lastIndex - filterData.length)} of {filterData.length} entries</p>
          {/* pagination      */}
          <nav aria-label="Page navigation example" className='w-[80vw] md:w-fit overflow-x-auto'>
            <ul className="flex ">
              <li onClick={handlePrevious} className="block px-3 py-2 ml-0 leading-tight text-blue-600 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <IoIosArrowBack/>
              </li>

              {paginationPg.map(pg => <li key={pg} onClick={() => setSelectedPg(pg)} className={` cursor-pointer px-3 py-2 leading-tight text-blue-600 ${selectedPg === pg ? "bg-slate-400" : "bg-white"}  border border-gray-300   dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{pg}</li>
              )}

              <li onClick={handleNext} className="block px-3 py-2 leading-tight text-blue-600 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <IoIosArrowForward/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
