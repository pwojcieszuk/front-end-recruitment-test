/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a 'New content is
                // available; please refresh.' message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  (function(document) {
    var bacon = document.querySelector('img[alt=Bacon]');
    if (!bacon) {
      return;
    }
    var i = 0;
    var baconContainer = bacon.parentNode;
    document.querySelector('button[action=button]')
      .addEventListener('click', function() {
        var clonedBacon = baconContainer.cloneNode(true);
        baconContainer.parentNode
          .insertBefore(clonedBacon, baconContainer.nextSibling);

        i++;

        if (i > 3) {
          alert(
            'Ministry of health warns: Too much bacon may be bad for you :D'
          );
        }
      });
  })(document);

  (function(document) {
    var errors;

    var addClass = function(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    };

    var removeClass = function(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else {
        var regExp = new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        el.className = el.className.replace(regExp, ' ');
      }
    };

    var addMessage = function(el, message) {
      var messageEl = document.createElement('div');
      messageEl.appendChild(document.createTextNode(message));
      el.appendChild(messageEl);
    };

    var addError = function(fields, message) {
      var allFields = fields.constructor === Array ? fields : [fields];
      Array.prototype.forEach.call(allFields, function(field) {
        addClass(field.parentNode, 'error');
      });
      errors.push(message);
    };

    var validatePhone = function(field) {
      var emailField = document.querySelector(
        '.checkout-form input[name=email]');
      var phone = field.value.replace(/ /g, '');

      if (phone === '' && emailField.value.trim() === '') {
        addError([field.parentNode, emailField.parentNode],
          'Please fill in either email or phone number.');
        return;
      }

      var phoneRegExp = new RegExp(/^\+?\d+(-\d+)*$/);

      if (phone !== '' && (phone.length < 9 ||
          phone.length > 15 ||
          !phoneRegExp.test(phone))) {
        addError(field.parentNode, 'Please fill in correct phone number.');
      }
    };

    var validateEmail = function(field) {
      var emailRegExp = new RegExp(/\S+@\S+/);

      if (field.value !== '' && !emailRegExp.test(field.value)) {
        addError(field.parentNode, 'Please fill in correct email address.');
      }
    };

    var validateCcNumber = function(field) {
      var number = field.value.replace(/\D+/g, '');
      var ccRegExp = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);

      if (number !== '' && !ccRegExp.test(number)) {
        addError(field.parentNode, 'Please fill in correct credit card number.');
      }
    };

    var validateCcExpiry = function(field) {
      var expiryRegExp = new RegExp(/(0[1-9]|1[0-2])\/[0-9]{2}/);

      if (field.value !== '' && !expiryRegExp.test(field.value)) {
        addError(field.parentNode, 'Please fill in correct credit card expiry date.');
      }
    };

    document.querySelector('.checkout-form').addEventListener(
    'submit', function(e) {
      e.preventDefault();

      var required = ['firstName', 'lastName', 'postalCode', 'ccNumber',
      'ccSecurity', 'ccExpiry', 'country'];

      var custom = {
        phone: validatePhone,
        email: validateEmail,
        ccNumber: validateCcNumber,
        ccExpiry: validateCcExpiry
      };

      var fields = this.querySelectorAll('input, select');
      errors = [];

      Array.prototype.forEach.call(fields, function(field) {
        var label = field.parentNode;

        removeClass(label, 'error');

        if (required.indexOf(field.name) !== -1 && field.value.trim() === '') {
          addClass(label, 'error');
          var msg = 'Please fill in ' +
            label.querySelector('span').textContent.toLowerCase() + '.';
          errors.push(msg);
        }

        if (custom[field.name]) {
          custom[field.name](field, errors);
        }
      });

      var messages = document.querySelector('.messages');
      messages.innerHTML = '';

      if (errors.length === 0) {
        // submit form action - personally I'd use Ajax and put success (or error) message in promise chain.
        removeClass(messages, 'error');
        addClass(messages, 'success');
        addMessage(messages, 'Form has been submitted.');
        document.querySelector('button').style.display = 'none';
        return;
      }

      addClass(messages, 'error');

      Array.prototype.forEach.call(errors, function(error) {
        addMessage(messages, error);
      });
    });
  })(document);
})();
