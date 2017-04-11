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
            // Setup home link
            this.setupHome();
        },

        setupHome: function() {
          this.link = Adapt.course.get('_home')._link;
          this.availableChildren = new Backbone.Collection(Adapt.course.getChildren().where({_isAvailable: true}));

          // Backward compatible
          // If length of link is greater than 5 it will be treated as a string ID
          if(this.link.length > 5) {
            this.homeLink = this.link;
          } else {
            this.homeLink = this.availableChildren.models[this.link-1].get('_id');
          }

          // Check for pages to hide on
          this.checkIDs();
        },

        checkIDs: function() {
          // Show button
          this.$('.home-button').css('display','block');
          // Hide button on all child pages in the course
          for (var i = 0, l = this.availableChildren.length; i < l; i++) {
            if(Adapt.location._currentId == this.availableChildren.models[i].get('_id')) {
              this.$('.home-button').css('display','none');
            }
          }

          // Backward compatible
          // Check for Array of ID's to hide button on
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
            Adapt.navigateToElement('.' + this.homeLink);
        },

        onNavigationEnd: function(view) {
            this.checkIDs();
        }

    });

    return HomeView;

});
