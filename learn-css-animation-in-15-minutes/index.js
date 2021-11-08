// FIXME: consider http://jsfiddle.net/u7vXT/
// https://stackoverflow.com/questions/7694323/css3-animation-on-hover-force-entire-animation

let child2 = document.getElementById('child-2');
child2.addEventListener("mouseover", function () {
  console.log("Over")
  child2.classList.add('animated')
  // target.setAttribute("style", "background-color:blue;")
});
child2.addEventListener("mouseout", function () {  
  console.log("Out")
  child2.classList.remove('animated')
  // .setAttribute("style", "background-color:green;")
});

// function mOver() {
//   console.log("Over")
//   // child2.classList.add('animated')
//   // target.setAttribute("style", "background-color:blue;")
// }

// function mOut() {  
//   console.log("Out")
//   // .setAttribute("style", "background-color:green;")
// }