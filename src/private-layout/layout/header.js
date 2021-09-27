
// outsource dependencies
import _ from 'lodash';
import cx from 'classnames';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { memo, useRef, useEffect, useCallback } from 'react';
import { useControllerData, useControllerActions } from 'redux-saga-controller';

// local dependencies
import UserMenu from './user-menu';
import { Logo } from '../../images';
import controller from './controller';
import SearchForm from './search-form';
import { FasIcon } from '../../components/fa-icon';
import { WELCOME_SCREEN } from '../../constants/routes';

const Header = memo(function Header () {
  const { expanded } = useControllerData(controller);
  const { updateCtrl, toggleAsideMenu } = useControllerActions(controller);

  const handleResize = useRef();
  useEffect(() => {
    handleResize.current = _.throttle(() => {
      if (expanded && window.innerWidth < 768) {
        updateCtrl({ expanded: false });
      }
    }, 500, { trailing: true });
  }, [expanded, updateCtrl]);
  useEffect(() => { handleResize.current(); }, []);
  useEffect(() => {
    window.addEventListener('resize', handleResize.current);
    return () => window.removeEventListener('resize', handleResize.current);
  }, [updateCtrl]);

  const toggleSearch = useCallback(() => updateCtrl({ showSearch: true }), [updateCtrl]);

  return <header id="header" className="topnavbar-wrapper">
    <nav className="navbar topnavbar">
      <div className="navbar-header">
        <Link className="navbar-brand" to={WELCOME_SCREEN.LINK()}>
          <div className="brand-logo">
            <Logo className="img-fluid mr-2" style={{ width: 35 }} />
            <span className="logo-text"> Estative </span>
          </div>
          <div className="brand-logo-collapsed">
            <Logo className="img-fluid" style={{ width: 40 }} />
          </div>
        </Link>
        <Button size="xs" color="link" className={cx({ 'nav-link d-inline-block': expanded }, 'd-none')} onClick={toggleAsideMenu}>
          <FasIcon size="lg" icon="bars" />
        </Button>
      </div>
      <ul className="navbar-nav flex-row flex-grow-1">
        <li className="nav-item d-flex">
          <Button size="xs" color="link" className={cx({ 'nav-link d-inline-block': !expanded }, 'd-none')} onClick={toggleAsideMenu}>
            <FasIcon size="lg" icon="bars" />
          </Button>
          <Button size="xs" color="link" className="nav-link" onClick={toggleSearch}>
            <FasIcon size="lg" icon="search" />
          </Button>
        </li>
      </ul>
      <ul className="navbar-nav flex-row">
        <SearchForm/>
      </ul>
      <ul className="navbar-nav flex-row">
        <UserMenu />
      </ul>
    </nav>
  </header>;
});

export default Header;
