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
          this.homeLink = this.availableChildren.models[this.link-1].get('_id');
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
