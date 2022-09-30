// Extraire l'id //
let params = new URL(document.location).searchParams; // - parcourir et afficher les param de la page
// console.log(document.location); // 
let id = params.get("id"); // récupérer la valeur de l'id attribuée à la variable id //
console.log(id); // 

document.querySelector('#orderId').textContent = id;

localStorage.removeItem('produit');
