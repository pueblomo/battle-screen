import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {MonsterProvider} from "./contexts/monster-context.tsx";
import MainMenu from "@/components/layout/main-menu.tsx";
import Battleground from "@/pages/battleground/Battleground.tsx";
import {DatatableProvider} from "@/contexts/datatable-context.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <MonsterProvider>
                <DatatableProvider>
                    <Routes>
                        <Route element={<MainMenu/>}>
                            <Route path="/" element={<App/>}/>
                            <Route path="/battleground" element={<Battleground/>}/>
                        </Route>
                    </Routes>
                </DatatableProvider>
            </MonsterProvider>
        </BrowserRouter>
    </StrictMode>,
)
