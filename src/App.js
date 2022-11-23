// import './App.css';
import { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


import { Header,
  AppNameComponent,
  SearchComponent,
  AppIcon,
  SearchIcon,
  SearchInput } from "./components/HeaderComponent";
import { RecipeListContainer,RecipeContainer,CoverImage,RecipeName,IngredientsText,SeeMoreText } from "./components/RecipeComponent";

const APP_ID = "59eb7f9f";
const APP_KEY = "e5c2fa5b29ad587fd75ca3875d7511f0";

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const Placeholder = styled.img`
width: 120px;
height: 120px;
margin: 200px;
opacity: 50%;
`;

const RecipeComponent=(props)=> {
  const [show,setShow] = useState(false);
  const { recipeObj } = props;

  const handleClose = () => {
    setShow(false);
  };
return (
    <>
      <Dialog 
      open={show}
      keepMounted
      aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <th>Ingredients</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj)=>
              <tr>
                <td>{ingredientObj.text}</td>
                <td>{ingredientObj.weight}</td>
              </tr>)}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={()=>window.open(recipeObj.url)}>See More</IngredientsText>
          <SeeMoreText onClick={handleClose}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>

      <RecipeContainer>
          <CoverImage src={recipeObj.image}/>
          <RecipeName>{recipeObj.label}</RecipeName>
          <IngredientsText onClick={()=>setShow(true)}>Ingredients</IngredientsText>
          <SeeMoreText onClick={()=>window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
      </RecipeContainer>

    </>)
}

function App() {

  const [timeoutId,setTimeoutId] = useState();
  const [recipeList,setRecipeList] = useState([]);

  const fetchRecipe = async(searchString)=>{
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      setRecipeList(response.data.hits)
  }

  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    const timeout = setTimeout(()=>fetchRecipe(event.target.value),500);
    setTimeoutId(timeout);
  }

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <AppIcon src="/hamburger.svg"/>
            Recipe Finder
        </AppNameComponent>

        <SearchComponent>
          <SearchIcon src="/search-icon.svg"/>
          <SearchInput type="search" placeholder="Search Recipe" onChange={onTextChange}/>
        </SearchComponent>
      </Header>

      <RecipeListContainer>
        {recipeList.length ? recipeList.map((recipeObj)=><RecipeComponent recipeObj={recipeObj.recipe}/>):
        <Placeholder src="/hamburger.svg"/>}
        {/* <RecipeComponent /> */}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
