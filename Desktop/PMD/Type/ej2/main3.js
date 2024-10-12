var marks = [2, 5, 6, 2, 1, 9];
marks.forEach(function (v, i, a) {
    console.log(v);
});
var mark2 = marks.map(function (v, i, a) {
    return v * v;
});
console.log("-------------------------------------");
console.log(marks);
console.log(mark2);
