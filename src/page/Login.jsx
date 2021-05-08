// in src/MyLoginPage.js
import * as React from "react";
import {useState} from "react";
import {useLogin, useNotify, Notification, defaultTheme} from "react-admin";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core/styles";

import {TextField, Button} from "@material-ui/core";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();
    const notify = useNotify();
    const submit = (e) => {
        e.preventDefault();

        login({email, password}).catch(() =>
            notify("Неверный email или пароль")
        );
    };

    const style = {
        margin: "100px auto",
        maxWidth: "90%",
        width: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alingItems: "center",
    };

    const styleInput = {marginBottom: "25px"};

    const styleButton = {padding: "15px 0"};

    return (
        <ThemeProvider theme={createMuiTheme(defaultTheme)}>
            <form onSubmit={submit} style={style}>
                <img
                    src="https://api.iomp.ru/public/storage/all/logo.svg"
                    alt="MasterVision"
                    style={{
                        width: "250px",
                        margin: "50px auto",
                    }}
                />
                <TextField
                    required
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="filled-required"
                    label="Email"
                    variant="filled"
                    style={styleInput}
                />
                <TextField
                    required
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="filled-required"
                    label="Пароль"
                    variant="filled"
                    style={styleInput}
                />
                <Button variant="contained" type="submit" style={styleButton}>
                    Войти
                </Button>
            </form>
            <Notification />
        </ThemeProvider>
    );
};

export default Login;
