
// outsource dependencies
import React, { memo } from 'react';

// local dependencies
import UsersList from './list';
import UsersEditModal from './edit-modal';

export default memo(function Users () {
  return <>
    <UsersList />
    <UsersEditModal />
  </>;
});
