/**
 * Récupérer et insérer l'id généré par la requete POST dans le DOM
 */
let params = new URL(document.location).searchParams; 
let id = params.get("id"); 

document.querySelector('#orderId').textContent = id;

localStorage.removeItem("product");
