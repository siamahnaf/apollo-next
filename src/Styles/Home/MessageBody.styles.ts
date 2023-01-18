const styles = {
    Container: {
        background: "url('/bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "relative",
        zIndex: 99,
        "&:after": {
            content: "''",
            background: "url('/bg-pattern.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "top right",
            mixBlendMode: "overlay",
            backgroundSize: "500px auto",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1,
        }
    },
    Messages: {
        px: "16%",
        height: "calc(100vh - 88px)",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    }
};

export default styles;