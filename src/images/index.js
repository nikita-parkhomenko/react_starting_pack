
// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// local dependencies
import logo from './logo.svg';
import upload from './upload.svg';
import defImg from './def-image.svg';
import settingsGif from './settings.gif';
import defaultAvatar from './default_avatar.svg';

export const DefImage = memo((
  { src, defaultSrc, alt, defaultAlt, title, defaultTitle, defaultStyle, style, className, defaultClassName, ...attr }
) => <img
  src={src || defaultSrc}
  alt={alt || defaultAlt}
  title={title || defaultTitle}
  className={className || defaultClassName}
  style={Object.assign({}, defaultStyle, style)}
  {...attr}
/>);

DefImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  defaultSrc: PropTypes.string,
  defaultAlt: PropTypes.string,
  defaultTitle: PropTypes.string,
  defaultStyle: PropTypes.object,
  defaultClassName: PropTypes.string,
};

DefImage.defaultProps = {
  src: null,
  alt: null,
  title: null,
  style: {},
  className: null,
  defaultSrc: defImg,
  defaultAlt: 'image',
  defaultClassName: '',
  defaultTitle: '',
  defaultStyle: {},
};

export default DefImage;

export const Avatar = props => <DefImage
  defaultAlt="User"
  defaultTitle="User"
  defaultSrc={defaultAvatar}
  defaultStyle={{ borderRadius: '50%' }}
  {...props}
/>;

export const CloudImage = props => <DefImage
  defaultAlt="Upload to cloud"
  defaultTitle="Upload to cloud"
  defaultSrc={upload}
  {...props}
/>;

export const SettingGif = props => <DefImage
  defaultAlt="Settings"
  defaultTitle="Settings"
  defaultSrc={settingsGif}
  {...props}
/>;

export const Logo = props => <DefImage
  defaultAlt="Estative"
  defaultTitle="Estative"
  defaultSrc={logo}
  {...props}
/>;
