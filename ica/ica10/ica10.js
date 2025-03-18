function showMessage(){
    let outputElement = document.getElementById('output')
   
    if(outputElement.innerText == 'Inertia is a property of matter'){
        outputElement.innerText = 'BILL BILL BILL'
    }else{
        outputElement.innerText = 'Inertia is a property of matter' 
    }
}