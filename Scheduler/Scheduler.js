var counter = 0;	
var total = 144;     
var a = new Array(total).fill(false);
var b = new Array(total).fill(false);
var c = new Array(total).fill(false);
var k1 =1;
var k2 = 1;

function and(){
for(let i =0;i<144;i++) {
	c[i]=a[i]&&b[i];
   } 	
}
function check(i,count) {
  if(c[i] && count < counter)
	  return check(++i,++count);
  else if(c[i] && count == counter)
      return true;
  else
	  return false;
}
function free_time() {
 for(var i = 0;i<144;i++) {
	 let count =1;
  if(check(i,count))
	  return i;
  }
 return -1;
}
function correct_time(index) {                    // og-> time zone k -> 012 present day past future
    console.log(index);
    let sum1 =0,sum2 = 0;
	let arr = [];
	if(index>=0 && index<48) {
		k1=0;k2 = 0;
		sum1 = index+og3;
		sum2 = index+og4;
		if(sum1>48) {
			sum1 = sum1-48;
			k1 = 1; 
		}
		if(sum2>48) {
			sum2 = sum2-48;
			k2 = 1; 
		}
		
	}
	if(index>=48 && index<96) {
		k1=1;k2 = 1;
		sum1 = (index-48)+og3;
		sum2 = (index-48)+og4;
		if(sum1>48) {
			sum1 = sum1-48;
			k1 = 2; 
		}
		if(sum2>48) {
			sum2 = sum2-48;
			k2 = 2; 
		}
	}
	if(index>=96 && index<144) {
		k1=2;k2 = 2;
		sum1 = (index-96)+og3;
		sum2 = (index-96)+og4;	
	}
	arr[0]=sum1;
    arr[1] = sum2;
    console.log(arr);
    return arr;
    
	//here the value will never be over 48 as thats gmt night so no working hrs
	/*if(i==-1 || i>=144) {
		return*/     		
}
var m=[];
var nday=0;
var r = 1;
var al = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var day = prompt("Enter present day 0 ->Mon 1->Tue 2->Wed .... ",0);
var og1 = prompt("Enter the Candidate time zone ahead of GMT with sign",0); // this can be automated 
var og3 = og1*2; 
var og2 = prompt("Enter the Evaluator time zone ahead of GMT with sign",0); // this can be automated 
var og4 = og2*2; 
var time = prompt("Enter the duration required",1);
counter = time*2;
//console.log("counter"+counter);
console.log("Enter free hrs(as 5:30 as 5.5) in of candidate press 0 to exit");
var i =0;
while(r!=0){   
 r = prompt("Enter:"+(i+1),0);
 r = r*2;
 let at = r-og3+48;
 //console.log("at"+at);
 a[at]=true;
 i++;
 }
r=1;
i =0;
console.log("Enter free hrs(as 5:30 as 5.5) in of recruiter press 0 to exit");
while(r!=0){
 r = prompt("Enter:"+(i+1),0);
 r = r*2;
 let at = r-og4+48;
 //console.log("at"+at);
 b[at]=true;
 i++;
 }
and();
var l = free_time();
console.log(l);
if(l == -1)
console.log("No free time available");
else{
m = correct_time(l);
var m1 = (m[0]/2);
console.log(m1);
var m2 = (m[1]/2);
console.log (m2); 
console.log("Candidate time & day:\t");
if(k1==0){
nday = day-1;
if(nday < 0 )
    nday =6;
}
if(k1==1){
nday = day;
}
if(k1==2){
nday = day+1;
if(nday >6 )
    nday =0;
}
console.log(m1+" "+al[nday]);
console.log("Recruiter time & day:\t");
if(k2==0){
nday = day-1;
if(nday < 0 )
    nday =6;
}
if(k2==1){
nday = day;
}
if(k2==2){
nday = day+1;
if(nday >6 )
    nday =0;
}
console.log(m2+" "+al[nday]);
}	




