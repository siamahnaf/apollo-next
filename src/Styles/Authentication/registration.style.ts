const styles = {
    LogoContainer: {
        textAlign: "center",
        mb: "35px",
        h4: {
            fontSize: "30px",
            fontWeight: 500,
            mb: "8px"
        },
        "& p": {
            fontSize: "17px",
            opacity: 0.8,
            px: "5%"
        }
    },
    Button: {
        width: "100%",
        bgcolor: "primary.main",
        py: "15px",
        color: "background.default",
        fontSize: "17px",
        textTransform: "uppercase",
        borderRadius: "10px",
        position: "relative"
    },
    CircularLoading: {
        position: "absolute",
        color: "background.default",
        right: "5%"
    },
    AnimationContainer: {
        textAlign: "center"
    },
    RiveContainer: {
        width: "250px",
        height: "250px",
        mx: "auto"
    },
    EmailContainer: {
        justifyContent: "center",
        h5: {
            fontWeight: 500,
            fontSize: "25px",
            mb: "5px"
        }
    },
    Pencil: {
        ml: "6px",
        a: {
            textDecoration: "none",
            color: "text.primary",
            opacity: 0.5,
            svg: {
                fontSize: "18px",
                mb: "-3px"
            }
        }
    },
    Description: {
        fontSize: "17px",
        opacity: 0.8,
        px: "5%",
        mb: "15px"
    },
    VerifyLoading: {
        position: "absolute",
        right: "2%",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none"
    },
    Tips: {
        opacity: 0.8,
        fontSize: "14px",
        textAlign: "center",
        mt: "45px",
        span: {
            fontWeight: 500
        }
    },
}

export default styles;