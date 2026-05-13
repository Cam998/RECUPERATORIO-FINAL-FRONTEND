const ENVIRONMENT = {
    API_URL: import.meta.env.VITE_API_URL
        ?.replace(/\/+$/, '')
        ?.replace(/\/api$/, '')
};

export default ENVIRONMENT;