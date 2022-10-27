import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { routes } from 'utility/constants';
import { TabMenu } from 'primereact/tabmenu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
  }
  state = {};
  render() {
    const { activeTabIndex } = this.state;
    return (
      <header className="site-navbar site-navbar-target bg-white" role="banner">
        <div className="headerParentContainer">
          <TabMenu
            model={this.items}
            activeIndex={activeTabIndex}
            onTabChange={e => this.handleTabChanged(e)}
          />
          <div className="site-logo">HomeVerse</div>
          <div className="loginLink">
            <Link to={routes.LOGIN} className="nav-link">
              Login
            </Link>
          </div>
        </div>
      </header>
    );
  }

  items = [
    { label: 'Home' },
    { label: 'Products' },
    { label: 'Services' },
    { label: 'About' },
  ];

  handleTabChanged = e => {
    this.setState({ activeTabIndex: e.index }, () => {
      switch (e.index) {
        case 0:
          this.navigateToPage(routes.HOME);
          break;
        case 1:
          this.navigateToPage(routes.PRODUCTS);
          break;
        case 2:
          this.navigateToPage(routes.SERVICES);
          break;
        case 3:
          this.navigateToPage(routes.ABOUT);
          break;
      }
    });
  };

  navigateToPage = path => {
    this.props.history.push(path);
  };
}

export default Header;
