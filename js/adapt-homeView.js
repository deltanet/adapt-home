define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var HomeView = Backbone.View.extend({

        className: 'home',

        initialize: function() {
          this.render();
          this.listenTo(Adapt, 'pageView:ready menuView:ready', this.onNavigationEnd);
        },

        events: {
            'click .home-button': 'initLink'
        },

        render: function() {

            var data = this.model.toJSON();
            var template = Handlebars.templates['home'];
            this.$el.html(template({
                home:data
            }));

            // Add icon to button
            this.$('.home-button').addClass(Adapt.course.get('_home')._icon);

            // Check for pages to hide on
            this.checkIDs();
        },

        checkIDs: function() {

          // Show button
          this.$('.home-button').css('display','block');

          var hideIDs = Adapt.course.get('_home')._hide;

          var hasHideIdsConfiguration = (hideIDs && hideIDs.length > 0);

          if (hasHideIdsConfiguration) {
            for (var i = 0, l = hideIDs.length; i < l; i++) {
              var item = hideIDs[i];
              var id = item._id;

              if(id == Adapt.location._currentId) {
                this.$('.home-button').css('display','none');
              }

            }
          }
        },

        initLink: function(event) {
            if (event) event.preventDefault();
            Adapt.navigateToElement('.' + Adapt.course.get('_home')._link);
        },

        onNavigationEnd: function(view) {
            this.checkIDs();
        }

    });

    return HomeView;

});
