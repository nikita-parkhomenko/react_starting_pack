
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import * as appIcons from '../../images/app-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// NOTE import icons from correct package
import {} from '@fortawesome/free-brands-svg-icons';
import { faListAlt, } from '@fortawesome/free-regular-svg-icons';
import { faCog, faBars, faSearch, faEnvelope, faUserCog, faTimes, faSignOutAlt, faUsers, faPlus, faUtensils, faShoppingBasket, faClipboard, faUserInjured, faWeight, faStickyNote, faBuilding, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// NOTE add your icon to library before usage
library.add(
  faCog, faBars, faSearch, faEnvelope, faUserCog, faTimes, faSignOutAlt, faUsers, faPlus,
  faUtensils, faShoppingBasket, faClipboard, faUserInjured, faWeight, faStickyNote, faListAlt,
  faBuilding, faEdit, faTrash
);

// NOTE custom icons which we inject in font awesome
library.add(appIcons);

export default FontAwesomeIcon;

export const FasIcon = memo(({ icon, ...attr }) => <FontAwesomeIcon icon={['fas', icon]} {...attr} />);
FasIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export const FarIcon = memo(({ icon, ...attr }) => <FontAwesomeIcon icon={['far', icon]} {...attr} />);
FarIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export const FabIcon = memo(({ icon, ...attr }) => <FontAwesomeIcon icon={['fab', icon]} {...attr} />);
FabIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export const AppIcon = memo(({ icon, ...attr }) => <FontAwesomeIcon icon={['app', icon]} {...attr} />);
AppIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export const SortIcon = memo(({ className, faPrefix, classMap, statusMap, status, ...attr }) => (
  <FontAwesomeIcon
    {...attr}
    icon={[faPrefix, statusMap(status, attr)]}
    className={`${className} ${classMap(status, attr)}`}
  />
));
SortIcon.propTypes = {
  status: PropTypes.any,
  classMap: PropTypes.func,
  statusMap: PropTypes.func,
  faPrefix: PropTypes.string,
  className: PropTypes.string,
};
SortIcon.defaultProps = {
  status: null,
  faPrefix: 'fas',
  className: '',
  statusMap: status => {
    switch (status) {
      default: return 'sort';
      case true: return 'sort-amount-up';
      case false: return 'sort-amount-down';
    }
  },
  classMap: (status, { disabled }) => {
    switch (status) {
      default: return `ml-1 mr-1 text-thin ${disabled ? 'text-muted' : 'text-gray'}`;
      case true: return `ml-1 mr-1 text-bold ${disabled ? 'text-muted' : 'text-gray-d'}`;
      case false: return `ml-1 mr-1 text-bold ${disabled ? 'text-muted' : 'text-gray-d'}`;
    }
  }
};
