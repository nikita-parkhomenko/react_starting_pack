
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useControllerData } from 'redux-saga-controller';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';

// local dependencies
import controller from './controller';
import Fa from '../../components/fa-icon';

// Spec available menu item types
export const MENU_ITEM_TYPE = {
  MENU: 'MENU',
  LINK: 'LINK',
  ACTION: 'ACTION',
};

const SideBarMenu = memo(function SideBarMenu ({ expanded }) {
  const { menu } = useControllerData(controller);
  const location = useLocation();

  return <ProSidebar collapsed={!expanded} style={{ height: '100vh' }}>
    <SidebarHeader>
      <p className="mt-3 text-center"> Main controls </p>
    </SidebarHeader>
    <SidebarContent>
      <Menu iconShape="square">
        { (menu || []).map(({ key, name, type, link, isActive, icon, action, list }) => {
          switch (type) {
            default: return null;
            case MENU_ITEM_TYPE.LINK:
              return <MenuItem
                key={key}
                active={isActive(location)}
                icon={<Fa className="mr-2" icon={icon}/>}
              >
                <Link to={link}>
                  { name }
                </Link>
              </MenuItem>;
            case MENU_ITEM_TYPE.ACTION:
              return <MenuItem
                key={key}
                onClick={action}
                active={isActive(location)}
                icon={<Fa className="mr-2" icon={icon}/>}
              >
                { name }
              </MenuItem>;
            case MENU_ITEM_TYPE.MENU:
              return <SubMenu
                key={key}
                title={name}
                defaultOpen={isActive(location)}
                icon={<Fa className="mr-2" icon={icon}/>}
              >
                { (list || []).map(({ type, icon, name, link, action, isActive, key }) => {
                  switch (type) {
                    default:
                      return null;
                    case MENU_ITEM_TYPE.LINK:
                      return <MenuItem
                        key={key}
                        icon={<Fa className="mr-2" icon={icon}/>}
                        className={isActive(location) ? 'active' : ''}
                      >
                        <Link to={link}>
                          { name }
                        </Link>
                      </MenuItem>;
                    case MENU_ITEM_TYPE.ACTION:
                      return <MenuItem
                        key={key}
                        onClick={action}
                        icon={<Fa className="mr-2" icon={icon}/>}
                      >
                        { name }
                      </MenuItem>;
                  }
                }) }
              </SubMenu>;
          }
        }) }
      </Menu>
    </SidebarContent>
  </ProSidebar>;
});

SideBarMenu.propTypes = {
  expanded: PropTypes.bool.isRequired,
};

export default SideBarMenu;
