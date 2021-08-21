console.log(window.localStorage);

function resetPassword() {
    const newPassword = document.getElementById("new-password").value;
    const reNewPassword = document.getElementById("re-new-password").value;

    const email = window.localStorage.getItem("userEmail");
    const code = window.localStorage.getItem("code");

    if (newPassword === reNewPassword) {
        fetch("http://localhost:4444/api/update-password", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword, email }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                console.log(`HeyyY!`);
                if (res.message === "Password updated successfully!") {
                    console.log("Hey password updated!");
                    fetch("http://localhost:4444/api/code-used", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            window.location.href = "index.html";
                        })
                        .catch((e) => console.error(e));
                }
                window.localStorage.clear();
            })
            .catch((e) => console.error(e));
    } else {
        document.getElementById("error").innerHTML =
            "The passwords do not match!";
    }
}

document
    .getElementById("submit-password")
    .addEventListener("click", resetPassword);
