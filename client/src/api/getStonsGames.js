const getStonsGames = async () => {
  try {
    // Use Railway API URL in production, localhost in development
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const response = await fetch(`${API_URL}/api/games`);
    if (!response.ok) {
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
