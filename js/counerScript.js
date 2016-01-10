var dataArray = [];

//draw week dots & assign class to side dots
var r = 0;
var g = 255;
var weeksHolder = document.getElementById('weeksHolder');
for (var i = 0; i <= 4679; i++) {
	var weekDot = document.createElement('div');
	weeksHolder.appendChild(weekDot);
	if (i % 52 == 0 && i != 0) {
		weekDot.className = 'rowEnd';
	};
	if (i % Math.floor(4679 / 255) == 0) {
		g--;
		r++;
	};
	weekDot.style.backgroundColor = 'rgb('+r+', '+g+', 0)';
};

//draw weeks board with user information
function drawWeeksBoard(weeks, name) {
	var divArray = document.querySelectorAll('.weeksHolder div');
	for (var i = 0; i < divArray.length; i++) {
		if ( i <= weeks) {
			divArray[i].style.opacity = 1;
		}
		if ( i > weeks) {
			divArray[i].style.opacity = 0.2;	
		}	
	};
		divArray[weeks].style.backgroundColor = '#0B96F5';
		divArray[weeks].title = name;
		divArray[weeks].className = 'userPoint';
};

//drawResult in right-side panel
function drawResult() {
	var dataHolder = document.getElementById('dataHolder');
	dataHolder.innerHTML = '';
	for (var i = 0; i < dataArray.length; i++) {
		var birthDate = new Date(dataArray[i].birthDate);
		var userResult = document.createElement('div');
		dataHolder.appendChild(userResult);
		var namePlace = document.createElement('div');
		var dataPlace = document.createElement('div');
		var procentPlace = document.createElement('div');
		userResult.appendChild(namePlace);
		userResult.appendChild(dataPlace);
		userResult.appendChild(procentPlace);
		userResult.className = 'userResult';
		namePlace.className = 'namePlace dataList';
		dataPlace.className = 'dataPlace dataList';		
		procentPlace.className = 'procentPlace dataList';
		namePlace.innerText = dataArray[i].name;
		dataPlace.innerText = birthDate.toDateString();
		procentPlace.innerText = dataArray[i].procent + ' % of 90 years';
		//div.id = 'myRes';
		//dataHolder.appendChild(userResult);
		//userResult.addEventListener("click", saySome);
		//function saySome() {
		//
		//};
		
	};
};	

//getDate function ("Get date" button)
function getDate() {
	
	//name field
	var name = document.getElementById('nameField').value;
	
	//date box
	var birthDate = document.getElementById('birthDate').value;
	birthDate = Date.parse(birthDate);
	var currentDate = new Date();
	
	//week eval
	var weeks = Math.floor( ((currentDate - birthDate) / (1000*60*60*24)) /7 );
	
	//get procent of life
	var procentOfLife = ((weeks* 100) / 4679).toFixed(1);

	if (birthDate > currentDate) {
		alert('Pleace, enter valid date');
	} else if (birthDate <= -1378166400000) {
		alert('Pleace, enter an older date ');
	};
	if (name == '') {
		alert('You forgot to enter your name, but its ok')
	};

	//draw weekend board
	drawWeeksBoard(weeks, name);
		
	//add data to side board
	dataArray.push({name: name, birthDate: birthDate, weeks: weeks, procent: procentOfLife});
 	
 	//alert weeks amount
	localStorage.setItem('data', JSON.stringify(dataArray));
	drawResult();
	
	//alert(typeof procentOfLife);
	alert(name + ' You are live ' + weeks + ' weeks for now. It is ' + procentOfLife + ' % of 90 years');
};
var localData = localStorage.getItem('data');
if (localData) {
	dataArray = JSON.parse(localData);
	dataArray.sort(function(a, b) {return a.weeks - b.weeks});
};

//Grid
var topGrid = document.getElementById('topGrid');
for (var i = 1; i < 53; i++) {
	var div = document.createElement('div');
	topGrid.appendChild(div);
	div.className = 'weekPoints';
	if (i % 5 == 0 && i != 0) {
		div.style.opacity = 1;
		div.innerHTML = i;
	};
};
var leftSideGrid = document.getElementById('leftSideGrid');
for (var i = 1; i < 91; i++) {
	var div = document.createElement('div');
	leftSideGrid.appendChild(div);
	div.className = 'yearPoints';
	if (i % 5 == 0 && i != 0) {
		div.style.opacity = 1;
		div.innerHTML = i;
	};
};

//redraw after reloadindg page
drawResult();
for (var i = 0; i < dataArray.length; i++) {
	drawWeeksBoard(dataArray[i].weeks, dataArray[i].name);
};

//clear data
function clearData() {
	if (confirm('Now all your data will be lost. Are you shure?')) {
	localStorage.clear();
	var divArray = document.querySelectorAll('.weeksHolder div');
	for (var i = 0; i < divArray.length; i++) {
			divArray[i].style.opacity = 0.2;
			divArray[i].title = '';
		};
	dataArray = [];
	drawResult();
	document.getElementById('nameField').value = '';
	document.getElementById('birthDate').value = null;
	};
};