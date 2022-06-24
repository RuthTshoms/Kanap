const url = 'http://localhost:3000/api/products'; 

async function recupererCanape() {
  const requete = await fetch(url, { //  
    method: 'GET'
  });

  if(!requete.ok) {
    alert('Un problème est survenu.');
  }
  else {
    let donnees = await requete.json();
    console.log(donnees); // vérifier que les données demandées nous soient bien retournées (voir dans la console du navigateur) //
    for(let i = 0; i > 0; i++) { // parcourir les objects pour avoir toutes les infos, les détails afin de les afficher //
      console.log(donnees[0]);
    }
    
    document.querySelector('img').innerHTML = ; // js va parcourir le dom pour recup l'img  // 
    // document.querySelector('.h3');
    // document.querySelector('.p');

    console.log('img');
  }
}

recupererCanape();

// document.querySelector('img').textContent = donnees.Canape.last;