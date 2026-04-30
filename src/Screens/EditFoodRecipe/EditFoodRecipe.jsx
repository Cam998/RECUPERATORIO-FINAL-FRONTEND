import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getRecipeById, editRecipe } from '../../Services/recipeService';
import { AlertContext } from '../../Context/AlertContext';
import '../AddFoodRecipe/addfoodrecipe.css';

function EditFoodRecipe() {
    const { id } = useParams();
    const [recipeData, setRecipeData] = useState({
        titulo: '',
        tiempo: '',
        ingredientes: '',
        instrucciones: ''
    });
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const { showAlert } = useContext(AlertContext);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipeById(id)
            .then(data => {
                setRecipeData({
                    titulo: data.titulo || '',
                    tiempo: data.tiempo || '',
                    ingredientes: Array.isArray(data.ingredientes) ? data.ingredientes.join(', ') : (data.ingredientes || ''),
                    instrucciones: data.instrucciones || ''
                });
            })
            .catch(err => {
                console.error("Error cargando receta", err);
                showAlert("Error al cargar la receta para edición.");
                navigate('/miReceta');
            })
            .finally(() => setInitialLoading(false));
    }, [id, navigate, showAlert]);

    const onHandleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setRecipeData(pre => ({ ...pre, [name]: files[0] }));
        } else {
            setRecipeData(pre => ({ ...pre, [name]: value }));
        }
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = { ...recipeData };
            if (typeof dataToSend.ingredientes === 'string') {
                dataToSend.ingredientes = dataToSend.ingredientes.split(',').map(i => i.trim());
            }

            await editRecipe(id, dataToSend);
            showAlert('¡Receta actualizada exitosamente!');
            navigate('/miReceta');
        } catch (error) {
            console.error('Error al editar la receta:', error);
            showAlert('Error al actualizar la receta. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando datos de la receta...</div>;
    }

    return (
        <>
            <div className='add-container'>
                <form className='add-form' onSubmit={onHandleSubmit}>
                    <h2>Editar Receta</h2>
                    <div className='add-form-control'>
                        <label>Título</label>
                        <input type='text' className='add-form-input' name='titulo' value={recipeData.titulo} onChange={onHandleChange} required></input>
                    </div>
                    <div className='add-form-control'>
                        <label>Tiempo</label>
                        <input type='text' className='add-form-input' name='tiempo' value={recipeData.tiempo} onChange={onHandleChange} required></input>
                    </div>
                    <div className='add-form-control'>
                        <label>Ingredientes (separados por coma)</label>
                        <textarea className='add-form-input-textarea' name='ingredientes' rows='5' value={recipeData.ingredientes} onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='add-form-control'>
                        <label>Instrucciones</label>
                        <textarea className='add-form-input-textarea' name='instrucciones' rows='5' value={recipeData.instrucciones} onChange={onHandleChange} required></textarea>
                    </div>
                    <div className='add-form-control'>
                        <label>Imágen de receta (opcional)</label>
                        <input type='file' className='add-form-input' name='imagen' onChange={onHandleChange} accept='image/*'></input>
                        <small style={{ color: '#718096', marginTop: '5px', display: 'block' }}>Si no seleccionas una imagen, se mantendrá la anterior.</small>
                    </div>
                    <button type='submit' disabled={loading}>{loading ? 'Actualizando' : 'Actualizar receta'}</button>
                </form>
            </div>
        </>
    )
};

export default EditFoodRecipe;
