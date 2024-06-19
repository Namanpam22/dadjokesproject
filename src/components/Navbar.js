import React from "react";

export default function () {
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          Jokes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active text-white" href="/">
              Search
            </a>
            <a className="nav-link text-white" href="/Favourites">
              Favourites
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
