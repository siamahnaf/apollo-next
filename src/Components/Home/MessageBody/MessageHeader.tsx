import { useContext, useMemo, useState } from "react";
import { Box, List, ListItem, IconButton, Stack, Typography } from "@mui/material";
import TimeAgo from "timeago-react";
import { Icon } from "@iconify/react";
import Image from "next/image";

//Components
import Avatars from "Components/Common/Avatars";

//Context
import { ConversationCtx } from "Context/conversation.context";

//Styles
import styles from "Styles/Home/MessageHeader.styles";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_CONVERSATION_LIST } from "Apollo/Query/conversation.query";
import { GET_PROFILE } from "Apollo/Query/user.query";
import { GetConversationData } from "Apollo/Types/conversation.types";
import { GetProfileData, UsersData } from "Apollo/Types/user.types";

const MessageHeader = () => {
    //Query Hooks
    const { data } = useQuery<GetConversationData>(GET_CONVERSATION_LIST);
    const profileData = useQuery<GetProfileData>(GET_PROFILE);
    //State
    const [conversation, setConversation] = useState<UsersData>({} as UsersData);
    //Context
    const { selected } = useContext(ConversationCtx);
    //Effect hook
    useMemo(() => {
        if (data) {
            const result = data.getConversations?.find((item) => item.id === selected);
            if (result?.user.id !== profileData.data?.getUser.id) {
                setConversation(result?.user as UsersData)
            } else {
                setConversation(result?.participant as UsersData)
            }
        }
    }, [data, selected])
    return (
        <Box sx={styles.Container}>
            <Stack direction="row" alignItems="center">
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" gap={1.2} alignItems="center">
                        {conversation?.avatar?.url ? (
                            <Image src={conversation.avatar.url} alt={conversation.firstName} width={50} height={50} style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "top center" }} />
                        ) : (
                            <Avatars name={conversation?.firstName || ""} />
                        )}
                        <Box>
                            <Typography variant="h6" component="h6" sx={{ fontSize: "18px" }}>
                                {conversation?.firstName}{" "}{conversation?.lastName}
                            </Typography>
                            <Typography variant="body1" component="p" sx={{ mt: "-3px" }}>
                                Last seen <TimeAgo
                                    datetime={conversation?.last_seen || new Date()}
                                    locale='en_US'
                                />
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <List sx={styles.IconList} disablePadding>
                        <ListItem disableGutters disablePadding>
                            <IconButton>
                                <Icon icon="material-symbols:search" />
                            </IconButton>
                        </ListItem>
                        <ListItem disableGutters disablePadding>
                            <IconButton>
                                <Icon icon="mdi:phone-outline" />
                            </IconButton>
                        </ListItem>
                        <ListItem disableGutters disablePadding>
                            <IconButton>
                                <Icon icon="ic:round-perm-media" />
                            </IconButton>
                        </ListItem>
                    </List>
                </Box>
            </Stack>
        </Box>
    );
};

export default MessageHeader;