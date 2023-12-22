// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  //Check if parameters have been provided previously
  if(details.characterList === null){
    details.promptRequirements();
  } else{
    if(window.confirm("Would you like to use the same parameters as previously?")){
      for(let k = 0; k < details.characterList.length; k++){
        details.characterList[k][1] = false;
      }
      generatePassword()
    } else{
      details.promptRequirements();
    }
  }
  
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Use an object to store password preferences and methods of resetting password
var details = {
  lengthPrompt: 0,
  characterList: null,
  promptRequirements: function(){
    //Use counter to ensure at least one prompt is selected
    let counter = 0;
    //Prompt for password length
    this.characterList = []
    this.lengthPrompt = prompt("How long would you like your password to be? *Password can only be between 8 and 128 characters long*")
    //Ensure password length has be provided between ranges
    while(this.lengthPrompt < 8 || this.lengthPrompt > 128){
      this.lengthPrompt = prompt("Password must be between 8 and 128 characters in length")
    }
    //Prompt character choices
    if(window.confirm("Would you like your password to have lowercase characters?")){
      //Push an array containing all lowercase characters + a marker boolean value to be changed once a character is used from this character list
      this.characterList.push(['abcdefghijklmnopqrstuvwxyz', false]);
      counter++
    } 
    if(window.confirm("Would you like your password to have Uppercase characters?")){
      this.characterList.push(['ABCDEFGHIJKLMNOPQRSTUVWXYZ', false]);
      counter++
    } 
    if(window.confirm("Would you like your password to have numeric characters?")){
      this.characterList.push(['0123456789', false]);
      counter++
    } 
    if(window.confirm("Would you like your password to have special characters?")){
      this.characterList.push(["!#$%&'()*+,-./:;<=>?@[\]^_`{|}~", false]);
      counter++
    } 
    //Check at least one character set has been selected 
    if(counter < 1){
      alert('You must select allow at least one set of characters');
      this.promptRequirements();
    }
  }
}


//Create generatePassword() which generates the password randomly based on the users preferred characters and password length
function generatePassword(){
  var newPassword = ""

  for(let i = 0; i < details.lengthPrompt; i++){
    var categorySelect = Math.floor(Math.random() * details.characterList.length);
    details.characterList[categorySelect][1] = true;
    let characterValue = Math.floor(Math.random() * details.characterList[categorySelect][0].length);
    newPassword = newPassword + details.characterList[categorySelect][0][characterValue]
  }

  //Ensure all selected character categories have been utilised via true statements
  for(let j = 0; j < details.characterList.length; j++){
    if(details.characterList[j][1] === false){
      console.log(newPassword)
      console.log('Password did not include all selected categories, regenerating')
      //Reset markers
      for(let k = 0; k < details.characterList.length; k++){
        details.characterList[k][1] = false;
      }
      //Regenerate password using same parameters
      generatePassword()
    }
    details.characterList[j][1] = null;
  }

  return newPassword
}