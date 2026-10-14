// Country-code dropdown: same CDN version and initialization as old-layout.
$(document).ready(function () {
  $('.phone-input').each(function () {
    const input = this;
    const output = $(this).siblings('.output');
    const iti = window.intlTelInput(input, {
      allowDropdown: true,
      separateDialCode: true,
      initialCountry: 'auto',
      geoIpLookup: callback => {
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(data => callback(data.country_code))
          .catch(() => callback('in'));
      },
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
    });

    const handleChange = () => {
      let text;
      if (input.value) {
        text = iti.isValidNumber()
          ? 'Valid number! Full international format: ' + iti.getNumber()
          : 'Invalid number - please try again';
      } else {
        text = 'Please enter a valid number';
      }
      output.empty().text(text);
    };
    $(input).on('change keyup', handleChange);
  });
});
