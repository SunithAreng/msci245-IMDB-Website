import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { createTheme, ThemeProvider, styled } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Input from '@material-ui/core/Input';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import { Dialog } from '@material-ui/core';

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

//const serverURL = "http://ov-research-4.uwaterloo.ca:3032";

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

const movies = [
  {
    title: 'None',
    id: 0,
  },
  {
    title: 'Thor: Love and Thunder',
    id: 1,
  },
  {
    title: 'Kingsman',
    id: 2,
  },
  {
    title: 'Revenant',
    id: 3,
  },
  {
    title: 'Ironman',
    id: 4,
  },
  {
    title: 'Doctor Strange in Multiverse of Madness',
    id: 5,
  }
]


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function SpacingGrid() {


  const classes = useStyles();

  const [spacing, setSpacing] = React.useState([]);
  const [movieName, setMovieName] = React.useState([]);
  const [reviewTitle, setReviewTitle] = React.useState("");
  const [userReview, setUserReview] = React.useState("");

  const handleRatingChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleMovieChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleTitleEntry = (event) => {
    setReviewTitle(event.target.value);
  }

  const handleReviewEntry = (event) => {
    setUserReview(event.target.value);
  }

  const [open, setOpen] = React.useState(false);
  const [dummy, setDummy] = React.useState();

  const handleClickSubmit = () => {
    if (!userReview) {
      setOpen(true);
      setDummy(1);
    } else if (!reviewTitle) {
      setOpen(true);
      setDummy(2);
    } else if (spacing == "") {
      setOpen(true);
      setDummy(3);
    } else if (movieName == "") {
      setOpen(true);
      setDummy(4);
    } else {
      setOpen(true);
      setDummy(33);
    }
  }

  const handleToClose = () => {
    setOpen(false);
  }

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
              onEntry={handleTitleEntry}
              reviewTitle={reviewTitle}
            />
          </Grid>

          <Grid container>
            <ReviewBody
              userReview={userReview}
              onEntry={handleReviewEntry} />
          </Grid>

          <Grid container>
            <ReviewRating
              spacing={spacing}
              handleChange={handleRatingChange}
              movieName={movieName}
            />
          </Grid>

          <Grid container>
            <Button variant="contained" color="secondary" onClick={handleClickSubmit}>
              Submit
            </Button>
            <DialogBox 
            open={open}
            handleToClose={handleToClose}
            id={dummy}
            />
          </Grid>

        </MainGridContainer>
      </Box>
    </ThemeProvider>

  );
}

const DialogBox = ({id,open, handleToClose}) => {
  const msg = [
    'Please enter your review',
    'Please enter your review title',
    'Please enter your rating',
    'Your review has been Received!',
    'Please select a movie for review!'
  ]
  
  var d;

  if (id == 1) {
    d = msg[0];
  } else if (id == 2) {
    d = msg[1];
  } else if (id == 3) {
    d = msg[2];
  } else if (id ==4) {
    d = msg[4];
  }else {
    d = msg[3];
  }

  return (
    <>
      <Dialog open={open} onClose={handleToClose}>
        <DialogContent>
          <DialogContentText>
            {d}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose}
            color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const MovieSelection = ({ handleChange, classes, movieName }) => {
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="movies-list">Select Movies</InputLabel>
        <Select
          labelId="movies-list"
          id="movies-list"
          value={movieName}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title}
            </option>
          ))}
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

const ReviewTitle = ({ reviewTitle, classes, onEntry }) => {
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="review-title"
          label="Review Title"
          variant="filled"
          onChange={onEntry}
          value={reviewTitle}
        />
      </form>
    </>
  )
}

const ReviewBody = ({ onEntry, userReview }) => {
  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label="Enter a Review"
        multiline
        rows={4}
        value={userReview}
        onChange={onEntry}
        variant="outlined"
      />
    </>
  )
}
