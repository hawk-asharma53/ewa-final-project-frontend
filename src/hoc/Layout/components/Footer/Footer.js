import React from 'react';
import './footer.css';

export const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Home<span>Verse</span>
        </h3>

        <p className="footer-company-name">HomeVerse Services &copy; 2022</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Chicago, IL, USA </span>
          </p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@homeverse.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          HomeVerse Services is the leading home hub and service provider in the
          Greater Chicago Area
        </p>
      </div>
    </footer>
  );
};
