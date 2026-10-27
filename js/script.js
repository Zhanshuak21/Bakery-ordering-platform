/**
 * Sweet Crumb Bakery - Advanced JavaScript & DOM Manipulation
 * Assignment 5
 * Team: NURLANKYZY ZHANSHUAK | SRAZHDIN YASMIN | URINBAY NURGUL
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. OBJECTS, ARRAYS, HIGHER-ORDER FUNCTIONS
    // ==========================================

    // Product data as objects (Objects & Methods)
    const bakeryProducts = [
        {
            id: 1,
            name: "Butter Croissant",
            category: "pastry",
            price: 1200,
            description: "Light and flaky croissant made with real butter.",
            available: true,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        },
        {
            id: 2,
            name: "Cinnamon Roll",
            category: "pastry",
            price: 1500,
            description: "Soft dough filled with cinnamon and sugar.",
            available: true,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        },
        {
            id: 3,
            name: "Sourdough Bread",
            category: "bread",
            price: 1800,
            description: "Traditional sourdough bread baked fresh daily.",
            available: true,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        },
        {
            id: 4,
            name: "Chocolate Cake",
            category: "cake",
            price: 9500,
            description: "Rich chocolate sponge with smooth cream.",
            available: true,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        },
        {
            id: 5,
            name: "Blueberry Muffin",
            category: "pastry",
            price: 900,
            description: "Soft muffin packed with fresh blueberries.",
            available: true,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        },
        {
            id: 6,
            name: "Whole Wheat Loaf",
            category: "bread",
            price: 1600,
            description: "Healthy whole wheat bread.",
            available: false,
            getFormattedPrice: function () {
                return this.price.toLocaleString("en-US") + " KZT";
            }
        }
    ];

    // Higher-order functions: filter + map
    function renderFilteredProducts(category) {
        const container = document.getElementById("product-list");
        if (!container) return;

        const filtered = category === "all"
            ? bakeryProducts
            : bakeryProducts.filter(function (product) {
                return product.category === category;
            });

        const html = filtered.map(function (product) {
            const statusClass = product.available ? "available" : "unavailable";
            const statusText = product.available ? "Available" : "Sold Out";

            return (
                '<div class="col-12 col-md-6 col-lg-4 product-card-item" data-category="' + product.category + '">' +
                    '<article class="card h-100 shadow-sm bakery-card">' +
                        '<div class="card-body d-flex flex-column">' +
                            '<h3 class="card-title">' + product.name + '</h3>' +
                            '<p class="card-text">' + product.description + '</p>' +
                            '<p class="fw-bold text-accent">' + product.getFormattedPrice() + '</p>' +
                            '<span class="badge ' + statusClass + ' mb-2">' + statusText + '</span>' +
                            '<a href="order.html" class="btn btn-primary mt-auto">Order</a>' +
                        '</div>' +
                    '</article>' +
                '</div>'
            );
        }).join("");

        container.innerHTML = html || "<p class='text-center'>No products found in this category.</p>";
    }

    // Product filter buttons (uses switch)
    const filterButtons = document.querySelectorAll("[data-filter]");
    if (filterButtons.length > 0) {
        renderFilteredProducts("all");

        filterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const category = btn.getAttribute("data-filter");

                switch (category) {
                    case "all":
                    case "pastry":
                    case "bread":
                    case "cake":
                        playSound("click");
                        break;
                    default:
                        break;
                }

                filterButtons.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");

                renderFilteredProducts(category);
            });
        });
    }


    // ==========================================
    // 2. DAY / NIGHT THEME TOGGLE
    // ==========================================

    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("bakery-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeToggle) themeToggle.textContent = "☀️ Day";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-theme");

            const isDark = document.body.classList.contains("dark-theme");
            themeToggle.textContent = isDark ? "☀️ Day" : "🌙 Night";
            localStorage.setItem("bakery-theme", isDark ? "dark" : "light");

            document.body.style.transition = "background-color 0.4s ease, color 0.4s ease";
            playSound("click");
        });
    }


    // ==========================================
    // 3. GREETING BY TIME OF DAY (SWITCH)
    // ==========================================

    function getTimeGreeting() {
        const hour = new Date().getHours();
        let greeting;

        switch (true) {
            case (hour >= 5 && hour < 12):
                greeting = "Good morning";
                break;
            case (hour >= 12 && hour < 17):
                greeting = "Good afternoon";
                break;
            case (hour >= 17 && hour < 22):
                greeting = "Good evening";
                break;
            default:
                greeting = "Hello night owl";
        }
        return greeting;
    }

    const greetingElement = document.getElementById("time-greeting");
    if (greetingElement) {
        greetingElement.textContent = getTimeGreeting() + "! Welcome to Sweet Crumb Bakery.";
    }


    // ==========================================
    // 4. PERSONALIZED GREETING (NAME INPUT)
    // ==========================================

    const nameForm = document.getElementById("name-greeting-form");
    const nameInput = document.getElementById("user-name-input");
    const personalGreeting = document.getElementById("personal-greeting");

    if (nameForm && nameInput && personalGreeting) {
        nameForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = nameInput.value.trim();

            // Security: reject empty or whitespace-only names
            if (name.length < 2) {
                personalGreeting.textContent = "Please enter a real name (at least 2 characters).";
                personalGreeting.classList.add("text-danger");
                nameInput.focus();
                return;
            }

            personalGreeting.classList.remove("text-danger");
            personalGreeting.textContent = getTimeGreeting() + ", " + name + "! Enjoy our fresh bakery treats.";
            playSound("success");
            nameInput.value = "";
        });
    }


    // ==========================================
    // 5. STAR RATING (DOM Manipulation)
    // ==========================================

    const stars = document.querySelectorAll(".rating-star");
    const ratingValue = document.getElementById("rating-value");
    let currentRating = 0;

    if (stars.length > 0) {
        stars.forEach(function (star, index) {
            star.addEventListener("click", function () {
                currentRating = index + 1;

                stars.forEach(function (s, i) {
                    if (i < currentRating) {
                        s.classList.add("selected");
                        s.style.color = "#d0784c";
                        s.setAttribute("aria-checked", "true");
                    } else {
                        s.classList.remove("selected");
                        s.style.color = "#ccc";
                        s.setAttribute("aria-checked", "false");
                    }
                });

                if (ratingValue) {
                    ratingValue.textContent = "You rated us: " + currentRating + " / 5";
                }

                playSound("click");

                star.style.transform = "scale(1.3)";
                setTimeout(function () {
                    star.style.transform = "scale(1)";
                }, 200);
            });

            star.addEventListener("mouseenter", function () {
                stars.forEach(function (s, i) {
                    s.style.color = i <= index ? "#d0784c" : "#ccc";
                });
            });

            star.addEventListener("mouseleave", function () {
                stars.forEach(function (s, i) {
                    s.style.color = i < currentRating ? "#d0784c" : "#ccc";
                });
            });
        });
    }


    // ==========================================
    // 6. SOUND EFFECTS (Web Audio API)
    // ==========================================

    function playSound(type) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();

            oscillator.connect(gain);
            gain.connect(ctx.destination);

            if (type === "success") {
                oscillator.frequency.value = 660;
                gain.gain.value = 0.15;
            } else if (type === "error") {
                oscillator.frequency.value = 220;
                gain.gain.value = 0.12;
            } else {
                oscillator.frequency.value = 440;
                gain.gain.value = 0.08;
            }

            oscillator.type = "sine";
            oscillator.start();
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
            oscillator.stop(ctx.currentTime + 0.25);
        } catch (e) {
            // Silent fail
        }
    }


    // ==========================================
    // 7. KEYBOARD NAVIGATION (Arrow keys)
    // ==========================================

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    let focusedNavIndex = -1;

    document.addEventListener("keydown", function (event) {
        const activeTag = document.activeElement.tagName.toLowerCase();
        if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
            return;
        }

        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();

            if (navLinks.length === 0) return;

            if (focusedNavIndex === -1) {
                focusedNavIndex = 0;
            } else if (event.key === "ArrowRight") {
                focusedNavIndex = (focusedNavIndex + 1) % navLinks.length;
            } else {
                focusedNavIndex = (focusedNavIndex - 1 + navLinks.length) % navLinks.length;
            }

            navLinks[focusedNavIndex].focus();
        }
    });


    // ==========================================
    // 8. CURRENT DATE AND TIME
    // ==========================================

    const dateTimeElement = document.getElementById("date-time");

    function updateDateTime() {
        if (!dateTimeElement) return;

        const now = new Date();
        dateTimeElement.textContent = now.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });
    }

    if (dateTimeElement) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }


    // ==========================================
    // 9. BACKGROUND COLOR CHANGER
    // ==========================================

    const colorButton = document.getElementById("color-change-btn");
    const backgroundColors = [
        "#fffaf4",
        "#fff8f0",
        "#fce4ec",
        "#e8f5e9",
        "#e3f2fd",
        "#fff3cd"
    ];
    let colorIndex = 0;

    if (colorButton) {
        colorButton.addEventListener("click", function () {
            document.body.style.backgroundColor = backgroundColors[colorIndex];
            colorIndex = (colorIndex + 1) % backgroundColors.length;
            playSound("click");
        });
    }


    // ==========================================
    // 10. NEWSLETTER POPUP
    // ==========================================

    const popup = document.getElementById("contact-popup");
    const openPopupBtn = document.getElementById("open-popup-btn");
    const closePopupBtn = document.getElementById("close-popup-btn");
    const popupForm = document.getElementById("popup-contact-form");
    const popupSuccess = document.getElementById("popup-success");

    function openPopup() {
        if (!popup) return;
        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");
        const firstInput = document.getElementById("popup-email");
        if (firstInput) firstInput.focus();
    }

    function closePopup() {
        if (!popup) return;
        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");
        if (openPopupBtn) openPopupBtn.focus();
    }

    if (openPopupBtn) openPopupBtn.addEventListener("click", openPopup);
    if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);

    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) closePopup();
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && popup && popup.classList.contains("show")) {
            closePopup();
        }
    });

    if (popupForm) {
        popupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailField = document.getElementById("popup-email");
            const email = emailField ? emailField.value.trim() : "";

            if (!email || !emailField.validity.valid) {
                playSound("error");
                popupForm.reportValidity();
                return;
            }

            if (popupSuccess) {
                popupSuccess.hidden = false;
            }
            playSound("success");
            popupForm.reset();

            setTimeout(function () {
                closePopup();
                if (popupSuccess) popupSuccess.hidden = true;
            }, 2000);
        });
    }


    // ==========================================
    // 11. FAQ ACCORDION
    // ==========================================

    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const answerId = button.getAttribute("aria-controls");
            const answer = document.getElementById(answerId);
            const icon = button.querySelector(".faq-icon");

            if (!answer) return;

            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));
            answer.hidden = isOpen;
            answer.classList.toggle("open", !isOpen);

            if (icon) {
                icon.textContent = isOpen ? "+" : "−";
            }
        });
    });


    // ==========================================
    // 12. CONTACT FORM - ASYNC SUBMIT (Callback)
    // ==========================================

    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            const nameVal = name ? name.value.trim() : "";
            const emailVal = email ? email.value.trim() : "";
            const messageVal = message ? message.value.trim() : "";

            if (nameVal.length < 2) {
                alert("Please enter a valid name (at least 2 characters, no spaces only).");
                playSound("error");
                if (name) name.focus();
                return;
            }

            if (!emailVal || !email.validity.valid) {
                alert("Please enter a valid email address.");
                playSound("error");
                if (email) email.focus();
                return;
            }

            if (messageVal.length < 5) {
                alert("Message is too short.");
                playSound("error");
                if (message) message.focus();
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
            }

            // Simulate async + callback
            setTimeout(function () {
                handleContactSuccess();
            }, 1200);

            function handleContactSuccess() {
                playSound("success");

                let successBox = document.getElementById("contact-success");
                if (!successBox) {
                    successBox = document.createElement("div");
                    successBox.id = "contact-success";
                    successBox.className = "alert alert-success mt-3";
                    successBox.setAttribute("role", "status");
                    contactForm.appendChild(successBox);
                }
                successBox.textContent = "Thank you! Your message has been sent successfully.";
                successBox.hidden = false;

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Send Message";
                }
            }
        });
    }


    // ==========================================
    // 13. ORDER FORM - STRONG VALIDATION
    // ==========================================

    const orderForm = document.getElementById("order-form");

    if (orderForm) {
        const nameInputOrder = document.getElementById("order-name");
        const emailInputOrder = document.getElementById("order-email");
        const productInput = document.getElementById("product");
        const detailsInput = document.getElementById("details");
        const passwordInput = document.getElementById("order-password");
        const confirmPasswordInput = document.getElementById("confirm-password");
        const successMessage = document.getElementById("order-success");

        function showError(input, errorId, message) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = message;
            }
            input.classList.toggle("is-invalid", message !== "");
            input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
        }

        function validateName() {
            const value = nameInputOrder.value.trim();
            const valid = value.length >= 2;
            showError(
                nameInputOrder,
                "name-error",
                valid ? "" : "Please enter a real name (at least 2 characters)."
            );
            return valid;
        }

        function validateEmail() {
            const email = emailInputOrder.value.trim();
            const valid = email !== "" && emailInputOrder.validity.valid;
            showError(
                emailInputOrder,
                "email-error",
                valid ? "" : "Please enter a valid email address."
            );
            return valid;
        }

        function validateProduct() {
            const valid = productInput.value !== "";
            showError(
                productInput,
                "product-error",
                valid ? "" : "Please select a product."
            );
            return valid;
        }

        function validateDetails() {
            const value = detailsInput.value.trim();
            const valid = value.length >= 5;
            showError(
                detailsInput,
                "details-error",
                valid ? "" : "Please enter more details (at least 5 characters)."
            );
            return valid;
        }

        function validatePassword() {
            const value = passwordInput.value;
            const hasDigit = /\d/.test(value);
            const valid = value.length >= 8 && hasDigit;
            showError(
                passwordInput,
                "password-error",
                valid ? "" : "Password must be at least 8 characters and contain a number."
            );
            return valid;
        }

        function validateConfirmPassword() {
            const valid =
                confirmPasswordInput.value !== "" &&
                confirmPasswordInput.value === passwordInput.value;
            showError(
                confirmPasswordInput,
                "confirm-password-error",
                valid ? "" : "Passwords do not match."
            );
            return valid;
        }

        nameInputOrder.addEventListener("input", validateName);
        emailInputOrder.addEventListener("input", validateEmail);
        productInput.addEventListener("change", validateProduct);
        detailsInput.addEventListener("input", validateDetails);

        passwordInput.addEventListener("input", function () {
            validatePassword();
            if (confirmPasswordInput.value !== "") {
                validateConfirmPassword();
            }
        });

        confirmPasswordInput.addEventListener("input", validateConfirmPassword);

        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isProductValid = validateProduct();
            const areDetailsValid = validateDetails();
            const isPasswordValid = validatePassword();
            const isConfirmationValid = validateConfirmPassword();

            const isFormValid =
                isNameValid &&
                isEmailValid &&
                isProductValid &&
                areDetailsValid &&
                isPasswordValid &&
                isConfirmationValid;

            if (!isFormValid) {
                if (successMessage) successMessage.hidden = true;
                playSound("error");

                const firstInvalid = orderForm.querySelector(".is-invalid");
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            if (successMessage) {
                successMessage.hidden = false;
            }
            playSound("success");

            orderForm.reset();

            orderForm.querySelectorAll(".is-invalid").forEach(function (input) {
                input.classList.remove("is-invalid");
                input.removeAttribute("aria-invalid");
            });

            orderForm.querySelectorAll(".validation-message").forEach(function (msg) {
                msg.textContent = "";
            });
        });
    }


    // ==========================================
    // 14. READ MORE TOGGLE
    // ==========================================

    const readMoreBtn = document.getElementById("read-more-btn");
    const extraContent = document.getElementById("extra-content");

    if (readMoreBtn && extraContent) {
        readMoreBtn.addEventListener("click", function () {
            const isHidden = extraContent.style.display === "none" || extraContent.style.display === "";

            if (isHidden) {
                extraContent.style.display = "block";
                readMoreBtn.textContent = "Read Less";
                extraContent.style.opacity = "0";
                setTimeout(function () {
                    extraContent.style.transition = "opacity 0.4s ease";
                    extraContent.style.opacity = "1";
                }, 10);
            } else {
                extraContent.style.display = "none";
                readMoreBtn.textContent = "Read More";
            }
            playSound("click");
        });
    }

});
