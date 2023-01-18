import { useContext, useState, MouseEvent } from "react";
import { Box, Grow, Stack, ClickAwayListener } from "@mui/material";
import Link from "next/link";

//Custom Hook
import { useScrollLock } from "Utilis/hooks/lock-scroll";

//Context
import { SidebarContext } from "Context/sidebar.context";

//Helper function
import { formateDate } from "Utilis/helper";

//Components
import Empty from "./Conversation/Empty";
import SingleCard from "./Conversation/SingleCard";
import Context, { PositionState } from "./Conversation/Context";

//Styles
import styles from "Styles/Home/Suggestion.styles";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "Apollo/Query/user.query";
import { GET_CONVERSATION_LIST } from "Apollo/Query/conversation.query";
import { GetConversationData } from "Apollo/Types/conversation.types";
import { GetProfileData } from "Apollo/Types/user.types";

const Conversation = () => {
    //Query Hooks
    const { data } = useQuery<GetConversationData>(GET_CONVERSATION_LIST, { fetchPolicy: "cache-only" });
    const profileData = useQuery<GetProfileData>(GET_PROFILE);
    //State
    const [context, setContext] = useState<number | null>(null);
    const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
    const [exit, setExit] = useState<boolean>(false);
    //Custom Hook
    const { lockScroll, unlockScroll } = useScrollLock();
    //Context
    const { active } = useContext(SidebarContext);
    //Handler
    const onContextHandler = (e: MouseEvent<HTMLDivElement>, i: number) => {
        e.preventDefault();
        if (context === i) {
            setExit(true)
            setContext(null);
            unlockScroll()
        } else {
            setExit(false)
            setContext(i);
            setPosition({ x: e.pageX, y: e.pageY });
            lockScroll()
        }
    }
    const onClickOutside = (i: number) => {
        if (context === i) {
            setContext(null);
            setExit(true);
            unlockScroll()
        }
    }
    const onClickConfirm = () => {
        setContext(null);
        setExit(true);
        unlockScroll()
    }
    return (
        <Box>
            <Grow in={!active} style={{ transformOrigin: "0 0 0" }} timeout={{ enter: 600, exit: 0 }}>
                <Box sx={styles.ScrollContainer} className="conversation-scroll">
                    {(!data || data.getConversations?.length === 0) ? (
                        <Empty />
                    ) : data?.getConversations?.map((item, i) => (
                        <ClickAwayListener onClickAway={() => onClickOutside(i)} key={i}>
                            <Box sx={{ a: { textDecoration: "none", color: "text.primary" } }}>
                                <Link href={`/${item.id}`}>
                                    <Stack
                                        direction="row"
                                        gap={1}
                                        alignItems="center"
                                        sx={{ ...styles.Card, position: "relative" }}
                                        onContextMenu={(e) => onContextHandler(e, i)}
                                    >
                                        {item.user.id !== profileData.data?.getUser.id ? (
                                            <SingleCard
                                                data={item.user}
                                                message={item.message}
                                            />

                                        ) : (
                                            <SingleCard
                                                data={item.participant}
                                                message={item.message}
                                            />
                                        )}
                                        <Box sx={styles.Times}>
                                            {formateDate(item.updated_at)}
                                        </Box>
                                    </Stack>
                                    <Context
                                        position={position}
                                        active={context === i}
                                        exit={exit}
                                        data={item.user.id !== profileData.data?.getUser.id ? item.user : item.participant}
                                        onClickConfirm={onClickConfirm}
                                        id={item.id}
                                    />
                                </Link>
                            </Box>
                        </ClickAwayListener>
                    ))}
                </Box>
            </Grow>
        </Box>
    );
};
export default Conversation;