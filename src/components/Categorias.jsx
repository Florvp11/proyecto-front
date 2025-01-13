import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './categories.css'

export function Categorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategorias(data.categories);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchCategorias();
    }, []
    )

    return (
        <section className="contain-categories">
            {categorias &&
                categorias.map((item, index) => (
                    <Link
                        key={item.idCategory}
                        to={`/categoriaespecifica/${item.strCategory}`}
                        className="categorie"
                    >
                        <div className="categorie-card">
                            <p>{item.strCategory}</p>
                        </div>
                    </Link>
                ))
            }
            {categorias.length == 0 &&
                Array(10).fill().map((item, index) => (
                    <div className="cate-placeholder"></div>
                ))
            }
        </section>
    );
}
