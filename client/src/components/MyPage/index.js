import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3032";

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

const MyPage = () => {

  const [movieSearchTerm, setMovieSearchTerm] = React.useState('');
  const [moviesList, setMoviesList] = React.useState([]);

  const handleSubmit = () => {
    handleMovieSearch();
  }

  const clear = () => {
    setMovieSearchTerm('');
    setMoviesList([]);
  }

  const handleMovieEntry = (event) => {
    setMovieSearchTerm(event.target.value);
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

  const callApiFindMovies = async () => {

    const url = serverURL + "/api/findTrailers";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        movieSearchTerm: movieSearchTerm,
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
          backgroundImage: `url(https://images.unsplash.com/photo-1613750651512-d65ce96dff55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)`,
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
                key='2'
                onClick={() => history.push('/reviews')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Reviews
              </Button>
              <Button
                key='1'
                onClick={() => history.push('/search')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Search
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <MainGridContainer
          container
          spacing={5}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          overflow="scroll"
        >
          <Typography variant="h3" color="inherit" noWrap>
            Watch trailers for your movies!
          </Typography>
          <br />
          <Search
            label="Search for Movies"
            onSearch={handleMovieEntry}
            movieSearchTerm={movieSearchTerm}
          />
          <p>The database has trailers only for:
            <li>Casablanca</li>
            <li>Saving Private Ryan</li>
            <li>Pulp Fiction</li>
            <li>Forrest Gump</li>
            <li>Fight Club</li>
            <li>12 Angry Men</li>
            <li>Casino</li>
            <li>Goodfellas</li>
            <li>Toy Story</li>
            <li>Se7en</li>
          </p>
          <br />
          <Grid container>
            <Button variant="contained" color='secondary' onClick={handleSubmit}>Search</Button>
            <Button variant="contained" color='secondary' onClick={clear}>Clear</Button>
          </Grid>
          <br />
          <Player moviesList={moviesList} />
        </MainGridContainer>
      </Box>
    </ThemeProvider>
  )
}

const Player = ({ moviesList }) => {
  return (
    <ul>
      {moviesList.map((item) => {
        return (
          <>
            <iframe
              width="1000"
              height="500"
              src={item.link}
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
              title='video'
              allowFullScreen
            />
          </>
        )

      })}
    </ul>
  )
}


const Search = ({ label, onSearch, movieSearchTerm }) => {
  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          variant='outlined'
          autoComplete="off"
          id="movie-title"
          label={label}
          value={movieSearchTerm}
          onChange={onSearch}
          style={{ width: 500 }}
        />
      </form>
    </>
  )
};


export default MyPage;