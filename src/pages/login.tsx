import type { NextPage } from "next";
import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Box, Typography, TextField, FormControlLabel, Checkbox, ButtonBase, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from "cookies-next";

//Logo Image
import Logo from "Assets/logo.svg";

//Notification
import { Notification } from "Components/Common/Notification";

//Styles
import styles from "Styles/Authentication/registration.style";

//Apollo
import { useMutation } from "@apollo/client";
import { LOGIN } from "Apollo/Query/user.query";
import { LoginData } from "Apollo/Types/user.types";

//Types
interface Inputs {
    email: string;
    password: string;
}

const Login: NextPage = () => {
    //Mutation Hooks
    const [login, { data, loading, error }] = useMutation<LoginData>(LOGIN);
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [keep, setKeep] = useState<boolean>(true);
    //Initialize Hooks
    const router = useRouter();
    //Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();
    //Submit
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        login({ variables: { loginInput: data } })
    }
    //Handler -- notification
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    //Effect Hook
    useEffect(() => {
        if (error) {
            setNotification(true)
        }
        if (data?.login.success) {
            if (keep) {
                const today = new Date();
                const expire = new Date(new Date().setDate(today.getDate() + data.login.expire));
                setCookie('session', data.login.token, { expires: expire });
            } else {
                setCookie('session', data.login.token);
            }
            router.push("/")
        }
    }, [error, data])
    return (
        <Container disableGutters maxWidth="xxl" sx={{ width: "35%", py: "4em" }}>
            <Head>
                <title>Pie chat | login to pie chat</title>
            </Head>
            {error &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    message={error.message as string}
                    severity="error"
                />
            }
            <Box sx={styles.LogoContainer}>
                <Image src={Logo} alt="logo" width={140} height={140} priority />
                <Typography variant="h4" component="h4">
                    Pie Chat
                </Typography>
                <Typography variant="body1" component="p">
                    Please confirm your email address and enter fill the form.
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 2 }}>
                    <Input
                        label="Email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={errors.email ? true : false}
                        {...register("email", {
                            required: true,
                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                        })}
                    />
                </Box>
                <Box>
                    <Input
                        label="Password"
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="password"
                        error={errors.password ? true : false}
                        {...register("password", { required: true })}
                    />
                </Box>
                <Box sx={{ mt: "10px" }}>
                    <FormControlLabel control={<Checkbox checked={keep} onChange={(e) => setKeep(e.target.checked)} />} label="Keep me signed in!" sx={{ userSelect: "none" }} />
                </Box>
                <Box sx={{ mt: "14px", position: "relative" }}>
                    <ButtonBase type="submit" sx={styles.Button} disabled={loading}>
                        {loading ? "Please wait..." : "Login"}
                        {loading &&
                            <CircularProgress
                                size={25}
                                sx={styles.CircularLoading}
                            />
                        }
                    </ButtonBase>
                </Box>
            </Box>
        </Container>
    );
};
export default Login;

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