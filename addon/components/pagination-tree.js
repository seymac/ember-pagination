import Ember from 'ember';

export default Ember.Component.extend({
	totalPageNumber : 1,
	currentPage: 1,
	cannotStepForward: true,
	cannotStepBackward: true,
  afterCurrentPageNumber : 2,
  beforeCurrentPageNumber : 2,

	didInsertElement: function(){
		this._super();
		this.currentPageChanged();
	},

  pages: Ember.computed('totalPageNumber', 'currentPage',function(){
  		var totalPageNumber = this.get('totalPageNumber');
      var currentPage = this.get('currentPage');
      var beforeCurrentPageNumber = this.get('beforeCurrentPageNumber');
      var afterCurrentPageNumber = this.get('afterCurrentPageNumber');
      
      var pages= Ember.A([]);
  		var firstPage = Ember.Object.create({
  			number: 1,
  			isCurrentPage: currentPage===1
  		});
  		pages.push(firstPage);

      if(currentPage - beforeCurrentPageNumber > 2){
        var middlePage = Ember.Object.create({
          number : '...',
          isCurrentPage : false
        });
        pages.push(middlePage);    
      }

  		for( let i=currentPage - beforeCurrentPageNumber ; i < totalPageNumber && i < currentPage ; i++){
  			if(i > 1){
  				var middlePages = Ember.Object.create({
  					number : i,
  					isCurrentPage : currentPage === i 
  				});
  				pages.push(middlePages);	
  			}		
  		}

  		for( let i=currentPage ; i < totalPageNumber && i<= currentPage + afterCurrentPageNumber ; i++){
        if(i > 1){
          var middlePages = Ember.Object.create({
    				number : i,
    				isCurrentPage : currentPage === i 
    			});
    			pages.push(middlePages);
        }
  		}

      if( currentPage + afterCurrentPageNumber < totalPageNumber - 1){
        var middlePage = Ember.Object.create({
          number : '...',
          isCurrentPage : false
        });
        pages.push(middlePage);  
      }

  		var lastPage = Ember.Object.create({
  			number: totalPageNumber,
  			isCurrentPage: currentPage=== totalPageNumber
  		});
  		pages.push(lastPage);

      return pages;
  }),

	currentPageChanged: Ember.observer('currentPage', 'totalPageNumber', function() {
    	var totalPageNumber = this.get('totalPageNumber');
  		var currentPage = this.get('currentPage');

  		this.set('cannotStepForward', currentPage >= totalPageNumber);
  		this.set('cannotStepBackward', currentPage <= 1);
  }),

	actions:{
		goToPage: function(page){
			var pages = this.get('pages');
      var pageNumber = page.number;
      if(page.get('number') === '...'){
        var pageIndex = pages.indexOf(page);
        pageNumber = Math.round( (pages[pageIndex -1].get('number') + pages[pageIndex + 1].get('number')) / 2 );  
      }
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