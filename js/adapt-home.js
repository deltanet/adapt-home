define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var HomeView = require('extensions/adapt-home/js/adapt-homeView');

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
