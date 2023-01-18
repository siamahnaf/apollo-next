import { useState, SyntheticEvent, useEffect } from "react";
import type { NextPage } from "next";
import { Container, Box, Typography, Grid, TextField, FormControlLabel, Checkbox, ButtonBase, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Logo Image
import Logo from "Assets/logo.svg";

//Notification
import { Notification } from "Components/Common/Notification";

//Styles
import styles from "Styles/Authentication/registration.style";

//Apollo
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "Apollo/Query/user.query";
import { CreateUserData } from "Apollo/Types/user.types";

//Types
interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Registration: NextPage = () => {
    //Mutation Hooks
    const [registration, { data, error, loading }] = useMutation<CreateUserData>(CREATE_USER);
    //State
    const [notification, setNotification] = useState<boolean>(false);
    const [keep, setKeep] = useState<boolean>(true);
    //Initialize Hook
    const router = useRouter();
    //Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();
    //Handler
    const onNotification = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setNotification(false);
    };
    //Submit
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        registration({ variables: { userInput: data } })
    }
    //Effect Hook
    useEffect(() => {
        if (error) {
            setNotification(true)
        }
        if (data?.createUser.success) {
            router.push(`/verify?token=${nextBase64.encode(data.createUser.email)}&remember=${keep}`)
        }
    }, [error, data])
    return (
        <Container disableGutters maxWidth="xxl" sx={{ width: "35%", py: "2.5em" }}>
            <Head>
                <title>Pie chat | register a new account to pie chat</title>
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
                <Grid container spacing={2}>
                    <Grid item {...{ md: 6 }}>
                        <Box>
                            <Input
                                label="First Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.firstName ? true : false}
                                {...register("firstName", { required: true })}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 6 }}>
                        <Box>
                            <Input
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.lastName ? true : false}
                                {...register("lastName", { required: true })}
                            />
                        </Box>
                    </Grid>
                    <Grid item {...{ md: 12 }}>
                        <Box>
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
                    </Grid>
                    <Grid item {...{ md: 12 }}>
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
                    </Grid>
                    <Grid item {...{ md: 12 }}>
                        <Box>
                            <FormControlLabel control={<Checkbox checked={keep} onChange={(e) => setKeep(e.target.checked)} />} label="Keep me signed in!" sx={{ userSelect: "none" }} />
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: "8px", position: "relative" }}>
                    <ButtonBase type="submit" sx={styles.Button} disabled={loading}>
                        {loading ? "Please wait..." : "Next"}
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
export default Registration;

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