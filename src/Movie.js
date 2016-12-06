import React from 'react';

const Movie = (props) => {
  return (
      <div className="col-lg-12">
          <span className="item">{props.title}</span>
          <span className="item">{props.genre}</span>
          <span className="item">{props.year}</span>
          <span className="item">{props.rating}</span>
          <span className="item">{props.actors}</span>
    </div>
  );
}

export default Movie;


//delete img react code
// <img src="del.jpg" id={props.id} className="delete_img" />
