const styles = {
    Container: {
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: -1,
        "&.active": {
            zIndex: 1
        }
    },
    ScrollContainer: {
        height: "calc(100vh - 70px)",
        overflowY: "auto",
        pr: "3px",
        scrollbarWidth: "none",
        "::-webkit-scrollbar": {
            width: "6px"
        },
        "::-webkit-scrollbar-track": {
            bgcolor: "background.default"
        },
        "::-webkit-scrollbar-thumb": {
            bgcolor: "#cdcdcd",
            borderRadius: "5px",
            visibility: "hidden"
        },
        "&:hover": {
            "::-webkit-scrollbar-thumb": {
                visibility: "visible"
            },
            scrollbarWidth: "thin"
        }
    },
    Card: {
        cursor: "pointer",
        my: "2px",
        borderRadius: "10px",
        py: "10px",
        px: "10px",
        "&:hover": {
            bgcolor: "primary.gray"
        },
        "&.active": {
            bgcolor: "primary.main",
            color: "background.default"
        }
    },
    Name: {
        fontSize: "17px"
    },
    TimeAgo: {
        fontSize: "14px",
        mt: "-2px"
    },
    Times: {
        position: "absolute",
        fontSize: "13px",
        top: "20%",
        right: "15px",
        pointerEvent: "none"
    }
}

export default styles;