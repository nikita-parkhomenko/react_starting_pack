// outsource dependencies
import _ from 'lodash';

// local dependencies
import * as ROUTES from '../constants/routes';
import { MENU_ITEM_TYPE } from './layout/sidebar-menu';

export const MENU = [
  {
    key: 'test-1',
    type: MENU_ITEM_TYPE.LINK,
    name: 'Welcome screen',
    icon: ['far', 'list-alt'],
    link: ROUTES.WELCOME_SCREEN.LINK(),
    isActive: location => ROUTES.WELCOME_SCREEN.REGEXP.test(location.pathname)
  }, {
    key: 'test-2',
    type: MENU_ITEM_TYPE.LINK,
    name: 'Users',
    icon: ['fas', 'users'],
    link: ROUTES.USERS.LINK(),
    isActive: location => ROUTES.USERS.REGEXP.test(location.pathname)
  }, {
    key: 'test-2',
    type: MENU_ITEM_TYPE.LINK,
    name: 'Properties',
    icon: ['fas', 'building'],
    link: ROUTES.PROPERTIES.LINK(),
    isActive: location => ROUTES.PROPERTIES.REGEXP.test(location.pathname)
  }, {
    badge: 1,
    key: 'view-0',
    name: 'View test',
    type: MENU_ITEM_TYPE.HEADER,
  }, {
    badge: 50,
    key: 'view-3',
    name: 'Sub menu',
    type: MENU_ITEM_TYPE.MENU,
    icon: ['fas', 'clipboard'],
    // NOTE ability to custom detection of active state
    isActive: location => ROUTES.USERS.REGEXP.test(location.pathname)
        || ROUTES.WELCOME_SCREEN.REGEXP.test(location.pathname),
    list: [
      {
        badge: 50,
        key: 'view-31',
        type: MENU_ITEM_TYPE.LINK,
        name: 'Users',
        icon: ['fas', 'user-injured'],
        link: ROUTES.USERS.LINK(),
        isActive: location => ROUTES.USERS.REGEXP.test(location.pathname)
      }, {
        badge: 50,
        key: 'view-32',
        type: MENU_ITEM_TYPE.LINK,
        name: 'Welcome',
        icon: ['fas', 'weight'],
        link: ROUTES.WELCOME_SCREEN.LINK(),
        isActive: location => ROUTES.WELCOME_SCREEN.REGEXP.test(location.pathname)
      }, {
        key: 'view-33',
        disabled: false,
        type: MENU_ITEM_TYPE.ACTION,
        name: 'Console fire',
        icon: ['fas', 'sticky-note'],
        action: () => console.log('fire =)', _.size(MENU)),
        isActive: () => false
      }
    ]
  }, {
    key: 'view-4',
    disabled: true,
    type: MENU_ITEM_TYPE.ACTION,
    name: 'Types and Properties',
    icon: ['fas', 'sticky-note'],
    action: () => console.log('Newer fire'),
    // NOTE ability to custom detection of active state
    isActive: () => false
  }
];

export default MENU;
