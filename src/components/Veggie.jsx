import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Splide,SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css' 
import { Link } from 'react-router-dom';

function Veggie() {
  
  const [veggie,setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  },[]);

  const getVeggie = async () => {

        const api = await fetch ( 
           `https://api.spoonacular.com/recipes/random?apiKey=7923cdb505f3494da3dcd1daf4fec320&number=9&tags=vegetarian`
          );
        const data = await api.json()
        setVeggie(data.recipes)
      
  } 

  return (
    <Wrapper>
        <h3>Vegetarian Menu</h3>
         <Splide options={{
            perPage: 3 ,
            arrows : false ,
            pagination: false ,
            drag: 'free',
            gap: "3rem"
         }}>
             {veggie.map((recipe) => {
               return (
                <SplideSlide>
                   <Card key={recipe.id}>
                     <Link to={"/recipe/" + recipe.id}>
                       <p>{recipe.title}</p>
                       <img src={recipe.image} alt='' />
                       <Gradient /> 
                     </Link>
                   </Card>
                </SplideSlide>
               )
             })}
         </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 4rem 0rem;

  h3{
    margin-left: 20px;
  }
`;

const Card = styled.div`
   margin-top: 22px;
   margin-left: 17px;
   min-height: 20rem;
   border-radius: 2rem;
   overflow: hidden;
   position : relative;

   img{
    border-radius:2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
   }
   
   p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50% , 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: bolder;
    font-size: 1.2rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
   }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)) ;
`

export default Veggie
