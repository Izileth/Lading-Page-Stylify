document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hide');
    }, 1500);

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Search Bar
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const closeSearch = document.querySelector('.close-search');

    searchBtn.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchBar.querySelector('input').focus();
        }
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const slideDotsContainer = document.querySelector('.slide-dots');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slide-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        slideDotsContainer.appendChild(dot);
    });

    const slideDots = document.querySelectorAll('.slide-dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        slideDots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        slideDots[currentSlide].classList.add('active');
    }

    prevSlideBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextSlideBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto slide
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);

    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });

    // Accessories Carousel
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const accessoryCards = document.querySelectorAll('.accessory-card');
    let currentCard = 0;
    const cardWidth = accessoryCards[0].offsetWidth + 30; // width + margin-right

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentCard * cardWidth}px)`;
    }

    carouselPrev.addEventListener('click', () => {
        if (currentCard > 0) {
            currentCard--;
            updateCarousel();
        }
    });

    carouselNext.addEventListener('click', () => {
        if (currentCard < accessoryCards.length - 1) {
            currentCard++;
            updateCarousel();
        }
    });

    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductTitle = document.querySelector('.modal-product-info .product-title');
    const modalProductPrice = document.querySelector('.modal-product-info .product-price');
    const modalProductDescription = document.querySelector('.modal-product-info .product-description');
    const modalMainImage = document.querySelector('.main-image img');
    const modalThumbnails = document.querySelector('.thumbnail-images');
    const sizeSelector = document.querySelector('.size-selector select');

    // Sample product data
    const products = [
        {
            title: "Silk Chiffon Blouse",
            price: "$495",
            description: "Crafted from the finest silk chiffon, this blouse features a delicate drape and subtle sheen. The relaxed fit and French cuffs make it perfect for both day and evening wear.",
            images: [
                "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ],
            sizes: ["XS", "S", "M", "L", "XL"]
        },
        {
            title: "Cashmere Blend Coat",
            price: "$1,250",
            description: "This timeless coat is crafted from a luxurious blend of cashmere and wool, offering exceptional warmth without bulk. The tailored silhouette and notched lapel create a sophisticated look.",
            images: [
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ],
            sizes: ["S", "M", "L"]
        },
        {
            title: "Signature Leather Tote",
            price: "$890",
            description: "Handcrafted from full-grain Italian leather, this spacious tote features polished brass hardware and a structured silhouette. The interior includes multiple pockets for organization.",
            images: [
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ],
            sizes: ["One Size"]
        },
        {
            title: "Evening Silk Gown",
            price: "$1,650",
            description: "This floor-length gown is crafted from pure silk satin with a bias cut that drapes beautifully. The plunging neckline and open back create a dramatic yet elegant silhouette.",
            images: [
                "https://images.unsplash.com/photo-1595341595379-cf0ffedb5b0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1595341595379-cf0ffedb5b0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                "https://images.unsplash.com/photo-1595341595379-cf0ffedb5b0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            ],
            sizes: ["XS", "S", "M", "L"]
        }
    ];

    quickViewBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const product = products[index];
            
            // Set product info
            modalProductTitle.textContent = product.title;
            modalProductPrice.textContent = product.price;
            modalProductDescription.textContent = product.description;
            
            // Set main image
            modalMainImage.src = product.images[0];
            modalMainImage.alt = product.title;
            
            // Clear thumbnails
            modalThumbnails.innerHTML = '';
            
            // Add thumbnails
            product.images.forEach((image, imgIndex) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = image;
                thumbnail.alt = `${product.title} - ${imgIndex + 1}`;
                if (imgIndex === 0) thumbnail.classList.add('active');
                
                thumbnail.addEventListener('click', () => {
                    modalMainImage.src = image;
                    document.querySelectorAll('.thumbnail-images img').forEach(img => img.classList.remove('active'));
                    thumbnail.classList.add('active');
                });
                
                modalThumbnails.appendChild(thumbnail);
            });
            
            // Set sizes
            sizeSelector.innerHTML = '<option value="">Select Size</option>';
            product.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size;
                option.textContent = size;
                sizeSelector.appendChild(option);
            });
            
            // Show modal
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Mini Cart
    const cartBtn = document.querySelector('.cart-btn');
    const miniCart = document.querySelector('.mini-cart');
    const closeMiniCart = document.querySelector('.close-mini-cart');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const miniCartItems = document.querySelector('.mini-cart-items');
    const totalAmount = document.querySelector('.total-amount');
    let cart = [];

    cartBtn.addEventListener('click', () => {
        miniCart.classList.toggle('active');
        document.body.style.overflow = miniCart.classList.contains('active') ? 'hidden' : '';
    });

    closeMiniCart.addEventListener('click', () => {
        miniCart.classList.remove('active');
        document.body.style.overflow = '';
    });

    addToCartBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const product = products[index];
            addToCart(product);
        });
    });

    function addToCart(product) {
        // Check if product already in cart
        const existingItem = cart.find(item => item.title === product.title);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                selectedSize: product.sizes[0] // Default to first size
            });
        }
        
        updateCart();
        miniCart.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        miniCartItems.innerHTML = '';
        
        if (cart.length === 0) {
            miniCartItems.innerHTML = '<p class="empty-cart">Your bag is empty</p>';
            totalAmount.textContent = '$0.00';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            subtotal += price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.images[0]}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>Size: ${item.selectedSize}</p>
                    <p>${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity">+</button>
                    </div>
                </div>
                <button class="remove-item">Remove</button>
            `;
            
            miniCartItems.appendChild(cartItem);
            
            // Add event listeners
            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
            
            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                item.quantity++;
                updateCart();
            });
            
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
        });
        
        // Update subtotal
        totalAmount.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}. You'll receive our latest updates soon.`);
        newsletterForm.reset();
    });

    // Footer Newsletter Form
    const footerNewsletter = document.querySelector('.footer-newsletter');
    footerNewsletter.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = footerNewsletter.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}. You'll receive our latest updates soon.`);
        footerNewsletter.reset();
    });

    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (quickViewModal.classList.contains('active')) {
            if (!e.target.closest('.modal-content') && !e.target.classList.contains('quick-view')) {
                quickViewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        if (miniCart.classList.contains('active')) {
            if (!e.target.closest('.mini-cart') && !e.target.classList.contains('cart-btn') && !e.target.closest('.cart-btn')) {
                miniCart.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});