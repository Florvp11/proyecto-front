
import { useState, useEffect } from "react";
import { HiSearch, HiOutlineHome, HiOutlineHeart, HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import './header.css'

export function Header({ changeSearch, favorites, handleHomeClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchValue) {
      changeSearch(searchValue);
    }
  };

  // Cerrar menú si la pantalla se agranda
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Cierra el menú automáticamente
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <HiMenu size={24} />
      </button>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link className="home" to="/" onClick={handleHomeClick}>
          <HiOutlineHome size={24} />
        </Link>

        <div className="search">
          <input
            className="searcher"
            placeholder="Buscar Receta"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button className="button" onClick={handleSearch}>
            <HiSearch size={18} />
          </button>
        </div>

        <Link className="favIcon" to="/favoritespage">
          <HiOutlineHeart size={24} />
        </Link>
      </div>
    </header>
  );
}
