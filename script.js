/* 

- Hover effect so that grid divs change color when your mass passes over
- Add a button for user input on amount of squares per side
- Once grid size is chosen, original grid should be replaced with new size

*/

createGrid();

function createGrid () {
    let mainContainer = document.getElementById("main-container");
    const gridSideSize = 16;

    for (let i = 0; i < gridSideSize; i++) {
        let gridRow = document.createElement("div");
        gridRow.classList.add("box");

        for (let j = 0; j < gridSideSize; j++) {
            let gridColumn = document.createElement("div");
            gridColumn.classList.add("cell");

            gridRow.appendChild(gridColumn);
        }

        mainContainer.appendChild(gridRow);
    }
}