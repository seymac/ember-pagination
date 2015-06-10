import Ember from 'ember';

export default Ember.Component.extend({
	totalPageNumber : 1,
	currentPage: 1,

	pages: Ember.computed( 'totalPageNumber', function(){
    	var totalPageNumber = this.get('totalPageNumber');
    	var pages = Ember.A([]);
    	for(var i=1; i <= totalPageNumber; i++){
    		pages.push(i)
    	}
    	return pages;
  	})
});