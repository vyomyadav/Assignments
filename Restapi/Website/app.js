function setup(){
console.log(running);
createCanvas(400,400),
background(51);
loadJSON('/all',gotData);
}
function gotData(){
  console.log(data);
}