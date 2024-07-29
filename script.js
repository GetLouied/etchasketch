/********************************* GRID CREATION *************************************/

createGrid(42);

function createGrid(gridSideSize) {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = '';

    const cellSize = gridContainer.clientWidth / gridSideSize;

    for (let i = 0; i < gridSideSize; i++) {
        for (let j = 0; j < gridSideSize; j++) {
            const gridColumn = document.createElement("div");
            gridColumn.classList.add("cell");
            gridColumn.style.width = `${cellSize}px`;
            gridColumn.style.height = `${cellSize}px`;
            gridColumn.dataset.opacity = 1;

            gridContainer.appendChild(gridColumn);
        }
    }

    const cells = Array.from(document.getElementsByClassName("cell"));
    const colorPicker = document.getElementById("grid-color");
    const randomColorCheckbox = document.getElementById("random-color-checkbox");

    cells.forEach(cell => {
        cell.addEventListener("mousedown", (event) => {
            event.preventDefault();

            let color = randomColorCheckbox.checked ? getRandomColor() : colorPicker.value;

            switch (event.button) {

                // Left click to add background color
                case 0: 

                    // Shift + left click to Darken the cell
                    if (event.shiftKey) {

                        applyShading(event);

                        const onMouseOverAddShade = (shadeEvent) => {
                            applyShading(shadeEvent)
                        };

                        cells.forEach(cell => cell.addEventListener("mouseover", onMouseOverAddShade));

                        document.addEventListener("mouseup", () => {
                            cells.forEach(cell => cell.removeEventListener("mouseover", onMouseOverAddShade));
                        }, { once: true });

                        break;

                    } else {
                        applyColor(event, color);

                        const onMouseOverAdd = (overEvent) => {
                            color = randomColorCheckbox.checked ? getRandomColor() : color;
                            applyColor(overEvent, color);
                        };

                        cells.forEach(cell => cell.addEventListener("mouseover", onMouseOverAdd));

                        document.addEventListener("mouseup", () => {
                            cells.forEach(cell => cell.removeEventListener("mouseover", onMouseOverAdd));
                        }, { once: true });

                        break;
                     }

                // Right click to remove background color
                case 2: 
                    // Shift + Right Click to Lighten the cell
                    if (event.shiftKey) {

                        applyLighting(event);

                        const onMouseOverAddLight = (lightEvent) => {
                            applyLighting(lightEvent)
                        };

                        cells.forEach(cell => cell.addEventListener("mouseover", onMouseOverAddLight));

                        document.addEventListener("mouseup", () => {
                            cells.forEach(cell => cell.removeEventListener("mouseover", onMouseOverAddLight));
                        }, { once: true });

                        break;


                    } else {
                        applyColor(event, '');

                    const onMouseOverRemove = (overEvent) => {
                        applyColor(overEvent, '');
                    };

                    cells.forEach(cell => cell.addEventListener("mouseover", onMouseOverRemove));

                    document.addEventListener("mouseup", () => {
                        cells.forEach(cell => cell.removeEventListener("mouseover", onMouseOverRemove));
                    }, { once: true });

                    break;
                    }
                    
            }
        });
    });

    gridContainer.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}



/********************************* BUTTON CONTROLS *************************************/

// Slider Controls
const slider = document.getElementById("slider");
const sliderOutput = document.getElementById("myRange");
sliderOutput.textContent = `${slider.value} x ${slider.value}`;

slider.oninput = function () {
    const sliderValue = slider.value;
    sliderOutput.textContent = `${sliderValue} x ${sliderValue}`;
    createGrid(sliderValue);
};

// Grid Lines Toggle
const gridLinesToggle = document.getElementById("grid-lines-checkbox");
gridLinesToggle.addEventListener("change", function () {
    const cells = Array.from(document.getElementsByClassName("cell"));
    if (this.checked) {
        cells.forEach(cell => {
            cell.style.border = 'none';
        });
    } else {
        cells.forEach(cell => {
            cell.style.border = '1px solid red';
        });
    }
});

// Reset Button
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
    const defaultSize = 42;
    slider.value = defaultSize
    sliderOutput.textContent = `${defaultSize} x ${defaultSize}`;
    createGrid(defaultSize);

    const randomColorCheckBox = document.getElementById("random-color-checkbox");
    const gridLinesCheckbox = document.getElementById("grid-lines-checkbox");
    randomColorCheckBox.checked = false;
    gridLinesCheckbox.checked = false;
    
});



/********************************* MOUSE / KEY CONTROLS *************************************/

// Apply Color to grid
const applyColor = (event, color) => {
    const cell = event.target;
    cell.style.backgroundColor = color;
    cell.style.opacity = 1;
    cell.dataset.opacity = 1;
    cell.dataset.originalColor = color; 
};

// Apply Shading
const applyShading = (event) => {
    const cell = event.target;
    let color = cell.dataset.originalColor || '#FFFFFF'; 
    let [r, g, b] = hexToRgb(color);

    const shadeAmount = 15; 
    r = Math.max(r - shadeAmount, 0);
    g = Math.max(g - shadeAmount, 0);
    b = Math.max(b - shadeAmount, 0);

    cell.style.backgroundColor = rgbToHex(r, g, b);
    cell.dataset.originalColor = rgbToHex(r, g, b); 
};

const applyLighting = (event) => {
    const cell = event.target;
    let color = cell.dataset.originalColor || '#FFFFFF'; 
    let [r, g, b] = hexToRgb(color);

    const lightingAmount = 15;; 
    r = Math.min(r + lightingAmount, 255);
    g = Math.min(g + lightingAmount, 255);
    b = Math.min(b + lightingAmount, 255);

    cell.style.backgroundColor = rgbToHex(r, g, b);
    cell.dataset.originalColor = rgbToHex(r, g, b); 
};


/********************************* HELPER FUNCTIONS *************************************/

// Random Color Generator
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// HEX TO RGB CONVERSION
const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
};

// RGB TO HEX CONVERSION
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};



/********************************* SECRET SPECIAL FUNCTION *************************************/


const grid = document.getElementById("grid-container");
const special = document.getElementById("special");
let trollLaugh = new Audio('./audio/trollLaugh.wav')
special.addEventListener("click", (event) => {
    
    grid.innerHTML = '';

    trollLaugh.play();

    const trollImage = document.createElement("img");
    trollImage.src = "./images/troll.jpg";
    trollImage.style.width = "100%";
    trollImage.style.height = "100%";
    trollImage.style.objectFit = "cover";
    grid.appendChild(trollImage);
});