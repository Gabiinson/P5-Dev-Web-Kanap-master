/**Récupération du panier dans le localStorage**/
function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
}
let cart = getCart();
    console.log(cart);
/**Sauvegarder le panier dans le localStorage**/
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
};
/**Requête fetch HTTP pour requêter l'api**/
fetch('http://localhost:3000/api/products') 
    .then((reponse) => reponse.json())
    .then((product) => cartData(product))

/**Déclaration fonction cartData et fonction findProduct**/
let total = 0;
cartData = (product) => {
    if (cart != null){
        function findProduct(id){
            console.log(id)
            return product.find((p) => p._id === id )  /**Dans l'api on veut récupérer l'id pour chaque product panier**/
        }
/**Boucle for in pour les product panier**/
        
    for (let i in cart) {
        let id = cart[i].id
            console.log(id);
        let data = findProduct(id) 
            console.log(data);

/**Créer l'élément article puis injecter l'html**/
 document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
        <div class="cart__item__img">
            <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${cart[i].color}</p>
                    <p>${data.price} €</p>
                </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p> Quantité :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
 </article>`;
 total += data.price * cart[i].quantity;
}
document.getElementById("totalPrice").innerHTML = total
console.log(total);
/**Récupérer l'élément <p>Supprimer<p> dans le Dom**/
let deleteBtn = document.getElementsByClassName("deleteItem"); 
/**fonction de suppression d'article panier**/
function removeProduct() {
    console.log(deleteBtn);
    let cart = getCart()
    console.log(cart);
    for (let i = 0; i < deleteBtn.length; i++) {
     deleteBtn[i].addEventListener("click", (event) => {
        console.log('dsgml');
        event.preventDefault();
        let index = cart.findIndex((p) => p.colors == cart[i].color && p.id == cart[i].id )
        console.log(index);
        cart.splice(index, 1);
        /**Sauvegarder le nouveau panier en conservant la clé de l'ancien**/
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.removeItem('deleteBtn');
        alert("Votre produit à été retiré du panier")
        location.reload();
    })
}
};
removeProduct();
/**Créer un eventlistener pour quantityChange avec change et function en event**/
function quantityChange() {
let itemQuantity = document.querySelectorAll(".itemQuantity");
console.log(itemQuantity);
    for (let i= 0; i < itemQuantity.length; i++) {
        itemQuantity[i].addEventListener("change", function() {

            let quantityNumber = itemQuantity[i].valueAsNumber;
            const resultFind = cart[i]
            resultFind.quantity = quantityNumber;
            cart[i].quantity = resultFind.quantity;
            localStorage.setItem("cart", JSON.stringify(cart))
            location.reload();  
        })
    } 
};
/**Appel de la fonction quantityChange**/
quantityChange();
}};
console.log(totalPrice);

/**Fonction pour changer la quantité dans le panier**/
function changeProductquantity(id, color, newQuantity) {
    getCart(cart);
    if (newQuantity < 0 || newQuantity > 100) {
        alert('la quantité doit être comprise entre 1 et 100');
        location.reload();
    }
    else {
        sameProduct = cart.find(product => product.Id == id && product.Color == color);
        if (sameProduct != undefined) {
            sameProduct.quantity += newQuantity;
            alert('la quantité à bien été modifié');
            window.location.href = "cart.html";
        }
        saveCart(cart);
    }
};

/**Ajouter la quantité totale de produits au panier**/
document.getElementById("totalQuantity").innerHTML= parseInt(totalProductCart());
/**Fonction pour calculer le total d'un article panier**/
function totalProductCart() {
    getCart(cart);
    let numberProduct = 0;
    for (let productCart of cart) {
        numberProduct += parseInt(productCart.quantity);
    }
    return numberProduct;
};

/** DOM **/
 let firstName = document.getElementById("firstName");
 let lastName = document.getElementById("lastName");
 let address = document.getElementById("address");
 let city = document.getElementById("city");
 let email = document.getElementById("email");
 
/**Vérification des données du formulaire**/
/**Valider l'email**/
 let emailValidation = email.addEventListener('input', function() {
     /**Créer la RegExp email**/
     let emailRegExp = /^[a-zA-Z][\w]{1,25}@[\w]{1,25}\.[a-z]{2,10}$/;
     /**Tester la RegExp**/
     let testEmail = emailRegExp.test(email.value);
     let errorMessage = document.getElementById("emailErrorMsg");

     if (testEmail == false) {
         email.style.color = "red";
         errorMessage.innerHTML = "Adresse E-mail non valide" ;
         return emailValidation = false;
     }
     else {
         email.style.color = "green";
         errorMessage.innerHTML = "";
         return emailValidation = true;
     }
 });
/**Valider l'adresse**/
let addressValidation = address.addEventListener('input', function() {
    let addressRegExp = /^[a-zA-Z0-9\s]+$/;
    let testAddress = addressRegExp.test(address.value);
    let errorMessage = document.getElementById('addressErrorMsg');

    if (testAddress == false) {
        address.style.color = "red";
        errorMessage.innerHTML = "Adresse non valide" ;
        return addressValidation = false;
    }
    else {
        address.style.color = "green";
        errorMessage.innerHTML = "";
        return addressValidation = true;
    }
});

/**Fonction pour la validation des infos prénom, nom et ville**/
function validationForm(input) {
    let formRegExp = /^[a-zA-Z-\s]+$/;
    let testFormRegExp = formRegExp.test(input.value);
    let errorMessage =  input.nextElementSibling;
    /**Condition si false color:red si true color:green**/ 
    if (testFormRegExp == false) {
        input.style.color = "red"
        errorMessage.innerHTML = "Caractère non autorisé"
        return false;
    }
    else {
        input.style.color = 'green'
        errorMessage.innerHTML = ""
        return true;
    }
};

/**Valider le prénom**/
 let firstNameValidation;
     firstName.addEventListener('change', function() {    
     firstNameValidation = validationForm(this);
 });
/**Valider le nom**/
 let lastNameValidation;
     lastName.addEventListener('change', function() {   
     lastNameValidation =  validationForm(this);
 });
/**Valider la ville**/
 let cityValidation;
     city.addEventListener('change', function() {    
     cityValidation = validationForm(this);
 });
 
 function orderValidated() { 
    let commander = document.getElementById('order'); 
        commander.addEventListener("click", (event) =>{
/**Créer un tableau depuis le local storage**/      
    let idProduct = [];
    for (let i = 0; i < cart.lenght; i++ ){
        idProduct.push(cart[i].idProduct);
    }
    console.log(idProduct);
/**Enregistrer les données clients**/
    const order = {
        contact : {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,  
        },
        products: idProduct,
    }
    /**Utiliser la méthode POST pour donner des détails à la requête**/
    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
        },
    };
    /**Requête fetch Api de products/order + options**/
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId); /**On renvoie vers la page de confirmation en ajoutant le num de la commande**/
        document.location.href = "confirmation.html";
    })
    .catch((err) => {
        alert ("problème avec fetch:" + err.message);
    })
    console.log(data);
    })
};
orderValidated();