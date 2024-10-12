// creons une classe Produit pour stocker les propriétés pour l'id, le nom et le prix du produit.
class Produit {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
    }
}

// Creons uns classe shoppingCartItem pour stocker les propriétés pour le produit et sa quantité.
class ShoppingCartItem {
    constructor(produit, quantite = 1) {
        this.produit = produit;
        this.quantite = quantite;
    }
    // ajoutons une méthode pour calculer le prix total de l'élément.
    calculerPrixTotal() {
        return this.produit.prix * this.quantite;
    }
}

// creaons un panier pour les gerer les methode du panier 
class panier {
    constructor() {
        this.items = [];
    }
    //methode pour ajouter des produits au panier 
    ajoutProduit(produit, quantite = 1) {
        const itemEx = this.items.find(item => item.produit.id === produit.id);
        if (itemEx) {
            itemEx.quantite += quantite;
        } else {
            const newItem = new ShoppingCartItem(produit, quantite);
            this.items.push(newItem);
        }
    }
    // methode pour supprimer un produit 
    supprimerProduit(idProduit) {
        this.items = this.items.filter(item => item.produit.id !== idProduit);
    }
    // Total
    Total() {
        return this.items.reduce((total, item) => total + item.calculerPrixTotal(), 0);
    }
    // afficher les elements du panier 
    afficherPanier() {
        if (this.items.length === 0) {
            console.log("Le panier est vide.");
        } else {
            this.items.forEach(item => {
                console.log(`${item.produit.nom} - ${item.quantite} * ${item.produit.prix} XOF = ${item.calculerPrixTotal()} XOF`);

            });
            console.log(`Total du panier :${this.Total()} XOF`);


        }
    }

}

// Creons les produits 

const produit1 = new Produit(1, "Nike SB", 25000);
const produit2 = new Produit(2, "Air max TN Plus", 30000);
const produit3 = new Produit(3, "Air Max TN", 25000);

// Creons un panier et ajoutons des produits
const monPanier = new panier();
monPanier.ajoutProduit(produit1, 2);
monPanier.ajoutProduit(produit2, 1);
monPanier.ajoutProduit(produit3, 3);

// Affichons le panier
monPanier.afficherPanier();

// supprimer un element du panier 
monPanier.supprimerProduit();

// afficher panier apres suppression 
monPanier.afficherPanier();

document.querySelectorAll('.article').forEach(article => {
    const id = article.getAttribute('data-id');
    const produit = [produit1, produit2, produit3].find(produit => produit.id === parseInt(id));

    article.querySelector('.btn-plus').addEventListener('click', () => {
        monPanier.ajoutProduit(produit);
        updateArticle(article, produit);
        updateTotalPrice();
    });

    article.querySelector('.btn-minus').addEventListener('click', () => {
        monPanier.ajoutProduit(produit, -1);
        updateArticle(article, produit);
        updateTotalPrice();
    });

    article.querySelector('.btn-delete').addEventListener('click', () => {
        monPanier.supprimerProduit(produit.id);
        updateArticle(article, produit, true);
        updateTotalPrice();
    });

    article.querySelector('.btn-like').addEventListener('click', () => {
        article.querySelector('.btn-like').classList.toggle('is-active');
    });
    article.querySelector('.prix').textContent = produit.prix + ' XOF';
});

function updateArticle(article, produit, reset = false) {
    const item = monPanier.items.find(item => item.produit.id === produit.id);
    const quantite = item ? item.quantite : 0;
    const total = item ? item.calculerPrixTotal() : 0;  

    article.querySelector('.quantite').textContent = reset;
    article.querySelector('.total').textContent = reset ? '0 XOF' : total + ' XOF';
}

function updateTotalPrice() {
    document.querySelector('.total-price').textContent = monPanier.Total() + ' XOF';
}