const styles = {
    Dialog: {
        "& .MuiPaper-root": {
            borderRadius: "10px"
        }
    },
    Container: {
        p: "15px"
    },
    AvatarContainer: {
        "& .MuiAvatar-root": {
            width: "35px",
            height: "35px",
            fontSize: "20px"
        },
        h6: {
            fontWeight: 600,
            fontSize: "20px"
        }
    },
    Description: {
        fontSize: "17px",
        mt: "18px"
    },
    ButtonGroups: {
        mt: "2rem",
        textAlign: "right",
        button: {
            fontSize: "16px",
            fontWeight: 500,
            my: "4px",
            p: "7px 18px",
            borderRadius: "8px",
            transition: "0.3s ease",
            "&.danger": {
                color: "primary.danger",
                "&:hover": {
                    bgcolor: "primary.dangerThin"
                }
            },
            "&.success": {
                color: "primary.main",
                "&:hover": {
                    bgcolor: "primary.mainThin"
                }
            }
        }
    }
}
export default styles;