function drawGrid(squareNum) {
    const gridContainer = document.querySelector("#grid-container");
    gridContainer.replaceChildren();
    for (let i = 0; i < squareNum; i++) {
        let row = document.createElement("div");
        row.classList.add(`row`);
        for (let j = 0; j < squareNum; j++) {
            let column = document.createElement("div");
            column.classList.add(`column`);
            row.appendChild(column);
        };
        gridContainer.appendChild(row);
    };
};

function setDimension(squareNum, grid) {
    const canvas = document.querySelector("#grid-container");
    const canvasWidth = window.getComputedStyle(canvas).width.slice(0, -2);
    const newDimension = Math.floor(canvasWidth / squareNum);
    for (const element of grid) {
        element.style.width = `${newDimension}px`;
        element.style.height = `${newDimension}px`;
    };
};

function addColorOnHover(grid) {
    for (const element of grid) {
        element.addEventListener("mouseover", (e) => {
            if (element.style.backgroundColor != '') {
                if (element.style.opacity < 1) {
                    element.style.opacity = (+element.style.opacity) + 0.05;
                };
            } else {
                element.style.opacity = 0.5;
            };
            if (element.style.opacity <= 1) element.style.backgroundColor = `${colorRandomizer()}`;
        })
    }
}

function colorRandomizer() {
    let result = '';
    const hexValue = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexValue.length);
        const randomValue = hexValue[randomIndex];
        result += randomValue;
    }
    return '#' + result;
}

function gridInit(squareNum = '16') {
    drawGrid(squareNum);
    const grid = [...document.querySelectorAll("#grid-container > .row > .column")];
    setDimension(squareNum, grid);
    addColorOnHover(grid);
}

function handleRedraw() {
    let squareNum;
    do {
        squareNum = +prompt("What number of squares you want per side?");
        if (Number.isInteger(squareNum) && (0 < squareNum && squareNum <= 100)) break;
        alert("Please enter an integer up to 100");
    } while (true);
    gridInit(squareNum);
};

function buttonInit() {
    const redrawButton = document.querySelector("#redraw-button");
    redrawButton.addEventListener("click", (e) => handleRedraw());
}

gridInit();
buttonInit();