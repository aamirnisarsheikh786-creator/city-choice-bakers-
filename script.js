// BANNER SLIDER LOGIC
let currentSlide = 0;
const slider = document.getElementById('bannerSlider');
const totalSlides = 3;

function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slider.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}
// 5 Seconds interval
setInterval(autoSlide, 5000);

// PRODUCT DETAIL LOGIC
let selectedProduct = {};

function openDetail(name, price, desc, img) {
    selectedProduct = { name, price, desc, img };
    const detailBox = document.getElementById("detailBox");
    
    // Show detail box
    detailBox.style.display = "block";
    
    // Fill data
    document.getElementById("dname").innerText = name;
    document.getElementById("dprice").innerText = price;
    document.getElementById("ddesc").innerText = desc;
    document.getElementById("dimg").src = img;
    
    // Smooth scroll to details
    detailBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openOrder() {
    const orderBox = document.getElementById("orderBox");
    orderBox.style.display = "block";
    orderBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sendWhatsApp() {
    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;
    const wa = document.getElementById("cwa").value;
    const msg = document.getElementById("cmsg").value;

    if (!name || !phone) {
        alert("Please enter Name and Phone number");
        return;
    }

    const text = `*City Choice Bakers Order*%0A%0A` +
                 `*Product:* ${selectedProduct.name}%0A` +
                 `*Price:* ${selectedProduct.price}%0A%0A` +
                 `*Customer Name:* ${name}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*WhatsApp:* ${wa}%0A` +
                 `*Message:* ${msg}`;

    window.open(`https://wa.me/7006592704?text=${text}`);
}
