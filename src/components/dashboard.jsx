import { Card } from "./Card";
import { AreaChart } from "./areaChart";
import { Barchart } from "./barchart";
// import { DataTable } from "./DataTable";

export const Dashboard = () => {
    return (
      <div className="p-4">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <div className="px-2 py-2 rounded-sm bg-slate-300 mt-1">
            <h5 className="text-slate-500 ">Dashboard</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
         <Card title="Primary Card" color="bg-indigo-500" border="border-indigo-600"/>
         <Card title="Warning Card" color="bg-yellow-400" border="border-yellow-600"/>
         <Card title="Success Card" color="bg-green-600" border="border-green-700"/>
         <Card title="Danger Card" color="bg-red-500" border="border-red-600"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        <Barchart/>
        <AreaChart/>
        </div>

        {/* <DataTable/> */}
        </div>
    )
  }