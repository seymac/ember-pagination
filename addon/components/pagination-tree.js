import Ember from 'ember';

export default Ember.Component.extend({
	totalPageNumber : 1,
	currentPage: 1,
	cannotStepForward: true,
	cannotStepBackward: true,

	didInsertElement: function(){
		this._super();
		this.currentPageChanged();
	},

	pages: Ember.computed( 'totalPageNumber', 'currentPage', function(){
    	var totalPageNumber = this.get('totalPageNumber');
    	var currentPage = this.get('currentPage');
    	var pages = Ember.A([]);
    	for(var i=1; i <= totalPageNumber; i++){
    		var page = Ember.Object.create({
    			number : i,
    			isCurrentPage: i === currentPage
    		});
    		pages.push(page);
    	}
    	return pages;
  	}),

	currentPageChanged: Ember.observer('currentPage', 'totalPageNumber', function() {
    	var totalPageNumber = this.get('totalPageNumber');
  		var currentPage = this.get('currentPage');

  		this.set('cannotStepForward', currentPage >= totalPageNumber);
  		this.set('cannotStepBackward', currentPage <= 1);
  	}),

  	actions:{
  		goToPage: function(pageNumber){
  			var pages = this.get('pages');
  			pages.forEach(function(page){
  				page.set('isCurrentPage', page.get('number') === pageNumber);
  			});
  			this.set('currentPage', pageNumber);
  		},

  		nextPage: function(){
  			var currentPage = this.get('currentPage');
  			var totalPageNumber = this.get('totalPageNumber');
  			if(currentPage < totalPageNumber){
  				this.set('currentPage', currentPage + 1);
  			}
  		},

  		previousPage: function(){
  			var currentPage = this.get('currentPage');
  			if( currentPage > 1){
  				this.set('currentPage', currentPage -1);
  			} 
  		}
  	}

});