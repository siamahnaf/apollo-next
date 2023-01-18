import { useState, KeyboardEvent, useContext, SyntheticEvent, useEffect } from "react";
import { Box, Stack, InputBase, ButtonBase, InputAdornment, Grow } from "@mui/material";
import { Icon } from "@iconify/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useForm, SubmitHandler } from "react-hook-form";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

//Appendix
import { InputAppendix } from "Utilis/svg/Appendix";

//Notification
import { Notification } from "Components/Common/Notification";

//Context
import { ConversationCtx } from "Context/conversation.context";
import { useSocket } from "Context/socket.context";

//Styles
import styles from "Styles/Home/Sender.styles";

//Apollo
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "Apollo/Query/user.query";
import { GetProfileData } from "Apollo/Types/user.types";

//Types
interface Inputs {
    message: string;
}
interface EmojiData {
    native: string;
    unified: string;
}

const Sender = () => {
    //Query Hook
    const { data } = useQuery<GetProfileData>(GET_PROFILE);
    //State
    const [emoji, setEmoji] = useState<boolean>(false);
    const [images, setImages] = useState<ImageListType>([]);
    const [notification, setNotification] = useState<string>("");

    //On Image handler
    const onChange = (imageList: ImageListType) => {
        setImages(imageList);
    };

    //Context
    const { selected } = useContext(ConversationCtx);
    const { socket } = useSocket();

    //Handler -- notification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification("");
    };

    //Form
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset
    } = useForm<Inputs>();

    //On submit Handler
    const onSubmit: SubmitHandler<Inputs> = (submitData) => {
        const MessageData = {
            conversation: selected,
            message: {
                text: submitData.message
            }
        }
        socket.emit("createMessage", MessageData);
        reset();
    }
    const handleUserKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };
    //On Emoji Select
    const onEmojiSelect = (value: EmojiData) => {
        setValue("message", getValues("message") + value.native)
    }
    //Effect Hook
    useEffect(() => {
        socket.on("exception", (err: any) => {
            setNotification(err.message?.toString())
        })
    }, [socket])
    return (
        <Box>
            {notification &&
                <Notification
                    open={notification !== ""}
                    handleClose={onNotification}
                    message={notification}
                    severity="error"
                />
            }
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" gap={1} alignItems="end">
                    <Box sx={{ flex: 1, position: "relative" }} >
                        <InputBase
                            placeholder="Message"
                            fullWidth
                            sx={styles.InputField}
                            multiline
                            minRows={1}
                            onKeyDown={handleUserKeyPress}
                            {...register("message", { required: true })}
                            endAdornment={<InputAdornment position="end" sx={styles.FileButton}>
                                <ImageUploading
                                    value={images}
                                    onChange={onChange}
                                >
                                    {({
                                        onImageUpload
                                    }) => (
                                        <ButtonBase onClick={onImageUpload} disableRipple sx={{ mb: "-2px" }}>
                                            <Icon icon="teenyicons:attach-outline" />
                                        </ButtonBase>
                                    )}
                                </ImageUploading>
                            </InputAdornment>}
                        />
                        <Box sx={styles.Appendix}>
                            {InputAppendix}
                        </Box>
                        <Box sx={styles.EmojiButton} onMouseLeave={() => setEmoji(false)}>
                            <ButtonBase onMouseEnter={() => setEmoji(true)} disableRipple sx={{ mt: "-2px" }}>
                                <Icon icon="bi:emoji-smile" />
                            </ButtonBase>
                            <Box sx={styles.EmojiPicker} className={emoji ? "active" : ""}>
                                <Grow in={emoji} style={{ transformOrigin: "bottom left" }}>
                                    <Box>
                                        <Picker data={emojiData} onEmojiSelect={onEmojiSelect} />
                                    </Box>
                                </Grow>
                            </Box>
                        </Box>
                    </Box>
                    <ButtonBase type="submit" sx={styles.ButtonSend}>
                        <Icon icon="fe:paper-plane" />
                    </ButtonBase>
                </Stack>
            </Box>
        </Box>
    );
};
export default Sender;