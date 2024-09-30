import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import WatchedBox from "./WatchedBox";
import MovieDetails from "./MovieDetails";
import ListBox from "./ListBox";
import Box from "./Box";

export default function Main({
  isLoading,
  error,
  movies,
  watched,
  movieId,
  onSelectMovie,
  onCloseMovie,
  onAddWatched,
  onDeleteWatched,
}) {
  return (
    <main className="main">
      <Box>
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <ListBox movies={movies} onSelectMovie={onSelectMovie} />
        )}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {movieId ? (
          <MovieDetails
            movieId={movieId}
            watched={watched}
            onCloseMovie={onCloseMovie}
            onAddWatched={onAddWatched}
          />
        ) : (
          <WatchedBox watched={watched} onDeleteWatched={onDeleteWatched} />
        )}
      </Box>
    </main>
  );
}
