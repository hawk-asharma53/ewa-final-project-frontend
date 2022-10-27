import React from 'react';
import './footer.css';

export const Footer = () => {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <h3>
          Home<span>Verse</span>
        </h3>

        <p class="footer-company-name">HomeVerse Services &copy; 2022</p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span>Chicago, IL, USA </span>
          </p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@homeverse.com</a>
          </p>
        </div>
      </div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          HomeVerse Services is the leading home hub and service provider in the
          Greater Chicago Area
        </p>
      </div>
    </footer>
  );
};
