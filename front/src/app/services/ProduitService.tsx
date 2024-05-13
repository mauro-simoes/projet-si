const produits = [
  
    { productId : 1, categorie : "Caméra", productName: "DJI Caméra Osmo", productLike : 0, 
    discount : 250.00,  img: 'camera-osmo.jpg'},

    { productId : 2, categorie : "Caméra", productName: "PNJ Pocket Vlog Sport", img: 'pnj-pocket.jpg'},
    { productId : 3, categorie : "Caméra", productName: "Caméscope Panasonic HC", img: 'camescope-panasonic.jpg'},
    { productId : 4, categorie : "Caméra", productName: "Sony Handicame HDR", img: '/sony-hdr.jpg'},
    { productId : 5, categorie : "Caméra", productName: "Wolfang Caméra Sport", img: '/wolfgang.jpg'},
    { productId : 6, categorie : "Caméra", productName: "Caméra Insta 360", img: '/insta-360.jpg'},


  ];

  export function getProduits() {
    return produits;
}