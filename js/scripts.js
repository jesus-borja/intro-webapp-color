document.addEventListener("DOMContentLoaded", function () {
    updateColorPreview();

    document
        .getElementById("redRange")
        .addEventListener("input", updateColorFromSliders);
    document
        .getElementById("greenRange")
        .addEventListener("input", updateColorFromSliders);
    document
        .getElementById("blueRange")
        .addEventListener("input", updateColorFromSliders);

    document
        .getElementById("colorPicker")
        .addEventListener("input", updateColorFromColorPicker);

    document
        .getElementById("redInput")
        .addEventListener("input", updateColorFromInputs);
    document
        .getElementById("greenInput")
        .addEventListener("input", updateColorFromInputs);
    document
        .getElementById("blueInput")
        .addEventListener("input", updateColorFromInputs);
});

function updateColorPreview() {
    const redValue = document.getElementById("redRange").value;
    const greenValue = document.getElementById("greenRange").value;
    const blueValue = document.getElementById("blueRange").value;

    const colorPreview = document.getElementById("colorPreview");
    colorPreview.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;

    const hexCode = document.getElementById("hexCode");
    const hexValue = rgbToHex(redValue, greenValue, blueValue);
    hexCode.value = hexValue;
}

function updateColorFromSliders() {
    const redValue = document.getElementById("redRange").value;
    const greenValue = document.getElementById("greenRange").value;
    const blueValue = document.getElementById("blueRange").value;

    document.getElementById("redInput").value = redValue;
    document.getElementById("greenInput").value = greenValue;
    document.getElementById("blueInput").value = blueValue;

    updateColorPreview();
}

function updateColorFromColorPicker() {
    const colorPicker = document.getElementById("colorPicker");
    const hexValue = colorPicker.value;

    updateColorFromHex(hexValue);
}

function updateColorFromInputs() {
    const redValue = parseInt(document.getElementById("redInput").value);
    const greenValue = parseInt(document.getElementById("greenInput").value);
    const blueValue = parseInt(document.getElementById("blueInput").value);

    if (
        isValidRGBValue(redValue) &&
        isValidRGBValue(greenValue) &&
        isValidRGBValue(blueValue)
    ) {
        document.getElementById("redRange").value = redValue;
        document.getElementById("greenRange").value = greenValue;
        document.getElementById("blueRange").value = blueValue;

        updateColorPreview();
    }
}

function isValidRGBValue(value) {
    return !isNaN(value) && value >= 0 && value <= 255;
}

function updateColorFromHex(hexValue) {
    const rgbValues = hexToRgb(hexValue);

    document.getElementById("redRange").value = rgbValues.red;
    document.getElementById("greenRange").value = rgbValues.green;
    document.getElementById("blueRange").value = rgbValues.blue;

    document.getElementById("redInput").value = rgbValues.red;
    document.getElementById("greenInput").value = rgbValues.green;
    document.getElementById("blueInput").value = rgbValues.blue;

    updateColorPreview();
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");

    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return { red, green, blue };
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
