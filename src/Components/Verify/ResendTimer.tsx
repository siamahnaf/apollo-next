import { useState, SyntheticEvent, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Otptimer } from "otp-timer-ts";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Notifications
import { Notification } from "Components/Common/Notification";

//Apollo
import { useMutation } from "@apollo/client";
import { RESEND_OTP } from "Apollo/Query/user.query";
import { ResendOtpData } from "Apollo/Types/user.types";

const ResendTimer = () => {
    //Mutation Hook
    const [resend, { data, error, loading }] = useMutation<ResendOtpData>(RESEND_OTP);
    //State
    const [notification, setNotification] = useState<boolean>(false);
    //Initialize hook
    const theme = useTheme();
    const router = useRouter();
    //Handler -- onResend
    const onResendHandler = () => {
        const email = nextBase64.decode(router.query.token as string)
        resend({ variables: { resendInput: { email: email } } })
    }
    //Handler -- onNotification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    //Effect Hook
    useEffect(() => {
        if (data || error) {
            setNotification(true)
        }
    }, [data, error])
    return (
        <Box sx={{ mt: "15px" }}>
            {(error || data) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    message={error ? error.message as string : data?.resendOtp.message as string}
                    severity={error ? "error" : "success"}
                />
            }
            <Otptimer
                minutes={1}
                seconds={20}
                onResend={onResendHandler}
                text="Resend code in"
                buttonText="Resend Code"
                textContainerStyle={{
                    textAlign: "center",
                    fontSize: "16px",
                    padding: "8px 0px"
                }}
                timerStyle={{
                    color: theme.palette.primary.main
                }}
                buttonStyle={{
                    color: theme.palette.background.default,
                    background: theme.palette.primary.main,
                    fontSize: "15px",
                    padding: "8px 0",
                    borderRadius: "5px",
                    width: "115px",
                    textAlign: "center"
                }}
                buttonContainerStyle={{
                    textAlign: "center"
                }}
            />
        </Box>
    );
};
export default ResendTimer;