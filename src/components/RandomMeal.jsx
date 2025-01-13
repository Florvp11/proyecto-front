import { useEffect, useState } from "react";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import './randomMeals.css'

export function RandomMeal() { //muestra recetas random en la pantalla principal
    const [randomMeal, setRandomMeal] = useState(null);
    const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

    useEffect(() => {
        fetchRandomMeal();
    }, []);

    const fetchRandomMeal = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setRandomMeal(data.meals[0]);
        } catch (error) {
            console.error("error message: " + error);
        }
    }

    return (
        <> {
            randomMeal && (
                <article className="RandomMeal contain">
                    <img src={randomMeal.strMealThumb} alt={randomMeal.strMeal} />
                    <div className="content">
                        <h2>{randomMeal.strMeal}</h2>

                        {/* Mostrar solo los primeros 100 caracteres de strInstructions */}
                        <p className="description">{randomMeal.strInstructions.slice(0, 500)}...</p>
                    </div>

                    <button className="btn" onClick={() => fetchRandomMeal()}>
                        <HiOutlineArrowsRightLeft size={18} className="btn-arrows" />
                    </button>
                </article>
            )
        }
            {randomMeal == null && (
                <article className="recipe-main">
                    <div className="img-placeholder">
                        < img src="#" alt="" />
                    </div>
                </article>
            )}
        </>
    )
}