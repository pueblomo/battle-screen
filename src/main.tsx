import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import {MonsterProvider} from "./contexts/monster-context.tsx";
import MainMenu from "@/components/main-menu/main-menu.tsx";
import Battleground from "@/pages/battleground/Battleground.tsx";
import {DatatableProvider} from "@/contexts/datatable-context.tsx";
import {ThemeProvider} from "@/components/theme/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </ThemeProvider>
    </StrictMode>,
)
