import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        borderRight: (theme: Theme) => `1px solid ${theme.palette.primary.border}`,
        height: "100vh"
    }
};

export default styles;