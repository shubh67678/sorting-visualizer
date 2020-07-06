function* bubbleSort(arr) {
    var swapped = false;
    console.log("in");

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            //comapre return arr[j]>arr[j+1]

            if (compare(arr, j, j + 1)) {
                swap(arr, j, j + 1);

                swapped = true;
            }
            yield;
        }
    }
    if (swapped == false) {
        return;
    }
}

function* selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (compare(arr, minIdx, j)) {
                minIdx = j;
            }
            yield;
        }

        swap(arr, i, minIdx);
        yield;
    }
}
function* mergeSort(arr) {
    yield* _mergeSort(arr, 0, arr.length - 1);
}

function* _mergeSort(arr, l, r) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    yield* _mergeSort(arr, l, m);
    yield* _mergeSort(arr, m + 1, r);
    yield* _merge(arr, l, m, r);
}

function* _merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    let L = new Array(n1);
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        find_and_compare(L[i].val, R[j].val);
        if (L[i].val < R[j].val) {
            find_and_swap(arr[k].val, L[i].val);
            arr[k] = L[i];
            k++;
            i++;
        }
        //increment after the value given
        else {
            find_and_swap(arr[k].val, R[j].val);

            arr[k] = R[j];
            k++;
            j++;
        }
        yield;
    }

    while (i < n1) {
        find_and_swap(arr[k].val, L[i].val);

        arr[k++] = L[i++];
        yield;
    }

    while (j < n2) {
        find_and_swap(arr[k].val, R[j].val);

        arr[k++] = R[j++];
        yield;
    }
}

function* quickSortLomuto(arr) {
    //tricky to understand
    yield* _quickSortLomuto(arr, 0, arr.length - 1);
}

function* _quickSortLomuto(arr, left, right) {
    if (left >= right) {
        return;
    }
    let partitionGenerator = _partitionLomuto(arr, left, right);

    let result = partitionGenerator.next();
    //we need the pivot so wee run this till we the poviot 
    while (!result.done) {
        result = partitionGenerator.next();
        yield 1;
    }

    let idx = result.value;
    yield* _quickSortLomuto(arr, left, idx - 1);
    yield* _quickSortLomuto(arr, idx + 1, right);
}

function* _partitionLomuto(arr, left, right) {
    let pivot = arr[right].val;
    let i = left - 1;
    for (let j = left; j < right; j++) {
        arr[right].pivot = true;
        if (arr[j].val < pivot) {
            compare(arr, j, right);
            swap(arr, ++i, j);
            yield;
        }
    }
    swap(arr, i + 1, right);
    yield;
    return i + 1;
}

function swap(arr, x, y) {
    //set color and swap
    arr[x].swap = true;
    arr[y].swap = true;

    temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
function compare(arr, x, y) {
    //set color and compare
    arr[x].compare = true;
    arr[y].compare = true;
    return arr[x].val > arr[y].val;
}
function find_and_compare(val1, val2) {
    //find the loc of val in arr and set the color
    index_1 = 0;
    index_2 = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].val == val1) {
            index_1 = i;
        }
        if (arr[i].val == val2) {
            index_2 = i;
        }
    }
    arr[index_1].compare = true;
    arr[index_2].compare = true;
}
function find_and_swap(val1, val2) {
    //find the loc of val in arr and set the color
    index_1 = 0;
    index_2 = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].val == val1) {
            index_1 = i;
        }
        if (arr[i].val == val2) {
            index_2 = i;
        }
    }
    arr[index_1].swap = true;
    arr[index_2].swap = true;
}
