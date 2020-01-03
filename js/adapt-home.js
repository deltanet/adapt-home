define([
    'core/js/adapt',
    './homeView'
], function(Adapt, HomeView) {

    var Home = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

            if (!Adapt.course.get('_home')) return;

            if (Adapt.course.get('_home')._isEnabled) {
                this.setupHome();
                this.setupListeners();
            }
        },

        onLangChange: function() {
            this.removeListeners();
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        setupHome: function() {
            this.config = Adapt.course.get('_home');
            this.model = new Backbone.Model(this.config);
        },

        setupListeners: function() {
            this.listenTo(Adapt, 'navigationView:postRender', this.hideBackButton);
            this.listenTo(Adapt, 'menuView:ready pageView:ready', this.renderHomeView);
        },

        removeListeners: function() {
            this.stopListening(Adapt, 'navigationView:postRender', this.hideBackButton);
            this.stopListening(Adapt, 'menuView:ready pageView:ready', this.renderHomeView);
            this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
        },

        hideBackButton: function() {
            $('.navigation-back-button').hide();
        },

        renderHomeView: function(view) {
            // Don't show on the root level of Adapt
            if (view.model.get('_type') === "course") return;

            // Don't show when the page or menu is at the root level of Adapt and the Start controller is enabled
            if (view.model.get('_parentId') === "course" && Adapt.course.get('_start')._isEnabled) return;

            new HomeView({
                model: this.model
            });
        }

    }, Backbone.Events);

    Home.initialize();

    return Home;

});
