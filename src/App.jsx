

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




  // Navegador para redirigir a diferentes rutas
  const navigate = useNavigate();

  // abecedario 
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

      // Si se obtienen recetas las agrega al estado existente
      if (data.meals) {
        setMeals((prevMeals) => [...prevMeals, ...data.meals]);
      }

      // Incrementa el índice para cargar la siguiente letra
      setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error cargando más recetas:", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Detecta cuando el usuario hace scroll al final de la página y carga más recetas
  useEffect(() => {
    const handleScroll = () => {
      // Verifica si el usuario llegó al final de la página
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        loadMeals(); // Carga más recetas
      }
    };

    // Agrega un event listener para el scroll
    window.addEventListener("scroll", handleScroll);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, currentLetterIndex, alphabet, search]);

  console.log("este es el pathname", pathname)

  const changeSearch = (value) => {

    if (pathname !== "/") { //cuando busco si estoy en otro <> main me lleva a main y me trae el contenido
      navigate("/")

    }
    setSearch(value.trim()); // Actualiza el término de búsqueda
    setMeals([]); // Resetea las recetas cargadas
    setCurrentLetterIndex(0); // Reinicia el índice de letras
  };

  // Efecto que busca recetas cuando hay un término de búsqueda activo
  useEffect(() => {
    if (search) {
      const fetchMealsBySearch = async () => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
          );
          const data = await response.json();

          // Si se encuentran recetas se actualiza el estado
          if (data.meals) {
            setMeals(data.meals);
          } else {
            // Si no hay resultados, redirige a una página de "No existe"
            navigate("/noexiste");
          }
        } catch (error) {
          console.error("Error buscando recetas:", error);
        }
      };

      fetchMealsBySearch();
    } else {
      loadMeals();
    }
  }, [search, navigate]);

  //-------------------FAVRORITOS-----------------//


  // Carga los favoritos almacenados en localStorage cuando se monta el componente
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites); // Establece los favoritos en el estado
  }, []);
  // ........Función para agregar o quitar una receta de FAVORITOS

  const toggleFavorite = (meal) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === meal.idMeal);

    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.idMeal !== meal.idMeal)        // Si ya esta en favorito, lo elimina si no, lo agrega
      : [...favorites, meal];

    setFavorites(updatedFavorites); // Actualiza el estado de favoritos
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Guarda los favoritos en localStorage
  };

  return (
    <>
      <Header
        changeSearch={changeSearch}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleHomeClick={() => setSearch("")} // Limpia la búsqueda al hacer clic en "Inicio"
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
