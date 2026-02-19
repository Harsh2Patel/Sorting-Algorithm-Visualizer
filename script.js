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
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
    }
}

// Merge Sort Animation
async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.getElementsByClassName("bar");
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        bars[k].style.backgroundColor = "red";
        await sleep(speed);

        if (left[i] <= right[j]) {
            array[k] = left[i];
            bars[k].style.height = `${left[i]}px`;
            i++;
        } else {
            array[k] = right[j];
            bars[k].style.height = `${right[j]}px`;
            j++;
        }

        bars[k].style.backgroundColor = "steelblue";
        k++;
    }

    while (i < left.length) {
        bars[k].style.backgroundColor = "red";
        await sleep(speed);
        array[k] = left[i];
        bars[k].style.height = `${left[i]}px`;
        bars[k].style.backgroundColor = "steelblue";
        i++; k++;
    }

    while (j < right.length) {
        bars[k].style.backgroundColor = "red";
        await sleep(speed);
        array[k] = right[j];
        bars[k].style.height = `${right[j]}px`;
        bars[k].style.backgroundColor = "steelblue";
        j++; k++;
    }
}

// Quick Sort Animation
async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.getElementsByClassName("bar");
    let pivot = array[high];
    let i = low - 1;

    bars[high].style.backgroundColor = "orange";

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";
        await sleep(speed);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
        }

        bars[j].style.backgroundColor = "steelblue";
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    bars[high].style.backgroundColor = "steelblue";

    return i + 1;
}

// Start Sorting
async function startSort() {
    const algorithm = document.getElementById("algorithm").value;
    if (algorithm === "bubble") await bubbleSort();
    else if (algorithm === "merge") await mergeSort();
    else if (algorithm === "quick") await quickSort();
}

// Generate array on page load
generateArray();









