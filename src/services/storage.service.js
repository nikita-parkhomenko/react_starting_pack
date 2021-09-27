/* eslint no-useless-escape: "off" */

// polyfill from MDN https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage
const cookieStorage = {
  getItem: sKey => (!cookieStorage.hasProperty(sKey) ? void(0)
    : unescape(document.cookie.replace(
      new RegExp(`(?:^|.*;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`),
      '$1'
    ))),

  setItem: (sKey, sValue) => (!sKey ? null
    : (document.cookie = `${escape(sKey) }=${ escape(sValue) }; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`)) && void(0),

  removeItem: sKey => (!cookieStorage.hasProperty(sKey) ? void(0)
    : (document.cookie = `${escape(sKey) }=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)) && void(0),

  hasProperty: sKey => (!sKey ? false
    : (new RegExp(`(?:^|;\\s*)${ escape(sKey).replace(/[\-.+*]/g, '\\$&') }\\s*\\=`)).test(document.cookie)),
};

// app integration
class Storage {
    static store = null;

    static initialize = () => {
      this.store = window.localStorage;
      try { // NOTE check availability of localStorage
        this.store.setItem('test', 'test');
        this.store.removeItem('test');
      } catch (e) {
        this.store = cookieStorage;
      }
      // TODO may be we should sync some data between "local" & "cookie"
      return this;
    };

    static remove = name => this.store.removeItem(name);

    static set = (name, data) => {
      this.remove(name);
      this.store.setItem(name, JSON.stringify(data));
    };

    static get = name => {
      const data = this.store.getItem(name);
      try { // NOTE data can be simple string
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    };
}
// NOTE storage is Singleton
export default Storage.initialize();
