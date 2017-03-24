/**
 * Created by austin on 3/24/17.
 */

// Globals
var submitPalindromeForm; // eslint-disable-line

(function closure() {
  var textarea = document.getElementById('palindrome-text-area');
  var outputList = document.getElementById('palindrome-output-list');
  var palindromeForm = document.getElementById('palindrome-form');

  palindromeForm.onsubmit = submitPalindromeForm = function submit() {
    var input = textarea.value;

    if (!input || input === '') {
      showError('Need to input some text!');
      return false;
    }

    input = simplify(input);
    addToOutputList(input);
    return false;
  };

  function simplify(text) {
    let simplified = text.toLowerCase();
    // First replace the white spaces with an empty string
    simplified = simplified.replace(/[\n\t\r\b ]+/gi, '');
    // Replace anything not alphanumeric or a single space with an empty string
    simplified = simplified.replace(/[^0-9a-z ]/gi, '');
    return simplified;
  }

  function isPalindrome(input) {
    for (var i = 0; i < input.length / 2; i++) {
      if (input[i] !== input[(input.length - 1) - i]) {
        return false;
      }
    }
    return true;
  }

  function addToOutputList(input) {
    var elemClass = isPalindrome(input) ? 'is-palindrome' : 'not-palindrome';

    var elem = document.createElement('li');
    elem.className = elemClass;
    var text = document.createElement('p');
    text.innerText = input;
    elem.append(text);

    outputList.append(elem);
  }

  function showError(errorMessage) {
    alert(errorMessage);
  }
})();
