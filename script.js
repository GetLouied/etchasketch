/* 

TO DO: 
    BOTTOM CONTROLS (under slider):
        - Color Picker
        - Random Color Generator
        - Something Special
            - automatically creates pixeled picture for fun
        - Remove Grid
        - Clear Button

    LEFT SIDE BAR: 
        USAGE KEY: 
            - Left Click Paints Selected Color
            - Right Click Clears Square
            - Shift Click Darkens Square (add functionality)

    OTHER: 
        - Add hover tooltips for each button
*/      


createGrid(16);

// Creating the Grid
function createGrid(gridSideSize) {
    let gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = '';

    const cellSize = gridContainer.clientWidth / gridSideSize;

    for (let i = 0; i < gridSideSize; i++) {
        for (let j = 0; j < gridSideSize; j++) {
            const gridColumn = document.createElement("div");
            gridColumn.classList.add("cell");
            gridColumn.style.width = `${cellSize}px`;
            gridColumn.style.height = `${cellSize}px`;

            gridContainer.appendChild(gridColumn);
        }
    }

    // Mouse affects for changing the grid. 
    const cells = Array.from(document.getElementsByClassName("cell"));
    cells.forEach(cell => {
        cell.addEventListener("mousedown", (event) => {
            event.preventDefault();

            switch (event.button) {

                // Left click to add background color
                case 0: 
                    event.target.classList.add("changeColor");

                    const onMouseOverAdd = (overEvent) => {
                        overEvent.target.classList.add("changeColor");
                    };

                    cells.forEach(c => c.addEventListener("mouseover", onMouseOverAdd));

                    document.addEventListener("mouseup", () => {
                        cells.forEach(c => c.removeEventListener("mouseover", onMouseOverAdd));
                    }, { once: true });

                    break;

                // Right click to remove background color
                case 2: 
                    event.target.classList.remove("changeColor");

                    const onMouseOverRemove = (overEvent) => {
                        overEvent.target.classList.remove("changeColor");
                    };

                    cells.forEach(c => c.addEventListener("mouseover", onMouseOverRemove));

                    document.addEventListener("mouseup", () => {
                        cells.forEach(c => c.removeEventListener("mouseover", onMouseOverRemove));
                    }, { once: true });

                    break;
            }
        });
    });

    // Prevent the context menu from appearing on right-click
    gridContainer.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

// Slider Controls
const slider = document.getElementById("slider");
const output = document.getElementById("myRange");
output.textContent = `${slider.value} x ${slider.value}`

slider.oninput = function() {
    const sliderValue = slider.value;
    output.textContent = `${sliderValue} x ${sliderValue}`

    createGrid(sliderValue);
}
