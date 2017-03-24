PUI.UpdateInterval = {
  applyForUserAndSlider: function(user, slider) {
    if (user.isPro() || user.isLegacyUser()) {
      slider.setMinimum(0);
      slider.setMinimumText(false);
    } else {
      slider.setMinimum(10);
      slider.setMinimumText('<a href="" class="feeder-online">Upgrade your account to get 1 minute updates</a>');
    }
  }
};
