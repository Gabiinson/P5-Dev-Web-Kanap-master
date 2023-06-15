/* Requête HTTP objet FETCH pour l'api */
fetch('http://localhost:3000/api/products')
.then((reponse) => reponse.json())
.then((data) => displayProduct(data))

/* je crée une boucle pour afficher les produits */
 displayProduct = (data) => {
 for (let i = 0; i < data.length; i++) {
  console.log(data);
   document.querySelector('#items').innerHTML += `
     <a href = "./product.html?id=${data[i]._id}">
       <article>
            <img src="${data[i].imageUrl}" alt="${data[i].altTxt}, ${data[i].name}"/>
            <h3 class = "productName">${data[i].name}</h3>
            <p class = "productDescription">${data[i].description}</p>
       </article>
     `;
  }
}

