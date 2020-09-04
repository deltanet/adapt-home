define([
  'core/js/adapt'
], function (Adapt) {

  var HomeView = Backbone.View.extend({

    tagName: 'button',

    className: 'btn-icon nav__btn nav__home-btn icon js-nav-home-btn',

    events: {
      'click': 'onHomeClicked'
    },

    initialize: function () {
      this.render();
      this.setupListeners();
    },

    render: function () {
      var data = this.model.toJSON();

      this.$el
        .insertAfter('.nav__skip-btn')
        .addClass(this.model.get('_buttonIcon'))
        .attr('role', 'link');

      if (this.model.get('buttonLabel')) {
        this.$el.attr('aria-label', this.model.get('buttonLabel'));
      }
    },

    setupListeners: function () {
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
    },

    onHomeClicked: function (event) {
      if (event && event.preventDefault) event.preventDefault();
      Adapt.router.navigateToParent();
    }

  });

  return HomeView;

});
