/**
 * récupération des données
 */

// RECUPERATION DES ELEMENTS DU LOCALSTORAGE //
let productsLocalStorage = JSON.parse(localStorage.getItem("product")); // passer de string à objet
//console.log(productsLocalStorage);

// RECUPERATION DES DONNEES DE L'API (CELLES QU'ON A PAS DANS LE LS) ET INSERTION DES ELEMENTS DANS LE DOM //
const url = 'http://localhost:3000/api/products'

async function getApiData() {  
  const request = await fetch(url, { 
    method: 'GET'
  });

  if (!request.ok) {
    alert('Un problème est survenu.');
  } 
  else if (productsLocalStorage === null) {
    let basketItems = document.querySelector('#cart__items');
    basketItems.innerHTML = `Votre panier est vide`;
  }
  else {
    let data = await request.json();
    
    /**
     * 
     * @param {*} id 
     * @returns 
     */
    // Fonction chargée de trouver un id //
    function findProduct(id) { 
      return data.find((product) => product._id === id); // le "return sera inséré directement dans le dom avec ciblage de l'élément //
    }    

    /**
     * affichage du panier 
     */
    let displayKanap = "";

    // Intérer dans les objets du localstorage et afficher l'élément souhaité lorsqu'un id équivalent à celui dans le localstorage sera trouvé //
    for(let i in productsLocalStorage) {
      let apiData = findProduct(productsLocalStorage[i].id);
      displayKanap += `
     <article class="cart__item" data-id="${productsLocalStorage[i].id}" data-color="${productsLocalStorage[i].color}">
      <div class="cart__item__img">
       <img src="${apiData.imageUrl}" alt="Photographie d'un canapé">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__description">
        <h2>${apiData.name}</h2>
        <p>${productsLocalStorage[i].color}</p>
        <p>${apiData.price}€</p>
       </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${productsLocalStorage[i].id}" canapeColor="${productsLocalStorage[i].color}" value="${productsLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" canapeId="${productsLocalStorage[i].id}" canapeColor="${productsLocalStorage[i].color}">Supprimer</p>
         </div>
       </div>
     </div></article>
     ` 
    }
    cart__items.innerHTML = displayKanap; 

 
    /**
     * 
     * @param {*} displayBasket 
     */
    // Fonction chargée de modifier la quantité dans le panier // 
    let changeQuantity = async (displayBasket) => {
      await displayBasket;

      /**
       * 
       */
      // Fonction chargée de calculer le prix total du panier //
      let basketTotalPrice = () => {

        // On récupère le prix des produits présent dans le panier grâce à l'id et on additionne les résultat à chaque tour de boucle //
        let price = 0;
        for (let j in productsLocalStorage) {
          let findPrice = data.filter((element) => element._id === productsLocalStorage[j].id); 
          let unitPrice = findPrice[0].price; 
          price += unitPrice * productsLocalStorage[j].quantity; 

          //console.log(unitPrice); // prix contenus dans le panier 
          //(findPrice[0].price); prix contenus dans le panier 
          //console.log(productsLocalStorage[j].quantity); // quantité des produits contenues dans le panier 
          //console.log(totalPrice); // prix total du panier
          
          let totalPrice = document.querySelector('#totalPrice').textContent = price;
        }

      }
      basketTotalPrice();

      /**
       * 
       */
      // Fonction chargée d'afficher la quantité totale de produits // (à l'affichage et au fur et à mesure qu'on + ou - la qt)
      let totalProducts = () => {

        let quantity = 0;
        for (let k in productsLocalStorage) {
          let productsQuantity = quantity +=  productsLocalStorage[k].quantity; // on cumule la quantité de chaque produit à chaque tour de boucle 
          //console.log(productsQuantity); // quantité totale de produits

          let totalQuantity = document.querySelector('#totalQuantity').textContent = productsQuantity;
          //console.log(totalQuantity);
        }
      }
      totalProducts();


      /**
       * 
       * @param {*} elem 
       * @returns 
       */
      // Fonction chargée de récupérer les attributs  pour cibler un produit //
      let getProductElements = (elem) => {
          return {
            id: elem.getAttribute('canapeId'),
            color: elem.getAttribute('canapeColor'),
          }
      }

      
      let btnQuantity = document.querySelectorAll('.itemQuantity');
    
      btnQuantity.forEach((inputQuantity) => { // pour chaque input du panier (variable courante)
    
        inputQuantity.addEventListener('change', function(event) { // on écoute chaque changement différent 
          //console.log(event);
          console.log(inputQuantity); // affichage de l'input avec son id, sa couleur et sa value = change du btn
          let pickedProduct = getProductElements(inputQuantity);
          console.log(pickedProduct.id); // on récupère l'id cliqué
          console.log(pickedProduct.color); // on récupère la couleur cliquée



          // Si le produit dont l'état change à un id et une couleur définit // 
          if(pickedProduct.id !== undefined && pickedProduct.color !== undefined) { 
            
            let findItem = productsLocalStorage.find((p) => p.id === pickedProduct.id && p.color === pickedProduct.color);
            //console.log(findItem.quantity); // definit l'article pour lequel ajouter la nouvelle valeur
              
              // Augmenter de 1 //
              let newQuantity = parseInt(inputQuantity.value);
              //console.log(newQuantity); // affiche la nouvelle quantité

              // Ajouter la nouvelle valeur à la valeur de l'article trouvé //
              findItem.quantity = newQuantity;
              console.log(findItem.quantity);
              
              // Ajouter la nouvelle valeur au localstorage 
              localStorage.setItem("product", JSON.stringify(productsLocalStorage));             
              //console.log(productsLocalStorage);

              // Ajouter la valeur au dom en instantané //
              inputQuantity.setAttribute('value', findItem.quantity);

              basketTotalPrice();
              totalProducts();
             
            }

        })

      });       

       /**
        * 
        */
      // Fonction chargée de supprimer un produit //
      let deleteProduct = () => {

        let btnDelete = document.querySelectorAll('.deleteItem'); // 
        //console.log(btnDelete);

        btnDelete.forEach((inputDelete) => {
          //console.log(inputDelete); // NodeList boutons supprimer 

          inputDelete.addEventListener('click', function(event) {
            console.log(inputDelete); // l'article à supprimer (juste visuel)

            let pickedItem = getProductElements(inputDelete); 
            //console.log(pickedItem); // l'article à supprimer 


            // Supprimer le produit cliqué du tableau d'objet productsLocalStorage 
            let newBasket = productsLocalStorage.filter((i) => i.id !== pickedItem.id || i.color !== pickedItem.color);
            //console.log(newBasket); // retourne un nouveau tableau des produits à conserver 

            // Envoyer le nouveau panier (tableau) au localstorage
            localStorage.setItem("product", JSON.stringify(newBasket));

          })
    
        });
  
      }
      deleteProduct();
    
    }
    changeQuantity();

  }

}
getApiData();





/**
 * Gestion du formulaire de contact
 */

// Sélection des éléments du DOM 
let form = document.querySelector('.cart__order__form');

// console.log(form.firstName);
// console.log(form.lastName);
// console.log(form.address);
// console.log(form.city);
// console.log(form.email);

console.log(form.order); // = btnCommander 

/**
 * Validation du Prénom ...
 */
// Ecouter la modification de l'input 
form.firstName.addEventListener('change', function(){
  validFirstName(this); // UNDENIED this = form.firstName (l'input en question, ce que l'user est entrain de saisir)
  //console.log(form.firstName.value); // nous affiche la valeur de l'input (le prenom renseigné)
  //return this.value; // même chose qu'au dessus 
});


/**
 * 
 * @param {*} inputFirstName 
 * @returns 
 */
// Fonction chargée de définir l'expression régulière et de la tester 
let validFirstName = (inputFirstName) => {
  let firstNameRegEx = new RegExp('^[a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+([-|\sa-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+)$');

  let firstNameTest = firstNameRegEx.test(inputFirstName.value);
  console.log(firstNameTest);
  let errorMsg = document.querySelector('#firstNameErrorMsg');

  if(!firstNameTest) {
    errorMsg.innerHTML = 'Veuillez saisir un prénom valide.';
    return false;
  }
  else {
    errorMsg.innerHTML = `<p style= 'color:rgba(65, 238, 126, 0.8)'>Prénom valide.</p>`;
    return true;
  }
}


// -------- ***** VALIDATION NOM ***** ------- //

form.lastName.addEventListener('change', function(){
  validLastName(this); 
});

let validLastName = (inputLastName) => {
  let lastNameRegEx = new RegExp('^[a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+([-|\sa-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+)$');

  let lastNameTest = lastNameRegEx.test(inputLastName.value);
  console.log(lastNameTest);
  let errorMsg = document.querySelector('#lastNameErrorMsg');

  if(!lastNameTest) {
    errorMsg.innerHTML = 'Veuillez saisir un nom valide.';
    return false;
  }
  else {
    errorMsg.innerHTML = `<p style= 'color:rgba(65, 238, 126, 0.8)'>Nom valide.</p>`;
    return true;
  }
}


// -------- ***** VALIDATION ADRESSE ***** ------- //

form.address.addEventListener('change', function(){
  validAddress(this); 
});

let validAddress = (inputAddress) => {
  let adressRegEx = 
  /^[0-9]{1,4}\s(rue|avenue|boulevard|impasse|chemin|place|voix)(\s[a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+)+$/;

  let addressTest = adressRegEx.test(inputAddress.value);
  console.log(addressTest);
  let errorMsg = document.querySelector('#addressErrorMsg');

  if(!addressTest) {
    errorMsg.innerHTML = 'Veuillez saisir une adresse valide.';
    return false;
  }
  else {
    errorMsg.innerHTML = `<p style= 'color:rgba(65, 238, 126, 0.8)'>Adresse valide.</p>`;
    return true;
  }
}


// -------- ***** VALIDATION VILLE ***** ------- //

form.city.addEventListener('change', function(){
  validCity(this); 
});

let validCity = (inputCity) => {
  let cityRegEx = 
  /^[a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+([\sa-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+|[-a-zA-ZÀÂÄÇÉÈÊËÎÏÔÖÆŒäâéèêëîïôöûüæœ]+){1,}$/;


  let cityTest = cityRegEx.test(inputCity.value);
  console.log(cityTest);
  let errorMsg = document.querySelector('#cityErrorMsg');

  if(!cityTest) {
    errorMsg.innerHTML = 'Veuillez saisir un nom de ville valide.';
    return false;
  }
  else {
    errorMsg.innerHTML = `<p style= 'color:rgba(65, 238, 126, 0.8)'>Nom de ville valide.</p>`;
    return true;
  }
}


// -------- ***** VALIDATION EMAIL ***** ------- //

form.email.addEventListener('change', function(){
  validEmail(this); 
});

let validEmail = (inputEmail) => {
  let emailRegEx = /[a-zA-Z]+(\.[a-zA-Z]+|-[a-zA-Z]+|_[a-zA-Z]+|[a-zA-Z]+)@[a-zA-Z]+\.[a-zA-Z]+/


  let emailTest = emailRegEx.test(inputEmail.value);
  console.log(emailTest);
  let errorMsg = document.querySelector('#emailErrorMsg');

  if(!emailTest) {
    errorMsg.innerHTML = 'Veuillez saisir une adresse mail valide.';
    return false;
  }
  else {
    errorMsg.innerHTML = `<p style= 'color:rgba(65, 238, 126, 0.8)'>Adresse mail valide.</p>`;
    return true;
  }
}

/**
 * 
 */
// Ecoute du click sur le bouton et envoi des données au serveur //
form.order.addEventListener('click', (e) => {
  e.preventDefault();

  if(validFirstName(form.firstName) && validLastName(form.lastName) 
    && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {

    // Création d'un objet avec les infos du formulaire //
    let contact = { 
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value
    }
    let products = []; // tableau dans lequel les id du panier seront ajouté
    // puis push sur "products" p => p._id

    // Ressortir les id du localstorage et les ajouter au tableau "products"
    productsLocalStorage.forEach((p) => {
      products.push(p.id);
    })

    console.log(products);
    //console.log(contact);  


    /**
     * 
     */
    // Création d'un objet avec les données du formulaire (contact) et la commande client //
    let order = {
      contact,
      products
    }
    console.log(order);

    // requete POST //
    const request = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data.orderId);
      window.location.href = `confirmation.html?id=${data.orderId}`;
    })
      
    console.log(request);

  }

});













