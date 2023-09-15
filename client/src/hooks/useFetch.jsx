import { useEffect, useState } from "react";

// Get the GIPHY API key from the environment variables
const APIKEY = import.meta.env.VITE_GIPHY_API;

// Custom hook for fetching GIFs based on a keyword
const useFetch = ({ keyword }) => {
  // State to store the fetched GIF URL
  const [gifUrl, setGifUrl] = useState("");

  // Function to fetch GIFs based on the provided keyword
  const fetchGifs = async () => {
    try {
      // Make a request to the GIPHY API with the provided keyword
      const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      
      // Parse the response as JSON
      const { data } = await response.json();

      // Set the GIF URL to the first result's downsized medium image URL
      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
      // If there's an error (e.g., network issue), set a default GIF URL
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  // Use the useEffect hook to fetch GIFs when the keyword changes
  useEffect(() => {
    if (keyword) {
      fetchGifs();
    }
  }, [keyword]);

  // Return the fetched GIF URL
  return gifUrl;
};

export default useFetch;

