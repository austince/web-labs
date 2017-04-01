/**
 * Created by austin on 4/1/17.
 */

(function closure() {
  var usernameInput = document.getElementById('username');
  var loginForm = document.getElementById('login-form');

  loginForm.onsubmit = function submit() {
    // Trim off whitespace from username input
    usernameInput.value = usernameInput.value.replace(/[\n\t\r\b ]+/gi, '');

    return true;
  };
})();
