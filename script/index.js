    const target = document.getElementById("target");
    const url =
        "https://world.openfoodfacts.net/api/v2/search?countries_tags_en=united-kingdom&fields=product_name%2Cmanufacturing_places%2Cimage_front_small_url%2Ccode%2Cnutriscore_grade";

    async function fetchproducts() {
        const response = await fetch(url);
        const json = await response.json();
        const listProducts = json.products;
        console.log(listProducts);

        for (let i = 0; i < listProducts.length; i++) {
            const productName = listProducts[i].product_name;
            const img = listProducts[i].image_front_small_url;
            const nutriscore = listProducts[i].nutriscore_grade;

            const codeToSend = listProducts[i].code;
            const nextPageUrl = `http://localhost:5502/detail.html?${codeToSend}`

            const li = `<li class="product">
            <a href = ${nextPageUrl}>
            <div><img src=${img} alt=${productName}></div>
            <h2>${productName}</h2>
            <img
                src="images/Nutri-score-${nutriscore}.svg"
                alt="Nutri-score"
                class="img-nutri-score"
                />
            <i class="fa-solid fa-heart" class="add-favoris"></i>
            </a>
        </li>`;
            target.innerHTML += li;
        }
    }

    fetchproducts();