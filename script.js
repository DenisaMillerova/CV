// Smooth reveal animation when sections appear

const sections = document.querySelectorAll(".content-section");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// Small movement effect for background

const background = document.getElementById("background");


document.addEventListener("mousemove", (event) => {

    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;


    background.style.transform =
        `translate(${x * 20}px, ${y * 20}px)`;

});