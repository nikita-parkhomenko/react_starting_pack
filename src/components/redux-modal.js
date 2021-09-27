
// outsource dependencies
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// actions
const TYPE = (prefix => ({
  META: `${prefix}META`,
  CLEAR: `${prefix}CLEAR`,
}))('@modal/');

// selector for modal
export const selector = (state, name) => _.get(state, `modal.${name}`) || {};

// action creator to show connected modal
export const show = (name, options) => ({ options, showComponent: true, show: true, name, type: TYPE.META });

// provide functionality to connect modal using redux (may be we should use "with" but it's a some kind of bad habit)
export const connectModal = ({ name, closeTimeout = 350 }) => Modal => connect(
  state => ({
    ...(selector(state, name).options || {}),
    show: selector(state, name).show || false,
    showComponent: selector(state, name).showComponent || false,
  }),
  dispatch => ({
    handleHide: () => {
      dispatch({ type: TYPE.META, show: false, name });
      // modal may has "hide animation" provide ability to control animation time before remove component
      setTimeout(() => dispatch({ type: TYPE.CLEAR, name }), closeTimeout);
    },
  })
)(props => (!props.showComponent ? null : <Modal { ...props } />));

// reducer to connect for store expect reducer name as "modal"
export const reducer = (state = {}, action) => {
  const { type, name, ...options } = action;
  if (typeof name !== 'string') { return state; }
  switch (type) {
    default: return state;
    case TYPE.CLEAR: return { ...state, [name]: null };
    case TYPE.META: return { ...state, [name]: { ...(state[name] || {}), ...options } };
  }
};
