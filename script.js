/* ========== NAVBAR & MOBILE MENU ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click (Mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ========== SCROLL ANIMATION ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

/* ========== HORIZONTAL SLIDERS ========== */
function scrollSlider(id, amount) {
  document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' });
}

/* ========== PRICE CALCULATOR LOGIC ========== */
document.addEventListener('DOMContentLoaded', () => {
  const calcQty = document.getElementById('calc-qty');
  const qtyDisplay = document.getElementById('qty-display');
  const sumQty = document.getElementById('sum-qty');
  const sumBase = document.getElementById('sum-base');
  const sumFabric = document.getElementById('sum-fabric');
  const sumPrint = document.getElementById('sum-print');
  const sumTotal = document.getElementById('sum-total');
  const sumPerItem = document.getElementById('sum-per-item');
  const sumDiscount = document.getElementById('sum-discount');
  const rowDiscount = document.getElementById('row-discount');
  const discountMsg = document.getElementById('discount-msg');

  function formatCurrency(num) {
    return '₹' + num.toLocaleString('en-IN');
  }

  function calculatePrice() {
    // Get Values
    const productPrice = parseInt(document.querySelector('input[name="calc-product"]:checked').value);
    const fabricPrice = parseInt(document.querySelector('input[name="calc-fabric"]:checked').value);
    const printPrice = parseInt(document.querySelector('input[name="calc-print"]:checked').value);
    const quantity = parseInt(calcQty.value);

    // Update displays
    qtyDisplay.textContent = quantity;
    sumQty.textContent = quantity;

    // Base math per item
    const itemBaseCost = productPrice;
    const itemFabricCost = fabricPrice;
    const itemPrintCost = printPrice;
    
    let baseTotal = itemBaseCost * quantity;
    let fabricTotal = itemFabricCost * quantity;
    let printTotal = itemPrintCost * quantity;
    
    let subtotal = baseTotal + fabricTotal + printTotal;

    // Discount Logic
    let discountPercent = 0;
    if (quantity >= 500) discountPercent = 0.15;
    else if (quantity >= 250) discountPercent = 0.10;
    else if (quantity >= 100) discountPercent = 0.05;

    let discountAmount = subtotal * discountPercent;
    let finalTotal = subtotal - discountAmount;
    let finalPerItem = finalTotal / quantity;

    // Render Math
    sumBase.textContent = formatCurrency(baseTotal);
    sumFabric.textContent = fabricPrice === 0 ? "Included" : "+" + formatCurrency(fabricTotal);
    sumPrint.textContent = printPrice === 0 ? "None" : "+" + formatCurrency(printTotal);
    
    if (discountPercent > 0) {
      rowDiscount.style.display = 'flex';
      sumDiscount.textContent = "-" + formatCurrency(discountAmount);
      discountMsg.textContent = `Volume discount applied: ${discountPercent * 100}%`;
      discountMsg.classList.add('text-green');
    } else {
      rowDiscount.style.display = 'none';
      discountMsg.textContent = `Volume discount applied: 0%`;
      discountMsg.classList.remove('text-green');
    }

    sumTotal.textContent = formatCurrency(finalTotal);
    sumPerItem.textContent = formatCurrency(Math.round(finalPerItem));
  }

  // Event Listeners for calculator
  const calcInputs = document.querySelectorAll('#pricing input');
  calcInputs.forEach(input => {
    input.addEventListener('input', calculatePrice);
  });

  // Initial Calculation
  calculatePrice();
});

/* ========== CONTACT FORM ========== */
const contactForm = document.getElementById('contactForm');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Submitting...';
    
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Submit Inquiry';
      contactForm.reset();
      showToast('Inquiry Received', 'Our team will review your project and respond within 24 hours.');
    }, 1200);
  });
}

/* ========== TOAST NOTIFICATION ========== */
function showToast(title, message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = '<h4>' + title + '</h4><p>' + message + '</p>';
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
}
