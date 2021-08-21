function validateCode() {
    const code = document.getElementById("code-input").value;
    const email = window.localStorage.userEmail;
    fetch("http://localhost:4444/api/validate-code", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email }),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.message === "The code is correct!") {
                window.localStorage.setItem('code', code);
                window.location.href = "reset.html";
            } else {
                document.getElementById("error").innerHTML = res.message;
            }
        })
        .catch((e) => console.error(e));
}

document.getElementById("submit-code").addEventListener("click", validateCode);
