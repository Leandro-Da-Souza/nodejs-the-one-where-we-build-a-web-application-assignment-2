const href = window.location.href;
const baseURL = 'http://localhost:8080';
const productID = href.slice(href.indexOf('?') + 4);
const productPage = document.querySelector('#product');

const getProduct = async id => {
    const data = await fetch(`${baseURL}/products/${id}`, {
        method: 'GET'
    });

    let response = await data.json();

    return response;
};

window.addEventListener('load', async () => {
    let product = await getProduct(productID);
    let output = `
        <h1>${product.name}</h1>
        <p>${product.price}</p>
        <img src="${product.img}" />
    `;

    productPage.innerHTML = output;

    console.log(product);
});
