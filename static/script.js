// ==========================================
// PASSWORD STRENGTH ANALYZER
// ==========================================

// ==========================================
// GET HTML ELEMENTS
// ==========================================

const passwordInput =
    document.getElementById("password");
passwordInput.value = "";
const togglePassword =
    document.getElementById("togglePassword");

const strengthProgress =
    document.getElementById("strengthProgress");

const strengthText =
    document.getElementById("strengthText");

const lengthCheck =
    document.getElementById("lengthCheck");

const uppercaseCheck =
    document.getElementById("uppercaseCheck");

const lowercaseCheck =
    document.getElementById("lowercaseCheck");

const numberCheck =
    document.getElementById("numberCheck");

const specialCheck =
    document.getElementById("specialCheck");

const commonCheck =
    document.getElementById("commonCheck");

const suggestionText =
    document.getElementById("suggestionText");

const generatedPassword =
    document.getElementById("generatedPassword");

const generateButton =
    document.getElementById("generateButton");

const copyButton =
    document.getElementById("copyButton");

const checkHistoryButton =
    document.getElementById("checkHistoryButton");

const historyMessage =
    document.getElementById("historyMessage");


// ==========================================
// COMMON PASSWORDS
// ==========================================

const commonPasswords = [
    "123456",
    "password",
    "12345678",
    "qwerty",
    "123456789",
    "12345",
    "1234567890",
    "admin",
    "letmein",
    "welcome",
    "password123",
    "admin123",
    "qwerty123"
];


// ==========================================
// UPDATE CHECK DISPLAY
// ==========================================

function updateCheck(element, condition, message) {

    if (condition) {

        element.textContent =
            "✓ " + message;

        element.style.color =
            "#16a34a";

    } else {

        element.textContent =
            "✗ " + message;

        element.style.color =
            "#64748b";
    }
}


// ==========================================
// ANALYZE PASSWORD
// ==========================================

function analyzePassword() {

    const password =
        passwordInput.value;


    // ======================================
    // EMPTY PASSWORD
    // ======================================

    if (password.length === 0) {

        strengthProgress.style.width =
            "0%";

        strengthText.textContent =
            "Enter a password";

        updateCheck(
            lengthCheck,
            false,
            "At least 8 characters"
        );

        updateCheck(
            uppercaseCheck,
            false,
            "Contains uppercase letter"
        );

        updateCheck(
            lowercaseCheck,
            false,
            "Contains lowercase letter"
        );

        updateCheck(
            numberCheck,
            false,
            "Contains a number"
        );

        updateCheck(
            specialCheck,
            false,
            "Contains special character"
        );

        updateCheck(
            commonCheck,
            false,
            "Avoids common passwords"
        );

        suggestionText.textContent =
            "Enter a password to receive security suggestions.";

        return;
    }


    // ======================================
    // PASSWORD CONDITIONS
    // ======================================

    const hasLength =
        password.length >= 8;

    const hasUppercase =
        /[A-Z]/.test(password);

    const hasLowercase =
        /[a-z]/.test(password);

    const hasNumber =
        /[0-9]/.test(password);

    const hasSpecial =
        /[^A-Za-z0-9]/.test(password);

    const isCommon =
        commonPasswords.includes(
            password.toLowerCase()
        );


    // ======================================
    // UPDATE CHECKS
    // ======================================

    updateCheck(
        lengthCheck,
        hasLength,
        "At least 8 characters"
    );

    updateCheck(
        uppercaseCheck,
        hasUppercase,
        "Contains uppercase letter"
    );

    updateCheck(
        lowercaseCheck,
        hasLowercase,
        "Contains lowercase letter"
    );

    updateCheck(
        numberCheck,
        hasNumber,
        "Contains a number"
    );

    updateCheck(
        specialCheck,
        hasSpecial,
        "Contains special character"
    );

    updateCheck(
        commonCheck,
        !isCommon,
        "Avoids common passwords"
    );


    // ======================================
    // CALCULATE SCORE
    // ======================================

    let score = 0;

    if (hasLength) {
        score += 1;
    }

    if (password.length >= 12) {
        score += 1;
    }

    if (hasUppercase) {
        score += 1;
    }

    if (hasLowercase) {
        score += 1;
    }

    if (hasNumber) {
        score += 1;
    }

    if (hasSpecial) {
        score += 1;
    }

    if (!isCommon) {
        score += 1;
    }


    // ======================================
    // DETERMINE STRENGTH
    // ======================================

    let strength;
    let percentage;


    if (isCommon) {

        strength =
            "Very Weak";

        percentage =
            15;

    } else if (score <= 2) {

        strength =
            "Weak";

        percentage =
            30;

    } else if (score <= 4) {

        strength =
            "Medium";

        percentage =
            55;

    } else if (score <= 6) {

        strength =
            "Strong";

        percentage =
            80;

    } else {

        strength =
            "Very Strong";

        percentage =
            100;
    }


    // ======================================
    // UPDATE STRENGTH BAR
    // ======================================

    strengthProgress.style.width =
        percentage + "%";

    strengthText.textContent =
        "Password Strength: " + strength;


    // ======================================
    // CHANGE STRENGTH COLOR
    // ======================================

    if (strength === "Very Weak") {

        strengthProgress.style.background =
            "linear-gradient(90deg, #ef4444, #dc2626)";

        strengthText.style.color =
            "#dc2626";

    } else if (strength === "Weak") {

        strengthProgress.style.background =
            "linear-gradient(90deg, #f97316, #ea580c)";

        strengthText.style.color =
            "#ea580c";

    } else if (strength === "Medium") {

        strengthProgress.style.background =
            "linear-gradient(90deg, #eab308, #ca8a04)";

        strengthText.style.color =
            "#ca8a04";

    } else if (strength === "Strong") {

        strengthProgress.style.background =
            "linear-gradient(90deg, #22c55e, #16a34a)";

        strengthText.style.color =
            "#16a34a";

    } else {

        strengthProgress.style.background =
            "linear-gradient(90deg, #10b981, #059669)";

        strengthText.style.color =
            "#059669";
    }


    // ======================================
    // SUGGESTIONS
    // ======================================

    let suggestions = [];


    if (!hasLength) {

        suggestions.push(
            "Use at least 8 characters."
        );
    }


    if (password.length < 12) {

        suggestions.push(
            "For better security, use 12 or more characters."
        );
    }


    if (!hasUppercase) {

        suggestions.push(
            "Add uppercase letters."
        );
    }


    if (!hasLowercase) {

        suggestions.push(
            "Add lowercase letters."
        );
    }


    if (!hasNumber) {

        suggestions.push(
            "Add numbers."
        );
    }


    if (!hasSpecial) {

        suggestions.push(
            "Add special characters such as !, @, # or $."
        );
    }


    if (isCommon) {

        suggestions.push(
            "Avoid common or easily guessed passwords."
        );
    }


    if (suggestions.length === 0) {

        suggestionText.textContent =
            "Excellent! Your password meets the recommended basic security requirements.";

    } else {

        suggestionText.innerHTML =
            suggestions
                .map(item => "• " + item)
                .join("<br>");
    }
}


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

togglePassword.addEventListener(
    "click",
    function () {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type =
                "password";

            togglePassword.textContent =
                "Show";
        }
    }
);


// ==========================================
// ANALYZE PASSWORD WHILE TYPING
// ==========================================

passwordInput.addEventListener(
    "input",
    analyzePassword
);


// ==========================================
// GENERATE STRONG PASSWORD
// ==========================================

function generateStrongPassword() {

    const uppercase =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const lowercase =
        "abcdefghijklmnopqrstuvwxyz";

    const numbers =
        "0123456789";

    const special =
        "!@#$%^&*()_+-=[]{}";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        special;


    // Secure random character function
    function secureRandomCharacter(characters) {

        const randomValues =
            new Uint32Array(1);

        crypto.getRandomValues(randomValues);

        return characters[
            randomValues[0] % characters.length
        ];
    }


    // Start with required character types
    let password = "";

    password +=
        secureRandomCharacter(uppercase);

    password +=
        secureRandomCharacter(lowercase);

    password +=
        secureRandomCharacter(numbers);

    password +=
        secureRandomCharacter(special);


    // Add remaining characters
    while (password.length < 16) {

        password +=
            secureRandomCharacter(allCharacters);
    }


    // Securely shuffle the password
    const characters =
        password.split("");

    for (
        let i = characters.length - 1;
        i > 0;
        i--
    ) {

        const randomValues =
            new Uint32Array(1);

        crypto.getRandomValues(randomValues);

        const j =
            randomValues[0] % (i + 1);

        [
            characters[i],
            characters[j]
        ] = [
            characters[j],
            characters[i]
        ];
    }


    password =
        characters.join("");


    generatedPassword.value =
        password;
}

// ==========================================
// GENERATE BUTTON
// ==========================================

generateButton.addEventListener(
    "click",
    generateStrongPassword
);


// ==========================================
// COPY GENERATED PASSWORD
// ==========================================

copyButton.addEventListener(
    "click",
    async function () {

        if (
            generatedPassword.value === ""
        ) {

            alert(
                "Generate a password first."
            );

            return;
        }


        try {

            await navigator.clipboard.writeText(
                generatedPassword.value
            );


            copyButton.textContent =
                "Copied!";


            setTimeout(
                function () {

                    copyButton.textContent =
                        "Copy";

                },
                1500
            );


        } catch (error) {

            alert(
                "Unable to copy password."
            );
        }
    }
);


// ==========================================
// PASSWORD HISTORY CHECK
// ==========================================

checkHistoryButton.addEventListener(
    "click",
    function () {

        const password =
            passwordInput.value;


        // ==================================
        // CHECK EMPTY PASSWORD
        // ==================================

        if (password === "") {

            historyMessage.textContent =
                "Please enter a password first.";

            historyMessage.style.color =
                "#dc2626";

            return;
        }


        // ==================================
        // SHOW CHECKING MESSAGE
        // ==================================

        historyMessage.textContent =
            "Checking password history...";

        historyMessage.style.color =
            "#4f46e5";


        // ==================================
        // SEND PASSWORD TO FLASK
        // ==================================

        fetch(
            "/check-password",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    password: password
                })
            }
        )


        // ==================================
        // RECEIVE FLASK RESPONSE
        // ==================================

        .then(
            response =>
                response.json()
        )


        .then(
            data => {

                if (
                    data.used_before
                ) {

                    historyMessage.textContent =
                        "⚠️ " +
                        data.message;

                    historyMessage.style.color =
                        "#dc2626";

                } else {

                    historyMessage.textContent =
                        "✅ " +
                        data.message;

                    historyMessage.style.color =
                        "#16a34a";
                }
            }
        )


        // ==================================
        // HANDLE ERROR
        // ==================================

        .catch(
            error => {

                console.error(
                    error
                );

                historyMessage.textContent =
                    "Unable to check password history.";

                historyMessage.style.color =
                    "#dc2626";
            }
        );
    }
);