

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './receta.css'

import { HiOutlineHeart, HiHeart } from "react-icons/hi";

export function Receta({ search }) {
    const { id } = useParams();
    const [receta, setReceta] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            setReceta(data.meals[0]);
        }

        fetchData();

       
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || []; //esta en fav?
        
        const isFav = storedFavorites.some(fav => fav.idMeal === id); //se fija con el id
        setIsFavorite(isFav);

    }, [id]);

    const toggleFavorite = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

        if (isFavorite) {
            const updatedFavorites = storedFavorites.filter(fav => fav.idMeal !== id); //si esta en fav y aprieto la elimina
            localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else { //si no la agrego
            
            storedFavorites.push(receta);  // Guardo la receta completa
            localStorage.setItem('favoriteRecipes', JSON.stringify(storedFavorites));
            setIsFavorite(true);
        }
    };

    const getIngredientes = () => {
        const ingredientes = [];
        for (let i = 1; i <= 20; i++) {  // tiene hasta 20 ingredientes segun la api
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            if (ingrediente && ingrediente.trim() !== "") {
                ingredientes.push(`${cantidad} ${ingrediente}`);
            }
        }
        return ingredientes;
    }

    return (
        <>

            <div className="specific-recipe contain">
                {
                    receta ? (
                        <div className="recipe-info">
                            <div className="selectedMeal-container">
                                <div className="head-grid">
                                    <h2>{receta.strMeal}</h2>

                                    <button
                                        className="favorite-button"
                                        onClick={toggleFavorite}
                                        style={{ backgroundColor: isFavorite ? '#ccc' : '#eee' }}>

                                        {isFavorite ? <HiHeart style={{ color: '#444' }} /> : <HiOutlineHeart style={{ color: '#444' }} />}
                                    </button>
                                </div>
                                <div className="imagen-gr">
                                    <img src={receta.strMealThumb} alt={receta.strMeal} />
                                </div>

                                <div className="ingredientes">
                                    <h3>Ingredientes:</h3>
                                    <ul>
                                        {getIngredientes().map((ingrediente, index) => (
                                            <li key={index}>{ingrediente}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="steps">
                                <p className="steps-reference">Step By Step</p>
                                <p>{receta.strInstructions}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading recipe...</p>
                    )
                }
            </div>
        </>
    );
}


