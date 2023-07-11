import { SyntheticEvent } from "react";
import { useFilms } from "../../hooks/use.films";

export function FilterFilms() {
  const { handleLoadFiltered, handleLoadFilms } = useFilms();

  const handleFilter = (event: SyntheticEvent) => {
    const element = event.target as HTMLButtonElement;
    if (element.name === "genre") {
      const filter = `genre=${element.value}`;
      handleLoadFiltered(filter);
    }
  };

  return (
    <div>
      <label htmlFor="genre">Select a genre</label>
      <select name="genre" id="genre" onChange={handleFilter}>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Animation">Animation</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Horror">Horror</option>
        <option value="Comedy">Comedy</option>
      </select>
      <div>
        <button onClick={handleLoadFilms}>SHOW ALL</button>
      </div>
    </div>
  );
}
