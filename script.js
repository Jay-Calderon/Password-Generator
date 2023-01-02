const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input");
passwordIndicator = document.querySelector(".pass-indicator");
generateBtn = document.querySelector(".generate-btn");

const characters = { // Object for characters
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

    options.forEach(option => { //Each option's checkbox is looped through
        if(option.checked) { //Checkbox is checked
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                // Key value from character object is added to staticPassword
                staticPassword += characters[option.id]; 
            } else if (option.id === "spaces") { // if the checbox id is for spaces
                staticPassword += ` ${staticPassword} `; // adding space at the beginning and end of the static password
            } else { //Else pass true value to excludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        // getting the random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { //if exclude duplicate is true
            // if random password does not contain the current random character or random char is equal
            // to space '' then add a random character to random password else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else { // else add random character to random password
            randomPassword += randomChar;

        }
    }
    passwordInput.value = randomPassword; // Passing random password to password input value
}

const updatePasswordIndicator = () => {
    // if the slider length value is less than 8 then it will be considered weak in the password indicator id
    //else if length Slider value is less than 16 it will be considered medium strength and strong when above that
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    // Slider value is passed as counter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePasswordIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // Copying the random password
    copyIcon.innerText = "check"; //Changing the copy icon to tick
    copyIcon.style.color = "#4285F4";
    setTimeout(() => { //After 1500 ms, the tick icon will change back to copy
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);