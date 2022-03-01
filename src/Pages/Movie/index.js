import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { findMovie } from '../../api';
import { connect } from 'react-redux';
import { addMovieToWatchLater } from '../../actions'
import { removeMovieFromWatchLater } from '../../actions'
import Loader from '../../components/Loader';
import gsap from 'gsap';

const MovieSection = styled.section`
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;

  .page-loader-container{
    background-color: #00000099;
    backdrop-filter: blur(10px);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .backdrop-img-container{
    position: fixed;
    height: 100vh;
    top: 0;
    z-index: -4;

    &::before {
		  content: "";
		  position: fixed;
		  top: 0;
		  bottom: 0;
		  left: 0;
		  right: 0;
      -webkit-box-shadow: inset 0px -500px 300px -29px rgba(0,0,0,0);
      -moz-box-shadow: inset 0px -500px 300px -29px rgba(0,0,0);
      box-shadow: inset 0px -500px 300px -29px rgba(0,0,0);
	  } 
    

    .backdrop-img{
      width: 100%;
      z-index: -4;

    }
  }

  .content-container{
    margin-top: 30px;
    background-color: #00000050;
    backdrop-filter: blur(4px);
    max-width: 1000px;
    padding: 1rem;

    .no-img-available{
      display: flex;
      align-items: center;
    }

    .poster-path{
      max-width: 100%;
      border-radius: 3rem .3rem;
    }
  }
`

export const Movie = result => {
  var id = new URLSearchParams(useLocation().search).get("id")
  const [movie, setmovie] = useState([])

  const [loader, setloader] = useState(false)

  const [movieInWatchLater, setmovieInWatchLater] = useState(result.watchLaterList.find(item => item.id === id))
  const [movieInWatched, setmovieInWatched] = useState(result.watchedList.find(item => item.id === id))

  const sendReducer = (movie) => {
    movieInWatchLater
      ? result.removeMovieFromWatchLater(movie)
      : result.addMovieToWatchLater(movie)
  }

  const getResult = async (id) => {
    setloader(true)
    const data = await findMovie(id)
    setmovie(data)
    setloader(false)
  }

  useEffect(() => {
    getResult(id)

    gsap.from(".gsap-movie-item", {
      stagger: .15,
      y: -30,
      opacity: 0,
      duration: .5,
      ease: "linear",
    });
  }, [])

  useEffect(() => {
    setmovieInWatchLater(result.watchLaterList.find(item => item.id === id))
    setmovieInWatched(result.watchedList.find(item => item.id === id))
  }, [result])

  return (
    <MovieSection>
      {
        loader
        && <div className="page-loader-container">
          <Loader />
        </div>
      }

      {movie.backdrop_path != null &&
        <div className="backdrop-img-container">
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="backdrop-img" alt={movie.original_title} />
        </div>
      }

      <div className="container row content-container rounded-3">
        {movie.poster_path != null
          ? <img className="col-12 col-md-6 poster-path gsap-movie-item" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.original_title} />
          : <div className="no-img-available col-12 col-sm-6 fs-1 fw-bold">
            <span className="fs-bold text-danger text-center gsap-movie-item">Upss, No Image Available :(</span>
          </div>


        }
        <div className="content-area col-12 col-md-6 pt-4 pt-md-0">
          <h1 className="col-12 text-warning fw-bold gsap-movie-item">{movie.original_title}</h1>
          <h4 className="col-12 text-primary fw-bold gsap-movie-item">{movie.tagline}</h4>
          <p className="col-12 text-light fw-bold gsap-movie-item">{movie.overview}</p>

          <div className="col-12 row gsap-movie-item">
            <div className="mini-box col-12 col-md-6 pt-4">
              <h3 className="mini-box-header text-danger fw-bold">Run Time</h3>
              <span className="mini-box-res text-light fw-bold fs-3">{movie.runtime} mins</span>
            </div>

            <div className="mini-box col-12 col-md-6 pt-4">
              <h3 className="mini-box-header text-danger fw-bold">Release Date</h3>
              <span className="mini-box-res text-light fw-bold fs-3">{movie.release_date}</span>
            </div>
          </div>

          <div className="col-12 row mb-5 gsap-movie-item">
            <div className="mini-box col-12 col-sm-6 pt-4">
              <h3 className="mini-box-header text-danger fw-bold">Budget</h3>
              <span className="mini-box-res text-light fw-bold fs-3">${movie.budget}</span>
            </div>

            <div className="mini-box col-12 col-sm-6 pt-4">
              <h3 className="mini-box-header text-danger fw-bold">Vote Average</h3>
              <span className="mini-box-res text-light fw-bold fs-3">{movie.vote_average} <span className="fs-6">/ {movie.vote_count} count</span></span>
            </div>
          </div>

          {movieInWatched
            ? <span className="add-ico text-success fw-bold fs-4 gsap-movie-item">Watched</span>
            : <span className={`gsap-movie-item add-ico fw-bold fs-5 btn ${movieInWatchLater ? "btn-outline-danger" : "btn-outline-success"}`} onClick={() => sendReducer(movie)}>
              {movieInWatchLater ? "Remove From Watch Later" : "Add To Watch Later"}
            </span>}

          <br />
          <br />

          <a className="text-decoration-none text-muted gsap-movie-item" target="blank" href={movie.homepage}>{movie.homepage}</a>

        </div>
      </div>
    </MovieSection>
  )
}

const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps, { removeMovieFromWatchLater, addMovieToWatchLater })(Movie);