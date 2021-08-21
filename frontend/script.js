const submitButton = document.getElementById("submit-email");

function callForgot() {
    const userEmail = document.getElementById("email-input").value.trim();

    fetch("http://localhost:4444/api/forgot-password", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.message === 'Email sent successfully!') {
                window.localStorage.setItem('userEmail', userEmail);
                window.location.href = 'code.html'
            } else {
                document.getElementById('error').innerHTML = res.message;
            }
        })
        .catch((e) => console.error(e));
}

submitButton.addEventListener("click", callForgot);


function sentEmailAnimation() {
    
}