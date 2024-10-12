let marks:number[]=[2,5,6,2,1,9];
marks.forEach((v,i,a)=>{
    console.log(v);
})

let mark2=marks.map((v,i,a)=>{
    return v*v;
})

console.log("-------------------------------------")
console.log(marks);
console.log(mark2);
let markAprobados=marks.filter(v=>v>0);