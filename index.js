const arr = [1, 4, 7, 2, 9, 8, 11, 0, 6] // "0-5, 8-9, 11"

function range (arr) {
    const sortedArr = [...arr].sort((a, b) => a - b)
    if(!sortedArr.length) {
        return "";
    }
    let result = String(sortedArr[0]);
    
    for (let i = 1; i < sortedArr.length; i++) {
        const previous = sortedArr[i-1];
        const current = sortedArr[i]

        if (current - previous !== 1) {
            result += `-${previous},`
            result += String(current);
        }
    }
    return result;
}

console.log(range(arr));