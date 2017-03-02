define([
    'backbone',
    'core/js/adapt',
    './adapt-homeView'
], function(Backbone, Adapt, HomeView) {

    function setupHome(toolboxModel) {

        var homeModel = new Backbone.Model(homeModel);

        Adapt.on('navigationView:postRender', function(navigationView) {

          // Hide main navigation back button
          $('.navigation-back-button').css('display','none');

          navigationView.$('.navigation-drawer-toggle-button').before(new HomeView({
            model: homeModel
          }).$el);

        });

    }

    Adapt.once('app:dataReady', function() {

        if(Adapt.course.get('_home')._isEnabled){
            var courseHomeConfig = Adapt.course.get('_home');
            setupHome(courseHomeConfig, courseHomeConfig._items);
        }

    });

});
