//Inputs
const heightInput = document.getElementById("height-input");
const widthInput = document.getElementById("width-input");
const colorInput = document.getElementById("color-input");
//Buttons
const createButton = document.getElementById("create-grid");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");
//Grid
const grid = document.getElementById("grid");
const inputContainer = document.querySelector(".input-container");
const errMessage = document.getElementById("err-message");

let currentColor;

colorInput.addEventListener("input", ()=>{
    currentColor = colorInput.value;
})

const createGrid = ()=> {
    errMessage.innerHTML = "";
    grid.innerHTML = "";
    const height = parseInt(heightInput.value) || 10;
    const width = parseInt(widthInput.value) || 10;

    if (height > 25 || width > 25){
        errMessage.innerHTML = "Altura e largura não podem ser maior que 25";
        return false;
    }

    grid.style.gridTemplateColumns = `repeat(${width},1fr)`;

    for (let i = 0; i < height * width; i++){
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.addEventListener("click", (e)=>{
            e.target.style.color = currentColor;
            if (e.target.innerText == "X"){
                e.target.innerText = "";
            }else{
                e.target.innerText = "X";
            }
        })
        grid.appendChild(tile);
    }
};

const clearGrid = ()=>{
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((element) =>{
        element.innerText = "";
    })
};

saveButton.addEventListener("click", ()=>{
    html2canvas(grid).then((canvas) =>{
        const imageURL = canvas.toDataURL();
        const downloadButton = document.createElement("a");
        downloadButton.setAttribute("href", imageURL);
        downloadButton.setAttribute("download", "pc.png");
        downloadButton.click();
        downloadButton.remove();
    })
});


clearButton.addEventListener("click", clearGrid);
createButton.addEventListener("click", createGrid);
window.addEventListener("load", ()=>{
    errMessage.innerText = "";
    heightInput = 10;
    widthInput = 10;
    currentColor = "#000000";
    colorInput.value = currentColor;
    createGrid();
});
