import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3032";

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
                    backgroundImage: `url(https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80)`,
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
                                Explore
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
                        Find reviews for your movies:
                    </Typography>
                    <Typography variant="h6" component="div">
                        Find out what audiences think about some of the classics of our time!
                    </Typography>
                    < br />
                    <Search
                        label="Search by Movies"
                        onSearch={handleMovieEntry}
                    />
                    <br />
                    <Search
                        label="Search by Actors"
                        onSearch={handleActorEntry}
                    />
                    <br />
                    <Search
                        label="Search by Directors"
                        onSearch={handleDirectorEntry}
                    />
                    <br />
                    <Grid container>
                        <Button variant="contained" color='secondary' onClick={handleSubmit}>Search</Button>
                    </Grid>
                    {moviesList ? <Reviews
                        initialReviews={moviesList}
                    />: "No Results"}
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
                    variant='outlined'
                    autoComplete="off"
                    id="review-title"
                    label={label}
                    onChange={onSearch}
                    fullWidth
                />
            </form>
        </>
    )
};

const Reviews = ({ initialReviews }) => {
    // console.log(initialReviews);
    return (
        <ul>
            {initialReviews.map((item) => {
                return (
                    <>
                        <Typography variant="h6">
                            <p>
                                <b>{"Movie Title: " + item.name}
                                    <br />
                                    {"Director: " + item.dname}
                                    <br />
                                    {"Average User Rating: "}
                                    {item.AverageReview ? item.AverageReview+"/5" : "No user scores"}
                                    </b>
                                <br />
                            </p>
                        </Typography>

                        <Typography variant="h6" component="div">
                            <b>Reviews: {item.AverageReview ? "" : "No Reviews Exist"}</b>
                        </Typography>

                        {item.reviews.map((element) => {
                            return (
                                <Card style={{ marginTop: 5, marginBottom: 5 }} variant="outlined" elevation={-10}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {"Review Title: "}
                                            <b>{element.reviewTitle}</b>
                                            <br />
                                            {"User Rating: "}
                                            <b>{element.reviewScore}</b>
                                            {"/5"}
                                            <br />
                                            {"User Review: "}
                                            <br />
                                            {element.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </>
                )


            })}
        </ul>
    )
}



export default App;