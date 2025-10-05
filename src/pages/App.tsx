import {useContext} from 'react'
import './App.css'
import {MonsterContext} from "@/contexts/monster-context.tsx";
import {DataTable} from "@/components/pages/data-table.tsx";
import {columns} from "@/components/pages/columns.tsx";

function App() {
    const {monsters} = useContext(MonsterContext)

    return (
        <div className="container mx-auto">
            <DataTable columns={columns} data={monsters}/>
        </div>
    )
}

export default App
