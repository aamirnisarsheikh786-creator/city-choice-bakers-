const advancePrices = {
    "Chocolate Cake": 499,
    "Royal Rasmalai Delight Cake": 499,
    "Pineapple Mirror Glaze Cake (with Chocolate Garnishes": 299,
    "Butterscotch Nougat Cakes": 499,
    "Butterscotch Praline Mini Cakes": 499,
    "Tier Floral Celebration Cakes": 499
};

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

    detailBox.style.display = "block";

    document.getElementById("dname").innerText = name;
    document.getElementById("dprice").innerText = price;
    document.getElementById("ddesc").innerText = desc;
    document.getElementById("dimg").src = img;

    detailBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openOrder() {
    const orderBox = document.getElementById("orderBox");
    orderBox.style.display = "block";

    const adv = advancePrices[selectedProduct.name] || 199;
    selectedProduct.advance = adv;

    const advEl = document.getElementById("advAmount");
    if (advEl) advEl.innerText = "₹" + adv;

    orderBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sendWhatsApp() {

    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;
    const wa = document.getElementById("cwa").value;
    const msg = document.getElementById("cmsg").value;
    const paid = document.getElementById("paidConfirm").checked;

    if (!name || !phone) {
        alert("Please enter Name and Phone number");
        return;
    }

    if (!paid) {
        alert("Please pay advance first and confirm payment");
        return;
    }

    const text =
        `*CITY CHOICE BAKERS ORDER*%0A%0A` +
        `*PRODUCT:* ${selectedProduct.name}%0A` +
        `*PRICE:* ${selectedProduct.price}%0A` +
        `*ADVANCE PAID:* ₹${selectedProduct.advance}%0A%0A` +
        `*CUSTOMER:* ${name}%0A` +
        `*PHONE:* ${phone}%0A` +
        `*WHATSAPP:* ${wa}%0A` +
        `*MESSAGE:* ${msg}%0A%0A` +
        `*PAYMENT DONE VIA QR SCAN*`;

    window.open(`https://wa.me/7006592704?text=${text}`);
}

async function downloadInvoice() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;
    const msg = document.getElementById("cmsg").value;

    if (!name || !phone) {
        alert("Fill customer details first");
        return;
    }

    const total = parseInt(selectedProduct.price.replace("₹",""));
    const advance = selectedProduct.advance || 199;
    const pending = total - advance;

    let y = 20;

    // 🔴 LOAD LOGO
    const logoUrl = "https://i.ibb.co/S4b5kWP5/20260214-170235.png";

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoUrl;

    img.onload = function () {

        // LOGO
        doc.addImage(img, "PNG", 80, 5, 50, 30);

        y = 45;

        // SHOP NAME
        doc.setFontSize(18);
        doc.text("CITY CHOICE BAKERS", 20, y); y+=8;

        doc.setFontSize(10);
        doc.text("Owner: Nisar Ahmad Sheikh", 20, y); y+=6;
        doc.text("Phone: +91 7006592704", 20, y); y+=6;
        doc.text("Email: citychoicebakers@gmail.com", 20, y); y+=6;
        doc.text("Address: Your shop address here", 20, y); y+=10;

        // DATE
        doc.text("Date: " + new Date().toLocaleDateString(), 20, y); y+=10;

        // CUSTOMER
        doc.setFontSize(12);
        doc.text("Customer Details", 20, y); y+=8;
        doc.setFontSize(10);
        doc.text("Name: " + name, 20, y); y+=6;
        doc.text("Phone: " + phone, 20, y); y+=6;
        doc.text("Message: " + msg, 20, y); y+=10;

        // PRODUCT
        doc.setFontSize(12);
        doc.text("Product Details", 20, y); y+=8;
        doc.setFontSize(10);
        doc.text("Product: " + selectedProduct.name, 20, y); y+=6;
        doc.text("Total Amount: ₹" + total, 20, y); y+=6;
        doc.text("Advance Paid: ₹" + advance, 20, y); y+=6;
        doc.text("Pending Amount: ₹" + pending, 20, y); y+=12;

        // THANK YOU
        doc.setFontSize(14);
        doc.text("Thank you for ordering from City Choice Bakers!", 20, y);

        doc.save("CityChoiceInvoice.pdf");
    };
}
