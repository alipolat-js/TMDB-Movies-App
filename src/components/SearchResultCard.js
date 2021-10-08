import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMovieToWatchLater } from '../actions'
import { removeMovieFromWatchLater } from '../actions'

const MovieContainer = styled.div`
  height: 218px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 600px;
  background-color: #00003090;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 15px #292929ec;
  border-radius: 10px;
  
  img{
    width: 135px;
    height: 200px;
  }

  
  .result-item-content{
    width: calc(100% - 151px);
    height: 218px;

    .result-item-title{
      text-decoration: none;
      transition: all .2s;
      color: white;
      &:hover{
        color: rgb(206, 206, 206);
      }
    }
    
    .result-item-date{
      position: absolute;
      bottom: 0;
      right: 0;
    }
    
    .add-ico{
      position: absolute;
      right: 1rem;
      bottom: 45px;
      z-index: 2;
      cursor: pointer;
    }

    .vote{
      position: absolute;
      bottom: 20px;
      left: 160px;
      text-shadow: 0 0 12px black;
    }
  }

`

export const SearchResultCard = result => {
  const [movieInWatchLater, setmovieInWatchLater] = useState(result.watchLaterList.find(movie => movie.id === result.result.id))
  const [movieInWatched, setmovieInWatched] = useState(result.watchedList.find(movie => movie.id === result.result.id))


  const senReducer = (movie) => {
    movieInWatchLater ? result.removeMovieFromWatchLater(movie) : result.addMovieToWatchLater(movie)
  }

  useEffect(() => {
    setmovieInWatchLater(result.watchLaterList.find(movie => movie.id === result.result.id))
    setmovieInWatched(result.watchedList.find(movie => movie.id === result.result.id))
  }, [result])

  return (
    <MovieContainer className="mb-4 p-2 w-100">
      <img className="rounded" src={`https://image.tmdb.org/t/p/w200${result.result.poster_path}`} alt={result.result.original_title} />
      
      <div className="result-item-content pt-2">
        <Link to={`/movie?id=${result.result.id}`} className="result-item-title fs-4 fw-bold">{result.result.original_title}</Link>
        
        {movieInWatched
          ? <span className="add-ico text-success fw-bold fs-5">Watched</span>
          : <span className="add-ico text-light fw-bold fs-5" onClick={() => senReducer(result.result)}>
          Add
          <i className={`fas ${movieInWatchLater ? "fa-check-square" : "fa-plus-square"} fs-1 ps-2 text-light`}></i>
        </span>
        }

        <p className="result-item-date pe-3 text-light">{result.result.release_date}</p>
        
        <span className="text-light fw-bold vote"><i className="far fa-star"></i> {result.result.vote_average}</span>
      </div>
    </MovieContainer>
  )
}

const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps, { removeMovieFromWatchLater, addMovieToWatchLater })(SearchResultCard);