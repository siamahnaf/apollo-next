import { FC, ReactNode } from "react";
import { Container, Grid, Box } from "@mui/material";

//Components
import Sidebar from "Components/Home/Sidebar";

//Styles
import styles from "Styles/Layout/Layout.styles";

interface Props {
    children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <Container disableGutters maxWidth="xxl">
            <Grid container>
                <Grid item {...{ md: 3.2 }}>
                    <Sidebar />
                </Grid>
                <Grid item {...{ md: 8.8 }}>
                    <Box sx={styles.Container}>
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Layout;