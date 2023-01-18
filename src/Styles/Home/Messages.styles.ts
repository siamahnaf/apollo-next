const styles = {
    Container: {
        flex: 1,
        overflowY: "auto",
        scrollbarWidth: "none",
        position: "relative",
        "::-webkit-scrollbar": {
            display: "none"
        }
    },
    RiveContainer: {
        mt: "15%",
        width: "230px",
        height: "300px",
        bgcolor: "#4a8e3a8c",
        borderRadius: "0.75rem",
        p: "12px",
        mx: "auto",
        textAlign: "center",
        color: "background.default",
        h6: {
            fontSize: "17px"
        },
        "& p": {
            fontSize: "16px"
        }
    },
    Rive: {
        width: "160px",
        height: "160px",
        mx: "auto",
        mt: "18px"
    },
    Loading: {
        position: "absolute",
        bgcolor: "background.default",
        borderRadius: "50%",
        p: "8px",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)"
    },
    SenderMessage: {
        textAlign: "right",
        my: "10px",
        position: "relative",
        pr: "9px",
        "& p": {
            bgcolor: "background.default",
            width: "max-content",
            ml: "auto",
            p: "8px 15px",
            borderRadius: "0.75rem 0.75rem 0 0.75rem"
        }
    },
    ReceiverMessage: {
        my: "10px",
        position: "relative",
        pl: "9px",
        "& p": {
            bgcolor: "background.default",
            width: "max-content",
            p: "8px 15px",
            borderRadius: "0.75rem 0.75rem 0.75rem 0"
        }
    },
    Appendix: {
        position: "absolute",
        right: 0,
        bottom: -9
    },
    AppendixTwo: {
        position: "absolute",
        left: 0,
        bottom: -9,
        transform: "scaleX(-1)"
    }
};

export default styles;