class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

const flavors = {
    'Keep original': 0.00,
    'Sugar milk': 0.00,
    'Vanilla milk': 0.50,
    'Double chocolate': 1.50,
};

const sizes = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10,
};

function tempUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('roll');
}

function optionBox() {
    const flavorOpt = document.getElementById('flavors');
    const sizeOpt = document.getElementById('sizes');

    for (const flavor in flavors) {
        let opt = document.createElement('option');
        opt.value = flavor;
        opt.textContent = flavor;
        flavorOpt.appendChild(opt);
    }

    for (const size in sizes) {
        let opt = document.createElement('option');
        opt.value = size;
        opt.textContent = size;
        sizeOpt.appendChild(opt);
    }
}

function priceUpdate() {
    const rollType = tempUrl();
    const startPrice = rolls[rollType].basePrice;
    const currFlavor = document.getElementById('flavors').value;
    const currSize = document.getElementById('sizes').value;
    const flavorPrice = flavors[currFlavor];
    const sizePrice = sizes[currSize];
    const total = (startPrice + flavorPrice) * sizePrice;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function detailUpdate() {
    const rollType = tempUrl();
    const rollIndex = rolls[rollType];
    document.querySelector('.product-page-img').src=`../assets/products/${rollIndex.imageFile}`;
    document.querySelector('.product-page-img').alt=`${rollType} Cinnamon Roll`;
    document.getElementById('total').textContent = `$${rollIndex.basePrice.toFixed(2)}`;
    document.title = `${rollType} Cinnamon Roll - BunBun Bake Shop`;
    document.querySelector('.flexbox-hbottom').textContent = `${rollType} Cinnamon Roll`;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartBadge();
}

function addToCart() {
    const rollType = tempUrl();
    const rollGlazing = document.getElementById('flavors').value;
    const packSize = document.getElementById('sizes').value;
    const rollIndex = rolls[rollType];
    const basePrice = rollIndex ? rollIndex.basePrice : 0;
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    let cart = getCart();
    cart.push(newRoll);
    saveCart(cart);
}

function cartItems() {
    const container = document.querySelector('.cart-container');
    container.innerHTML = '';
    let cart = getCart();

    cart.forEach((item, index) => {
        const productImg = document.createElement('div');
        productImg.className = 'cart-flexbox';

        const imgElement = document.createElement('img');
        imgElement.src = `../assets/products/${item.type.toLowerCase().replace(/\s+/g, '-')}-cinnamon-roll.jpg`;
        imgElement.alt = `${item.type} Cinnamon Roll`;
        imgElement.className = 'product-img-cart';

        const productDetails = document.createElement('div');
        productDetails.className = 'cart-flexitem1';
        productDetails.innerHTML = `
            <p>${item.type} Cinnamon Roll</p>
            <p>Glazing: ${item.glazing}</p>
            <p>Pack Size: ${item.size}</p>
        `;

        const productPrice = document.createElement('div');
        productPrice.className = 'cart-flexitem4';
        productPrice.innerHTML = `<p>$${cartPrice(item).toFixed(2)}</p>`;
        productImg.appendChild(imgElement);
        productImg.appendChild(productDetails);
        productImg.appendChild(productPrice);

        container.appendChild(productImg);
        const productRem = document.createElement('p');
        productRem.className = 'cart-flexitem3 bold-remove';
        productRem.textContent = 'Remove';
        productRem.style.textDecoration = "underline";
        productRem.style.cursor = "pointer";
        productRem.onclick = () => removeItem(index);
        container.appendChild(productRem);
    });

    const checkoutLineHaha = document.createElement('div');
    checkoutLineHaha.className = 'logo-underline2';
    container.appendChild(checkoutLineHaha);

    total();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    cartItems();
}


function cartBadge() {
    const cart = getCart();
    const badgeElement = document.querySelector('.cart-badge');
    if (badgeElement) {
        badgeElement.textContent = cart.length;
    }
}

function cartPrice(roll) {
    const flavorsTotal = flavors[roll.glazing];
    const sizesTotal = sizes[roll.size];
    return (roll.basePrice + flavorsTotal) * sizesTotal;
}

function total() {
    let cart = getCart();
    let totalPrice = 0;
    cart.forEach(roll => {
        totalPrice += cartPrice(roll);
    });
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item-btn')) {
        const index = event.target.getAttribute('data-index');
        removeItem(parseInt(index));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('detail.html') || window.location.href.includes('detail.html')) {
        detailUpdate();
        optionBox();

        const addToCartButton = document.getElementById('add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', addToCart);
        }
    }
    if (window.location.pathname.includes('cart.html') || window.location.href.includes('cart.html')) {
        cartItems();
    }
    cartBadge();
});