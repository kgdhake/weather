const API_BASE_URL = 'http://localhost:5001/api';

export const getWeather = async ({ lat, lon }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};