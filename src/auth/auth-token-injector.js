'use strict';

var authTokenInjector = function(authTokenService) {
  return {
    request: function(config) {
      if (authTokenService.tokenExists()) {
        config.headers['auth-token'] = authTokenService.get();
      }

      return config;
    }
  };
};

module.exports = authTokenInjector;