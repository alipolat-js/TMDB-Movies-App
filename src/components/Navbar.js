import React, { useState, useEffect } from 'react'
import gsap from 'gsap';
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [navMenuActive, setnavMenuActive] = useState(false)
  const [navbarTransparent, setnavbarTransparent] = useState(true)
  
  const Navbar = styled.nav`
    .navbar-bg{
      transition: all .3s;
      ${navMenuActive || "background: rgb(0,0,0, .50); backdrop-filter: blur(4px);"}
    }
  `
  
  const NavbarList = styled.nav`
    z-index: 100;
    background: rgb(0,0,0, .50);
    backdrop-filter: blur(4px);
    position: fixed;
    width: 100%;
    top: 0;
    padding: 75px 1rem 1rem 1rem;
    transition: all 1s;
    ${navMenuActive || "transform: translateY(-100%);"}
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
    <Navbar>
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

      <NavbarList className="navbar-list text-light text-center">
        <Link onClick={() => setnavMenuActive(false)} className="nav-link fs-5 text-light fw-bold" aria-current="page" to="/watchlater">Watch Later</Link>
        <Link onClick={() => setnavMenuActive(false)} className="nav-link fs-5 text-light fw-bold mb-2" to="watched">Watched</Link>
        <Link onClick={() => setnavMenuActive(false)} className="btn btn-outline-light w-100" to="/search"><i className="fas fa-search pe-2"></i>Search</Link>
      </NavbarList>
    </Navbar>
  )
}

export default Navbar
