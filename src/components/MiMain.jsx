

import { ListaRecetas } from './ListaRecetas';
import { RandomMeal } from './RandomMeal';

export function MiMain({ meals, toggleFavorite }) {
    return (
        <main>
            {
                meals && meals.length > 0 ? (
                    <ListaRecetas meals={meals} toggleFavorite={toggleFavorite} />
                ) : (
                    <>

                        <RandomMeal /> 
                        <ListaRecetas meals={meals} toggleFavorite={toggleFavorite} />
                    </>
                )
            }
        </main>
    );
}