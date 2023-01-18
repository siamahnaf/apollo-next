const styles = {
    Dialog: {
        "& .MuiPaper-root": {
            borderRadius: "10px"
        }
    },
    Container: {
        p: "20px",
        textAlign: "center"
    },
    Title: {
        fontSize: "25px",
        fontWeight: 500
    },
    RiveContainer: {
        width: "220px",
        height: "220px",
        mx: "auto"
    },
    ButtonGroups: {
        button: {
            flex: 1,
            fontSize: "16px",
            py: "7px",
            borderRadius: "5px",
            color: "background.default",
            fontWeight: 500,
            "&.success": {
                bgcolor: "primary.main",
                position: "relative"
            },
            "&.danger": {
                bgcolor: "primary.danger"
            }
        }
    },
    CircularLoading: {
        position: "absolute",
        color: "background.default",
        right: "5%"
    }
}

export default styles;