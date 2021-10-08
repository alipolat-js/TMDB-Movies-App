import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fetchTopRated } from '../../api'
import { fetchPopularMovies } from '../../api'
import { connect } from 'react-redux';
import Loader from '../../components/Loader'
import gsap from 'gsap'
import MainMovieCard from '../../components/MainMovieCard'


const MainSection = styled.section`
  min-height: 100vh;
  
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

  .movies-header{
    border-bottom: 3px solid white;
    padding-bottom: .7rem;
  }
`

export const Main = props => {
  const [watchLaterList, setwatchLaterList] = useState(props.watchLaterList)
  const [topRated, settopRated] = useState([])
  const [popularMovies, setpopularMovies] = useState([])
  const [loader, setloader] = useState(false)

  const getPopularMovies = async () => {
    setloader(true)
    const data = await fetchPopularMovies();
    setpopularMovies(data.results)
    setloader(false)
  }

  const getTopRated = async () => {
    setloader(true)
    const data = await fetchTopRated();
    settopRated(data.results)
    setloader(false)
  }

  useEffect(() => {
    getPopularMovies()
    getTopRated()
    
    gsap.from(".gsap-main", {
      y: 50,
      opacity: 0,
      duration: .4,
      ease: "linear",
    });

  }, [])

  useEffect(() => {
    setwatchLaterList(props.watchLaterList)
  }, [props.watchLaterList])

  return (
    <MainSection>
      {
        loader
        && <div className="page-loader-container">
          <Loader />
        </div>
      }

      <h1 className="text-center pt-5 text-light mb-4 gsap-main">Let's search new movies</h1>
      <div className="text-center gsap-main">
        <Link className="btn btn-outline-light" to="/search"><i className="fas fa-search pe-2"></i>Search</Link>
      </div>

      <div className="container mt-5 mb-5">
        <h2 className="movies-header fw-bold text-light pt-5">Popular Movies</h2>
        <section className="movies-section row p-5 p-sm-0 pt-0">
          {popularMovies.map(movie => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={movie.id}>
              <MainMovieCard movie={movie} />
            </div>
          ))}
        </section>

        <h2 className="movies-header fw-bold text-light pt-5">Top Rated Movies</h2>
        <section className="movies-section row p-5 p-sm-0 pt-0">
          {topRated.map(movie => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3 gsap-movie" key={movie.id}>
              <MainMovieCard movie={movie} />
            </div>
          ))}
        </section>

        {JSON.stringify(watchLaterList) !== "[]" && <h2 className="movies-header fw-bold text-light pt-5">You haven't watched them yet ...</h2>}
        <section className="movies-section row p-5 p-sm-0 pt-0">
          {watchLaterList.map(movie => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-3" key={movie.id}>
              <MainMovieCard movie={movie} />
            </div>
          ))}
        </section>
      </div>

    </MainSection>
  )
}

const mapStateToProps = state => {
  return {
    watchLaterList: state.watchLaterList,
    watchedList: state.watchedList
  }
}

export default connect(mapStateToProps)(Main);