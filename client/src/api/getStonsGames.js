const getStonsGames = async () => {
  try {
    // Fetch from our local server proxy to avoid CORS issues
    const response = await fetch('http://localhost:4000/api/games');
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
