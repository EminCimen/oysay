// Initialize the counters
var firstCandidateVotes = document.getElementById("first-candidate-votes");
var secondCandidateVotes = document.getElementById("second-candidate-votes");
var invalidVotes = document.getElementById("invalid-votes");
var totalVotes = document.getElementById("total-votes");
var ballotBoxId = document.getElementById("ballot-box-id");
var envelopeNumber = document.getElementById("envelope-number");
var signatureNumber = document.getElementById("signature-number");
// Set up the event listeners
document.getElementById("ballot-box-id").addEventListener("focusout", function () {
    localStorage.setItem("ballot-box-id", ballotBoxId.value);
});

ballotBoxId.addEventListener("input", validateNumberFields);
envelopeNumber.addEventListener("input", validateNumberFields);
signatureNumber.addEventListener("input", validateNumberFields);

document.getElementById("first-candidate-votes-plus").addEventListener("click", function () {
    firstCandidateVotes.value++;
    localStorage.setItem("first-candidate-votes", firstCandidateVotes.value);
    updateTotalCounter();
});

document.getElementById("first-candidate-votes-minus").addEventListener("click", function () {
    if (firstCandidateVotes.value > 0) {
        firstCandidateVotes.value--;
        localStorage.setItem("first-candidate-votes", firstCandidateVotes.value);
        updateTotalCounter();
    }
});

document.getElementById("second-candidate-votes-plus").addEventListener("click", function () {
    secondCandidateVotes.value++;
    localStorage.setItem("second-candidate-votes", secondCandidateVotes.value);
    updateTotalCounter();
});

document.getElementById("second-candidate-votes-minus").addEventListener("click", function () {
    if (secondCandidateVotes.value > 0) {
        secondCandidateVotes.value--;
        localStorage.setItem("second-candidate-votes", secondCandidateVotes.value);
        updateTotalCounter();
    }
});

document.getElementById("invalid-votes-plus").addEventListener("click", function () {
    invalidVotes.value++;
    localStorage.setItem("invalid-votes", invalidVotes.value);
    updateTotalCounter();
});

document.getElementById("invalid-votes-minus").addEventListener("click", function () {
    if (invalidVotes.value > 0) {
        invalidVotes.value--;
        localStorage.setItem("invalid-votes", invalidVotes.value);
        updateTotalCounter();
    }
});

// Get the counters from local storage
var firstCandidateVotesLocalStorageValue = localStorage.getItem("first-candidate-votes");
var secondCandidateVotesLocalStorateValue = localStorage.getItem("second-candidate-votes");
var invalidVotesLocalStorageValue = localStorage.getItem("invalid-votes");
var totalVotesLocalStorageValue = localStorage.getItem("total-votes");
var ballotBoxIdLocalStorageValue = localStorage.getItem("ballot-box-id");
var envelopeNumberLocalStorageValue = localStorage.getItem("envelope-number");
var signatureLocalStorageValue = localStorage.getItem("signature-number");

// Set the counters to the values from local storage
if (firstCandidateVotesLocalStorageValue) {
    firstCandidateVotes.value = firstCandidateVotesLocalStorageValue;
}

if (secondCandidateVotesLocalStorateValue) {
    secondCandidateVotes.value = secondCandidateVotesLocalStorateValue;
}

if (invalidVotesLocalStorageValue) {
    invalidVotes.value = invalidVotesLocalStorageValue;
}

if (totalVotesLocalStorageValue) {
    totalVotes.value = totalVotesLocalStorageValue;
}

if (ballotBoxIdLocalStorageValue) {
    ballotBoxId.value = ballotBoxIdLocalStorageValue;
}

if (envelopeNumberLocalStorageValue) {
    envelopeNumber.value = envelopeNumberLocalStorageValue;
}

if (signatureLocalStorageValue) {
    signatureNumber.value = signatureLocalStorageValue;
}

// Function to update the total counter
function updateTotalCounter() {
    var total = parseInt(firstCandidateVotes.value) + parseInt(secondCandidateVotes.value) + parseInt(invalidVotes.value);
    totalVotes.value = total;
    localStorage.setItem("total-votes", total);
}

function showConfirmModal() {
    var modal = document.getElementById('confirm-modal');
    modal.style.display = 'block';
}

function hideConfirmModal() {
    var modal = document.getElementById('confirm-modal');
    modal.style.display = 'none';
}

function confirmAction() {
    hideConfirmModal();
    firstCandidateVotes.value = 0;
    secondCandidateVotes.value = 0;
    invalidVotes.value = 0;
    totalVotes.value = 0;
    ballotBoxId.value = null;
    envelopeNumber.value = null;
    signatureNumber.value = null;
    localStorage.clear();
}

function cancelAction() {
    hideConfirmModal();
}

function showExportModal() {
    var modal = document.getElementById('export-modal');
    modal.style.display = 'block';
}

function hideExportModal() {
    var modal = document.getElementById('export-modal');
    modal.style.display = 'none';
}

function confirmExport() {
    hideExportModal();
    exportAsImage();
}

function cancelExport() {
    hideExportModal();
}

function validateNumberFields() {
    const value = ballotBoxId.value.trim();

    // Check if the value is numeric
    if (!isNaN(value) && value !== "") {
        // Value is numeric, update the input element's value
        ballotBoxId.value = parseInt(value, 10);
    } else {
        // Value is non-numeric, clear the input
        ballotBoxId.value = "";
    }
}

window.onload = () => {
    ballotBoxId.onpaste = e => e.preventDefault();
    envelopeNumber.onpaste = ev => ev.preventDefault();
    signatureNumber.onpaste = sn => sn.preventDefault();
}

function enforceMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}

// Function to export the inputs as an image
function exportAsImage() {

    // Create a canvas element
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions
    canvas.width = 500;
    canvas.height = 300;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the inputs as a table on the canvas
    const tableData = [
        ['Sandık Numarası:', ballotBoxId.value],
        ['Zarf Sayısı:', envelopeNumber.value],
        ['İmza Sayısı:', signatureNumber.value],
        ['Recep Tayyip Erdoğan:', firstCandidateVotes.value],
        ['Kemal Kılıçdaroğlu:', secondCandidateVotes.value],
        ['Geçersiz Oylar:', invalidVotes.value],
        ['Toplam Oylar:', totalVotes.value],
        ];

    let imageName = "Sandik-Oy-Sayim-Sonucu";

    if (ballotBoxId.value == null || ballotBoxId.value === "") {
        tableData.shift();
    } else {
        imageName = ballotBoxId.value + "-Nolu-Sandik-Oy-Sayim-Sonucu";
    }

    const cellWidth = 300;
    const cellHeight = 50;
    const startX = 25;
    const startY = 25;

    context.font = 'bold 20px Arial';

    tableData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = startX + colIndex * cellWidth;
            const y = startY + rowIndex * cellHeight;
            context.fillText(cell, x, y);
        });
    });

    // Export the canvas as an image
    const image = canvas.toDataURL('image/png');

    // Open the image in a new tab for download
    const link = document.createElement('a');
    link.href = image;
    link.download = imageName;
    link.click();
}

function showBallotBoxInfo() {
    var modal = document.getElementById('ballot-box-info-modal');
    modal.style.display = 'block';
}

function hideBallotBoxInfo() {
    var modal = document.getElementById('ballot-box-info-modal');
    modal.style.display = 'none';
}

function confirmBallotBoxInfo() {
    localStorage.setItem("envelope-number", envelopeNumber.value);
    localStorage.setItem("signature-number", signatureNumber.value);
    hideBallotBoxInfo();
}

function closeBallotBoxInfo() {
    document.getElementById("envelope-number").value = localStorage.getItem("envelope-number");
    document.getElementById("signature-number").value = localStorage.getItem("signature-number");
    hideBallotBoxInfo();
}

function deleteBallotBoxInfo() {
    localStorage.setItem("envelope-number", null);
    localStorage.setItem("signature-number", null);
    envelopeNumber.value = null;
    signatureNumber.value = null;
}