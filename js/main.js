let productPage = document.querySelector('.products ul');
let baseURL = 'http://localhost:8080';

const fetchProducts = async () => {
    let response = await fetch(`${baseURL}/products`, {
        method: 'GET'
    });

    let data = await response.json();
    return data;
};

window.addEventListener('load', async () => {
    let products = await fetchProducts();
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
});
