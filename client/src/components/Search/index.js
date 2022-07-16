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

const serverURL = "";

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


const RecipePaper = styled(Paper)(({ theme }) => ({
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

    const [expandedRecipesList, setExpandedRecipesList] = React.useState([]);
    const [recipesList, setRecipesList] = React.useState([]);
    const [editedItem, setEditedItem] = React.useState('');
    const [ingredientSearchTerm, setIngredientSearchTerm] = React.useState('');
    const [calorieSearchTerm, setCalorieSearchTerm] = React.useState('');

    const handleToggleIngredients = (item) => {
        var expandedRecipesListCopy = [...expandedRecipesList];
        if (expandedRecipesList.includes(item.recipeID)) {
            var index = expandedRecipesList.indexOf(item.recipeID);
            expandedRecipesListCopy.splice(index, 1);
            setExpandedRecipesList(expandedRecipesListCopy);
            console.log('expandedRecipesList: ', expandedRecipesList);
        } else {
            expandedRecipesListCopy.push(item.recipeID);
            setExpandedRecipesList(expandedRecipesListCopy);
            console.log('expandedRecipesList: ', expandedRecipesList);
        }
    }

    const handleEditInstructions = (item) => {
        setEditedItem(item.recipeID);
    }

    const handleUpdateInstructions = (index, instructions) => {
        console.log("ID: ", index);
        var recipesListCopy = recipesList;
        recipesListCopy[index].instructions = instructions;
        setRecipesList(recipesListCopy);
        setEditedItem('');
    }

    const loadRecipes = () => {
        callApiLoadRecipes()
            .then(res => {
                console.log("callApiLoadRecipes returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiLoadRecipes parsed: ", parsed);
                setRecipesList(parsed);
            })
    }

    const callApiLoadRecipes = async () => {
        const url = serverURL + "/api/loadRecipes";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("User settings: ", body);
        return body;
    }

    const handleRecipeSearch = () => {
        callApiFindRecipe()
            .then(res => {
                console.log("callApiFindRecipe returned: ", res)
                var parsed = JSON.parse(res.express);
                console.log("callApiFindRecipe parsed: ", parsed[0])
                setRecipesList(parsed);
            });
    }

    const callApiFindRecipe = async () => {

        const url = serverURL + "/api/findRecipe";
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //authorization: `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                ingredientSearchTerm: ingredientSearchTerm,
                calorieSearchTerm: calorieSearchTerm
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        console.log("Found recipes: ", body);
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
                        onSearch={setIngredientSearchTerm}
                    />

                    <Search
                        label="Search by Actors"
                        onSearch={setCalorieSearchTerm}
                    />

                    <Search
                        label="Search by Directors"
                        onSearch={setCalorieSearchTerm}
                    />


                    <List
                        recipesList={recipesList}
                        expandedRecipesList={expandedRecipesList}
                        onToggleIngredients={handleToggleIngredients}
                        onEditInstructions={handleEditInstructions}
                        onUpdateInstructions={handleUpdateInstructions}
                        editedItem={editedItem}
                    />

                </MainGridContainer>
            </Box>
        </ThemeProvider>
    );
}

const Search = ({ label, onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const onChangeSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    }


    return (
        <TextField
            id="search"
            label={label}
            value={searchTerm}
            onChange={(event) => onChangeSearchTerm(event)}
            variant="standard"
            autoComplete="off"
            color="secondary"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => onSearch(searchTerm)}
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
};


const List = ({ recipesList, expandedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem }) => {
    return (
        <>
            {recipesList.map((item, index) => {
                return (
                    <Grid item>
                        <Item
                            item={item}
                            index={index}
                            expandedRecipesList={expandedRecipesList}
                            onToggleIngredients={onToggleIngredients}
                            onEditInstructions={onEditInstructions}
                            onUpdateInstructions={onUpdateInstructions}
                            editedItem={editedItem}
                        />
                    </Grid>
                );
            })}
        </>

    )
}

const Item = ({ item, expandedRecipesList, onToggleIngredients, onEditInstructions, onUpdateInstructions, editedItem, index }) => {
    const [instructions, setInstructions] = React.useState(item.instructions);

    const onChangeInstructions = (event) => {
        setInstructions(event.target.value);
        //console.log(instructions);
    }

    const onApplyChanges = () => {
        onUpdateInstructions(index, instructions);
    }

    return (
        <RecipePaper>
            <Typography
                style={{ marginBottom: lightTheme.spacing(2) }}
                variant="h5"
                gutterTop
                component="div"
            >
                {item.title}
            </Typography>

            <Typography
                variant="h6"
                component="div"
                style={{ marginTop: lightTheme.spacing(1) }}
            >
                Difficulty: {item.difficulty}
            </Typography>

            {expandedRecipesList.includes(item.recipeID) && (
                <>

                    <Typography variant="h6" component="div">
                        Ingredients:
                    </Typography>


                    <ul>
                        {item.ingredients.map((ingredient) => (
                            <li>
                                <Typography variant="body1" >
                                    {ingredient}
                                </Typography>
                            </li>
                        ))}
                    </ul>

                </>
            )}


            <RecipeButton
                item={item}
                label={expandedRecipesList.includes(item.recipeID) ? 'Hide ingredients' : 'Show ingredients'}
                onButtonClick={onToggleIngredients}
            />



            <Typography
                variant="h6"
                component="div"
                style={{ marginTop: lightTheme.spacing(1) }}
            >
                Instructions:
            </Typography>

            {editedItem != item.recipeID ? (
                <>
                    <Typography variant="body1" gutterBottom component="div">
                        {item.instructions}
                    </Typography>

                    <RecipeButton
                        item={item}
                        label={'Edit instructions'}
                        onButtonClick={onEditInstructions}
                    />
                </>
            ) : (
                <>
                    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                        <Grid item>
                            <TextField
                                required
                                id='edit'
                                onChange={onChangeInstructions}
                                value={instructions}
                                style={{ width: 600, marginBottom: lightTheme.spacing(2) }}
                                multiline
                            />
                        </Grid>
                        <Grid item>
                            <RecipeButton
                                item={item}
                                label={'Save'}
                                onButtonClick={onApplyChanges}
                            />
                        </Grid>
                    </Grid>
                </>
            )}

            <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ marginTop: lightTheme.spacing(1) }}
            >
                Calories: {item.calories}
            </Typography>

        </RecipePaper>
    )
}

const RecipeButton = ({ item, label, onButtonClick }) => (
    <Button
        variant="contained"
        color="secondary"
        onClick={(event) => onButtonClick(item, event)}
    >
        {label}
    </Button>
)


export default App;