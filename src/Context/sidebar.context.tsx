import { createContext } from "react";

//Types
interface Context {
    active: boolean;
    setActive: Function;
    search?: string;
    setSearch: Function;
}

export const SidebarContext = createContext<Context>({
    active: false,
    setActive: () => false,
    setSearch: () => ""
})