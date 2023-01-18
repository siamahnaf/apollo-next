import { useEffect, useContext, Fragment, useRef, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Rive from "@rive-app/react-canvas";
import { getCookie } from "cookies-next";

//Styles
import styles from "Styles/Home/Messages.styles";

//Context
import { ConversationCtx } from "Context/conversation.context";
import { useSocket } from "Context/socket.context";

//Appendix
import { InputAppendix } from "Utilis/svg/Appendix";

//Apollo
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MESSAGE_LIST } from "Apollo/Query/message.query";
import { GET_PROFILE } from "Apollo/Query/user.query";
import { GetMessagesData, MessageData } from "Apollo/Types/message.types";
import { GetProfileData } from "Apollo/Types/user.types";

const Messages = () => {
    //Query Hook
    const [getMessages, { data, loading }] = useLazyQuery<GetMessagesData>(GET_MESSAGE_LIST, {
        context: { headers: { authorization: `Bearer ${getCookie("session")}` } },
        fetchPolicy: "network-only"
    });
    const profileData = useQuery<GetProfileData>(GET_PROFILE);
    //Context
    const { selected, setMessages, messages } = useContext(ConversationCtx);
    const { socket } = useSocket();
    //Ref
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    //Effect Hook
    useEffect(() => {
        getMessages({ variables: { conversation: selected } })
    }, [selected])
    useMemo(() => {
        setMessages(data?.getMessages || [])
    }, [data]);
    useEffect(() => {
        const listener = (message: MessageData) => {
            setMessages((prev: MessageData[]) => [...prev, message])
        };
        socket.on("createMessage", listener);
        return () => {
            socket.off("createMessage", listener);
        };
    }, [socket]);
    useEffect(() => {
        if (containerRef && containerRef.current) {
            const scroll =
                containerRef.current.scrollHeight -
                containerRef.current.clientHeight;
            containerRef.current.scrollTo(0, scroll)
        }
    }, [messages])
    return (
        <Box sx={styles.Container} ref={containerRef}>
            {data?.getMessages &&
                <Fragment>
                    {(data?.getMessages.length === 0 && messages.length === 0) ? (
                        <Box sx={styles.RiveContainer}>
                            <Typography variant="h6" component="h6">
                                No messages here yet...
                            </Typography>
                            <Typography variant="body1" component="p">
                                Send a message or tap on the greeting below.
                            </Typography>
                            <Box sx={styles.Rive}>
                                <Rive src="https://res.cloudinary.com/dub0dpenl/raw/upload/v1672840401/Pie%20chat/rive/2063-4080-flutter-puzzle-hack-project_1_wf7qkv.riv" />
                            </Box>
                        </Box>
                    ) : (
                        <Box>
                            {messages.map((item, i) =>
                                item.sender.id === profileData.data?.getUser.id ? (
                                    <Box key={i} sx={styles.SenderMessage} ref={scrollRef}>
                                        <Typography variant="body1" component="p" >
                                            {item.message.text}
                                        </Typography>
                                        <Box sx={styles.Appendix}>
                                            {InputAppendix}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box key={i} sx={styles.ReceiverMessage} ref={scrollRef}>
                                        <Typography variant="body1" component="p">
                                            {item.message.text}
                                        </Typography>
                                        <Box sx={styles.AppendixTwo}>
                                            {InputAppendix}
                                        </Box>
                                    </Box>
                                )
                            )}
                        </Box>
                    )}
                </Fragment>
            }
            {loading &&
                <Box sx={styles.Loading}>
                    <CircularProgress size={20} sx={{ color: "text.primary", display: "block" }} />
                </Box>
            }
        </Box>
    );
};
export default Messages;