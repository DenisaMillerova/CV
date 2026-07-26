/* ========================================
   PORTFOLIO INTERACTIONS
======================================== */

(() => {
    "use strict";

    /* ========================================
       LOGIN CONFIGURATION
    ======================================== */

    const ACCESS_CODE = "Hello8";
    const PORTFOLIO_URL = "portfolio.html";


    /* ========================================
       LOGIN
    ======================================== */

    const loginBox = document.querySelector(".login-box");
    const accessCodeInput = document.querySelector("#accessCode");
    const loginMessage = document.querySelector("#message");
    const loginButton = loginBox?.querySelector("button");

    function showLoginMessage(message, type = "error") {
        if (!loginMessage) {
            return;
        }

        loginMessage.textContent = message;
        loginMessage.classList.remove(
            "login-message-error",
            "login-message-success"
        );

        loginMessage.classList.add(
            type === "success"
                ? "login-message-success"
                : "login-message-error"
        );
    }

    function shakeLoginBox() {
        if (!loginBox) {
            return;
        }

        loginBox.classList.remove("is-shaking");

        /*
         * Reading offsetWidth restarts the CSS animation
         * when an incorrect code is entered repeatedly.
         */
        void loginBox.offsetWidth;

        loginBox.classList.add("is-shaking");
    }

    function handleIncorrectCode() {
        showLoginMessage(
            "The access code is incorrect. Please try again."
        );

        shakeLoginBox();

        if (accessCodeInput) {
            accessCodeInput.value = "";
            accessCodeInput.focus();
            accessCodeInput.setAttribute("aria-invalid", "true");
        }
    }

    function handleCorrectCode() {
        showLoginMessage(
            "Access granted. Opening the portfolio.",
            "success"
        );

        if (accessCodeInput) {
            accessCodeInput.setAttribute("aria-invalid", "false");
            accessCodeInput.disabled = true;
        }

        if (loginButton) {
            loginButton.disabled = true;
        }

        loginBox?.classList.add("is-unlocking");

        window.setTimeout(() => {
            window.location.href = PORTFOLIO_URL;
        }, 450);
    }

    function checkCode() {
        if (!accessCodeInput) {
            return;
        }

        const enteredCode = accessCodeInput.value.trim();

        if (!enteredCode) {
            showLoginMessage("Please enter the access code.");
            shakeLoginBox();
            accessCodeInput.focus();
            accessCodeInput.setAttribute("aria-invalid", "true");
            return;
        }

        if (enteredCode === ACCESS_CODE) {
            handleCorrectCode();
            return;
        }

        handleIncorrectCode();
    }

    /*
     * Keeps the existing inline HTML attribute
     * onclick="checkCode()" functional.
     */
    window.checkCode = checkCode;

    if (accessCodeInput) {
        accessCodeInput.addEventListener("input", () => {
            accessCodeInput.removeAttribute("aria-invalid");

            if (loginMessage) {
                loginMessage.textContent = "";
                loginMessage.classList.remove(
                    "login-message-error",
                    "login-message-success"
                );
            }
        });

        accessCodeInput.addEventListener("keydown", (event) => {
            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();
            checkCode();
        });
    }

    loginBox?.addEventListener("animationend", () => {
        loginBox.classList.remove("is-shaking");
    });


    /* ========================================
       REDUCED MOTION
    ======================================== */

    const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function prefersReducedMotion() {
        return reducedMotionQuery.matches;
    }


    /* ========================================
       HEADER
    ======================================== */

    const header = document.querySelector("header");

    function updateHeader() {
        if (!header) {
            return;
        }

        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 20
        );
    }

    if (header) {
        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }


    /* ========================================
       HERO REVEAL
    ======================================== */

    const hero = document.querySelector(
        ".hero, section:first-of-type"
    );

    if (hero && !document.body.classList.contains("login-page")) {
        hero.classList.add("hero-reveal");

        if (prefersReducedMotion()) {
            hero.classList.add("is-visible");
        } else {
            window.requestAnimationFrame(() => {
                hero.classList.add("is-visible");
            });
        }
    }


    /* ========================================
       SCROLL REVEAL
    ======================================== */

    const revealElements = document.querySelectorAll(
        ".content-section, .career-path"
    );

    if (revealElements.length > 0) {
        revealElements.forEach((element, index) => {
            if (element === hero) {
                return;
            }

            element.classList.add("scroll-reveal");

            /*
             * A subtle stagger is limited so later sections
             * do not receive an excessive delay.
             */
            const delay = Math.min(index * 50, 200);
            element.style.setProperty(
                "--reveal-delay",
                `${delay}ms`
            );
        });

        if (
            prefersReducedMotion() ||
            !("IntersectionObserver" in window)
        ) {
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });
        } else {
            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -8% 0px"
                }
            );

            revealElements.forEach((element) => {
                if (element !== hero) {
                    revealObserver.observe(element);
                }
            });
        }
    }


    /* ========================================
       ACTIVE NAVIGATION
    ======================================== */

    const navigationLinks = Array.from(
        document.querySelectorAll('nav a[href^="#"]')
    );

    const navigationSections = navigationLinks
        .map((link) => {
            const sectionId = link.getAttribute("href");

            if (!sectionId || sectionId === "#") {
                return null;
            }

            return document.querySelector(sectionId);
        })
        .filter(Boolean);

    function setActiveNavigation(sectionId) {
        navigationLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    if (
        navigationSections.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const navigationObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio -
                            first.intersectionRatio
                    );

                const currentSection = visibleSections[0];

                if (currentSection?.target.id) {
                    setActiveNavigation(
                        currentSection.target.id
                    );
                }
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        navigationSections.forEach((section) => {
            navigationObserver.observe(section);
        });
    }


    /* ========================================
       CARD SPOTLIGHT
    ======================================== */

    const spotlightCards = document.querySelectorAll(
        ".expertise-card, .interests-card"
    );

    if (!prefersReducedMotion()) {
        spotlightCards.forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const cardBounds =
                    card.getBoundingClientRect();

                const pointerX =
                    event.clientX - cardBounds.left;

                const pointerY =
                    event.clientY - cardBounds.top;

                card.style.setProperty(
                    "--pointer-x",
                    `${pointerX}px`
                );

                card.style.setProperty(
                    "--pointer-y",
                    `${pointerY}px`
                );
            });

            card.addEventListener("pointerleave", () => {
                card.style.removeProperty("--pointer-x");
                card.style.removeProperty("--pointer-y");
            });
        });
    }
})();