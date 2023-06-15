function comeOn(){
    const idNode = document.getElementById("orderId");
    idNode.innerHTML = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}
comeOn();