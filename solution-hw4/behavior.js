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
    const startPrice = 2.49;
    const currFlavor = document.getElementById('flavors').value;
    const currSize = document.getElementById('sizes').value;
    const flavorPrice = flavors[currFlavor];
    const sizePrice = sizes[currSize];
    const total = (startPrice + flavorPrice) * sizePrice;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

addEventListener('load', optionBox);
addEventListener('change', priceUpdate);
