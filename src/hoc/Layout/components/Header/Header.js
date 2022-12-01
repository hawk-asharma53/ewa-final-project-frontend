import React from 'react';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import { routes } from 'utility/constants';
import { TabMenu } from 'primereact/tabmenu';
import useStore from 'store/AuthState';
import { useCart } from 'react-use-cart';

export const Header = () => {
  const [state, setState] = React.useState({ activeTabIndex: 0 });
  const history = useHistory();
  const store = useStore();
  const showAdminHeader = store?.userData?.user_type === 'admin';
  const showManagerHeader = store?.userData?.user_type === 'manager';

  const { totalUniqueItems } = useCart();

  const customerItems = [
    { label: 'Home' },
    { label: 'Products' },
    { label: 'Services' },
    { label: 'Stores' },
  ];

  const adminItems = [
    { label: 'Dashboard' },
    { label: 'Manage Products' },
    { label: 'Manage Services' },
    { label: 'Manage Users' },
  ];

  const managerItems = [
    { label: 'Dashboard' },
    { label: 'Manage Products' },
    { label: 'Manage Services' },
  ];

  const handleCustomerTabChanged = e => {
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
      default:
        console.log(e.index);
    }
  };

  const handleAdminTabChanged = e => {
    setState({ activeTabIndex: e.index });
    switch (e.index) {
      case 0:
        navigateToPage(routes.DASHBOARD);
        break;
      case 1:
        navigateToPage(routes.MANAGE_PRODUCTS);
        break;
      case 2:
        navigateToPage(routes.MANAGE_SERVICES);
        break;
      case 3:
        navigateToPage(routes.MANAGE_USERS);
        break;
      default:
        console.log(e.index);
    }
  };

  const handleManagerTabChanged = e => {
    setState({ activeTabIndex: e.index });
    switch (e.index) {
      case 0:
        navigateToPage(routes.DASHBOARD);
        break;
      case 1:
        navigateToPage(routes.MANAGE_PRODUCTS);
        break;
      case 2:
        navigateToPage(routes.MANAGE_SERVICES);
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
          model={
            showAdminHeader
              ? adminItems
              : showManagerHeader
              ? managerItems
              : customerItems
          }
          activeIndex={state.activeTabIndex}
          onTabChange={e =>
            showAdminHeader
              ? handleAdminTabChanged(e)
              : showManagerHeader
              ? handleManagerTabChanged(e)
              : handleCustomerTabChanged(e)
          }
        />
        <div className="site-logo">HomeVerse</div>
        <div className="loginLink">
          {store?.userData?.user_id ? (
            <>
              {!showAdminHeader && (
                <Link to={routes.CART} className="nav-link">
                  Cart ({totalUniqueItems})
                </Link>
              )}
              <Link to={routes.ORDERS} className="nav-link">
                Orders
              </Link>
              <Link to={routes.MYACCOUNT} className="nav-link">
                {store?.userData?.user_first_name}'s Account
              </Link>
              <a
                className="nav-link"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to={routes.CART} className="nav-link">
                Cart ({totalUniqueItems})
              </Link>

              <Link to={routes.LOGIN} className="nav-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
