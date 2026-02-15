document.addEventListener("DOMContentLoaded", function () {

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

if (slider) {
    function autoSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    }
    setInterval(autoSlide, 5000);
}

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

    const qty = parseInt(document.getElementById("qty")?.value || 1);

    const advPerItem = advancePrices[selectedProduct.name] || 199;
    selectedProduct.advance = advPerItem * qty;

    const advEl = document.getElementById("advAmount");
    if (advEl) advEl.innerText = "₹" + selectedProduct.advance;

    orderBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sendWhatsApp() {

    const name = document.getElementById("cname").value;
    const phone = document.getElementById("cphone").value;
    const wa = document.getElementById("cwa").value;
    const msg = document.getElementById("cmsg").value;
    const paid = document.getElementById("paidConfirm").checked;

    const qty = parseInt(document.getElementById("qty").value || 1);
    const customAdvance = parseInt(document.getElementById("customAdvance").value || 0);

    if (!name || !phone) {
        alert("Please enter Name and Phone number");
        return;
    }

    if (!paid) {
        alert("Please pay advance first and confirm payment");
        return;
    }

    const advPerItem = advancePrices[selectedProduct.name] || 199;
    const defaultAdvance = advPerItem * qty;

    const paidAmount = customAdvance > 0 ? customAdvance : defaultAdvance;

    const price = parseInt(selectedProduct.price.replace("₹",""));
    const total = price * qty;
    const pending = total - paidAmount;

    const text =
`*CITY CHOICE BAKERS ORDER*

*PRODUCT DETAILS*
Name: ${selectedProduct.name}
Quantity: ${qty}
Price Per Item: ₹${price}
Total: ₹${total}

Advance Paid: ₹${paidAmount}
Pending: ₹${pending}

Product Image: ${selectedProduct.img}

*CUSTOMER DETAILS*
Name: ${name}
Phone: ${phone}
WhatsApp: ${wa}
Message: ${msg}

*PAYMENT:* Advance paid via QR scan`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/7006592704?text=${encodedText}`);
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

        const qty = parseInt(document.getElementById("qty").value || 1);
const customAdvance = parseInt(document.getElementById("customAdvance").value || 0);

const price = parseInt(selectedProduct.price.replace("₹",""));
const total = price * qty;

const advPerItem = advancePrices[selectedProduct.name] || 199;
const defaultAdvance = advPerItem * qty;

const advance = customAdvance > 0 ? customAdvance : defaultAdvance;
const pending = total - advance;

    const logoUrl = "https://i.ibb.co/S4b5kWP5/20260214-170235.png";
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logoUrl;

    img.onload = function () {

        // HEADER BACKGROUND
        doc.setFillColor(245, 222, 179);
        doc.rect(0, 0, 210, 40, 'F');

        // LOGO
        doc.addImage(img, "PNG", 10, 5, 30, 30);

        // SHOP NAME
        doc.setFontSize(20);
        doc.setTextColor(120, 40, 0);
        doc.text("CITY CHOICE BAKERS", 50, 20);

        doc.setFontSize(10);
        doc.setTextColor(0,0,0);
        doc.text("Owner: Nisar Ahmad Sheikh", 50, 26);
        doc.text("Phone: +91 7006592704", 50, 31);
        doc.text("citychoicebakers@gmail.com", 50, 36);

        let y = 50;

        // INVOICE TITLE
        doc.setFontSize(16);
        doc.text("INVOICE BILL", 80, y);
        y += 10;

        doc.line(10, y, 200, y);
        y += 8;

        // DATE
        doc.setFontSize(11);
        doc.text("Date: " + new Date().toLocaleDateString(), 10, y);
        y += 10;

        // CUSTOMER BOX
        doc.setFillColor(240,240,240);
        doc.rect(10, y, 190, 30, 'F');

        doc.text("Customer Details", 12, y+6);
        doc.text("Name: " + name, 12, y+14);
        doc.text("Phone: " + phone, 12, y+22);
        y += 40;

        // PRODUCT TABLE HEADER
        doc.setFillColor(220,220,220);
        doc.rect(10, y, 190, 8, 'F');

        doc.text("Product", 12, y+6);
        doc.text("Total", 150, y+6);
        y += 12;

        // PRODUCT ROW
        doc.rect(10, y-4, 190, 10);
        doc.text(selectedProduct.name + " x" + qty, 12, y+2);
doc.text("₹"+total, 150, y+2);
        y += 15;

        // PAYMENT DETAILS
        doc.text("Advance Paid: ₹" + advance, 12, y); y+=8;
        doc.text("Pending Amount: ₹" + pending, 12, y); y+=10;

        doc.line(10, y, 200, y);
        y+=10;

        doc.setFontSize(14);
        doc.text("TOTAL: ₹" + total, 140, y);
        y+=15;

        // FOOTER
        doc.setFontSize(11);
        doc.text("Thank you for ordering from City Choice Bakers!", 30, y);
        doc.text("Fresh cakes made with love ❤", 55, y+7);

        doc.save("CityChoiceInvoice.pdf");
    };
}

window.openDetail = openDetail;
window.openOrder = openOrder;
window.sendWhatsApp = sendWhatsApp;
window.downloadInvoice = downloadInvoice;

  
});
