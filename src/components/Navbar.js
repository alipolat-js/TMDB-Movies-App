import React, { useState, useEffect } from 'react'
import gsap from 'gsap';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  .navbar-bg{
    transition: all .3s;
    background: rgb(0,0,0);
    background: -moz-linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    background: -webkit-linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    background: linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#001559",GradientType=1);  color: white;
  }
`

const Navbar = () => {
  const [navMenuActive, setnavMenuActive] = useState(false)
  const [navbarTransparent, setnavbarTransparent] = useState(true)

  const NavbarList = styled.div`
    z-index: 100;
    background: rgb(0,0,0);
    background: -moz-linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    background: -webkit-linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    background: linear-gradient(163deg, rgba(0,0,0,1) 53%, rgba(0,4,15,1) 61%, rgba(0,6,23,1) 65%, rgba(0,8,32,1) 70%, rgba(0,10,42,1) 75%, rgba(0,12,50,1) 79%, rgba(0,13,56,1) 82%, rgba(0,15,63,1) 86%, rgba(0,16,67,1) 88%, rgba(0,17,73,1) 91%, rgba(0,18,77,1) 93%, rgba(0,20,84,1) 97%, rgba(0,21,89,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#001559",GradientType=1);  color: white;
    position: fixed;
    width: 100%;
    top: 0;
    padding: 75px 1rem 1rem 1rem;
    transition: all 1s;
    ${!navMenuActive && "transform: translateY(-100%);"}
  `

  const changeNavBackground = () => {
    window.scrollY <= 50 ? setnavbarTransparent(true) : setnavbarTransparent(false)
  }

  window.addEventListener('scroll', changeNavBackground)

  useEffect(() => {
    gsap.from(".navbar", {
      y: -70,
      opacity: 0,
      duration: .5,
      ease: "linear",
    });
  }, [])
  
  return (
    <Nav>
      <nav className={`navbar navbar-expand-sm navbar-dark fixed-top ${navbarTransparent ? "bg-transparent mt-3" : "navbar-bg"}`}>
        <div className="container">

          <Link className="navbar-brand fw-bold" to="/" onClick={() => setnavMenuActive(false)}>TMDB Movies</Link>

          <div className="navbar-toggle text-light fs-2 d-sm-none" onClick={() => setnavMenuActive(!navMenuActive)}>
            {navMenuActive ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/watchlater">Watch Later</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="watched">Watched</Link>
              </li>
            </ul>

            <form className="d-flex">
              <Link className="btn btn-outline-light" to="/search"><i className="fas fa-search pe-2"></i>Search</Link>
            </form>
          </div>

        </div>
      </nav>

      <NavbarList className="navbar-list bg-dark text-light text-center">
        <Link onClick={() => setnavMenuActive(false)} className="nav-link fs-5 text-light fw-bold" aria-current="page" to="/watchlater">Watch Later</Link>
        <Link onClick={() => setnavMenuActive(false)} className="nav-link fs-5 text-light fw-bold mb-2" to="watched">Watched</Link>
        <Link onClick={() => setnavMenuActive(false)} className="btn btn-outline-light w-100" to="/search"><i className="fas fa-search pe-2"></i>Search</Link>
      </NavbarList>
    </Nav>
  )
}

export default Navbar
