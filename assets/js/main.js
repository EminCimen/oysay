// Initialize the counters
var counter1 = document.getElementById("counter-1");
var counter2 = document.getElementById("counter-2");
var counter3 = document.getElementById("counter-3");
var counterTotal = document.getElementById("counter-total");
var sandikNumarasi = document.getElementById("sandik-numarasi")

// Set up the event listeners
document.getElementById("sandik-numarasi").addEventListener("focusout", function () {
    localStorage.setItem("sandik-numarasi", sandikNumarasi.value);
});


document.getElementById("counter-1-plus").addEventListener("click", function () {
    counter1.value++;
    localStorage.setItem("counter-1", counter1.value);
    updateTotalCounter();
});

document.getElementById("counter-1-minus").addEventListener("click", function () {
    if (counter1.value > 0) {
        counter1.value--;
        localStorage.setItem("counter-1", counter1.value);
        updateTotalCounter();
    }
});

document.getElementById("counter-2-plus").addEventListener("click", function () {
    counter2.value++;
    localStorage.setItem("counter-2", counter2.value);
    updateTotalCounter();
});

document.getElementById("counter-2-minus").addEventListener("click", function () {
    if (counter2.value > 0) {
        counter2.value--;
        localStorage.setItem("counter-2", counter2.value);
        updateTotalCounter();
    }
});

document.getElementById("counter-3-plus").addEventListener("click", function () {
    counter3.value++;
    localStorage.setItem("counter-3", counter3.value);
    updateTotalCounter();
});

document.getElementById("counter-3-minus").addEventListener("click", function () {
    if (counter3.value > 0) {
        counter3.value--;
        localStorage.setItem("counter-3", counter3.value);
        updateTotalCounter();
    }
});

// Get the counters from local storage
var counter1Value = localStorage.getItem("counter-1");
var counter2Value = localStorage.getItem("counter-2");
var counter3Value = localStorage.getItem("counter-3");
var counterTotalValue = localStorage.getItem("total");
var sandikNumarasiValue = localStorage.getItem("sandik-numarasi");

// Set the counters to the values from local storage
if (counter1Value) {
    counter1.value = counter1Value;
}

if (counter2Value) {
    counter2.value = counter2Value;
}

if (counter3Value) {
    counter3.value = counter3Value;
}

if (counterTotalValue) {
    counterTotal.value = counterTotalValue;
}

if (sandikNumarasiValue) {
    sandikNumarasi.value = sandikNumarasiValue;
}

// Function to update the total counter
function updateTotalCounter() {
    var total = parseInt(counter1.value) + parseInt(counter2.value) + parseInt(counter3.value);
    counterTotal.value = total;
    localStorage.setItem("total", total);
}

function showConfirmModal() {
    var modal = document.getElementById('confirmModal');
    modal.style.display = 'block';
}

function hideConfirmModal() {
    var modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
}

function confirmAction() {
    hideConfirmModal();
    counter1.value = 0;
    counter2.value = 0;
    counter3.value = 0;
    counterTotal.value = 0;
    sandikNumarasi.value = null;
    localStorage.clear();
}

function cancelAction() {
    hideConfirmModal();
}