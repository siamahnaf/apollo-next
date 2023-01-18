const styles = {
    InputField: {
        bgcolor: "background.default",
        color: "text.primary",
        fontSize: "16px",
        p: "15px 15px",
        pl: "50px",
        borderRadius: "0.75rem 0.75rem 0 0.75rem",
        transition: "0.3s ease",
        textarea: {
            transition: "152ms",
            "::placeholder, ::-webkit-input-placeholder, :-moz-placeholder, ::-moz-placeholder, :-ms-input-placeholder, ::input-placeholder, ::placeholder": {
                fontWeight: 600
            }
        }
    },
    Appendix: {
        position: "absolute",
        right: -9,
        bottom: -9
    },
    ButtonSend: {
        bgcolor: "background.default",
        color: "primary.main",
        borderRadius: "50%",
        width: "52px",
        height: "52px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        svg: {
            fontSize: "24px",
            ml: "2px"
        }
    },
    EmojiButton: {
        position: "absolute",
        top: 0,
        height: "100%",
        left: "0",
        width: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        svg: {
            fontSize: "21px"
        }
    },
    FileButton: {
        cursor: "pointer",
        svg: {
            fontSize: "18px"
        }
    },
    EmojiPicker: {
        position: "absolute",
        bottom: "110%",
        left: 0,
        pointerEvents: "none",
        "&:after": {
            content: '""',
            position: "absolute",
            width: "50px",
            bottom: "-58px",
            height: "62px"
        },
        "&.active": {
            pointerEvents: "unset",
        }
    }
};

export default styles;