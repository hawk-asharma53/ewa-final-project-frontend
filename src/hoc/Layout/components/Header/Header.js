import React from 'react';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import { routes } from 'utility/constants';
import { TabMenu } from 'primereact/tabmenu';
import useStore from 'store/AuthState';

export const Header = () => {
  const [state, setState] = React.useState({ activeTabIndex: 0 });
  const history = useHistory();
  const store = useStore();

  const items = [
    { label: 'Home' },
    { label: 'Products' },
    { label: 'Services' },
    { label: 'Stores' },
    { label: 'About' },
  ];

  const handleTabChanged = e => {
    setState({ activeTabIndex: e.index });
    switch (e.index) {
      case 0:
        navigateToPage(routes.HOME);
        break;
      case 1:
        navigateToPage(routes.PRODUCTS);
        break;
      case 2:
        navigateToPage(routes.SERVICES);
        break;
      case 3:
        navigateToPage(routes.MAP);
        break;
      case 4:
        navigateToPage(routes.ABOUT);
        break;
      default:
        console.log(e.index);
    }
  };

  const navigateToPage = path => {
    history.push(path);
  };

  const handleLogout = () => {
    store.logout();
  };

  return (
    <header className="site-navbar site-navbar-target bg-white" role="banner">
      <div className="headerParentContainer">
        <TabMenu
          model={items}
          activeIndex={state.activeTabIndex}
          onTabChange={e => handleTabChanged(e)}
        />
        <div className="site-logo">HomeVerse</div>
        <div className="loginLink">
          {store?.userData?.user_id ? (
            <div className="logout-button" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <Link to={routes.LOGIN} className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
