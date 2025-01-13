

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import "./style.css";
import { Header } from "./components/Header";
import { MiMain } from "./components/MiMain";
import { Receta } from "./components/Receta";
import { Footer } from "./components/Footer";
import { FavoritesPage } from "./components/FavoritesPage";
import { RandomMeal } from "./components/RandomMeal";
import { Categorias } from "./components/Categorias";
import { NoExiste } from "./components/NoExiste";
import { CategoriaEspecifica } from "./components/CategoriaEspeciica";

function App() {
  const [meals, setMeals] = useState([]);  // Estado para almacenar las recetas cargadas
  const [loading, setLoading] = useState(false);   // Estado para controlar si se está cargando contenido
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);   // Estado para cargar recetas por letra
  const [favorites, setFavorites] = useState([]);  // Estado para almacenar las recetas favoritas
  const [search, setSearch] = useState(""); // Estado texxxto busqueda\

  const { pathname } = useLocation();



  const navigate = useNavigate();

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");


  const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

  // Función para cargar más recetas segun la letra
  const loadMeals = async () => {
    // No carga más si ya se está cargando, si se alcanzó el final del abc o si hay una búsqueda activa
    if (loading || currentLetterIndex >= alphabet.length || search) return;

    setLoading(true); // Activa el indicador de carga

    try {

      const letter = alphabet[currentLetterIndex];
      const response = await fetch(`${API_URL}${letter}`);
      const data = await response.json();

      if (data.meals) {
        setMeals((prevMeals) => [...prevMeals, ...data.meals]);
      }

      setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error cargando más recetas:", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // verifica si el usuario llegó al final de la página para q se carguen mas recetas 
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadMeals();
      }
    };

 
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, currentLetterIndex, alphabet, search]);

  console.log("este es el pathname", pathname)

  const changeSearch = (value) => {

    if (pathname !== "/") { //cuando busco si estoy en otro != main me lleva a main y me trae el contenido
      navigate("/")

    }
    setSearch(value.trim()); 
    setMeals([]); // Resetea las recetas cargadas
    setCurrentLetterIndex(0); 
  };

  useEffect(() => {
    if (search) {
      const fetchMealsBySearch = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          );
          const data = await response.json();

          if (data.meals) {
            setMeals(data.meals);
          } else {
           
            navigate("/noexiste"); //me lleva a no exxiste si escribi algo q no se encuentra en la api
          }
        } catch (error) {
          console.error("Error buscando recetas:", error);
        }
      };

      fetchMealsBySearch();
    } else {
      loadMeals();
    }
  }, [search]);

  //-------------------FAVRORITOS-----------------//

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites); 
  }, []);


  const toggleFavorite = (meal) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.idMeal !== meal.idMeal)        // Si ya esta en favorito lo elimino si no esta lo agrego
      : [...favorites, meal];

    setFavorites(updatedFavorites); 
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // guardo los favoritos en localStorage
  };

  return (
    <>
      <Header
        changeSearch={changeSearch}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleHomeClick={() => setSearch("")} 
      />

      <Categorias />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {search === "" && <RandomMeal />}
              <MiMain meals={meals} toggleFavorite={toggleFavorite} />
              {loading && <p className="loading">Cargando más recetas...</p>}
            </>
          }
        />
        <Route path="/receta/:id" element={<Receta />} />
        <Route path="/favoritespage" element={<FavoritesPage favorites={favorites} />} />
        <Route path="/categoriaespecifica/:categoria" element={<CategoriaEspecifica />} />
        <Route path="/noexiste" element={<NoExiste />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
