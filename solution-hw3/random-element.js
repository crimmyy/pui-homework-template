console.log("hello ddd");
console.log(1=="1");
console.log(1==="1");

let x = typeof(1);
console.log(x);

for (let i = 0; i < 10; i++) {
    console.log(i);
}

function foo(x) {
    console.log("b");
    let y;
    for (let i=0; i<10; i++) {
        console.log(i)
        y = i;
    }
    return y;
}

foo(8);
console.log(foo(8));

let aidan = {
    height: "5'4",
    weight: 130,
    cashflow: false,

    birth: function() {
        return "seattle"
    },

    newWeight: function(currWeight) {
        aidan.weight = currWeight
        return aidan.weight
    }
}


console.log(aidan.height);
console.log(aidan.birth);
console.log(aidan.newWeight(500));
console.log(aidan.newWeight("mee"))