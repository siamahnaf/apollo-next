import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

//Styles
import styles from "Styles/Home/Suggestion.styles";

//Components
import Avatars from "Components/Common/Avatars";

//Types import
import { UsersData } from "Apollo/Types/user.types";
import { MessageData } from "Apollo/Types/conversation.types";

//Types
interface Props {
    data: UsersData;
    message: MessageData[]
}

const SingleCard = ({ data, message }: Props) => {
    return (
        <Fragment>
            <Box>
                {data?.avatar?.url ? (
                    <Image src={data.avatar.url} alt={data.firstName} width={50} height={50} style={{ borderRadius: "50%", objectFit: "cover", objectPosition: "top center" }} />
                ) : (
                    <Avatars name={data?.firstName} />
                )}
            </Box>
            <Box>
                <Typography variant="h6" component="h6" sx={styles.Name}>
                    {data.firstName}{" "}{data.lastName}
                </Typography>
                <Typography variant="body1" component="p">
                    {message[0]?.message.text || `Say hi to ${data?.firstName}`}
                </Typography>
            </Box>
        </Fragment>
    );
};
export default SingleCard;