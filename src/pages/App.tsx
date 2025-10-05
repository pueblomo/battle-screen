import {useContext} from 'react'
import './App.css'
import {MonsterContext} from "@/contexts/monster-context.tsx";
import {DataTable} from "@/components/data-table/data-table.tsx";
import {columns} from "@/components/data-table/columns.tsx";

function App() {
    const {monsters} = useContext(MonsterContext)

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={monsters}/>
        </div>
    )
}

export default App
