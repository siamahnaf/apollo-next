import { useContext, useEffect, useState } from "react";
import { Box, Stack, Grow, Typography } from "@mui/material";
import TimeAgo from "timeago-react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import dynamic from "next/dynamic";

//Avatars
import Avatars from "Components/Common/Avatars";
const MessageRequest = dynamic(() => import("./Suggestions/MessageRequest"), { ssr: false })

//Context
import { SidebarContext } from "Context/sidebar.context";

//Styles
import styles from "Styles/Home/Suggestion.styles";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_USERS_LIST } from "Apollo/Query/user.query";
import { GetUsersData } from "Apollo/Types/user.types";

const Suggestions = () => {
    //Query Hook
    const { data, fetchMore } = useQuery<GetUsersData>(GET_USERS_LIST, { variables: { userPrams: {} } });
    //State
    const [open, setOpen] = useState<number | null>(null);
    //Context
    const { active, search } = useContext(SidebarContext);
    //Handler
    const handleClose = () => {
        setOpen(null);
    };
    //Effect hook
    useEffect(() => {
        const token = getCookie("session")
        fetchMore({
            variables: { userPrams: { search: search } }, context: { headers: { authorization: `Bearer ${token}` } }, updateQuery(_, { fetchMoreResult }) {
                return fetchMoreResult
            }
        })
    }, [search])
    return (
        <Box sx={styles.Container} className={active ? "active" : ""}>
            <Grow in={active} style={{ transformOrigin: "0 0 0" }} timeout={{ enter: 600, exit: 0 }}>
                <Box>
                    {data?.getUsers.map((item, i) => (
                        <Box key={i}>
                            <Stack direction="row" gap={1} alignItems="center" sx={styles.Card} onClick={() => setOpen(i)}>
                                <Box>
                                    {item.avatar?.url ? (
                                        <Image src={item.avatar?.url} alt={item.firstName} width={50} height={50} style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "top center" }} />
                                    ) : (
                                        <Avatars name={item.firstName} />
                                    )}
                                </Box>
                                <Box>
                                    <Typography variant="h6" component="h6" sx={styles.Name}>
                                        {item.firstName}{" "}{item.lastName}
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={styles.TimeAgo}>
                                        last seen{" "}
                                        <TimeAgo
                                            datetime={item.last_seen}
                                            locale='en_US'
                                        />
                                    </Typography>
                                </Box>
                            </Stack>
                            <MessageRequest
                                open={open === i}
                                handleClose={handleClose}
                                users={item}
                            />
                        </Box>
                    ))}
                </Box>
            </Grow>
        </Box>
    );
};
export default Suggestions;