const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const datas = { email, password };

	if (!email) {
		document.querySelector(".submit_error").innerHTML = "Veuillez saisir une adresse mail";
		return;
	}
	if (!password) {
		document.querySelector(".submit_error").innerHTML = "Veuillez saisir un mot de passe";
		return;
	}

	fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(datas),
	})
		.then((response) => response.json())
		.then((datas) => {

			localStorage.setItem("token", datas.token);

			if (datas.token) {
				window.location.assign("../../index.html");
			}
			else {
				document.querySelector(".submit_error").innerHTML = "Utilisateur inconnu";
			}
		});
});
