// ------------------------------------------------ Partie Formulaire SIGNIN -----------------------------------------------------------
// let email = document.getElementById("email");
// let password = document.getElementById("password");

let selectButtonSubmit = document.getElementById("buttonEvent");
selectButtonSubmit.addEventListener("click", function (e) {
  e.preventDefault;



  // Création de l'objet command, qui doit être déclaré dans l'eventListener
  const userInfos = {
    email: email.value,
    password: password.value,
  }


  const options = {
    method: "POST",
    body: JSON.stringify(userInfos),
    headers: { "Content-Type": "application/json" },
  };


  function fetchSignin() {

    fetch("http://localhost:3001/signin", options)
      .then(response => response.json())
      .then((infosCommande) => {
        console.log(infosCommande);

        // Regroupement des données pour les envoyer sur la page suivante
        // Je dois regrouper l'order id et le prix total dans un objet pour le mettre dans le local storage. Je pourrai ensuite le récupérer à la page suivante
        let infosSignin = {
          userId: infosCommande.userId,
          token: infosCommande.token
        }
        console.log(infosSignin);


        // Création de la variable qu'on va utiliser pour rentrer nos données dans le local storage
        let commandeLocalStorage = [];
        commandeLocalStorage.push(infosSignin);
        localStorage.setItem("commandSignin", JSON.stringify(commandeLocalStorage));
        

      })
  }
  fetchSignin();


});
let cat = JSON.parse(localStorage.getItem('commandSignin'));
console.log(cat[0].token)