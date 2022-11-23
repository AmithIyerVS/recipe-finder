import styled from "styled-components";

export const RecipeListContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 20px;
gap: 10px;
justify-content:space-evenly;
`;

export const RecipeContainer = styled.div`
display: flex;
flex-direction: column;
padding: 15px;
width: 250px;
border-radius: 10px;
box-shadow: 0 3px 10px #aaa;
`;

export const CoverImage = styled.img`
height: 150px;
object-fit: cover;
`;

export const RecipeName = styled.span`
font-size: 18px;
font-weight: bold;
color: black;
margin: 10px 0;
`;

export const IngredientsText = styled.span`
font-size: 16px;
font-weight: bold;
border: solid 1px lightgreen;
color: black;
margin: 5px 0;
cursor: pointer;
padding: 10px 15px;
border-radius: 5px;
text-align: center;
color: lightgreen;
`;

export const SeeMoreText = styled(IngredientsText)`
border-color: red;
color: red;
`;




