import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { addRecipe } from '../../Services/recipeService';
import { AlertContext } from '../../Context/AlertContext';
import './addfoodrecipe.css';

function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const [loading, setLoading] = useState(false);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setRecipeData(pre => ({ ...pre, [name]: files[0] }));
        } else {
            let val = (name === 'ingredientes') ? value.split(',').map(i => i.trim()) : value;
            setRecipeData(pre => ({ ...pre, [name]: val }));
        }
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addRecipe(recipeData);
            showAlert('¡Receta guardada exitosamente!');
            navigate('/miReceta');
        } catch (error) {
            console.error('Error al guardar la receta:', error);
            showAlert('Error al guardar la receta. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className='add-container'>
                <form className='add-form' onSubmit={onHandleSubmit}>
                    <h2>Agregar Nueva Receta</h2>
                    <div className='add-form-control'>
                        <label>Título</label>
                        <input type='text' className='add-form-input' name='titulo' onChange={onHandleChange}></input>
                    </div>
                    <div className='add-form-control'>
                        <label>Tiempo</label>
                        <input type='text' className='add-form-input' name='tiempo' onChange={onHandleChange}></input>
                    </div>
                    <div className='add-form-control'>
                        <label>Ingredientes</label>
                        <textarea className='add-form-input-textarea' name='ingredientes' rows='5' onChange={onHandleChange}></textarea>
                    </div>
                    <div className='add-form-control'>
                        <label>Instrucciones</label>
                        <textarea className='add-form-input-textarea' name='instrucciones' rows='5' onChange={onHandleChange}></textarea>
                    </div>
                    <div className='add-form-control'>
                        <label>Imágen de receta</label>
                        <input type='file' className='add-form-input' name='imagen' onChange={onHandleChange} accept='image/*'></input>
                    </div>
                    <button type='submit' disabled={loading}>{loading ? 'Guardando' : 'Agregar receta'}</button>
                </form>
            </div>
        </>
    )
};

export default AddFoodRecipe;