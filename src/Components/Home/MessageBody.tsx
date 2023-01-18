import { Fragment, useContext } from "react";
import { Box } from "@mui/material";

//Components
import MessageHeader from "./MessageBody/MessageHeader";
import Messages from "./MessageBody/Messages";
import Sender from "./MessageBody/Sender";

//Context
import { ConversationCtx } from "Context/conversation.context";

//Styles
import styles from "Styles/Home/MessageBody.styles";

const MessageBody = () => {
    //Context
    const { selected } = useContext(ConversationCtx);
    return (
        <Box sx={styles.Container}>
            {selected &&
                <Fragment>
                    <MessageHeader />
                    <Box sx={styles.Messages}>
                        <Messages />
                        <Sender />
                    </Box>
                </Fragment>
            }
        </Box>
    );
};
export default MessageBody;