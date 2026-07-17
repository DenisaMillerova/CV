// ----------------------------
// ACCESS CODE
// ----------------------------

const ACCESS_CODE = "Hello123";

function checkCode() {

    const input = document.getElementById("accessCode");
    const message = document.getElementById("message");

    if (input.value === ACCESS_CODE) {

        message.style.color = "#2dd4bf";
        message.innerHTML = "Welcome. Let's explore together.";
        
        setTimeout(() => {

            window.location.href = "portfolio.html";

        }, 700);

    } else {

        message.style.color = "#fbbf24";
        message.innerHTML = "Please try again.";

        input.classList.add("shake");

        setTimeout(() => {

            input.classList.remove("shake");

        }, 500);

    }

}



// ----------------------------
// SCROLL ANIMATION
// ----------------------------

const sections = document.querySelectorAll(".content-section");

if (sections.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    sections.forEach(section => {

        section.classList.add("hidden");

        observer.observe(section);

    });

}



// ----------------------------
// BACKGROUND EFFECT
// ----------------------------

const background = document.getElementById("background");

if (background) {

    document.addEventListener("mousemove", (event) => {

        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        background.style.transform =
            `translate(${x * 15}px, ${y * 15}px)`;

    });

}