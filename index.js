/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pagination-ui',

  included: function(app) {	
    this._super.included(app);

	app.import(app.bowerDirectory + '/foundation/css/foundation.css');
	app.import(app.bowerDirectory + '/foundation/js/foundation.js');
  }
};
