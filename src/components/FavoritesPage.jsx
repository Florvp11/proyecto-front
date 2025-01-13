
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import './favoritePage.css'

export function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
        setFavorites(storedFavorites);
    }, []);

   
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter((receta) => receta.idMeal !== id);

        setFavorites(updatedFavorites);  
        localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
    };

    return (
        <div className=" favorite-page contain ">
            <h1>Recetas Favoritas</h1>
            {favorites.length === 0 ? (
                <p>No tienes recetas favoritas.</p>
            ) : (
                <ul className="list-favorite">
                    {favorites.map((receta) => (
                        <li key={receta.idMeal}>
                            <Link className="card-favorite" to={`/receta/${receta.idMeal}`}>
                                <img src={receta.strMealThumb} alt={receta.strMeal} />
                                <div className="card-body">
                                    <h3>{receta.strMeal}</h3>
                                    <p className="description">{receta.strInstructions.slice(0, 300)}...</p>
                                </div>
                            </Link>
                            <button onClick={() => removeFromFavorites(receta.idMeal)}><HiX /></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
