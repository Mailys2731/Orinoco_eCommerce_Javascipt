
//Lien avec l'API
const getCamera = (id) => {

    return fetch(`http://localhost:3000/api/cameras/${id}`)

        .then(function (httpBodyResponse) {
            if (httpBodyResponse.status === 404) {
                throw new Error;
            }
            return httpBodyResponse.json()
        })

        .then(function (camera) {
            return camera
        })

        //gestion des erreurs
        .catch(function (error) {

            (Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Quelque chose c'est mal passé !",
            }))
            return undefined;
        })
}

//Récupération de l'id
const getId = () => {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get('id');
    console.log(id);

    return id;
}

const id = getId();


//Affichage de la carte produit concernée
const detailCameraProd = async () => {

    //récupération des données relatives à la caméra dont l'id est concerné
    const detailCamera = await getCamera(id);
    console.log(detailCamera);

    //lien avec la page product.html
    const detailPicture = document.getElementById('detailCard__picture');
    const detailDescription = document.getElementById('detailCard__description');
    const detailName = document.getElementById('detailCard__name');
    const detailPrice = document.getElementById('detailCard__price');

    //contenu interractif des balises
    detailPicture.src = detailCamera.imageUrl;
    detailDescription.textContent = detailCamera.description;
    detailName.textContent = detailCamera.name;
    detailPrice.textContent = detailCamera.price / 100 + " euros";

    //choix de l'option de lentille
    detailCamera.lenses.forEach(camera => {
        let option = document.createElement("option");
        document
            .getElementById("choiceLenses")
            .appendChild(option).innerHTML = camera;
    });

}

detailCameraProd()

//Initialisation du panier
let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
    cart = [];
}

// Ajout d'un article au panier
const addToCart = async () => {

    if (cart.includes(id)) {
        alert('Article déjà ajouté !')
        return false;
    }
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Le produit a été ajouté au panier");
    (Swal.fire({
        icon: 'success',
        title: 'Félicitations',
        text: 'Cet article a été ajouté à votre panier !',
    }));
    console.log(localStorage.getItem("cart"));
}


const cutToCart = async () => {

    //localStorage.removeItem("cart");
    cart = cart.filter((productId) => productId !== id)
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Le produit a été retiré du panier");
    (Swal.fire({
        icon: 'success',
        text: 'L"article a été retiré de votre panier',
    }));
    console.log(cart);
 
}


let buy = document.getElementById('addToCart');
buy.addEventListener("click", addToCart);

let cut = document.getElementById('cutToCart');
cut.addEventListener("click", cutToCart);


/*
console.log("Le produit a été retiré du panier");
(Swal.fire({
    icon: 'success',
    text: 'L"article a été retiré de votre panier',
}));
*/