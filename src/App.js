import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { useKey } from "./hooks/useKey";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function App() {
  const [query, setQuery] = useState("");
  const [finalQuery, setFinalQuery] = useState("gold");
  const [movies, isLoading, error] = useMovies(finalQuery);
  const [watched, setWatched] = useLocalStorageState("watched", []);
  const [movieId, setMovieId] = useState(null);

  useKey("Escape", () => setMovieId(null));

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) => watched.filter((m) => m.imdbID !== movieId));
  }

  return (
    <>
      <Navbar
        query={query}
        movies={movies}
        watched={watched}
        onSetQuery={setQuery}
        onSubmit={() => setFinalQuery(query)}
      />
      <Main
        isLoading={isLoading}
        error={error}
        movies={movies}
        watched={watched}
        movieId={movieId}
        onSelectMovie={(newMovieId) =>
          setMovieId((movieId) => (newMovieId === movieId ? null : newMovieId))
        }
        onCloseMovie={() => setMovieId(null)}
        onAddWatched={handleAddWatched}
        onDeleteWatched={handleDeleteWatched}
      />
    </>
  );
}
