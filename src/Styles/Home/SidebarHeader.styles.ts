import { Theme } from "@mui/material/styles";

const styles = {
    Container: {
        pt: "6px",
        pr: "12px"
    },
    InputField: {
        bgcolor: "primary.gray",
        borderRadius: "30px",
        p: "4px 15px",
        fontSize: "17px",
        border: "2px solid transparent",
        transition: "0.15s ease",
        userSelect: "none",
        "&.Mui-focused": {
            borderColor: (theme: Theme) => theme.palette.primary.main,
            bgcolor: "transparent",
            svg: {
                color: "primary.main",
                opacity: 1
            }
        }
    },
    Adornment: {
        svg: {
            fontSize: "23px",
            opacity: 0.5
        }
    },
    IconsContainerMain: {
        width: "42px",
        height: "42px",
        opacity: 1,
        visibility: "visible",
        transition: "0.25s ease",
        transform: "rotate(0deg)",
        "&.inVisible": {
            opacity: 0,
            visibility: "hidden",
            transform: "rotate(180deg)"
        },
    },
    IconsContainerArrow: {
        width: "42px",
        height: "42px",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0,
        visibility: "hidden",
        transition: "0.25s ease",
        transform: "rotate(-180deg)",
        "&.visible": {
            opacity: 1,
            visibility: "visible",
            transform: "rotate(0deg)"
        }
    },
    Icons: {
        width: "1.125rem",
        height: ".125rem",
        bgcolor: "text.primary",
        position: "relative",
        "&::before, &:after": {
            content: "''",
            position: "absolute",
            left: 0,
            width: "1.125rem",
            height: ".125rem",
            bgcolor: "text.primary"
        },
        "&::before": {
            top: "-0.3125rem"
        },
        "&::after": {
            bottom: "-0.3125rem"
        }
    }
};

export default styles;