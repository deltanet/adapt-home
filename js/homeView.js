define([
    'core/js/adapt'
], function(Adapt) {

    var HomeView = Backbone.View.extend({

        tagName: 'button',

        className: 'base home-button icon',

        initialize: function() {
            this.render();
            this.setupListeners();
        },

        events: {
            'click': 'onHomeClicked'
        },

        render: function() {
            var data = this.model.toJSON();

            this.$el
                .prependTo('.navigation-inner')
                .addClass(this.model.get('_buttonIcon'))
                .attr('role', 'link');

            if (this.model.get('buttonLabel')) {
                this.$el.attr('aria-label', this.model.get('buttonLabel'));
            }
        },

        setupListeners: function() {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
        },

        onHomeClicked: function(event) {
            if (event && event.preventDefault) event.preventDefault();
            Adapt.trigger('navigation:parentButton');
        }

    });

    return HomeView;

});
