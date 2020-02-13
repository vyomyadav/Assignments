document.getElementById("category").addEventListener("change",(event)=>{
    if(event.path[0].value==="Travel")
        document.getElementById("Travel").hidden=false
    else
        document.getElementById("Travel").hidden=true
    if(event.path[0].value==="Others")
        document.getElementById("Others").hidden=false
    else
        document.getElementById("Others").hidden=true
    if(event.path[0].value==="Stay")
        document.getElementById("Stay").hidden=false
    else
        document.getElementById("Stay").hidden=true    
    if(event.path[0].value==="Food")
        document.getElementById("Food").hidden=false
    else
        document.getElementById("Food").hidden=true    
})
function add_fields() {
   
    var d = document.getElementById("content");
   
    d.innerHTML += "<label for='invoice' id='invoice'>Bills & Invoice: </label><input type='file' id='invoice' name='invoice'><br><label for='amount' id='amount'>Amount:</label> <input type='number' id='amount' name='amount'><br><label for='billdate' id='billdate'>BillDate:</label><input type='date' id='billdate' name='billdate'><br>";
    document.getElementById("content").hidden=false 
}
 function clearBox() { 
    var div = document.getElementById("content"); 
      
    while(div.firstChild) { 
        div.removeChild(div.firstChild); 
    } 
}
 