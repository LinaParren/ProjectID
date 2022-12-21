const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const screen3 = document.querySelector("#screen3");
const screen4 = document.querySelector("#screen4");
const screen5 = document.querySelector("#screen5");


const button4 = document.querySelector("#time4");
button4.addEventListener("click", chooseTime4);
const button6 = document.querySelector("#time6");
button6.addEventListener("click", chooseTime6);
const button10 = document.querySelector("#time10");
button10.addEventListener("click", chooseTime10);
const button13 = document.querySelector("#time13");
button13.addEventListener("click", chooseTime13);


function chooseTime4() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("hide");
	screen4.classList.add("hide");
	screen5.classList.add("hide");
}

function chooseTime6() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("hide");
	screen5.classList.add("hide");
}

function chooseTime10() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("show");
	screen5.classList.add("hide");
}

function chooseTime13() {
	screen2.classList.remove("show");
	screen3.classList.remove("show");
	screen4.classList.remove("show");
	screen5.classList.remove("show");
	screen2.classList.add("show");
	screen3.classList.add("show");
	screen4.classList.add("show");
	screen5.classList.add("show");
}
	

