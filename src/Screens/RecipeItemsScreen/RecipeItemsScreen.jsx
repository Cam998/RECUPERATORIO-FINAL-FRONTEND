import React, { useState, useEffect, useContext } from 'react';
import { BsStopwatchFill } from 'react-icons/bs';
import { FaHeart, FaRegHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { getRecipes, getMyRecipes, deleteRecipe, toggleFavoriteApi, getFavoriteRecipesApi } from '../../Services/recipeService';
import { AuthContext } from '../../Context/AuthContext';
import { AlertContext } from '../../Context/AlertContext';
import { useNavigate } from 'react-router';
import './recipeitemsscreen.css';

function RecipeItemsScreen({ mineOnly = false, showEmptyMessage = false, favoritesOnly = false, allowDelete = false }) {
    const { isLogged } = useContext(AuthContext);
    const { showAlert, showConfirm } = useContext(AlertContext);
    const navigate = useNavigate();
    const [allRecipes, setAllRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (isLogged) {
            getFavoriteRecipesApi()
                .then(data => {
                    if (data.payload) {
                        setFavorites(data.payload.map(r => r._id || r));
                    }
                })
                .catch(err => console.error('Error al cargar favoritos:', err));
        } else {
            setFavorites([]);
        }
    }, [isLogged]);

    const toggleFavorite = async (id) => {
        if (!id) return;
        const isFav = favorites.includes(id);
        setFavorites(prev => isFav ? prev.filter(fId => fId !== id) : [...prev, id]);
        
        try {
            await toggleFavoriteApi(id);
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
            setFavorites(prev => !isFav ? prev.filter(fId => fId !== id) : [...prev, id]);
            showAlert('No se pudo guardar el favorito');
        }
    };

    const handleDelete = (id) => {
        showConfirm('¿Estás seguro de que quieres eliminar esta receta?', async () => {
            try {
                await deleteRecipe(id);
                setAllRecipes(prev => prev.filter(r => r._id !== id));
                showAlert('La receta se eliminó correctamente.');
            } catch (err) {
                console.error('Error al eliminar:', err);
                showAlert('No se pudo eliminar la receta');
            }
        });
    };

    const handleEdit = (id) => {
        navigate(`/editarReceta/${id}`);
    };

    useEffect(() => {
        if (!isLogged) {
            setAllRecipes([]);
            return;
        }

        const fetchFn = mineOnly ? getMyRecipes : getRecipes;

        fetchFn()
            .then(data => {
                if (data.payload) {
                    setAllRecipes(data.payload);
                } else if (Array.isArray(data)) {
                    setAllRecipes(data);
                } else if (data.recipes) {
                    setAllRecipes(data.recipes);
                }
            })
            .catch(err => console.error('Error al cargar recetas:', err));
    }, [mineOnly, isLogged]);

    if (!isLogged) {
        return null;
    }

    let displayedRecipes = allRecipes;
    if (favoritesOnly) {
        displayedRecipes = allRecipes.filter(r => favorites.includes(r._id));
    }

    if (!displayedRecipes || displayedRecipes.length === 0) {
        if (showEmptyMessage) {
            const msg = favoritesOnly ? 'Aún no tienes recetas favoritas.' : 'Aún no has creado ninguna receta.';
            return <div style={{ textAlign: 'center', padding: '2rem', color: '#4f6374' }}>{msg}</div>;
        }
        return null;
    }

    return (
        <div className="home-recipe" id="recetas">
            <div className='card-container'>
                {
                    displayedRecipes?.map((item, index) => {
                        const recipeId = item._id;
                        const isFav = favorites.includes(recipeId);

                        return (
                            <div key={recipeId || index} className='card'>
                                <img src={item.imagen || 'https://via.placeholder.com/300x200?text=Receta'} alt={item.titulo || 'Receta'} />
                                <div className='card-body'>
                                    <div className='title'>
                                        {item.titulo}
                                    </div>
                                    <div className='icons'>
                                        <div>
                                            <BsStopwatchFill />
                                            {item.tiempo || '30min'}
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            {allowDelete && (
                                                <FaTrash
                                                    color="#a0aec0"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDelete(recipeId)}
                                                    title="Eliminar receta"
                                                />
                                            )}
                                            <FaEdit style={{ cursor: 'pointer', color: '#a0aec0' }} onClick={() => handleEdit(recipeId)} title="Editar receta" />
                                            <div onClick={() => toggleFavorite(recipeId)} style={{ cursor: 'pointer' }}>
                                                {isFav ? <FaHeart color="#e53e3e" /> : <FaRegHeart color="#a0aec0" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default RecipeItemsScreen;