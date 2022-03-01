import React from 'react'
import styled from 'styled-components'

const MainFooter = styled.footer`
  .sc-box-cover{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .sc-box{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 125px;
    }
  }
`

const Footer = () => {
  return (
    <MainFooter className="w-100 text-center pt-5 pb-5 container">
      <div className="mb-1"><a href="https://alipolat.tech" target="_blank" rel="noreferrer" className="text-light text-decoration-none">Designed 	&amp; Developed by Ali POLAT</a></div>
      <div className="mb-1"><a href="https://github.com/alipolat-js/TMDB-Movies-App" target="_blank" rel="noreferrer" className="text-light text-decoration-none"><i className="fab fa-github"></i> View code of this project</a></div>
      <div className="mt-2 sc-box-cover">
        <div className="sc-box">
          <a target="_blank" rel="noreferrer" href="https://www.instagram.com/__alipolat/" className="fw-bold fs-5 text-light text-decoration-none"><i className="fab fa-instagram"></i></a>
          <a target="_blank" rel="noreferrer" href="https://twitter.com/_alipolat/" className="fw-bold fs-5 text-light text-decoration-none"><i className="fab fa-twitter"></i></a>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/-alipolat/" className="fw-bold fs-5 text-light text-decoration-none"><i className="fab fa-linkedin"></i></a>
        </div>
      </div>
    </MainFooter>
  )
}

export default Footer