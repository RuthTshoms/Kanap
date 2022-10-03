/**
 * Afficher la description complète du produit via son id.
 */

let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // 
let id = params.get("id"); 
// console.log(id); // 

var dataId;

async function getId() {
  const request = await fetch(`http://localhost:3000/api/products/${id}`, { 
    method: 'GET'
  });
  // console.log(request); 

  if (!request.ok) {
    alert('Un problème est survenu.');
  }
  else { // 
    dataId = await request.json(); 
    //console.log(dataId); 

    // création dynamique de balises et insertions de l'élément (img) de la requete json dans le dom //
    document.querySelector('.item__img').innerHTML = `<img src="${dataId.imageUrl}" alt="Photographie d'un canapé"></img>`;
    document.querySelector('#title').textContent = dataId.name;
    document.querySelector('#price').textContent = dataId.price;
    document.querySelector('#description').textContent = dataId.description;

    let productColors = dataId.colors; 
    // console.log(productColors); 

    for (let colors of productColors) { 
      // console.log(`${couleurs}`);
      document.querySelector("#colors").innerHTML += `<option value=${colors}>${colors}</option>`;
    } 
  }

}
getId();



/**
 * Récupérer les données sélectionnées par l'utilisateur
 * et gestion de l'envoi au panier.
 */

let color = document.querySelector('#colors');
// console.log(color);

let quantity = document.querySelector('#quantity');
// console.log(quantity);

let button = document.querySelector('button');
// console.log(button);

let pickedQuantity;
let pickedColor;


button.addEventListener('click', (e) => {
  e.preventDefault(); 

  pickedColor = color.value;
  // console.log(pickedColor);
  pickedQuantity = parseInt(quantity.value);
  // console.log(pickedQuantity);

  let productOptions = {
    id: id,
    quantity: pickedQuantity,
    color: pickedColor,
  }
  // console.log(productOptions);




  /**
   * Création et gestion du localstorage
   */

  let productsLocalStorage = JSON.parse(localStorage.getItem("produit")); 
  // console.log(productsLocalStorage);


  /**
   * Ajouter d'un produit dans le panier
   */

  let addProductsLocalStorage = () => {
    productsLocalStorage.push(productOptions);
    localStorage.setItem("produit", JSON.stringify(productsLocalStorage)); 
    confirm("Votre commande de" + " " + pickedQuantity + " " + dataId.name + " " + pickedColor + " vient d'être ajoutée au panier. Pour consulter votre panier, cliquer sur OK");
    console.log(productsLocalStorage); 
  }

  /**
   * Empêcher l'ajout de produits ne respectants pas les conditons de couleur et de quantité
   * Augmenter ou diminuer la quantité d'un produit déjà présent dans le panier.
   */

  if (pickedQuantity >= 1 && pickedQuantity <= 100 && pickedQuantity && pickedColor !== '') {


    if (productsLocalStorage) {
    let findProduct = productsLocalStorage.find((p) => p.id === productOptions.id && p.color === pickedColor);

   
    if (findProduct) {
      findProduct.quantity += productOptions.quantity;
      // Empêcher la possibilité d'ajouter une quantité de produit supp à 100 en plusieurs clic //
      if (findProduct.quantity <= 100) { 
      localStorage.setItem("produit", JSON.stringify(productsLocalStorage));
      confirm("Votre commande de" + " " + pickedQuantity + " " + dataId.name + " " + pickedColor + " vient d'être ajoutée au panier. Pour consulter votre panier, cliquer sur OK");
      }       
    } else {
      addProductsLocalStorage(); 
      // console.log(productsLocalStorage);
    }
  }
  else {
    productsLocalStorage = []; 
    addProductsLocalStorage();
  }
} else {
alert('Veuillez choisir une couleur et/ou une quantité comprise entre 1 et 100.');
}

});

