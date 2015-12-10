var dataArray = [];
//draw weekend board
function drawWeekendBoard(weeks, name) {
	var divArray = document.querySelectorAll('.divBox div');
	for (var i = 0; i < divArray.length; i++) {
		if ( i <= weeks) {
			divArray[i].style.opacity = 1;
		}
		if ( i > weeks) {
			divArray[i].style.opacity = 0.2;	
		}
	};
		divArray[weeks].style.backgroundColor = '#7626E0';
		divArray[weeks].title = name;
};
//draw result
function drawResult() {
	var dataHolder = document.getElementById('dataHolder');
	dataHolder.innerHTML = '';
	for (var i = 0; i < dataArray.length; i++) {
		var div = document.createElement('div');
		var birthDate = new Date(dataArray[i].birthDate);
		div.innerText = dataArray[i].name + ' ' + birthDate.toDateString();
		dataHolder.appendChild(div);
	};
};	

//getDate function
function getDate() {

	//name field
	var name = document.getElementById('nameField').value;
	//data box
	var birthDate = document.getElementById('birthDate').value;
	birthDate = Date.parse(birthDate);
	//var currentDate = document.getElementById('currentDate').value;
	//currentDate = Date.parse(currentDate);
	var currentDate = new Date();

	//week eval
	var weeks = Math.floor( ((currentDate - birthDate) / (1000*60*60*24)) /7 );
	//draw weekend board
	drawWeekendBoard(weeks, name);
	//add data to side board
	dataArray.push({name: name, birthDate: birthDate, weeks: weeks});
 	//alert weeks amount
	localStorage.setItem('data', JSON.stringify(dataArray));
	drawResult();
	alert(name + ' U R live ' + weeks + ' weeks for now');
};
var localData = localStorage.getItem('data');
if (localData) {
	dataArray = JSON.parse(localData);
	dataArray.sort(function(a, b) {return a.weeks - b.weeks});
};
//add div elements
var divBox = document.getElementById('divBox');
for (var i = 0; i <= 4679; i++) {
var div = document.createElement('div');
divBox.appendChild(div);
	if (i % 52 == 0 && i != 0) {
		div.className = 'rowEnd';
	};
};
drawResult();
for (var i = 0; i < dataArray.length; i++) {
	drawWeekendBoard(dataArray[i].weeks, dataArray[i].name);
};

function clearData() {
	if (confirm('Now all your data will be lost. Are you shure?')) {
	localStorage.clear();
	var divArray = document.querySelectorAll('.divBox div');
	for (var i = 0; i < divArray.length; i++) {
			divArray[i].style.opacity = 0.2;
			divArray[i].style.backgroundColor = 'rgb(212, 198, 28)';
		};
	dataArray = [];
	drawResult();
	document.getElementById('nameField').value = '';
	document.getElementById('birthDate').value = null;
	};
};
