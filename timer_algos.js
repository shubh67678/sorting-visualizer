function bubbleSort_t(arr) {
    var swapped = false;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            //comapre return arr[j]>arr[j+1]

            if (compare(arr, j, j + 1)) {
                swap(arr, j, j + 1);

                swapped = true;
            }
        }
    }
    if (swapped == false) {
        return;
    }
}

function selectionSort_t(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (compare(arr, minIdx, j)) {
                minIdx = j;
            }
        }

        swap(arr, i, minIdx);
    }
}
function quickSortLomuto_t(arr) {
    return _quickSortLomuto(arr, 0, arr.length - 1);
}

function _quickSortLomuto(arr, left, right) {
    if (left >= right) {
        return;
    }
    let partitionGenerator = _partitionLomuto(arr, left, right);

    let result = partitionGenerator.next();

    let idx = result.value;
    return _quickSortLomuto(arr, left, idx - 1);
    return _quickSortLomuto(arr, idx + 1, right);
}

function _partitionLomuto(arr, left, right) {
    let pivot = arr[right].val;
    let i = left - 1;
    for (let j = left; j < right; j++) {
        arr[right].pivot = true;
        if (arr[j].val < pivot) {
            compare(arr, j, right);
            swap(arr, ++i, j);
        }
    }
    swap(arr, i + 1, right);
    return i + 1;
}

// Merge Sort Implentation (Recursion)
function mergeSort_t(unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);

    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
    let resultArray = [],
        leftIndex = 0,
        rightIndex = 0;

    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].val < right[rightIndex].val) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array cursor
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array cursor
        }
    }

    // We need to concat here because there will be one element remaining
    // from either left OR the right
    // return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    if (leftIndex < left.length) {
        resultArray.concat(left.slice(leftIndex));
    } else {
        if (rightIndex < right.length) {
            resultArray.concat(right.slice(rightIndex));
        }
    }
    return resultArray;
}
