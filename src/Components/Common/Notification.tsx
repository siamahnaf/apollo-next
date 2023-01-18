import { Snackbar, Alert, AlertColor } from "@mui/material";
import { Icon } from "@iconify/react";

//Types 
interface Props {
    open: boolean;
    handleClose: () => void;
    severity?: AlertColor;
    message: string;
}

//Styles
const styles = {
    AlertStyles: {
        width: "100%",
        borderRadius: "10px",
        py: "2px",
        px: "10px",
        "& .MuiAlert-icon": {
            mr: "6px",
            mt: "2px",
            svg: {
                fontSize: "18px"
            }
        },
        "& .MuiAlert-action": {
            mt: "1px",
            mr: "-2px",
            svg: {
                fontSize: "17px"
            }
        }
    }
}

export const Notification = ({ open, handleClose, severity = "success", message }: Props) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} iconMapping={{
                success: <Icon icon="ep:success-filled" />,
                error: <Icon icon="fluent:error-circle-16-filled" />,
                warning: <Icon icon="material-symbols:warning-rounded" />
            }} sx={styles.AlertStyles} >
                {message}
            </Alert >
        </Snackbar >
    );
};