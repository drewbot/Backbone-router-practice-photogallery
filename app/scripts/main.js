// "use strict";

var photos = new PhotoCollection();

var AppRouter = Backbone.Router.extend({
 
  routes: {
    // ""                          : "renderHome",
    // "users"                     : "renderUsers",
    // "users/:username"           : "renderUser",
    // "users/:username/favorites" : "renderUserFavorites",

    // Instantiate DetailView and include the image id
    ""                          : "renderDetailView",
    "detail/:id"                : "renderDetailView"
  },
 
  initialize: function () {
    console.log('AppRouter was just created!')
	
	this.fetchPromise = photos.fetch();

	this.fetchPromise.done(function(){
	  photos.each(function(photo){

	    new ThumbnailView({model: photo});

	  })

	})

  },

  // Instantiate a new DetailView
  renderDetailView: function (id) {
  	this.fetchPromise.done(function(){
	    detailViewInstance = new DetailView({ model: photos.get(id) });
	})
  	
  }
 
  // renderHome: function () {
  //   $('.container').html('Boring home page.');
  // },
 
  // renderUsers: function () {
  //   $('.container').html('USERS LIST WOW');
  // },
 
  // renderUser: function (username) {
  //   console.log('profile route for', username)
  //   $('.container').html('Check out '+ username + '\'s cool profile ');
  //   $('.container').append('<a href="/#users/'+username + '/favorites">'+ username +  '\'s favorites </a>');
  // },
 
  // renderUserFavorites: function (username) {
  //   console.log('favorites route for', username)
  //   $('.container').html('Check out '+ username + '\'s favorites');
  // }
 
})

var detailViewInstance;

var app = new AppRouter;

Backbone.history.start({pushstate: true});
