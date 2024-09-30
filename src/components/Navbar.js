import { useRef, useEffect } from "react";

export default function Navbar({ query, movies, onSetQuery, onSubmit }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          className="search"
          type="text"
          placeholder="Search movies... (Press Enter to search)"
          value={query}
          ref={inputEl}
          onChange={(e) => onSetQuery(e.target.value)}
        />
      </form>
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}
