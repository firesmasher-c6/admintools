document.addEventListener("DOMContentLoaded", () => {
    const verifyBtn = document.getElementById('verify-btn');
    const verificationCodeInput = document.getElementById('verification-code');
    const statusMsg = document.getElementById('status-msg');
    const lockScreen = document.getElementById('auth-lockscreen');

    // Path matching your folder sequence
    const secretPath = './s/s/s/s/s/s/e/c/r/e/t/j/s/pass.json';

    verifyBtn.addEventListener('click', () => {
        const userInput = verificationCodeInput.value.trim();

        if (!userInput) {
            statusMsg.style.color = "#ff0000";
            statusMsg.textContent = "Please enter a code.";
            return;
        }

        fetch(secretPath)
            .then(response => {
                if (!response.ok) throw new Error("Target file could not be read.");
                return response.json();
            })
            .then(data => {
                const correctPassword = data[0].password;

                if (userInput === correctPassword) {
                    statusMsg.style.color = "#00ff00";
                    statusMsg.textContent = "Access Granted.";
                    
                    // Hide the lockscreen overlay to reveal main content
                    lockScreen.style.display = 'none';
                } else {
                    statusMsg.style.color = "#ff0000";
                    statusMsg.textContent = "Invalid Code.";
                }
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                statusMsg.style.color = "#ff0000";
                statusMsg.textContent = "Verification Failed.";
            });
    });
});