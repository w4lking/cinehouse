import React, { useState } from 'react';
import './navigation.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

   const movies = [
    {
      title: "A Guerra dos Tronos",
      year: 2011,
      genre: "Sci-Fi & Fantasy",
      image: "https://filmestipo.com/img_pt/movie/thumb/c3/17234.jpg",
    },
    {
      title: "Gladiador 2",
      year: 2024,
      genre: "Ação",
      image: "https://th.bing.com/th/id/OIP.gbfv2ChzEjJqCtKqnGog1gAAAA?pid=ImgDet&w=203&h=284&c=7",
    },
    {
      title: "Interestellar",
      year: 2014,
      genre: "Aventura",
      image: "https://th.bing.com/th/id/OIP.n-lW5hhF0w9CCmLzfl6aRAHaK-?w=156&h=180&c=7&r=0&o=5&pid=1.7",
    },
    {
      title: "Batman: O Cavaleiro das Trevas",
      year: 2008,
      genre: "Drama",
      image: "https://th.bing.com/th/id/OIP.pRTdnrHNZ4m7PgthgCuk7gHaLH?rs=1&pid=ImgDetMain",
    },
    {
      title: "Breaking Bad",  
      year: 2008,
      genre: "Drama",
      image: "https://flxt.tmsimg.com/assets/p185846_b_v8_ad.jpg",
    },
    {
      title: "Mufasa: O Rei Leão",
      year: 2024,
      genre: "Aventura",
      image: "https://d2d7ho1ae66ldi.cloudfront.net/ArquivoNoticias/6f03766b-3097-11ed-aa6e-9587410378a2/chrome_2022-09-09_20-30-31.png",
    },
    {
      title: "O Rei Leão",
      year: 1994,
      genre: "Família",
      image: "https://media.fstatic.com/vt_MW89z2Dgkydc0GECK5F6FOTo=/fit-in/290x478/smart/media/movies/covers/2012/04/33b3d92f9191e90b9109b57e44c0f686.jpg",
    },
    {
      title: "Sherlock",
      year: 2010,
      genre: "Crime",
      image: "https://artworks.thetvdb.com/banners/posters/176941-19.jpg",
    },
    {
      title: "Pisque duas vezes",
      year: 2024,
      genre: "Mistério",
      image: "https://br.web.img3.acsta.net/img/db/a0/dba095a6b2889122a6fdc5c93915f85a.PNG",
    },
    {
      title: "Matrix",
      year: 1999,
      genre: "Ação",
      image: "https://images-na.ssl-images-amazon.com/images/I/91wkDmLK3UL._SX600_.jpg",
    },
    {
      title: "Longlegs - Vinculo Mortal",
      year: 2024,
      genre: "Crime",
      image: "https://th.bing.com/th/id/OIP.VViS8owCRX9A7aYNaT3qhQHaK3?rs=1&pid=ImgDetMain",
    },
  ];


  return (
    <div className="app">
      {/* <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button> */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>
          X
        </button>
        <ul>
          <li>Home</li>
          <li>Perfil</li>
          <li>Filmes</li>
        </ul>
      </aside>
      <main className="content">
        <header className="header">
          <h1>CineHouse</h1>
        </header>
        <section className="main-content">
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <MovieContainer
                key={index}
                title={movie.title}
                year={movie.year}
                genre={movie.genre}
                image={movie.image}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function MovieContainer({ title, year, genre, image }) {
  return (
    <div className="movie-container">
      <img src={image} alt={title} className="movie-image" />
      <div className="movie-info">
        <h4>{title}</h4>
        <p>{year}, {genre}</p>
      </div>
    </div>
  );
}

export default App;
