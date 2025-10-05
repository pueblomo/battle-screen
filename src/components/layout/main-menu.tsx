import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu.tsx";
import {NavLink, Outlet, useLocation} from "react-router";
import {useEffect, useState} from "react";

export default function MainMenu() {
    const [activeToggle, setActiveToggle] = useState<boolean>(true)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveToggle(true)
        } else {
            setActiveToggle(false)
        }
    }, [location])

    return (
        <>
            <div className="grid justify-items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={activeToggle ? "underline" : ""}>
                                <NavLink to={"/"}>
                                    Monsters
                                </NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={!activeToggle ? "underline" : ""}>
                                <NavLink to={"/battleground"}>
                                    Battleground
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