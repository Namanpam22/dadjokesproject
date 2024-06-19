import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [jokes, setJokes] = useState([]);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get(
          `https://icanhazdadjoke.com/search?term=${searchInput}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        setJokes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchInput.trim() !== "") {
      fetchJokes();
    } else {
      setJokes([]);
    }
  }, [searchInput]);

  const handleFavourite = async (joke) => {
    setFav([...fav, joke.id]);

    try {
      const formData = new FormData();
      formData.append("image", joke.id);
      formData.append("imageUrl", `https://icanhazdadjoke.com/j/${joke.id}.png`);

      await axios.post(`http://localhost:3001/upload`, formData);
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-group flex p-1 flex-row w-100">
          <input
            type="text"
            value={searchInput}
            className="form-control w-50"
            placeholder="Search here"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button className="btn btn-primary">Search</button>
        </div>

        <div className="jokes">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {jokes.map((joke) => (
              <div key={joke.id} className="col">
                <div className="card flex">
                  <img
                    src={`https://icanhazdadjoke.com/j/${joke.id}.png`}
                    className="card-img-top"
                    alt="Joke Image"
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleFavourite(joke)}
                  >
                    Favourite
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
