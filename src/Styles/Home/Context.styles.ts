import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        position: "fixed",
        bgcolor: "primary.blurBg",
        backdropFilter: "blur(10px)",
        boxShadow: (theme: Theme) => `0 0.25rem 0.5rem 0.125rem ${theme.palette.primary.shadow}`,
        borderRadius: "0.75rem",
        zIndex: 999,
        minWidth: "13.5rem",
    },
    List: {
        p: "5px 8px",
        li: {
            my: "2px",
            p: ".25rem 0.75rem",
            borderRadius: ".375rem",
            cursor: "pointer",
            userSelect: "none",
            "&:hover": {
                bgcolor: "primary.blurSelect",
            },
            svg: {
                fontSize: "18px",
                mr: "10px",
                mb: "-2px"
            }
        }
    }
}
export default styles;