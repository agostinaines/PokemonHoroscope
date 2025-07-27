import { useState } from 'react'
import './App.css'
import searchicon from './images/searchicon.png'
import heartfull from './images/heartfull.png'
import trashcan from './images/trashcan.png'
import pokemonlogo from './images/pokemonlogo.png'
import questionmark from './images/questionmark.png'
import pokeidicon from './images/pokeidicon.png'
import poketypeicon from './images/poketypeicon.png'
import pokeheight from './images/pokeheighticon.png'

function App() {
  const [query, setQuery] = useState("");
  const [birthday, setBirthday] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();

    const input = query.trim().toLowerCase();
    if (!input) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)

      .then((res) => {
        if (!res.ok) throw new Error("Pokémon not found");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setError(null);
      })
      .catch((err) => {
        setPokemon(null);
        setError(err.message);
      });
  };

  const handleBirthday = () => {
    if (!birthday) return;

    const date = new Date(birthday);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const pokeId = ((day + month * 31) % 898) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon not found");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setError(null);
      })
      .catch((err) => {
        setPokemon(null);
        setError(err.message);
      });
  }

  const addToFavorites = (pokemon) => {
    if (!pokemon || !pokemon.name) return;

    if (favorites.some(fav => fav.name === pokemon.name)) return;

    setFavorites([...favorites, pokemon]);
  }

  const deleteFromFavorites = (id) => {
    if (!id) return;

    setFavorites(favorites.filter(pokemon => pokemon.id !== id))
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className='Overall'>

      <header className="Page-Title">
        <div className="Pokémon-Logo-Box"> <img className="Pokémon-Logo" src={pokemonlogo} alt="Pokémon-Logo-Pixel-Art" /> </div>
        <h1 className="Horoscope-Title">horoscope</h1>
      </header>

      <div className="Pokémon-Horoscope" onSubmit={handleBirthday}>
        <input className="Birthday-Input" type="date" value={birthday} onChange={(event) => setBirthday(event.target.value)} />
        <button className="Horoscope" type="submit" onClick={handleBirthday}> Find my Pokémon! </button>
      </div>

      <form className="Search-Bar" onSubmit={handleSearch}>
        <input className="Search-Input" type="text" placeholder="Search for a Pokémon..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <button className="Search-Button" type="submit"> <img className="Search-Icon" src={searchicon} alt="Magnifying glass" /> </button>
      </form>

      {error && (
        <div className="Pokémon-Not-Found">
          <h2> ??? </h2>
          <img className="Not-Found-Icon" src={questionmark} alt={"Pokémon styled question mark"} />
          <div className="Pokémon-Data-Not-Found"> 
            <p> <img className="Pokémon-ID" src={pokeidicon} alt="Notepad pixel art" />ID: ??? </p>
            <p> <img className="Pokémon-Type" src={poketypeicon} alt="Sparkle pixel art" />Type: ??? </p>
            <p> <img className="Pokémon-Height" src={pokeheight} alt="Ruler pixel art" />Height: ??? </p>
          </div>
        </div>
      )}

      {pokemon && pokemon.name && (
        <div className="Pokémon-Chart">
          <div className="Name-And-Heart"> <h2 className="Pokémon-Name"> {capitalize(pokemon.name)} </h2>
            <button className="Is-Favorite" onClick={() => addToFavorites(pokemon)}> <img className="Heart" src={heartfull} alt="Heart" /> </button>
          </div>
          <img className="Pokémon-Image" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="Pokémon-Data">
            <p> <img className="Pokémon-ID" src={pokeidicon} alt="Notepad pixel art" />ID: {pokemon.id} </p>
            <p> <img className="Pokémon-Type" src={poketypeicon} alt="Sparkle pixel art" />Type: {pokemon.types.map((t) => t.type.name).join(", ")} </p>
            <p> <img className="Pokémon-Height" src={pokeheight} alt="Ruler pixel art" />Height: {pokemon.height} </p>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="Favorites-List">
          <h3 className="Favorites-List-Title"> <img className="Favorites-List-Icon" src={heartfull} alt="Heart" /> Favorite Pokémon</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "5px" }}>
            {favorites.map((fav) => (
              <li className="Favorite-Pokémon" key={fav.id}>
                <img
                  className="Favorite-Pokémon-Image"
                  src={fav.sprites.front_default}
                  alt={fav.name}
                />
                <h4> {capitalize(fav.name)} </h4>
                <button className="Show-Pokémon" onClick={() => setPokemon(fav)}> Show info </button>
                <button className="Is-Not-Favorite" onClick={() => deleteFromFavorites(fav.id)}> <img className="Trash-Can" src={trashcan} alt="Trash can" /> </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;