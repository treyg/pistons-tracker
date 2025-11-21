const getStonsGames = async () => {
  try {
    // Use Railway API URL in production, localhost in development
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    console.log('Fetching games from:', `${API_URL}/api/games`);
    const response = await fetch(`${API_URL}/api/games`);
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export default getStonsGames;
