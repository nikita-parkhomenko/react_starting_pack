
// outsource dependencies
import React, { memo, useCallback, useEffect } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import controller from './controller';
import { useRefCallback } from '../../hooks';
import { FasIcon } from '../../components/fa-icon';


const SearchForm = memo(function SearchForm () {
  const { showSearch, search } = useControllerData(controller);
  const { submitSearchForm, updateCtrl } = useControllerActions(controller);

  const [searchInput, refSearchInput] = useRefCallback();
  useEffect(() => {
    if (showSearch) {
      searchInput.focus();
    }
  }, [searchInput, showSearch]);

  const onClose = useCallback(() => updateCtrl({ showSearch: false, search: '' }), [updateCtrl]);
  const handleTypeInput = useCallback(e => updateCtrl({ search: e.target.value }), [updateCtrl]);
  const handleSearch = useCallback(() => submitSearchForm({ search }), [search, submitSearchForm]);

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    submitSearchForm({ search });
  }, [submitSearchForm, search]);

  const handleKeyDown = useCallback(e => {
    if (e.keyCode === 27) {
      updateCtrl({ showSearch: false, search: '' });
    } else if (e.keyCode === 13) {
      handleSearch();
    }
  }, [updateCtrl, handleSearch]);

  return <form
    role="search"
    autoComplete="off"
    onSubmit={handleSubmit}
    onKeyDown={handleKeyDown}
    className={`navbar-form${!showSearch ? '' : ' open' }`}
  >
    <div className="form-group">
      <FasIcon icon="search" tag="div" className="navbar-form-search" onClick={handleSearch} />
      <input
        type="text"
        value={search}
        ref={refSearchInput}
        onChange={handleTypeInput}
        className="form-control pl-5"
        placeholder="Type and hit enter ... or escape to cancel"
      />
      <FasIcon icon="times" tag="div" className="navbar-form-close" onClick={onClose} />
    </div>
  </form>;
});

export default SearchForm;
