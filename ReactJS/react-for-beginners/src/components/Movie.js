import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "../CSS/Movie.css"

function Movie({id, medium_cover_image, title, summary, genres }) {
  return (
    <div className={'movie'}>
      <h2 className="title">
        {/* Link Component doesn't make reload */}
        <Link to={`/movie/${id}`}>{title}</Link>
        {/* <a href="/movie">{title}</a> */}
      </h2>
      <img className="poster" src={medium_cover_image} alt={title} />
      <ul className={'genres'}>
        {genres.map(genre =>
          <li key={genre}>{genre}</li>
        )}
      </ul>
      <p className={'summary'}>{summary}</p>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie;