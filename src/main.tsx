import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {MonsterProvider} from "./contexts/monster-context.tsx";
import MainMenu from "@/components/main-menu/main-menu.tsx";
import Battleground from "@/pages/battleground/Battleground.tsx";
import {DatatableProvider} from "@/contexts/datatable-context.tsx";
import {ThemeProvider} from "@/components/theme/theme-provider.tsx";
import Treasure from "@/pages/treasure/Treasure.tsx";
import {SpellProvider} from "@/contexts/spell-context.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <MonsterProvider>
                    <SpellProvider>
                        <DatatableProvider>
                            <Routes>
                                <Route element={<MainMenu/>}>
                                    <Route path="/" element={<App/>}/>
                                    <Route path="/battleground" element={<Battleground/>}/>
                                    <Route path="/treasure" element={<Treasure/>}/>
                                    <Route path="*" element={<Navigate to="/" replace/>}/>
                                </Route>
                            </Routes>
                        </DatatableProvider>
                    </SpellProvider>
                </MonsterProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
)
