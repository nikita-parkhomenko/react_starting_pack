// create own instance of env variables
export const config = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  apiPath: process.env.REACT_APP_API_PATH,
  websiteUrl: process.env.REACT_APP_WEBSITE_URL,
  DEBUG: isEnabled(process.env.REACT_APP_DEBUG),
  serviceUrl: process.env.REACT_APP_SERVICE_URL,
  production: isEnabled(process.env.REACT_APP_PRODUCTION),
  clientTimeFormat: process.env.REACT_APP_CLIENT_TIME_FORMAT,
};

// ON debug mode for production using url params
config.DEBUG = config.DEBUG || /show_DEBUG/.test(window.location.href);

config.DEBUG
&& console.info('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n full ENV:', process.env
  , '\n config:', config
);

export default config;

function isEnabled (value) {
  return /^(true|1)$/i.test(value);
}
