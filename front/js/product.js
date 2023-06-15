/**récupérons les ID de la page product**/
const params = new URLSearchParams(document.location.search);

const id = params.get("id");

let urlProduct = `http://localhost:3000/api/products/${id}`;


/**obtenir les données via une requête fetch**/
    fetch(urlProduct)
        .then((reponse) => reponse.json())
        .then((data) => productData(data))


/**on crée et on injecte la balise img**/
 productData = (data) => {
    let img = document.createElement('img') 
    console.log(img);
    document.querySelector('.item__img').appendChild(img)
    img.setAttribute('src',`${data.imageUrl}`)
    img.setAttribute('alt',`${data.altTxt}`)

/**on injecte le contenu des balises prix titre et description**/
    let name = document.getElementById('title').innerHTML = (`${data.name}`)
        console.log(name);
    let price = document.getElementById('price').innerHTML = (`${data.price}`)
        console.log(price);
    let description = document.getElementById('description').innerHTML = (`${data.description}`)
        console.log(description);

/**créer la boucle et l'élément 'option' pour le choix des couleurs**/
    for (let color of data.colors) {
        let option = document.createElement('option')
        console.log(option);
            option.value = color;
            option.innerHTML = color;
            document.querySelector('#colors').appendChild(option);
    }
};

 let color = document.getElementById("colors");
 let quantity = document.getElementById("quantity");

/**evenement du clic sur le btn ajout au panier**/
 let addBtn = document.querySelector('#addToCart');
     addBtn.addEventListener('click', (event) => {
     event.preventDefault();

/**Si la quantité est à 0**/
        if (quantity.value <= 0){
            alert("Veuillez renseigner une quantité entre 1 et 100")
        }
/**Si aucune couleur n'est sélectionnée**/
        else if (color.value === "") {
            alert("Veuillez sélectionner une couleur")
        }
/**Si la quantité est supérieure à 100**/
        else if (quantity.value > 100) {
            alert("Vous ne pouvez pas commander plus de 100 produits")
        }
/**si choix produit OK on récupère les informations id, color et quantity du produit**/
        else {
            const data = {
                id: id,
                color: color.value,
                quantity: (quantity.value)
            };
            addToCart(data); /**Appel de la fonction pour l'ajout du produit au panier**/
            alert("Votre produit a bien été ajouté au panier")
        }
    });

/** fonction de sauvegarde du panier dans le localstorage**/
 function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
 }

/**récupération du panier dans le localStorage**/
 function getCart() {
    let cart = localStorage.getItem("cart");
        if (cart == null) {
            return [];
        }
        else {
            return JSON.parse(cart);
        }
};

/**Ajout d'un article au panier en vérifiant si le même produit avec le même colori existe déjà**/
 function addToCart(data) {
    let cart = getCart();
    for (let i in cart) {
        const sameProduct = cart[i];
        if (data.id === sameProduct.id && data.color === sameProduct.color) {
            sameProduct.quantity = parseInt(data.quantity) + parseInt(sameProduct.quantity);
/**Sauvegarder les données et retourner les données si la condition est acceptée**/            
            saveCart(cart);
            alert("Produit ajouté au panier")
            return;
        }
    }
    cart.push(data); 
    saveCart(cart);
    return;
};