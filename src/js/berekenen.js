const spinAmounts = [1805, 2280, 6825, 2880];
for (let index = 0; index < spinAmounts.length; index++) {

    console.log((spinAmounts[index] + spinAmounts[index + 1]) % 360 - 15);   
}
console.log(4005 % 360);