import Adapt from 'core/js/adapt';
import HomeView from './homeView';

class Home extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  onAppDataReady() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

    if (!Adapt.course.get('_home')) return;

    if (!Adapt.course.get('_home')._isEnabled) return;

    this.setupHome();
    this.setupListeners();
  }

  onLangChange() {
    this.removeListeners();
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  setupHome() {
    this.config = Adapt.course.get('_home');
    this.model = new Backbone.Model(this.config);
  }

  setupListeners() {
    this.listenTo(Adapt, {
      'contentObjectView:ready': this.renderHomeView,
      'navigationView:postRender': this.hideBackButton
    });
  }

  removeListeners() {
    this.stopListening(Adapt, {
      'contentObjectView:ready': this.renderHomeView,
      'navigationView:postRender': this.hideBackButton
    });

    this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
  }

  hideBackButton() {
    $('.nav__back-btn').hide();
  }

  renderHomeView(view) {
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
}

export default Adapt.home = new Home();
