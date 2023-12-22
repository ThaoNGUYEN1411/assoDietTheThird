
const recievedCode = (`${(window.location.href).split('?')[1]}`);
console.log(recievedCode)

// const locationToSend = listProducts[i].manufactoring_places;
//     const nextPageUrl = `http://localhost:5502/detail.html?${locationToSend}`;

async function fetchproduct() {
    const response = await fetch(
        `https://world.openfoodfacts.net/api/v2/product/${recievedCode}`,
    );
    const json = await response.json();

    // const productName = json.product.ecoscore_data.previous_data.agribalyse.name_fr;

    console.log(json);
    // json = "categories_properties":"ecoscore_data":{"previous_data": {"ecoscore_data": {"agribalyse": {"name_fr": "Pâte à tartiner chocolat et noisette" }}}}
    // json.product.ecoscore_data.previous_data.agribalyse.name_fr
}

fetchproduct();

const link = document.querySelector(".name-product h1"); //h1