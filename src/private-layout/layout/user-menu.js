
// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { useControllerData, useControllerActions } from 'redux-saga-controller';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// local dependencies
import controller from './controller';
import { Avatar } from '../../images';
import { useSelf } from '../../hooks';
import appRootCtrl from '../../controller';
import { Humanize } from '../../components/filter';
import { FasIcon } from '../../components/fa-icon';
import { USERS_EDIT } from '../../constants/routes';

const UserMenu = memo(function UserMenu () {
  const user = useSelf();
  const { expanded, roles } = useControllerData(controller);
  const { signOut, toggleAsideMenu } = useControllerActions(appRootCtrl);

  const handleToggleSetting = useCallback(() => USERS_EDIT.PUSH({ id: _.get(user, 'id', null) }), [user]);

  return <UncontrolledDropdown nav inNavbar className="mr-md-3">
    <DropdownToggle nav className="pt-2 pb-2">
      <strong> {_.get(user, 'fullName', 'I')} </strong>&nbsp;
      <Avatar
        alt={_.get(user, 'fullName', 'I')}
        src={_.get(user, 'coverImage.url')}
        style={{ width: '39px', height: '39px' }}
      />
      <span className="badge badge-danger"> 100500 </span>
    </DropdownToggle>
    <DropdownMenu right className="animated flipInX">
      <DropdownItem header>
        <span className="d-flex align-items-center">
          <span> Roles: </span>
          {(roles || []).map((role, i) => <Humanize
            key={i}
            as="span"
            value={role}
            className="badge badge-danger ml-auto"
          />)}
        </span>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={toggleAsideMenu}>
        <div className="media">
          <div className="align-self-start mr-3">
            <FasIcon size="2x" icon="bars" className="text-success" />
          </div>
          <div className="media-body">
            <p className="m-0"> Toggle menu </p>
            <p className="m-0 text-muted text-sm">{expanded ? 'Collapse' : 'Expand' }</p>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem onClick={handleToggleSetting}>
        <div className="media">
          <div className="align-self-start mr-3">
            <FasIcon size="2x" icon="user-cog" className="text-primary" />
          </div>
          <div className="media-body">
            <p className="m-0"> Settings </p>
            <p className="m-0 text-muted text-sm"> My profile </p>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem>
        <div className="media">
          <div className="align-self-start mr-3">
            <FasIcon size="2x" icon="envelope" className="text-warning" />
          </div>
          <div className="media-body">
            <p className="m-0"> Notifications </p>
            <p className="m-0 text-muted text-sm"> 100500 </p>
          </div>
        </div>
      </DropdownItem>
      <DropdownItem onClick={signOut}>
        <div className="media">
          <div className="align-self-start mr-3">
            <FasIcon size="2x" icon="sign-out-alt" className="text-danger" />
          </div>
          <div className="media-body">
            <p className="m-0"> Sign out </p>
            <p className="m-0 text-muted text-sm"> Destroy current session </p>
          </div>
        </div>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>;
});

export default UserMenu;
