let productPage = document.querySelector('.products ul');
let baseURL = 'http://localhost:8080';
let customerID = 'f6a796d0-3f60-11ea-80cd-8bb22b23e2bf';
let counter = document.querySelector('#counter');

const fetchBasket = async custID => {
    let response = await fetch(`${baseURL}/getBasket?customerID=${custID}`, {
        method: 'GET'
    });

    let data = response.json();
    return data;
};

const fetchProducts = async () => {
    let response = await fetch(`${baseURL}/products`, {
        method: 'GET'
    });

    let data = await response.json();
    return data;
};

window.addEventListener('load', async () => {
    let products = await fetchProducts();
    let basket = await fetchBasket(customerID);
    let output = '';

    products.forEach(product => {
        console.log(product);

        output += `
        <li>
            <h4>${product.name}</h4>
            <a href="./productPage.html?id=${product._id}" >More Info</a>
        </li>   
        `;

        productPage.innerHTML = output;
    });

    counter.innerHTML = basket.length + ' Items In Basket';
});
