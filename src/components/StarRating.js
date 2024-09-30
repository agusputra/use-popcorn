import { useState } from "react";
import starFull from "../assets/star-full.svg";
import star from "../assets/star.svg";

export default function StarRating({ rating = 0, starSize = 30, onSetRating }) {
  const [hover, setHover] = useState(0);

  const style = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: 0.8 * starSize,
    height: 0.8 * starSize,
    fontSize: 0.8 * starSize,
    marginLeft: 10,
    color: "gold",
    textAlign: "right",
  };

  return (
    <div style={style}>
      {[...Array(10).keys()].map((i) => (
        <Star
          key={i}
          isActive={i < rating || i < hover}
          rating={i}
          size={starSize}
          onClick={() => onSetRating(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
      <span style={textStyle}>{rating}</span>
    </div>
  );
}

function Star({ isActive, size, onClick, onMouseEnter, onMouseLeave }) {
  const style = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0",
    padding: "0 0",
    width: size,
    height: size,
    fontSize: size,
    cursor: "pointer",
  };
  const imgSize = size;
  const starStyle = {
    width: imgSize,
    height: imgSize,
  };

  return (
    <div
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isActive ? (
        <img style={starStyle} src={starFull} alt="star" />
      ) : (
        <img style={starStyle} src={star} alt="star" />
      )}
    </div>
  );
}
