import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMovieToWatchedList } from '../../actions'
import { removeMovieFromWatchLater } from '../../actions'
import { NavLink } from 'react-router-dom';

const WatchLaterSection = styled.section`
  min-height: 70vh;

  .page-header{
    border-bottom: 3px solid white;
    padding-bottom: .7rem;
    position: relative;

    .movie-counter{
      position: absolute;
      right: 0;
      bottom: 1rem;
      padding: 0 1rem;
      border-radius: 1rem;
    }
  }

  .movie{
  background-color: #00000099;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px #292929ec;
  border-radius: 10px;
  transition: all .2s;
  &:hover{
    transform: translateY(-20px);
  }

  .vote{
      position: absolute;
      bottom: 20px;
      text-shadow: 0 0 12px black;
    }
  }
`

export const WatchLater = props => {
  return (
    <WatchLaterSection className="container pt-5 pb-5">
      <div className="page-header mb-4">
        <h1 className="text-light fw-bold">Watch Later</h1>
        <span className="movie-counter bg-light text-dark fw-bold">{props.watchLaterList.length} {props.watchLaterList.length <= 1 ? "movie" : "movies"}</span>
      </div>

      <div className="watch-later-movies-area row mb-3 p-5 p-sm-0">

        {
          props.watchLaterList.map(movie => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={movie.id}>
              <div className="w-100 p-2 rounded movie">

                <NavLink to={`movie?id=${movie.id}`}>
                  <img className="w-100 rounded mb-2" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.original_title} />
                </NavLink>

                <button className="btn btn-outline-light w-100 mb-2" onClick={() => {
                  props.addMovieToWatchedList(movie)
                  props.removeMovieFromWatchLater(movie)
                }}>Add to Watched List</button>
                <button className="btn btn-outline-danger w-100" onClick={() => props.removeMovieFromWatchLater(movie)}>Remove From Watch Later</button>
              </div>
            </div>
          ))
        }

      </div>

      {
        JSON.stringify(props.watchLaterList) !== "[]"
          ? <Link className="fs-5 text-light text-decoration-none" to="/">Discover more...</Link>
          : <span className="text-light fw-bold fs-4">Nothing on your list right now, let's discover new movies <br /> <Link to="/" className="btn btn-outline-light mt-2">Discover</Link></span>
      }

    </WatchLaterSection>
  )
}


const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps, { removeMovieFromWatchLater, addMovieToWatchedList })(WatchLater);