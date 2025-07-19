
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Envía los datos del formulario de contacto a la API.
 * @param {object} formData - Un objeto con los datos del formulario (name, email, message).
 * @returns {Promise<object>} Una promesa que se resuelve con la respuesta de la API o se rechaza con un error.
 */
export const sendContactForm = async (formData) => {
  const fullApiUrl = `${API_BASE_URL}/api/contact/`;

  try {
    const response = await fetch(fullApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Si la respuesta no es OK (ej. 4xx o 5xx), lanzamos un error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error de la API con estado: ${response.status}`);
    }

    // Si la respuesta es OK, devolvemos los datos (o un status: 'ok' si la API lo envía)
    return await response.json();

  } catch (error) {
    // Captura errores de red o los errores lanzados por 'throw new Error'
    console.error('Error en sendContactForm:', error);
    throw error; // Propaga el error para que el componente lo pueda manejar
  }
};