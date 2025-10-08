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
        if (location.pathname === "/" || location.pathname === "") {
            setActiveToggle({
                monster: true,
                battleground: false,
                treasure: false
            })
        } else if (location.pathname === "/battleground") {
            setActiveToggle({
                monster: false,
                battleground: true,
                treasure: false
            })
        } else {
            setActiveToggle({
                monster: false,
                battleground: false,
                treasure: true
            })
        }
    }, [location])

    return (
        <>
            <div className="grid justify-items-center">
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
        </>
    )
}