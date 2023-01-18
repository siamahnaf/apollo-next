import { useContext } from "react";
import { Box, Stack, IconButton, InputBase, InputAdornment } from "@mui/material";
import { Icon } from "@iconify/react";

//Styles
import styles from "Styles/Home/SidebarHeader.styles";

//Context
import { SidebarContext } from "Context/sidebar.context";

const SidebarHeader = () => {
    //Sidebar Context
    const { active, setActive, search, setSearch } = useContext(SidebarContext);
    return (
        <Box sx={styles.Container}>
            <Stack direction="row" alignItems="center">
                <Box sx={{ position: "relative", mr: "12px" }}>
                    <IconButton sx={styles.IconsContainerMain} className={active ? "inVisible" : ""}>
                        <Box sx={styles.Icons} />
                    </IconButton>
                    <IconButton sx={styles.IconsContainerArrow} onClick={() => setActive(false)} className={active ? "visible" : ""}>
                        <Icon icon="ph:arrow-left" />
                    </IconButton>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <InputBase
                        fullWidth
                        placeholder="Search"
                        startAdornment={<InputAdornment position="start" sx={styles.Adornment}>
                            <Icon icon="material-symbols:search" />
                        </InputAdornment>}
                        sx={styles.InputField}
                        onClick={() => setActive(true)}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </Box>
            </Stack>
        </Box>
    );
};
export default SidebarHeader;