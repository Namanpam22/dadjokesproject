import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:3001/favourites");
        setFavourites(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="text-center">Favourites</h2>
        <ol>
          {favourites.map((favourite) => (
            <li key={favourite.image_id} className="favourite-item">
              <img
                src={`http://localhost:3001/uploads/${favourite.image_id}`}
                alt={`Favourite ${favourite.image_id}`}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Favourites;
