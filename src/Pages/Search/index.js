import React, { useState } from 'react'
import styled from 'styled-components';
import { searchMovie } from '../../api'
import Loader from '../../components/Loader'

import SearchResultCard from '../../components/SearchResultCard';

const SearchSection = styled.section`
  min-height: 70vh;
  .page-loader-container{
    background-color: #00000099;
    backdrop-filter: blur(10px);
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cover{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .search-form{
      z-index: 5;
      position: fixed;
      max-width: 600px;
      @media only screen and (max-width: 760px){
        padding: .5rem;
      }
      .search-input{
        backdrop-filter: blur(8px);
      }
    }
  }
`

const Search = props => {
  const [loader, setloader] = useState(false)
  const [Result, setResult] = useState([])

  const search = async (query) => {
    setloader(true)
    const data = await searchMovie(query);
    setResult(data.results)
    setloader(false)
  }

  return (
    <SearchSection className="container">
      <div className="cover pt-5">
        <form className="d-flex text-center w-100 search-form" onSubmit={e => e.preventDefault()}>
          <input autoFocus className="form-control bg-transparent text-light search-input" type="search" onChange={e => search(e.target.value)} placeholder="Search" />
        </form>
      </div>

      <div className="pt-5">
        {
          loader
          && <div className="page-loader-container">
            <Loader />
          </div>
        }
        {
          Result.map(
            movie => (
              <div key={movie.id} className="w-100 cover">
                <SearchResultCard result={movie} />
              </div>
            )
          )
        }
      </div>
    </SearchSection>
  )
}

export default Search