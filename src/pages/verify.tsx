import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import { Container, Box, Typography, Stack, TextField, CircularProgress, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import nextBase64 from "next-base64";
import Rive from "@rive-app/react-canvas";
import { Icon } from "@iconify/react";
import { setCookie } from "cookies-next";

//Notification
import { Notification } from "Components/Common/Notification";

//Components
import ResendTimer from "Components/Verify/ResendTimer";

//Styles
import styles from "Styles/Authentication/registration.style";

//Apollo
import { useMutation } from "@apollo/client";
import { VERIFY_OTP } from "Apollo/Query/user.query";
import { VerifyOtpData } from "Apollo/Types/user.types";

const Verify: NextPage = () => {
    //Mutation Hooks
    const [verify, { data, error, loading }] = useMutation<VerifyOtpData>(VERIFY_OTP)
    //State
    const [notification, setNotification] = useState<boolean>(false);
    //Initialize hook
    const router = useRouter();
    //Handler
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 6) {
            verify({ variables: { verifyInput: { email: nextBase64.decode(router.query.token as string), otp: e.target.value.toString() } } })
        }
    }
    //Handler -- onNotification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    //Effect Hook
    useEffect(() => {
        if (error) {
            setNotification(true)
        }
        if (data?.verifyOtp.success) {
            if (router.query.remember === "true") {
                const today = new Date();
                const expire = new Date(new Date().setDate(today.getDate() + data.verifyOtp.expire));
                setCookie('session', data.verifyOtp.token, { expires: expire });
            } else {
                setCookie('session', data.verifyOtp.token);
            }
            router.push("/")
        }
    }, [error, data])
    return (
        <Container disableGutters maxWidth="xxl" sx={{ width: "35%", py: "2em" }}>
            <Head>
                <title>Pie chat | One time password verification</title>
            </Head>
            {error &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    message={error.message as string}
                    severity="error"
                />
            }
            <Box sx={styles.AnimationContainer}>
                <Box sx={styles.RiveContainer}>
                    <Rive src="https://res.cloudinary.com/dub0dpenl/raw/upload/v1672304637/Pie%20chat/rive/2191-4327-loader-solicitud-de-cuentas_lceot8.riv" />
                </Box>
                <Stack direction="row" alignItems="center" sx={styles.EmailContainer}>
                    <Typography variant="h5" component="h5">
                        {router.query.token &&
                            nextBase64.decode(router.query.token as string)
                        }
                    </Typography>
                    <Box sx={styles.Pencil}>
                        <Tooltip title="Wrong Email?">
                            <Link href="/registration">
                                <Icon icon="mdi:pencil" />
                            </Link>
                        </Tooltip>
                    </Box>
                </Stack>
                <Typography variant="body1" component="p" sx={styles.Description}>
                    We&apos;ve sent the code to your email. Please check your inbox.
                </Typography>
            </Box>
            <Box>
                <Box sx={{ position: "relative" }}>
                    <Input
                        label="Code"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={error ? true : false}
                        onInput={(e: ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            if (e.target.value.length > 6) {
                                e.target.value = e.target.value.substring(0, 6)
                            }
                        }}
                        onChange={onChangeHandler}
                    />
                    <Box sx={styles.VerifyLoading}>
                        {loading &&
                            <CircularProgress size={20} sx={{ display: "block" }} />
                        }
                    </Box>
                </Box>
                <ResendTimer />
                <Typography sx={styles.Tips}>
                    <span>Tip:</span> You are entering sudo mode. After you've performed a sudo-protected action, you'll only be asked to re-authenticate again after a few hours of inactivity.
                </Typography>
            </Box>
        </Container>
    );
};
export default Verify;


//Custom component with styling
const Input = styled(TextField)(({ theme }) => ({
    '& label, & label.Mui-focused': {
        color: theme.palette.text.primary,
    },
    '& label.Mui-error': {
        color: '#d32f2f',
    },
    '& .MuiFormHelperText-root': {
        marginLeft: '0px'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.text.primary,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-error fieldset': {
            borderColor: '#d32f2f',
        }
    },
}))