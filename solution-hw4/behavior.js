class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let cart = [];

function tempUrl() {
    const url = new URLSearchParams(window.location.search);
    return url.get('roll');
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

addEventListener('load', optionBox);
addEventListener('change', priceUpdate);
window.addEventListener('load', detailUpdate);

function addToCart() {
    const rollType = tempUrl();
    const rollGlazing = document.getElementById('flavors').value;
    const packSize = document.getElementById('sizes').value;
    const rollIndex = rolls[rollType];
    const basePrice = rollIndex ? rollIndex.basePrice : 0;
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(newRoll);
    console.log(cart);
}

window.onload = function() {
    detailUpdate();
    document.getElementById('add-to-cart').addEventListener('click', addToCart);
};