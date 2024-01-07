const target = document.getElementById("target");
const addFavorisBtn = document.querySelector(".add-favoris");
const nutriScoreA = document.querySelector(".nutri-score-A");
const listProductsFavoris = [];
let listProducts = [];
const url =
	"https://world.openfoodfacts.net/api/v2/search?countries_tags_en=united-kingdom&fields=product_name%2Cmanufacturing_places%2Cimage_front_small_url%2Ccode%2Cnutriscore_grade";

//Filter the products
function filterProductsNutri(nutriScore, products) {
	return products.filter((product) => product.nutriscore_grade === nutriScore);
}

// Fonction pour mettre à jour et afficher la liste filtrée
function updateProducts(filteredProducts) {
	// Mettez à jour la liste de produits
	listProducts = filteredProducts;
	// Effacez le contenu actuel de la cible
	target.innerHTML = "";
	// Affichez les produits mis à jour
	for (let i = 0; i < listProducts.length; i++) {
		const productName = listProducts[i].product_name;
		const img = listProducts[i].image_front_small_url;
		const nutriscore = listProducts[i].nutriscore_grade;

		const codeToSend = listProducts[i].code;
		const nextPageUrl = `http://localhost:5502/detail.html?${codeToSend}`;

		const li = `<li class="product">
            <a href = ${nextPageUrl}>
            <div><img src=${img} alt=${productName}></div>
            <h2>${productName}</h2>
            <img
                src="images/Nutri-score-${nutriscore}.svg"
                alt="Nutri-score"
                class="img-nutri-score"
                />
            
            </a>
            <i class="fa-solid fa-heart add-favoris" data-product='${JSON.stringify(
							listProducts[i],
						)}'></i>
        </li>`;
		target.innerHTML += li;
	}
}

async function fetchproducts() {
	const response = await fetch(url);
	const json = await response.json();
	let listProducts = json.products;
	console.log(listProducts);
	for (let i = 0; i < listProducts.length; i++) {
		const productName = listProducts[i].product_name;
		const img = listProducts[i].image_front_small_url;
		const nutriscore = listProducts[i].nutriscore_grade;

		const codeToSend = listProducts[i].code;
		const nextPageUrl = `http://localhost:5502/detail.html?${codeToSend}`;

		const li = `<li class="product">
            <a href = ${nextPageUrl}>
            <div><img src=${img} alt=${productName}></div>
            <h2>${productName}</h2>
            <img
                src="images/Nutri-score-${nutriscore}.svg"
                alt="Nutri-score"
                class="img-nutri-score"
                />
            
            </a>
            <i class="fa-solid fa-heart add-favoris" data-product='${JSON.stringify(
							listProducts[i],
						)}'></i>
        </li>`;
		target.innerHTML += li;
	}
	// add product favoris
	const addFavoris = document.querySelectorAll(".add-favoris");
	console.log(addFavoris);

	addFavoris.forEach((productFavoris) => {
		productFavoris.addEventListener("click", (e) => {
			let productInfo = productFavoris.getAttribute("data-product");
			console.log("ok");
			productFavoris.classList.add("red");

			if (!listProductsFavoris.includes(productInfo)) {
				listProductsFavoris.push(productInfo);
			} else {
				console.log("suprimer :", listProductsFavoris.indexOf(productInfo));
				listProductsFavoris.splice(listProductsFavoris.indexOf(productInfo), 1);
				productFavoris.classList.remove("red");
			}

			dataProducts = JSON.stringify(listProductsFavoris);
			//localStorage
			// console.log(dataProducts);
			localStorage.setItem("productsFavoris", dataProducts);
		});
	});
	function handleFilter(e) {
		let nutriScore = e.target.innerText.toLowerCase();

		let filteredProducts = filterProductsNutri(nutriScore, listProducts);
		console.log(filteredProducts, nutriScore, listProducts);
		// Mettre à jour et afficher la liste filtrée
		updateProducts(filteredProducts);
	}
	let btns = document.querySelectorAll("ul.nutri-score-list li button");
	console.log(btns);
	btns.forEach((elm) => {
		elm.addEventListener("click", (e) => handleFilter(e));
		return listProducts;
	});
	// console.log(listProductsFavoris);
}

fetchproducts();
