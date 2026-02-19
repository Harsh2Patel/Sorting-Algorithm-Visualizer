let array = [];
let size = 60;      // number of bars
let speed = 20;     // animation speed (lower = faster)

// Generate Random Array
function generateArray() {
    array = [];
    const container = document.getElementById("array-container");
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 350) + 10;
        array.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;

        container.appendChild(bar);
    }
}

// Sleep function for animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Animation
async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            await sleep(speed);

            if (array[j] > array[j + 1]) {
                // Swap values
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update heights visually
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
    }
}

// Start Sorting
async function startSort() {
    const algorithm = document.getElementById("algorithm").value;

    if (algorithm === "bubble") {
        await bubbleSort();
    }
}

// Generate array when page loads
generateArray();








