import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const {id} = useParams();
    const getMovie = async() => {
        const json = await (await
            fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {getMovie();}, []);
    return (
        loading ? <h1>Loading...</h1> :
        <div className={'movie'}>
            <h2 className="title">{movie.title}
            </h2>
            <img className="poster" src={movie.medium_cover_image} alt={movie.title} />
            <ul className={'genres'}>
                {movie.genres.map(genre =>
                    <li key={genre}>{genre}</li>
                )}
            </ul>
            <p className={'summary'}>{movie.description_full}</p>
        </div>
    );
}

export default Detail;