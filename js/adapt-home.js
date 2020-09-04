define([
  'core/js/adapt',
  './homeView'
], function (Adapt, HomeView) {

  var Home = _.extend({

    initialize: function () {
      this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
    },

    onAppDataReady: function () {
      this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

      if (!Adapt.course.get('_home')) return;

      if (!Adapt.course.get('_home')._isEnabled) return;

      this.setupHome();
      this.setupListeners();
    },

    onLangChange: function () {
      this.removeListeners();
      this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
    },

    setupHome: function () {
      this.config = Adapt.course.get('_home');
      this.model = new Backbone.Model(this.config);
    },

    setupListeners: function () {
      this.listenTo(Adapt, 'navigationView:postRender', this.hideBackButton);
      this.listenTo(Adapt, 'menuView:ready pageView:ready', this.renderHomeView);
    },

    removeListeners: function () {
      this.stopListening(Adapt, 'navigationView:postRender', this.hideBackButton);
      this.stopListening(Adapt, 'menuView:ready pageView:ready', this.renderHomeView);
      this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
    },

    hideBackButton: function () {
      $('.nav__back-btn').hide();
    },

    renderHomeView: function (view) {
      // Don't render if the page is in the root of the course
      if (view.model.get('_parentId') === "course") return;

      if (view.model.get('_type') === "course") return;

      // Set icon based on whether it is in a submenu
      if (view.model.getParent().getParent().get('_type') === "menu") {
        this.model.set('_buttonIcon', this.model.get('_subIcon'));

        if (this.model.get('subAriaLabel')) {
          this.model.set('buttonLabel', this.model.get('subAriaLabel'));
        }
      } else {
        this.model.set('_buttonIcon', this.model.get('_icon'));
        if (this.model.get('ariaLabel')) {
          this.model.set('buttonLabel', this.model.get('ariaLabel'));
        }
      }

      new HomeView({
        model: this.model
      });
    }

  }, Backbone.Events);

  Home.initialize();

  return Home;

});
