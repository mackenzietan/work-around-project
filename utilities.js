export const formatNumber = number => {
    let numString = String(Math.floor(number)); //convert number to string, round to nearest whole dollar
    for (let i = numString.length - 3; i > 0; i -= 3) { //for every interval of three from the end, so long as the interval is greater than 0
        numString = numString.slice(0,i) + ',' + numString.slice(i); //slice at specified interval and insert ','
    return numString;
    }
};