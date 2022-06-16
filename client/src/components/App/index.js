import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";


import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";


const serverURL = "http://ov-research-4.uwaterloo.ca:3032";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(-1),
      width: "30ch"
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(1);
  const classes = useStyles();

  const handleRatingChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const [movieName, setMovieName] = React.useState([]);

  const handleMovieChange = (event) => {
    setMovieName(event.target.value);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          height: '100vh',
          opacity: opacityValue,
          overflow: "hidden",
          //backgroundColor: lightTheme.palette.background.default,
          //backgroundImage: `url(${BackgroundImage})`,
          //backgroundImage: `url(https://www.treehugger.com/thmb/huWogB9GGnLTMn-MmpMxlWos_BE=/2500x1881/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__12__ParadiseExterior-13-c8711698f75e4ca9b8b7673989362a57.jpg)`,
          backgroundSize: "cover"
        }}
      >
        <MainGridContainer
          container
          spacing={1}
          style={{ maxWidth: '50%' }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography variant="h3" component="div">
            Movie Review
          </Typography>
          <Typography variant="h6" component="div">
            Check out the reviews before you decide to buy the tickets.
          </Typography>

          <Grid container>
            <MovieSelection
              handleChange={handleMovieChange}
              classes={classes}
              movieName={movieName}
            />
          </Grid>

          <Grid container>
            <ReviewTitle
              classes={classes}
            />
          </Grid>

          <Grid container>
            <ReviewBody />
          </Grid>

          <Grid container>
            <ReviewRating
              spacing={spacing}
              handleChange={handleRatingChange}
              movieName={movieName}
            />
          </Grid>

          <Grid container>
            <Button variant="contained" color="secondary">
              Submit
            </Button>
          </Grid>

        </MainGridContainer>
      </Box>
    </ThemeProvider>

  );
}

const MovieSelection = ({ handleChange, classes, movieName }) => {
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="moviesList">Select Movies</InputLabel>
        <Select
          value={movieName}
          onChange={handleChange}
          inputProps={{
            name: 'movies',
            id: 'moviesList',
          }}
        >
          <option value="">None</option>
          <option value={1}>Kingsman</option>
          <option value={2}>Crazy Rich Asians</option>
          <option value={3}>Revenant</option>
          <option value={4}>Thor: Love and Thunder</option>
          <option value={5}>Doctor Strange: Multiverse in Madness</option>
        </Select>
      </FormControl>
    </>
  )
}

const ReviewRating = ({ spacing, handleChange }) => {
  return (
    <>
      <Grid item>
        <FormLabel>Rating</FormLabel>
        <RadioGroup
          name="Rating"
          aria-label="Rating"
          value={spacing.toString()}
          onChange={handleChange}
          row
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <FormControlLabel
              key={value}
              value={value.toString()}
              control={<Radio />}
              label={value.toString()}
            />
          ))}
        </RadioGroup>
      </Grid>
    </>
  )
}

const ReviewTitle = ({ classes }) => {
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="review-title" label="Review Title" variant="filled" />
      </form>
    </>
  )
}

const ReviewBody = () => {
  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Enter a Review"
        multiline
        rows={4}
        defaultValue=""
        variant="outlined"
      />
    </>
  )
}

