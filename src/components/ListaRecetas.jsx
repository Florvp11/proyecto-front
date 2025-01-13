

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './listaRecetas.css'

// Componente para mostrar los tags
const Tags = ({ tags }) => {
    return tags.length > 0 ? (
        <ul className="tag-list">
            {tags.map((tag, index) => (
                <li key={tag + index} className="tag-item">{tag}</li>
            ))}
        </ul>
    ) : null;
};

export function ListaRecetas({ meals, toggleFavorite }) {
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        if (meals.length > 0) {
            setRecetas(meals);
        } else {
            const fetchData = async () => {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=f');
                const data = await response.json();
                setRecetas(data.meals);
            };

            fetchData();
        }
    }, [meals]);

    return (
        <section className="grid-recipes  contain">
            <h2 className="allRecipes">Nuestras recetas</h2>
            <section className="recipes ">
                {recetas?.map((meal, index) => {
                    const tags = meal.strTags ? meal.strTags.split(',').slice(0, 3) : [];
                    return (

                        <Link key={index} className="meals-card" to={`/receta/${meal.idMeal}`}>

                            <div className="imagen">
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                            </div>
                            <div className="recipes-container">
                                <h2 className="meal-title">{meal.strMeal}</h2>
                                {/* Aquí se reutiliza el componente de los tags */}
                                <Tags tags={tags} />
                            </div>
                        </Link>
                    );
                })}
                {recetas.length === 0 &&
                    Array(8).fill().map((_, index) => (
                        <div key={index} className="recipe-placeholder">
                            <div className="img-placeholder"><img src="" alt="" /></div>
                            <div className="title-placeholder"><h2></h2></div>
                        </div>
                    ))}
            </section>
        </section>
    );
}

