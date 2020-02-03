let baseURL = 'http://localhost:8080';
let cartSection = document.querySelector('#cart ul');
let customerID = 'f6a796d0-3f60-11ea-80cd-8bb22b23e2bf';

const fetchBasket = async custID => {
    let response = await fetch(`${baseURL}/getBasket?customerID=${custID}`, {
        method: 'GET'
    });

    let data = response.json();
    return data;
};

const deleteItem = async (custID, prodID) => {
    let response = await fetch(
        `${baseURL}/deleteFromBasket?customerID=${custID}&productID=${prodID}`,
        { method: 'DELETE' }
    );

    let data = response.json();
    return data;
};

window.addEventListener('load', async () => {
    let cartItems = await fetchBasket(customerID);
    let output = '';

    cartItems.forEach(item => {
        output += `
            <li data-id="${item._id}">
                <h3>${item.name}</h3>
                <h3>${item.price}</h3>
                <button id="delete">x</button>
            </li>
        `;
        cartSection.innerHTML = output;
    });
    console.log(cartItems);
});

cartSection.addEventListener('click', async e => {
    if (e.target.id === 'delete') {
        let itemId = e.target.parentElement.dataset.id;
        let res = await deleteItem(customerID, itemId);
        let pElem = document.createElement('p');
        pElem.innerHTML = 'Product Deleted!';
        document.body.appendChild(pElem);
        setTimeout(() => {
            document.body.removeChild(pElem);
            window.location.reload();
        }, 3000);
        console.log(res);
    }
});
