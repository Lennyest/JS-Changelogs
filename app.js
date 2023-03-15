const main = document.getElementById("mainContainer");
const sidebar = document.getElementById("sidebarContainer");


// Fetch all the data from our api server and prepare, catch and forward reason if it fails. 
const getCommits = async () => {
	const response = await fetch("http://localhost:8080/commits").catch((reason) => {
		return reason;
	})

	if (response.ok) {
		const data = await response.json();
		return data
	}
}

// Load data on window loaded.
window.onload = async () => {
	const { authors, commits } = await getCommits()

	// Failed to retrieve data > Show simple UI.
	if (authors == null || commits == null) {
		console.log("Failed to retrieve recent commit data.")

		const textElement = document.createElement("h2")
		textElement.innerHTML = `Failed to retrieve data, try again later... <span id="failLogo">😔</span>`
		textElement.id = "commitText";
		main.appendChild(textElement)
		return;
	}

	// Loop through list of commits provided by api.
	commits.forEach(element => {
		// Check if their username has a corresponding avatar in our authors array.
		const avatar = authors.find((value) => {
			return value[0] == element[1];
		});

		// If we do not, return.
		if (avatar == null) return;

		// If we do, create element.
		const textElement = document.createElement("p")
		textElement.innerHTML = `<span id=date>${element[2]}</span> <img src="${avatar[1]}" class="avatarSmall" width=32px height=32px> ${element[0]}`
		textElement.id = "commitText";

		main.appendChild(textElement)
	});

	// Loop through authors and create elements for them.
	authors.forEach((element) => {
		const textElement = document.createElement("p")
		// Avatar, name
		textElement.innerHTML = `<img src=${element[1]} class="avatar"></img><h1>${element[0]}</h1>`
		textElement.id = "commitText";

		sidebar.appendChild(textElement)
	});
}