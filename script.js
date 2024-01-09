// Array of special characters to be included in password
var specialCharacters = ['@','%','+','\\','/',"'",'!','#','$','^','?',':',',',')','(','}','{',']','[','~','-','_','.'];
// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// Array of lowercase characters to be included in password
var lowerCasedCharacters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
// Array of uppercase characters to be included in password
var upperCasedCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

let userPasswordOptions = [];
let userOptionsSelected = 0;
let userPasswordLength;
let mustInclude = [];

// Function to prompt user for password options
function getPasswordOptions() {
    while (isNaN(userPasswordLength) || userPasswordLength < 8 || userPasswordLength > 128) {
        userPasswordLength = prompt("Enter desired password length (between 8 and 128):")
    };

    while (userOptionsSelected === 0) {
        alert("Please select at least one of the following:");
        let chooseSpecialCharacter = confirm("Should your password include Special Characters?");
            if (chooseSpecialCharacter === true) {
                userOptionsSelected++
                userPasswordOptions = userPasswordOptions.concat(specialCharacters);
                mustInclude.push(specialCharacters[Math.floor(Math.random() * specialCharacters.length)]);
            };
        let chooseNumericCharacters = confirm("Should your password include Numeric Characters?");
            if (chooseNumericCharacters === true) {
                userOptionsSelected++
                userPasswordOptions = userPasswordOptions.concat(numericCharacters);
                mustInclude.push(numericCharacters[Math.floor(Math.random() * numericCharacters.length)]);
            };
        let chooseLowerCasedCharacters = confirm("Should your password include Lowercase Characters?");
            if (chooseLowerCasedCharacters === true) {
                userOptionsSelected++
                userPasswordOptions = userPasswordOptions.concat(lowerCasedCharacters);
                mustInclude.push(lowerCasedCharacters[Math.floor(Math.random() * lowerCasedCharacters.length)]);
            };
        let chooseUpperCasedCharacters = confirm("Should your password include Uppercase Characters?");
            if (chooseUpperCasedCharacters === true) {
                userOptionsSelected++
                userPasswordOptions = userPasswordOptions.concat(upperCasedCharacters);
                mustInclude.push(upperCasedCharacters[Math.floor(Math.random() * upperCasedCharacters.length)]);
            };
    };
};

// Function for getting a random element from an array
function getRandom() {
    let generatedPassword = "";

    getPasswordOptions();
    
    for (i = 0; i < userPasswordLength; i++) {
        generatedPassword += userPasswordOptions [Math.floor(Math.random() * userPasswordOptions.length)]
    };

    return generatedPassword;
};

// Function to generate password with user input
function generatePassword() {
    let generatePassWithInput = getRandom();
    generatePassWithInput = generatePassWithInput.concat(mustInclude.join(""));
    generatePassWithInput = generatePassWithInput.slice(userOptionsSelected, generatePassWithInput.length).shuffle();
    return generatePassWithInput;
};

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

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);