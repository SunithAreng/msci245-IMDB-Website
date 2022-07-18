import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// const serverURL = "";

const serverURL = "http://localhost:8081";

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


const MoviePaper = styled(Paper)(({ theme }) => ({
    opacity: 0.7,
    backgroundColor: theme.palette.primary.background,
    padding: 8,
    borderRadius: 4,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
}));

const MainGridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(4),
}))

const App = () => {

    const [moviesList, setMoviesList] = React.useState([]);
    const [movieSearchTerm, setMovieSearchTerm] = React.useState('');
    const [actorSearchTerm, setActorSearchTerm] = React.useState('');
    const [directorSearchTerm, setDirectorSearchTerm] = React.useState('');

    const handleSubmit = () => {
        handleMovieSearch();
    }

    const handleMovieSearch = () => {
        callApiFindMovies()
            .then(res => {
                console.log("callApiFindMovies returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiFindMovies parsed: ", parsed[0])
                setMoviesList(parsed);
            });
    }

    const handleMovieEntry = (event) => {
        setMovieSearchTerm(event.target.value);
    }

    const handleDirectorEntry = (event) => {
        setDirectorSearchTerm(event.target.value);
    }

    const handleActorEntry = (event) => {
        setActorSearchTerm(event.target.value);
    }

    const callApiFindMovies = async () => {

        const url = serverURL + "/api/findMovies";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                movieSearchTerm: movieSearchTerm,
                actorSearchTerm: actorSearchTerm,
                directorSearchTerm: directorSearchTerm,
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    return (
        <ThemeProvider theme={lightTheme}>
            <Box
                sx={{
                    height: '100vh',
                    opacity: opacityValue,
                    overflow: 'scroll',
                    backgroundImage: `url(https://images.unsplash.com/photo-1572188863110-46d457c9234d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
                    backgroundSize: "cover"
                }}
            >
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button
                                key='3'
                                onClick={() => history.push('/')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
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
                                MyPage
                            </Button>
                        </Toolbar>
                    </Container>
                </AppBar>
                <MainGridContainer
                    container
                    spacing={1}
                    style={{ maxWidth: '50%' }}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <Typography variant="h3" gutterBottom component="div">
                        Movie Finder
                    </Typography>
                    <Search
                        label="Search by Movies"
                        onSearch={handleMovieEntry}
                    />

                    <Search
                        label="Search by Actors"
                        onSearch={handleActorEntry}
                    />

                    <Search
                        label="Search by Directors"
                        onSearch={handleDirectorEntry}
                    />
                    <br />
                    <Grid container>
                        <Button variant="contained" color='secondary' onClick={handleSubmit}>Search</Button>
                    </Grid>
                    <Reviews
                        initialReviews={moviesList}
                    />



                </MainGridContainer>

            </Box>
        </ThemeProvider>
    );
}

const Search = ({ label, onSearch }) => {
    return (
        <>
            <form noValidate autoComplete="off">
                <TextField
                    variant="standard"
                    autoComplete="off"
                    id="review-title"
                    label={label}
                    onChange={onSearch}
                />
            </form>
        </>
    )
};

const Reviews = ({ initialReviews }) => {

    return (
        <ul>
            {/* <Typography variant="h6" gutterBottom component="div">
                Insert Names
            </Typography> */}
            {initialReviews.map((item) => {
                return (
                    <Card style={{ marginTop: 5, marginBottom: 5 }} variant="outlined">
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <p>
                                    {"Movie Title: " + item.name}
                                    <br />
                                    {"Director: " + item.dname}
                                    <br />
                                    {"Review Title: "}
                                    <b>{item.reviewTitle}</b>
                                    <br />
                                    {"User Rating: "}
                                    <b>{item.reviewScore}</b>
                                    {"/5"}
                                    <br />
                                    {"User Review: "}
                                    <br />
                                    {item.reviewContent}
                                </p>
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}
        </ul>
    )
}



export default App;