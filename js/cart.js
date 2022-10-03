/**
 * Récupérer les données du localstorage et de l'API.
 * Gestion du panier vide.
 */
let productsLocalStorage = JSON.parse(localStorage.getItem("product")); 


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
     * Retourner l'id trouvé dans l'API.
     * @param { Object } id 
     * @returns { Object }
     */
    function findProduct(id) { 
      return data.find((product) => product._id === id); 
    }    

    /**
     * Afficher les produits du panier.
     */
    let displayKanap = "";

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
     * Changer la quantité de produits dans le panier et écoute des évènements.
     */
    let changeQuantity = () => {

      /**
       * Calculer le prix total du panier.
       */
      let basketTotalPrice = () => {

        let price = 0;
        for (let j in productsLocalStorage) {
          let findPrice = data.filter((element) => element._id === productsLocalStorage[j].id); 
          let unitPrice = findPrice[0].price; 
          price += unitPrice * productsLocalStorage[j].quantity; 
          
          let totalPrice = document.querySelector('#totalPrice').textContent = price;
        }

      }
      basketTotalPrice();


      /**
       * Afficher le nombre total de produits dans le panier.
       */
      let totalProducts = () => {

        let quantity = 0;
        for (let k in productsLocalStorage) {
          let productsQuantity = quantity +=  productsLocalStorage[k].quantity; 

          let totalQuantity = document.querySelector('#totalQuantity').textContent = productsQuantity;
        }
      }
      totalProducts();


      /**
       * Retourner les attributs d'un produit.
       * @param { HTMLElement } elem 
       * @returns { String }
       */
      let getProductElements = (elem) => {
          return {
            id: elem.getAttribute('canapeId'),
            color: elem.getAttribute('canapeColor'),
          }
      }

      
      let btnQuantity = document.querySelectorAll('.itemQuantity');
    
      btnQuantity.forEach((inputQuantity) => { 
    
        inputQuantity.addEventListener('change', function(event) { 

          let pickedProduct = getProductElements(inputQuantity);
          
          if(pickedProduct.id !== undefined && pickedProduct.color !== undefined) { 
            
            let findItem = productsLocalStorage.find((p) => p.id === pickedProduct.id && p.color === pickedProduct.color);
              
              // Augmenter de +1 //
              let newQuantity = parseInt(inputQuantity.value);

              findItem.quantity = newQuantity;
              console.log(findItem.quantity);
              
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
      * Supprimer un produit du panier.
      */
      let deleteProduct = () => {

        let btnDelete = document.querySelectorAll('.deleteItem'); // 

        btnDelete.forEach((inputDelete) => {

          inputDelete.addEventListener('click', function(event) {

            let pickedItem = getProductElements(inputDelete); 


            // Supprimer le produit cliqué du tableau d'objet productsLocalStorage 
            let newBasket = productsLocalStorage.filter((i) => i.id !== pickedItem.id || i.color !== pickedItem.color);

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

let form = document.querySelector('.cart__order__form');


/**
 * Validation du prénom et écoute de l'évènement.
 */
form.firstName.addEventListener('change', function(){
  validFirstName(this);  
});


/**
 * Définir et tester l'expression régulière.
 * Afficher un message de validation ou d'erreur selon la donnée reçue.
 * @param { HTMLElement } inputFirstName 
 * @returns { Boolean }
 */
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


/**
 * Validation du nom et écoute de l'évènement.
 */
form.lastName.addEventListener('change', function(){
  validLastName(this); 
});

/**
 * Définir et tester l'expression régulière.
 * Afficher un message de validation ou d'erreur selon la donnée reçue.
 * @param { HTMLElement } inputLastName 
 * @returns { Boolean }
 */
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


/**
 * Validation de l'adresse et écoute de l'évènement.
 */
form.address.addEventListener('change', function(){
  validAddress(this); 
});

/**
 * Définir et tester l'expression régulière.
 * Afficher un message de validation ou d'erreur selon la donnée reçue.
 * @param { HTMLElement } inputAddress 
 * @returns { Boolean }
 */
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


/**
 * Validation de la ville et écoute de l'évènement.
 */
form.city.addEventListener('change', function(){
  validCity(this); 
});

/**
 * Définir et tester l'expression régulière.
 * Afficher un message de validation ou d'erreur selon la donnée reçue.
 * @param { HTMLElement } inputCity 
 * @returns { Boolean }
 */
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


/**
 * Validation de l'email et écoute de l'évènement.
 */
form.email.addEventListener('change', function(){
  validEmail(this); 
});

/**
 * Définir et tester l'expression régulière.
 * Afficher un message de validation ou d'erreur selon la donnée reçue.
 * @param { HTMLElement } inputEmail 
 * @returns { Boolean }
 */
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
 * Ecoute de l'évènement et envoi de données au formulaire.
 */
form.order.addEventListener('click', (e) => {
  e.preventDefault();

  if(validFirstName(form.firstName) && validLastName(form.lastName) 
    && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {

    let contact = { 
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value
    }
    let products = []; 

    productsLocalStorage.forEach((p) => {
      products.push(p.id);
    })


   
    let order = {
      contact,
      products
    }
    console.log(order);

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













