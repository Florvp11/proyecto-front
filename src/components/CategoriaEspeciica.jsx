
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function CategoriaEspecifica() {
    const { categoria } = useParams(); // Obtiene la categoría desde la URL
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`);
                const data = await response.json();
                setRecetas(data.meals || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComidas();
    }, [categoria]);

    return (
        <section className="grid-recipes contain">
            <h2> Recetas que contienen {categoria} </h2>
            <section className="recipes">
                {recetas.length > 0 ? (
                    recetas.map((meal) => (
                        <Link key={meal.idMeal} className="meals-card" to={`/receta/${meal.idMeal}`}>
                            <div className="meal-card">
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <h3>{meal.strMeal}</h3>
                            </div>
                        </Link>
                    ))
                ) : (

                    recetas.length === 0 &&
                    Array(8).fill().map((_, index) => (
                        <div key={index} className="recipe-placeholder">
                            <div className="img-placeholder"><img src="" alt="" /></div>
                            <div className="title-placeholder"><h2></h2></div>
                        </div>
                    ))

                )}

            </section>
        </section>
    );
}
