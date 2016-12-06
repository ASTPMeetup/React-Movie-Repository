import React from 'react';

const Movie = (props) => {
  return (
    <div className="row">
      <ol className="col-lg-12" id='movie_div'>
        <img src="del.jpg" className="delete_img" />
        <span className="item">&#187;  {props.title}</span>
        <span className="item">&#187;  {props.genre}</span>
        <span className="item">&#187;  {props.year}</span>
        <span className="item">&#187;  {props.rating + '%'}</span>
        <span className="item">&#187;  {props.actors}</span>
        <hr />
      </ol>
    </div>
  );
}

export default Movie;
