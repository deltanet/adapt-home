import Adapt from 'core/js/adapt';

export default class HomeView extends Backbone.View {

  tagName() {
    return 'button';
  }

  className() {
    return 'btn-icon nav__btn nav__home-btn icon js-nav-home-btn ' + this.model.get('_buttonIcon');
  }

  attributes() {
    return {
      role: 'link'
    }
  }

  events() {
    return {
      'click': 'onHomeClicked'
    };
  }

  initialize() {
    this.render();
    this.setupListeners();
  }

  render() {
    const data = this.model.toJSON();

    $('.nav__inner').prepend(this.$el);

    if (this.model.get('buttonLabel')) {
      this.$el.attr('aria-label', this.model.get('buttonLabel'));
    }
  }

  setupListeners() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
  }

  onHomeClicked(event) {
    Adapt.router.navigateToParent();
  }
}
