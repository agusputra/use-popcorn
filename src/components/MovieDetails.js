import { useState, useEffect } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { API_KEY } from "../constants";

export default function MovieDetails({
  movieId,
  watched,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieId,
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`,
      );
      if (!res.ok) {
        throw new Error("Something went wrong with fetching movie details");
      }
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title} - usePopcorn`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {watchedUserRating > 0 ? (
                <p>
                  You rated with movie &nbsp;
                  <span>{watchedUserRating}</span>
                  <span>🌟</span>
                </p>
              ) : (
                <>
                  <StarRating rating={userRating} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
