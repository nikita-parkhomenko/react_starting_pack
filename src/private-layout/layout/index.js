
// outsource dependencies
import PropTypes from 'prop-types';
import { useController } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import Header from './header';
import controller from './controller';
import SideBarMenu from './sidebar-menu';
import Preloader from '../../components/preloader';

const Layout = memo(function Layout ({ children }) {
  const [
    { initialized, expanded },
    { initialize, updateCtrl, toggleAside }
  ] = useController(controller);

  // NOTE initialize business logic
  useEffect(() => { initialize(); }, [initialize]);

  const openSearch = useCallback(() => updateCtrl({ showSearch: true }), [updateCtrl]);

  return <Preloader active={!initialized}>
    <div id="privateLayout" className={expanded ? 'expanded' : 'collapsed'}>
      <Header
        expanded={expanded}
        openSearch={openSearch}
        toggleAside={toggleAside}
      />
      <div className="d-flex">
        <SideBarMenu expanded={expanded} />
        <main id="content">
          <div className="hide-scroll-bar">
            {children}
          </div>
        </main>
      </div>
    </div>
  </Preloader>;
});

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
