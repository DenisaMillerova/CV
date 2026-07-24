/* ========================================
   JAVASCRIPT INTERACTIONS
======================================== */

.hero-reveal,
.scroll-reveal {
    opacity: 0;
    transform: translateY(24px);

    transition:
        opacity 0.8s ease,
        transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

    transition-delay: var(--reveal-delay, 0ms);
}

.hero-reveal.is-visible,
.scroll-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
}

header {
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

header.is-scrolled {
    background: rgba(11, 13, 18, 0.9);
    border-bottom-color: rgba(255, 255, 255, 0.09);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
}

nav a.is-active {
    color: #f4f1ec;
}

nav a.is-active::after {
    transform: scaleX(1);
    transform-origin: left;
}

.expertise-card,
.interests-card {
    position: relative;
    overflow: hidden;
}

.expertise-card::after,
.interests-card::after {
    content: "";
    position: absolute;
    inset: 0;

    pointer-events: none;

    background:
        radial-gradient(
            circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
            rgba(255, 255, 255, 0.055),
            transparent 34%
        );

    opacity: 0;

    transition: opacity 0.3s ease;
}

.expertise-card:hover::after,
.interests-card:hover::after {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .hero-reveal,
    .scroll-reveal {
        opacity: 1;
        transform: none;
    }
}