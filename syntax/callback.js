// function a() {
//   console.log("ABC");
// }

let a = function () {
  console.log("ABC");
};

function slowFunc(callback) {
  callback();
}

slowFunc(a);
