var els = init();

function init()
{
	var elements = {
		townsList: [],
		button: window.document.getElementById("but_validation"),
		inputTown: window.document.getElementById("input_town"),
		divResult: window.document.getElementById("list_towns"),

		disableElements : function () {
			this.button.disabled = true;
			this.inputTown.disabled = true;
			this.inputTown.value = "Chargement...";
		},

		enableElements : function () {
			this.inputTown.disabled = false;
			this.inputTown.value = "";
			this.button.disabled = false;	
		},

		setTowns: function () {
			var xhr = new XMLHttpRequest();
			var obj = this;

			xhr.open("GET", "./Ressources/townsList.txt");
			xhr.addEventListener("readystatechange", function () {
				if ((xhr.readyState === XMLHttpRequest.DONE) && (xhr.status === 200))
				{
					obj.townsList = obj.townsList.concat(xhr.responseText.toLowerCase().split("\n"));
					obj.divResult.innerHTML = obj.townsList.join("<br />");
					obj.enableElements();
				}
			});

			xhr.overrideMimeType("text/plain");
			xhr.send(null);
		},

		init: function () {
			var el = this;

			this.disableElements();
			this.setTowns();
			this.button.addEventListener("click", function () {
				console.log(el.townsList);
				
			});

			this.inputTown.addEventListener("keyup", function (e) {
				var matches = (els.townsList.filter(str => str.includes(String.toLowerCase(els.inputTown.value))));
				var str = matches.join("<br />");;

				if (str === "")
					str = "Aucune ville ne correspond."
				
				els.divResult.innerHTML = str;
				
			});

			return (this);
		}
	}

	return (elements.init());
}
