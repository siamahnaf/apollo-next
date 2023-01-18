import { forwardRef, ReactElement, Ref, useContext, useEffect, useState, SyntheticEvent } from "react";
import { Dialog, Box, Stack, Typography, ButtonBase, Grow, CircularProgress } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import Rive from "@rive-app/react-canvas";
import { getCookie } from "cookies-next";

//Styles
import styles from "Styles/Home/MessageRequest.styles";

//Component
import { Notification } from "Components/Common/Notification";

//Context
import { SidebarContext } from "Context/sidebar.context";
import { ConversationCtx } from "Context/conversation.context";

//Types import
import { UsersData } from "Apollo/Types/user.types";

//Apollo
import { useMutation } from "@apollo/client";
import { CREATE_CONVERSATION, GET_CONVERSATION_LIST } from "Apollo/Query/conversation.query";
import { CreateConversationData } from "Apollo/Types/conversation.types";

//Types
interface Props {
    open: boolean;
    handleClose: () => void;
    users: UsersData
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

const MessageRequest = ({ open, handleClose, users }: Props) => {
    //Mutation hooks
    const [createConversation, { data, error, loading }] = useMutation<CreateConversationData>(CREATE_CONVERSATION, {
        awaitRefetchQueries: true,
        refetchQueries: [{
            query: GET_CONVERSATION_LIST,
            context: { headers: { authorization: `Bearer ${getCookie("session")}` } }
        }]
    });
    //State
    const [notification, setNotification] = useState<boolean>(false);
    //Context
    const { setActive } = useContext(SidebarContext);
    const { setSelected } = useContext(ConversationCtx);
    //Handler -- notification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    //On Create Handler
    const onCreate = () => {
        createConversation({ variables: { conversationInput: { participant: users.id } } });
    };
    //Effect Hooks
    useEffect(() => {
        if (error) {
            setNotification(true)
        }
        if (data?.createConversation.success) {
            setActive(false)
            setSelected(data.createConversation.conversationId)
            handleClose()
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
                <Typography variant="h5" component="h5" sx={styles.Title}>
                    Say Hi to {users.firstName}{" "}{users.lastName}
                </Typography>
                <Box sx={styles.RiveContainer}>
                    <Rive src="https://res.cloudinary.com/dub0dpenl/raw/upload/v1672840401/Pie%20chat/rive/2063-4080-flutter-puzzle-hack-project_1_wf7qkv.riv" width={6000} />
                </Box>
                <Stack direction="row" gap={1} sx={styles.ButtonGroups}>
                    <ButtonBase className="success" disabled={loading} onClick={onCreate}>
                        {loading ? "SENDING..." : "Say Hi"}
                        {loading &&
                            <CircularProgress
                                size={16}
                                sx={styles.CircularLoading}
                            />
                        }
                    </ButtonBase>
                    <ButtonBase className="danger" onClick={handleClose}>
                        Cancel
                    </ButtonBase>
                </Stack>
            </Box>
        </Dialog>
    );
};
export default MessageRequest;