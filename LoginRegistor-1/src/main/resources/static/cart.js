const product = [
    {
        id: 0,
        image: 'https://m.media-amazon.com/images/I/719RiDAGXtL._SL1500_.jpg',
        title: 'Smart Watch1',
        price: 10,
    },
    {
        id: 1,
        image: 'https://m.media-amazon.com/images/I/61JtVmcxb0L._SL1080_.jpg',
        title: 'Smart Watch2',
        price: 20,
    },
    {
        id: 2,
        image: 'https://m.media-amazon.com/images/I/61QMdK2FrXL._SL1500_.jpg',
        title: 'GW 57',
        price: 30,
    },
    {
        id: 3,
        image: 'https://m.media-amazon.com/images/I/618qhNo1BOL._SL1000_.jpg',
        title: 'Smart Watch4',
        price: 40,
    },
    {
        id: 4,
        image: 'https://m.media-amazon.com/images/I/61OzNoKjo9L._SX679_.jpg',
        title: 'Smart Watch5',
        price: 50,
    },
    {
        id: 5,
        image: 'https://m.media-amazon.com/images/I/61HWdCh-5lL._SX679_.jpg',
        title: 'Smart Watch6',
        price: 60,
    },
    {
        id: 6,
        image: 'https://m.media-amazon.com/images/I/61Dev97U-8L._SX679_.jpg',
        title: 'Smart Watch7',
        price: 70,
    },
    {
        id: 7,
        image: 'https://m.media-amazon.com/images/I/71wN2e+2VWL._SX679_.jpg',
        title: 'Smart Watch8',
        price: 80,
    },
];

// Use the product array directly for filtering
const categories = [...new Set(product.map((item) => item))];

// Search Bar Event Listener
document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter((item) => item.title.toLowerCase().includes(searchData));
    displayItem(filterData);
});

// Display Items Function
const displayItem = (items) => {
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = items.map((item) => {
        const { image, title, price, id } = item;
        return `
            <div class="box">
                <div class="img-box">
                    <a href="productDetails.html?id=${id}"><img class='images' src="${image}" alt="${title}"></a>
                </div>
                <div class="left">
                    <p>${title}</p>
                    <h2>$${price}.00</h2>
                    <button onclick='addtocart(${id})'>Add to Cart</button>
                </div>
            </div>`;
    }).join('');
};

// Display items initially
displayItem(categories);

var cart = [];

// Add to Cart Function
function addtocart(id) {
    const selectedProduct = categories.find((item) => item.id === id);
    if (selectedProduct) {
        cart.push({ ...selectedProduct });
        displaycart();
    }
}

// Delete Element from Cart
function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

// Display Cart Function
function displaycart() {
    const cartItemElement = document.getElementById('cartItem');
    const totalElement = document.getElementById("total");
    document.getElementById("count").innerHTML = cart.length;

    if (cart.length === 0) {
        cartItemElement.innerHTML = "Your cart is empty";
        totalElement.innerHTML = "$0.00";
    } else {
        let total = 0;
        cartItemElement.innerHTML = cart.map((item, index) => {
            const { image, title, price } = item;
            total += price;
            return `
                <div class='cart-item'>
                    <div class="row-img">
                        <img class='rowimg' src="${image}" alt="${title}">
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size:12px;'>$${price}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`;
        }).join('');
        totalElement.innerHTML = `$${total.toFixed(2)}`;
    }
}
