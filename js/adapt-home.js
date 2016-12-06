define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var HomeButton = Backbone.View.extend({

        className: 'home',

        initialize: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        events: {
            'click .home-button': 'initLink'
        },

        render: function() {
            var data = this.model.toJSON();
            var template = Handlebars.templates["home"];
            this.$el.html(template(data)).prependTo('#wrapper'+'>.navigation'+'>.navigation-inner');

            // Hide main navigation back button
            $('.navigation-back-button').css('display','none');

            // Add icon to button
            $('.home-button').addClass(Adapt.course.get('_home')._icon);

            // Check for pages to hide on
            this.hideButton();

            return this;

        },

        hideButton: function() {

          var hideIDs = Adapt.course.get('_home')._hide;

          var hasHideIdsConfiguration = (hideIDs && hideIDs.length > 0);

          if (hasHideIdsConfiguration) {
            for (var i = 0, l =  hideIDs.length; i < l; i++) {
              var item = hideIDs[i];
              var id = item._id;

              if(item._id === Adapt.location._currentId) {
                $('.home-button').css('display','none');
              }

            }
          }
        },

        initLink: function(event) {
            if (event) event.preventDefault();
            Adapt.navigateToElement('.' + Adapt.course.get('_home')._link);
        }

    });

    Adapt.on('router:page', function(pageModel) {

        if(Adapt.course.get('_home')._isEnabled){
            new HomeButton({model:pageModel});
        }

    });

});
