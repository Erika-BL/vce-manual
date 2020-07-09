function openManual() {
	document.getElementById("changelog").classList.add("hidden");
	document.getElementById("manual").classList.remove("hidden");
	
	if(history.pushState)
		history.pushState(null, null, '#intro');
	else
		location.hash = '#intro';

	document.querySelector("#manual .body").scrollTo(0,0);
}

function openChangeLog() {
	document.getElementById("manual").classList.add("hidden");
	document.getElementById("changelog").classList.remove("hidden");

	document.querySelector("#changelog .changelog-body").scrollTo(0,0);
	
	if(history.pushState)
		history.pushState(null, null, '#changelog');
	else
		location.hash = '#changelog';
}

function openSection(event) {
	console.log(event);
	elem = event.srcElement;
	var bodyelem = document.getElementById(elem.getAttribute("value"));

	if(bodyelem === null) {
		alert("ERROR: Section missing: " + elem.getAttribute("value"));
		return;
	}
	
	var hash = '#' + elem.getAttribute("value");

	if(window.location.hash !== hash) {
		if(history.pushState)
			history.pushState(null, null, hash);
		else
			location.hash = hash;
	}

	if(document.querySelector(".entry.selected") !== null)
		document.querySelector(".entry.selected").classList.remove("selected");

	if(document.querySelector(".body div.visible") !== null)
		document.querySelector(".body div.visible").classList.remove("visible");

	document.querySelector("#manual .body").scrollTo(0,0);

	bodyelem.classList.add("visible");
	elem.classList.add("selected");
}

window.addEventListener("load",loadManual);
window.addEventListener("hashchange",loadManual);

window.addEventListener("load", event => {
	document.querySelectorAll(".entry[value]").forEach(e => {
		e.addEventListener("click",openSection);
	});

	document.getElementById("loading").classList.add("hidden");
});

function loadManual(event) {
	console.log(event);
	if(window.location.hash == "")
		window.location.hash = "#intro";
	
	if(window.location.hash == "#changelog") {
		document.getElementById("intro").classList.add("visible");
		document.querySelector(".entry[value='intro']").classList.add("selected");
		return openChangeLog();
	}
	else {
		document.getElementById("manual").classList.remove("hidden");
		document.getElementById("changelog").classList.add("hidden");

		var bodyelem = document.getElementById(window.location.hash.substr(1));

		if(bodyelem === null) {
			bodyelem = document.getElementById("intro");

			if(history.replaceState)
				history.replaceState(null, null, "#intro");
		}

		if(document.querySelector(".entry.selected") !== null)
			document.querySelector(".entry.selected").classList.remove("selected");
		
		if(document.querySelector(".body div.visible") !== null)
			document.querySelector(".body div.visible").classList.remove("visible");

		document.querySelector(".entry[value='" + window.location.hash.substr(1) + "']").classList.add("selected");
		document.querySelector("#manual .body").scrollTo(0,0);

		bodyelem.classList.add("visible");
	}
}
