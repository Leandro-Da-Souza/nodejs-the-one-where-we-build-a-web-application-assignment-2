const href = window.location.href;
const baseURL = 'http://localhost:8080';
const productID = href.slice(href.indexOf('?') + 4);
const productPage = document.querySelector('#product');
const customerID = 'f6a796d0-3f60-11ea-80cd-8bb22b23e2bf';

const getProduct = async id => {
    const data = await fetch(`${baseURL}/products/${id}`, {
        method: 'GET'
    });

    let response = await data.json();

    return response;
};

const addProduct = async (custID, prodID) => {
    const response = await fetch(
        `${baseURL}/addToBasket?customerID=${custID}&productID=${prodID}`,
        { method: 'POST' }
    );

    let data = await response.json();
    return data;
};

window.addEventListener('load', async () => {
    let product = await getProduct(productID);
    let output = `
        <h1>${product.name}</h1>
        <p>${product.price} $$$</p>
        <img src="${product.img}" />
        <button id="basketAdd">Add To Basket</button>
    `;

    productPage.innerHTML = output;

    console.log(product);
});

productPage.addEventListener('click', async e => {
    console.log(e.target.id);
    if (e.target.id === 'basketAdd') {
        let res = await addProduct(customerID, productID);
        if (res.hasOwnProperty('error')) {
            console.log('Item Already In Basket');
            let pElem = document.createElement('p');
            pElem.innerHTML = 'Product Already In Basket';
            productPage.appendChild(pElem);
            setTimeout(() => {
                productPage.removeChild(pElem);
            }, 3000);
        } else {
            let pElem = document.createElement('p');
            pElem.innerHTML = 'Product Added To Basket!';
            productPage.appendChild(pElem);
            setTimeout(() => {
                productPage.removeChild(pElem);
            }, 3000);
        }
    }
});
