const produits = [
  
    { productId : 1, categorieId : 1, productName: "DJI Caméra Osmo", productLike : 0, price : 249.99,  img: 'camera-osmo.jpg'},
    { productId : 2, categorieId : 1, price : 249.99, productName: "PNJ Pocket Vlog Sport", img: 'pnj-pocket.jpg'},
    { productId : 3, categorieId : 1, price : 159.99, productName: "Caméscope Panasonic HC", img: 'camescope-panasonic.jpg'},
    { productId : 4, categorieId : 1, price : 459.49, productName: "Sony Handicame HDR", img: 'sony-hdr.jpg'},
    { productId : 5, categorieId : 1, price : 500.99, productName: "Wolfang Caméra Sport", img: 'wolfgang.jpg'},
    { productId : 6, categorieId : 1, price : 749.99, productName: "Caméra Insta 360", img: 'insta-360.jpg'},

    { productId : 7, categorieId : 2, productName: "Canon EOS 5D Mark IV", productLike : 0, price : 2229.99,  img: 'canon-eos.png'},
    { productId : 8, categorieId : 2, price : 3199.99, productName: "Nikon D850 ", img: 'nikon.png'},
    { productId : 9, categorieId : 2, price : 1998.99, productName: "Sony Alpha A7 III", img: 'sony-alpha-a7-III.png'},
    { productId : 10, categorieId : 2, price : 1699.49, productName: "Fujifilm X-T4", img: 'fujifilm.png'},
    { productId : 11, categorieId : 2, price : 549.99, productName: "Olympus OM-D E-M10 Mark III ", img: 'olympus.png'},
    { productId : 12, categorieId : 2, price : 1297.99, productName: "Panasonic Lumix GH5", img: 'panasonic-lumix.png'},
    
    { productId : 13, categorieId : 3, productName: "Sure SM7B", productLike : 0, price : 399.99,  img: 'sure-SM7B.png'},
    { productId : 14, categorieId : 3, price : 239.99, productName: "Rode NT1-A", img: 'rode-nt1a.png'},
    { productId : 16, categorieId : 3, price : 99.99, productName: "Blue Yeti", img: 'blue-yeti.png'},
    { productId : 17, categorieId : 3, price : 129.99, productName: "Sennheiser MD 421", img: 'sennheiser.png'},
    { productId : 18, categorieId : 3, price : 999.99, productName: "AKG C414 ", img: 'akg.png'},
    { productId : 18, categorieId : 3, price : 399.99, productName: "Audio-Technica AT2020", img: 'audio-technica.png'},
    
    { productId : 19, categorieId : 4, productName: "Manfrotto 1004BAC Master Stand", productLike : 0, price : 163.95,  img: 'manfrotto.png'},
    { productId : 20, categorieId : 4, price : 139.99, productName: "Neewer Stainless Steel Heavy Duty C-Stand", img: 'neewer.png'},
    { productId : 21, categorieId : 4, price : 291.99, productName: "Impact Heavy-Duty Light Stand", img: 'impact-heavy.png'},
    { productId : 22, categorieId : 4, price : 129.99, productName: "Matthews Hollywood Century C Stand", img: 'matthews.png'},
    { productId : 23, categorieId : 4, price : 182.99, productName: "Phottix Saldo 280 Air-Cushioned Light Stand", img: 'phottix.png'},
    { productId : 24, categorieId : 4, price : 221.99, productName: "Avenger A5029 Roller Photographic Light Stand", img: 'avenger.png'},
    
    { productId : 25, categorieId : 5, productName: "SanDisk Extreme PRO SDXC UHS-I Card", productLike : 0, price : 163.95,  img: 'sandisk.png'},
    { productId : 26, categorieId : 5, price : 139.99, productName: "Lexar Professional 2000x SDHC/SDXC UHS-II Card", img: 'lexar.png'},
    { productId : 27, categorieId : 5, price : 291.99, productName: "Samsung EVO Plus microSDXC UHS-I Card", img: 'evoplus.png'},
    { productId : 28, categorieId : 5, price : 129.99, productName: "Transcend CompactFlash 800 Card", img: 'transcend.png'},
    { productId : 29, categorieId : 5, price : 182.99, productName: "PNY Elite Performance SDXC UHS-I Card", img: 'pny.png'},
    { productId : 30, categorieId : 5, price : 221.99, productName: "Kingston Canvas Go! Plus microSD Card", img: 'kingstoncanvas.png'},


    { productId : 31, categorieId : 6, productName: "Samsung Odyssey Neo G8 S32BG85", productLike : 0, price : 1499.99,  img: 'odyssey.png'},
    { productId : 32, categorieId : 6, price : 1110.99, productName: "Dell Alienware AW3423DWF", img: 'alienware.png'},
    { productId : 33, categorieId : 6, price : 950.99, productName: "Acer Nitro XV275K P3biipruzx", img: 'acernitro.png'},
    { productId : 34, categorieId : 6, price : 800.99, productName: "Gigabyte M32U", img: 'gigabyte2.png'},
    { productId : 35, categorieId : 6, price : 330.99, productName: "Gigabyte M27Q ", img: 'gigabyte.png'},
    { productId : 36, categorieId : 6, price : 500.99, productName: "LG 32GP850-B", img: 'lg.png'},
  ];

  export function getProduits() {
    return produits;
}