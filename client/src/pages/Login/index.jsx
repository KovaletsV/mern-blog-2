import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../redux/features/auth";

import styles from "./Login.module.scss";

export const Login = () => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,

        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "jhon@gmail.com",
            password: "123456"
        },
        mode: "onChange"
    });
    const onSumit = values => {
        dispatch(fetchAuth(values));
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSumit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    {...register("email", { required: "Please enter email" })}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                    {...register("password", {
                        required: "Please enter password"
                    })}
                />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </Paper>
    );
};
