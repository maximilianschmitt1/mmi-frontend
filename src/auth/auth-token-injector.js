'use strict';

var authTokenInjector = function(authRegistry) {
  return {
    request: function(config) {
      var token = authRegistry.token();
      if (token) {
        config.headers['auth-token'] = token;
      }

      return config;
    }
  };
};

module.exports = authTokenInjector;