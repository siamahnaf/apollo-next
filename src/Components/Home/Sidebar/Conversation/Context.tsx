import { useState } from "react";
import { Box, Grow, List, ListItem, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

//Components
const Confirm = dynamic(() => import("./Context/Confirm"), { ssr: false });

//Styles
import styles from "Styles/Home/Context.styles";

//Types import
import { UsersData } from "Apollo/Types/user.types";

//Types
export interface PositionState {
    x: number;
    y: number;
}
interface Props {
    position: PositionState,
    active: boolean;
    exit: boolean;
    data: UsersData;
    onClickConfirm: () => void;
    id: number;
}

const Context = ({ position, active, exit, data, onClickConfirm, id }: Props) => {
    //State
    const [confirm, setConfirm] = useState<boolean>(false);
    //Handler
    const handleClose = () => {
        setConfirm(false);
    };
    const handleOpen = () => {
        setConfirm(true)
        onClickConfirm()
    }
    return (
        <Grow in={active} timeout={{ enter: 400, exit: exit ? 400 : 0 }} style={{ transformOrigin: "0 0 0" }}>
            <Box sx={{ ...styles.Container, top: position.y, left: position.x }}>
                <List disablePadding sx={styles.List}>
                    <ListItem disableGutters disablePadding>
                        <Icon icon="material-symbols:mark-chat-unread-outline" />
                        <Typography variant="body1" component="span">
                            Mark as unread
                        </Typography>
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                        <Icon icon="ph:archive-box" />
                        <Typography variant="body1" component="span">
                            Archive
                        </Typography>
                    </ListItem>
                    <ListItem disableGutters disablePadding>
                        <Icon icon="ph:flag-bold" />
                        <Typography variant="body1" component="span">
                            Report
                        </Typography>
                    </ListItem>
                    <ListItem disableGutters disablePadding onClick={handleOpen}>
                        <Icon icon="ic:round-delete-outline" />
                        <Typography variant="body1" component="span">
                            Delete
                        </Typography>
                    </ListItem>
                    <Confirm
                        open={confirm}
                        handleClose={handleClose}
                        users={data}
                        id={id}
                    />
                </List>
            </Box>
        </Grow>
    );
};
export default Context;