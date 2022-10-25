import React from 'react';
import './header.css';

export const Header = props => {
  return (
    <>
      <div class="site-mobile-menu site-navbar-target">
        <div class="site-mobile-menu-header">
          <div class="site-mobile-menu-close mt-3">
            <span class="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div class="site-mobile-menu-body"></div>
      </div>

      <header class="site-navbar site-navbar-target bg-white" role="banner">
        <div class="container">
          <div class="row align-items-center position-relative">
            <div class="col-lg-4">
              <nav
                class="site-navigation text-right ml-auto "
                role="navigation"
              >
                <ul class="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                  <li class="active">
                    <a href="index.html" class="nav-link">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="project.html" class="nav-link">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="services.html" class="nav-link">
                      Services
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-lg-4 text-center">
              <div class="site-logo">
                <a href="index.html">Brand</a>
              </div>

              <div class="ml-auto toggle-button d-inline-block d-lg-none">
                <a
                  href="#"
                  class="site-menu-toggle py-5 js-menu-toggle text-black"
                >
                  <span class="icon-menu h3 text-black"></span>
                </a>
              </div>
            </div>
            <div class="col-lg-4">
              <nav class="site-navigation text-left mr-auto " role="navigation">
                <ul class="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                  <li>
                    <a href="about.html" class="nav-link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="blog.html" class="nav-link">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" class="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
