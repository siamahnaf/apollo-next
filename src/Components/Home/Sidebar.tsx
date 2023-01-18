import { useState } from "react";
import { Box } from "@mui/material";

//Components
import SidebarHeader from "./Sidebar/SidebarHeader";
import Conversation from "./Sidebar/Conversation";
import Suggestions from "./Sidebar/Suggestions";

//Context
import { SidebarContext } from "Context/sidebar.context";

//Styles
import styles from "Styles/Home/Sidebar.styles";

const Sidebar = () => {
    const [active, setActive] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    return (
        <Box sx={styles.Container}>
            <SidebarContext.Provider value={{ active, setActive, search, setSearch }}>
                <SidebarHeader />
                <Box sx={{ position: "relative", mt: "15px", pr: "3px" }}>
                    <Conversation />
                    <Suggestions />
                </Box>
            </SidebarContext.Provider>
        </Box>
    );
};
export default Sidebar;