//lab.js
//by Rachel Marison

function parse() {

	var xhr = new XMLHttpRequest();
	xhr.open("get", "data.json", true);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			jsondata = xhr.responseText;
			var parsedObjects = JSON.parse(jsondata);
			var elem = document.getElementById("messages");
			for (var i = 0; i < parsedObjects.length; i++) {
				elem.innerHTML += '<p><span id="content">' + parsedObjects[i]["content"] + '</span>' + ' - <span id="username">' + parsedObjects[i]["username"] + '</span></p>';
			}
		}
	};

}