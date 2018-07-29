
/* var latest;
for (i = 1; i < 100; i++) {
    console.log(i);
    if (i % 10 == 0) {
        console.log("\n");
        if (i == 10) {
            latest = 99;
        }
        for (k = latest; latest > 1; k--) {
            console.log(k)
            if (k % 10 == 0) {
                console.log("\n");
                latest = (latest - 10);
                break;
            }
        }
    }
}
 */


var demoString = "CBA";

function findFirstRucurringChar(testString) {
    var word;
    for (var i = 0; i < testString.length; i++) {
        var count = 0;
        for (var j = 0; j < testString.length; j++) {
            if (testString[i] === testString[j]) {
                word = testString[j];
                count++;
            }
        }
        if (count === 2) {
            console.log(word);
            break;
        }
        else {
            console.log("nothing is recurring");
            break;
        }
    }
}


findFirstRucurringChar(demoString);



