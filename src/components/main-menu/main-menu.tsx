import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu.tsx";
import {NavLink, Outlet, useLocation} from "react-router";
import {useEffect, useState} from "react";

export default function MainMenu() {
    const [activeToggle, setActiveToggle] = useState<{
        monster: boolean,
        battleground: boolean,
        treasure: boolean
    }>({monster: true, battleground: false, treasure: false})
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        if (path === "/" || path === "") {
            setActiveToggle({
                monster: true,
                battleground: false,
                treasure: false
            })
        } else if (path.endsWith("/battleground")) {
            setActiveToggle({
                monster: false,
                battleground: true,
                treasure: false
            })
        } else if (path.endsWith("/treasure")) {
            setActiveToggle({
                monster: false,
                battleground: false,
                treasure: true
            })
        }
    }, [location])

    return (
        <div style={{backgroundImage: `url('${import.meta.env.BASE_URL}background.png')`}} className="w-dvw min-h-dvh">
            <div className="grid justify-items-center pt-8">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={activeToggle.monster ? "underline" : ""}>
                                <NavLink to={"/"}>
                                    Monsters
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={activeToggle.battleground ? "underline" : ""}>
                                <NavLink to={"/battleground"}>
                                    Battleground
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={activeToggle.treasure ? "underline" : ""}>
                                <NavLink to={"/treasure"}>
                                    Treasure
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <Outlet/>
        </div>
    )
}