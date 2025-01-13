
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

  useEffect(() => {  //para cerrar el men hamburguesa si agrandola pantalla 
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cleanSearch = () => {
    setSearchValue("")
  }

  return (
    <header className="header">
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <HiMenu size={24} />
      </button>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link className="home" to="/" onClick={()=> {
          cleanSearch()
          handleHomeClick()
          }}>
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

        <Link onClick={cleanSearch} className="favIcon" to="/favoritespage">
          <HiOutlineHeart size={24} />
        </Link>
      </div>
    </header>
  );
}
