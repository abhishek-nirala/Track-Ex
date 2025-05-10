import React from 'react'
import RenderTable from '@/component/expense-table/render-table'
import TableSummary from '@/component/table-summary'

export default function page() {
    return (

        <div className="h-screen bg-black text-white ">

            <div className="h-full w-full">

                <div className="block sm:hidden h-full">
                    <div className="top w-full h-[45%] bg-blue-300">Top</div>
                    <div className="mid w-full h-[45%] bg-green-300">Mid</div>
                    <div className="bottom w-full h-[20%] bg-red-300">Bottom</div>
                </div>

                <div className="hidden sm:flex flex-col h-full">
                    {/* top */}
                    <div className="top flex h-1/2 w-full">
                        <div className="left w-1/2 h-full">Left</div>
                        <div className="right w-1/2 h-full">
                            <TableSummary />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className="bottom h-1/2 w-full ">

                        <RenderTable />
                    </div>
                </div>
            </div>
        </div >






    )
}
