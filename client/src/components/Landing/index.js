import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";

const opacityValue = 0.9;

const lightTheme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: "#ffffff"
        },
        primary: {
            main: '#ef9a9a',
            light: '#ffcccb',
            dark: '#ba6b6c',
            background: '#eeeeee'
        },
        secondary: {
            main: "#b71c1c",
            light: '#f05545',
            dark: '#7f0000'
        },
    },
});

const Landing = () => {

    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundImage: `url(https://images.unsplash.com/photo-1493804714600-6edb1cd93080?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                    backgroundSize: "cover"
                }}
            >
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button
                                key='3'
                                onClick={() => history.push('/search')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Search
                            </Button>
                            <Button
                                key='1'
                                onClick={() => history.push('/reviews')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Reviews
                            </Button>
                            <Button
                                key='2'
                                onClick={() => history.push('/myPage')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Explore
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <Typography variant="h3" color="inherit" noWrap>
                    Hello and welcome to the landing page!
                </Typography>
            </Box>
        </ThemeProvider>
    )

}

export default Landing;