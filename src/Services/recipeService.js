import ENVIRONMENT from '../Config/environment';
import { LOCALSTORAGE_TOKEN_KEY } from '../Context/AuthContext';

export async function addRecipe({ titulo, ingredientes, instrucciones, tiempo, imagen }) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('ingredientes', JSON.stringify(ingredientes));
    formData.append('instrucciones', instrucciones);
    formData.append('tiempo', tiempo);
    if (imagen) {
        formData.append('imagen', imagen);
    }

    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al guardar la receta: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response
};

export async function getRecipes() {
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes`
    );

    const response = await response_http.json();
    return response
};

export async function getMyRecipes() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes/my-recipes`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al obtener mis recetas: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};

export async function deleteRecipe(id) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al eliminar la receta: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};

export async function getRecipeById(id) {
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes/${id}`
    );

    if (!response_http.ok) {
        throw new Error(`Error al obtener la receta: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};

export async function editRecipe(id, { titulo, ingredientes, instrucciones, tiempo, imagen }) {
    const formData = new FormData();
    if (titulo) formData.append('titulo', titulo);
    if (ingredientes) formData.append('ingredientes', JSON.stringify(ingredientes));
    if (instrucciones) formData.append('instrucciones', instrucciones);
    if (tiempo) formData.append('tiempo', tiempo);
    if (imagen) formData.append('imagen', imagen);

    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/recipes/${id}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al editar la receta: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};

export async function toggleFavoriteApi(recipeId) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/favorites/${recipeId}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al actualizar favoritos: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};

export async function getFavoriteRecipesApi() {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/favorites`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response_http.ok) {
        throw new Error(`Error al obtener favoritos: ${response_http.statusText}`);
    }

    const response = await response_http.json();
    return response;
};
