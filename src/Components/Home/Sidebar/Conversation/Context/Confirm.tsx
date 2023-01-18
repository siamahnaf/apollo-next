import { forwardRef, ReactElement, Ref, useState, useEffect, SyntheticEvent, useContext } from "react";
import { Dialog, Grow, Box, Stack, Typography, ButtonBase, CircularProgress } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import { getCookie } from "cookies-next";
import Image from "next/image";

//Components
import Avatars from "Components/Common/Avatars";
import { Notification } from "Components/Common/Notification";

//Context
import { ConversationCtx } from "Context/conversation.context";

//Styles
import styles from "Styles/Home/Delete.styles";

//Types import
import { UsersData } from "Apollo/Types/user.types";

//Apollo
import { useMutation } from "@apollo/client";
import { GET_CONVERSATION_LIST, DELETE_CONVERSATION } from "Apollo/Query/conversation.query";
import { DeleteConversationData } from "Apollo/Types/conversation.types";

//Types
interface Props {
    users: UsersData;
    open: boolean;
    handleClose: () => void;
    id: number;
}

//Transition Component
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Grow ref={ref} {...props} />;
});

const Confirm = ({ users, handleClose, open, id }: Props) => {
    //Mutation Hooks
    const [deleteCon, { data, loading, error }] = useMutation<DeleteConversationData>(DELETE_CONVERSATION, {
        awaitRefetchQueries: true,
        refetchQueries: [{
            query: GET_CONVERSATION_LIST,
            context: { headers: { authorization: `Bearer ${getCookie("session")}` } }
        }]
    });
    //State
    const [notification, setNotification] = useState<boolean>(false);
    //Context
    const { selected, setSelected } = useContext(ConversationCtx);
    //Handler -- notification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    const onDeleteHandler = () => {
        deleteCon({ variables: { hideConversationInput: { conversationId: id } } })
        if (selected === id) setSelected(null);
    }
    //Effects hook
    useEffect(() => {
        if (error) {
            setNotification(true)
        }
        if (data?.hideConversation.success) {
            handleClose();
        }
    }, [data, error])
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="ds"
            TransitionComponent={Transition}
            sx={styles.Dialog}
        >
            {error &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    message={error?.message}
                    severity={"error"}
                />
            }
            <Box sx={styles.Container}>
                <Stack direction="row" sx={styles.AvatarContainer} gap={1.2} alignItems="center">
                    {users.avatar?.url ? (
                        <Image src={users.avatar.url} alt={users.firstName} width={35} height={35} style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "top center" }} />
                    ) : (
                        <Avatars name={users.firstName} />
                    )}
                    <Typography variant="h6" component="h6">
                        Delete chat
                    </Typography>
                </Stack>
                <Typography variant="body1" component="p" sx={styles.Description}>
                    Permanently delete the chat with {users.firstName}?
                </Typography>
                <Box sx={styles.ButtonGroups}>
                    <ButtonBase className="danger" disabled={loading} onClick={onDeleteHandler}>
                        {loading && <CircularProgress size={14} sx={{ color: "primary.danger", mr: "7px", mb: "-2px" }} />} DELETE JUST FOR ME
                    </ButtonBase><br />
                    <ButtonBase className="success" onClick={() => handleClose()}>
                        CANCEL
                    </ButtonBase>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Confirm;