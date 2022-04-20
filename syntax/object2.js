// var i = if(true){console.log(1)}

// var w = while(true){console.log(1)}

var f = function () {
  console.log(1 + 100);
  console.log(50 + 5);
};

let arr = [f];
arr[0]();

let obj = {
  func: f,
};
obj.func();

let o = {
  v1: "v101",
  v2: "v202",
  f1: function () {
    console.log(this.v1);
  },
  f2: function () {
    console.log(this.v2);
  },
};

o.f1();
o.f2();
