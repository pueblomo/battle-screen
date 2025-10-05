import type {RowSelectionState} from "@tanstack/react-table";
import {createContext, type Dispatch, type ReactNode, type SetStateAction, useState} from "react";

interface DatatableContextType {
    rowSelection: RowSelectionState | undefined,
    setRowSelection: Dispatch<SetStateAction<object>>
}

const DatatableContext = createContext<DatatableContextType>({
    rowSelection: undefined,
    setRowSelection: () => {
    }
})

const DatatableProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const [rowSelection, setRowSelection] = useState({})

    return (
        <DatatableContext.Provider value={{rowSelection, setRowSelection}}>
            {children}
        </DatatableContext.Provider>
    )
}

export {DatatableProvider, DatatableContext}