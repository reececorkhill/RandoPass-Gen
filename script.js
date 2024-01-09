// Array of special characters to be included in password.
var specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];

// Array of numeric characters to be included in password.
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password.
var lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Array of uppercase characters to be included in password.
var upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// Arrays to store user-selected password options.
let userPasswordOptions = [];

// Variable to track the number of user-selected password options.
let userOptionsSelected = 0;

// Variable to store the user-defined length for the generated password.
let userPasswordLength;

// Array to store characters that must be included in the generated password based on user choices.
let mustInclude = [];

// Function to prompt user for password options.
function getPasswordOptions() {
    // Validate user input for password length.
    while (isNaN(userPasswordLength) || userPasswordLength < 8 || userPasswordLength > 128) {
        userPasswordLength = prompt("Enter desired password length (between 8 and 128):")
    };

    // Loop to prompt user for character type inclusion.
    while (userOptionsSelected === 0) {
        alert("Please select at least one of the following:");
        // Special Characters.
        let chooseSpecialCharacter = confirm("Should your password include Special Characters?");
        if (chooseSpecialCharacter === true) {
            userOptionsSelected++
            userPasswordOptions = userPasswordOptions.concat(specialCharacters);
            mustInclude.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
        };
        // Numeric Characters.
        let chooseNumericCharacters = confirm("Should your password include Numeric Characters?");
        if (chooseNumericCharacters === true) {
            userOptionsSelected++
            userPasswordOptions = userPasswordOptions.concat(numericCharacters);
            mustInclude.push(numericCharacters[Math.floor(Math.random() * numericCharacters.length)]);
        };
        // Lowercase Characters.
        let chooseLowerCasedCharacters = confirm("Should your password include Lowercase Characters?");
        if (chooseLowerCasedCharacters === true) {
            userOptionsSelected++
            userPasswordOptions = userPasswordOptions.concat(lowerCasedCharacters);
            mustInclude.push(lowerCasedCharacters[Math.floor(Math.random() * lowerCasedCharacters.length)]);
        };
        // Uppercase Characters.
        let chooseUpperCasedCharacters = confirm("Should your password include Uppercase Characters?");
        if (chooseUpperCasedCharacters === true) {
            userOptionsSelected++
            userPasswordOptions = userPasswordOptions.concat(upperCasedCharacters);
            mustInclude.push(upperCasedCharacters[Math.floor(Math.random() * upperCasedCharacters.length)]);
        };
    };
};

// Function for getting a random element from an array.
function getRandom() {
    let generatedPassword = "";

    // Call getPasswordOptions to get user input.
    getPasswordOptions();
    
    // Generate password based on user input.
    for (i = 0; i < userPasswordLength; i++) {
        generatedPassword += userPasswordOptions [Math.floor(Math.random() * userPasswordOptions.length)]
    };

    return generatedPassword;
};

// Function to generate password with user input.
function generatePassword() {
    let generatePassWithInput = getRandom();

    // Add mustInclude characters and shuffle the password.
    generatePassWithInput = generatePassWithInput.concat(mustInclude.join(""));
    generatePassWithInput = generatePassWithInput.slice(userOptionsSelected, generatePassWithInput.length).shuffle();

    return generatePassWithInput;
};

// Extend String prototype to shuffle characters.
String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;
  
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    };
    return a.join("");
};

// Get references to the #generate element.
var generateBtn = document.querySelector('#generate');

// Write password to the #password input.
function writePassword() {
  let password = generatePassword();
  let passwordText = document.querySelector('#password');
  passwordText.value = password;

  // Reset variables for future password generation.
  userPasswordOptions = [];
  userOptionsSelected = 0;
  userPasswordLength = null;
  mustInclude = [];
}

// Add event listener to generate button.
generateBtn.addEventListener('click', writePassword);