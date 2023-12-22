const recievedCode = `${window.location.href.split("?")[1]}`;
console.log(recievedCode);
const target = document.getElementById("detail");
// const locationToSend = listProducts[i].manufactoring_places;
//     const nextPageUrl = `http://localhost:5502/detail.html?${locationToSend}`;

async function fetchproduct() {
	const response = await fetch(
		`https://world.openfoodfacts.net/api/v2/product/${recievedCode}`,
	);
	const json = await response.json();
	const productDetail = json.product;
	// const productName =
	// productDetail.ecoscore_data.previous_data.agribalyse.name_fr;
	// const productName = json.product.ecoscore_data.previous_data.agribalyse.name_fr;
	const address = productDetail.manufacturing_places;
	const nextPageUrl = `http://localhost:5502/map.html?${address}`;
	const productName = productDetail.abbreviated_product_name;
	const productImg = productDetail.image_front_url;
	const nutriscore = productDetail.ecoscore_grade;

	console.log(
		productDetail,
		productDetail.abbreviated_product_name,
		productDetail.image_front_small_url,
		productDetail.manufacturing_places,
	);

	const article = `
    <article>
    <div class="product-detail">
      <div class="img-product">
        <img src=${productImg} alt="Chocolat" />
    </div>
      <div class="name-product">
        <h1>${productName}</h1>
        <img src="images/Nutri-score-${nutriscore}.svg" />
        <p>Adresse de fabriquant: <a href=${nextPageUrl} target="_blank">${address}</a></p>
      </div>
    </div>
    <h3>List nutritionnel</h3>
    <p>Tel que vendu pour 100 g / 100 ml</p>
    <ul>
      <li>Énergie: <span>2 285 kj (548 kcal)</span></li>
      <li>Protéines: <span>6 g</span></li>
      <li>Sel: <span>0,01 g</span></li>
      <li>Matières grasses: <span>34,1 g</span></li>
    </ul>
  </article>
`;
	target.innerHTML += article;
	// json = "categories_properties":"ecoscore_data":{"previous_data": {"ecoscore_data": {"agribalyse": {"name_fr": "Pâte à tartiner chocolat et noisette" }}}}
	// json.product.ecoscore_data.previous_data.agribalyse.name_fr
}

fetchproduct();
