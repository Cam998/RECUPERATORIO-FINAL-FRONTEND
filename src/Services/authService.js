import ENVIRONMENT from '../Config/environment';

export async function login({ email, password }) {
    const url = `${ENVIRONMENT.API_URL}/api/auth/login`;
    console.log('Login URL:', url);
    
    try {
        const response_http = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Login status:', response_http.status);
        const response = await response_http.json();
        console.log('Login response:', response);
        
        if (!response_http.ok) {
            throw new Error(response.message || `Error ${response_http.status}: ${response_http.statusText}`);
        }
        
        return response;
    } catch (error) {
        console.error('Login fetch error:', error);
        throw error;
    }
};

export async function register({ email, password, name }) {
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/register`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name })
        }
    );

    const response = await response_http.json();
    
    if (!response_http.ok) {
        throw new Error(response.message || response_http.statusText || 'Error al registrarse');
    }
    
    return response
};

export async function resetPasswordRequest({ email }) {
    const response_http = await fetch(
        `${ENVIRONMENT.API_URL}/api/auth/reset-password-request`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        }
    );

    const response = await response_http.json();
    
    if (!response_http.ok) {
        throw new Error(response.message || response_http.statusText || 'Error al enviar solicitud');
    }
    
    return response
};