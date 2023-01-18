import { IBM_Plex_Sans } from "@next/font/google";
import { createTheme } from '@mui/material/styles';

export const ibm = IBM_Plex_Sans({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["sans-serif"],
});

declare module '@mui/material/styles' {
    interface PaletteColor {
        main: string;
        gray: string;
        border: string;
        danger: string;
        blurBg: string;
        blurSelect: string;
        shadow: string;
        dangerThin: string;
        mainThin: string;
    }
    interface PaletteColorOptions {
        main: string;
        gray: string;
        border: string;
        danger: string;
        blurBg: string;
        blurSelect: string;
        shadow: string;
        dangerThin: string;
        mainThin: string;
    }
    interface BreakpointOverrides {
        xs: true;
        ds: true;
        xxs: true;
        sm: true;
        msm: true;
        lsm: true;
        smd: true;
        md: true;
        lg: true;
        xl: true;
        xxl: true;
    }
}


const theme = createTheme({
    palette: {
        mode: "light",
        text: {
            primary: "#1B1B28", // Default Text Color
        },
        background: {
            default: "#ffffff"
        },
        primary: {
            main: "#3390ec", // Main Document Color
            gray: "#f4f4f5", // Gray background color
            border: "#dadce0", // Border color
            danger: "#e65b65", //Danger color
            blurBg: "#ffffffbb", //Blur bg color
            blurSelect: "#00000011", //Blur select color
            shadow: "#72727240", //Blur shadow color
            dangerThin: "#e65b6517", //Danger color thin version
            mainThin: "#3390ec1a", //Main color thin version
        }
    },
    typography: {
        fontFamily: ibm.style.fontFamily
    },
    breakpoints: {
        values: {
            xxs: 0, // Double Extra Small Devices
            ds: 360, //Custom Dialog width
            xs: 360, // Extra Small Devices ---- Default BreakPoints
            sm: 480, // Small Devices ---- Default BreakPoints
            msm: 576, // Medium Small Medium Devices
            lsm: 640, // Large Small Medium Devices
            smd: 768, // Small Medium Devices
            md: 992, // Medium Devices ---- Default BreakPoints
            lg: 1200, // Large Devices  ---- Default BreakPoints
            xl: 1536, // Extra Large Devices ---- Default BreakPoints
            xxl: 1920, // Double Extra Large Devices
        }
    },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    fontFamily: ibm.style.fontFamily
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: "1%"
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    overflow: "hidden",
                    height: "100%"
                }
            }
        }
    }
});

export default theme;