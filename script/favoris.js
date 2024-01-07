const dataProducts = localStorage.getItem("productsFavoris");
const listFavoris = JSON.parse(dataProducts).map((e) => JSON.parse(e));
const targetFav = document.getElementById("fav");
// console.log(JSON.parse(dataProducts).map((e) => JSON.parse(e)));

function productFavoris(listFavoris) {
	// console.log(listFavoris);
	for (product of listFavoris) {
		const article = `<article>
	    <img src=${product.image_front_small_url} alt='${product.product_name}' class="product-fav"/>
	    <div class="imgg">
	      <p> ${product.product_name} </p>
	      <img
                src="images/Nutri-score-${product.nutriscore_grade}.svg"
                alt="Nutri-score"
                class="img-nutri-score"
                />
	    </div>
	    <i class="fa-solid fa-heart"></i>
	    </article>
	  `;
		// console.log(product);
		targetFav.innerHTML += article;
	}
}

productFavoris(listFavoris);
