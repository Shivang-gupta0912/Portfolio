document.querySelector("#contactForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page refresh

    const payload = {
        name: document.querySelectorAll(".contact__input")[0].value,
        email: document.querySelectorAll(".contact__input")[1].value,
        subject: document.querySelectorAll(".contact__input")[2].value,
        message: document.querySelector(".contact__input textarea")?.value || ""
    };

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxM1QMolLScfXtjhuW0KS77Pn3BKuz85X1qHaJ6nfSetaBdbvh2R6eUR9jfGe2Uhwg25g/exec", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log(result);

        alert("Message sent successfully!");

        // Clear form
        e.target.reset();

    } catch (error) {
        alert("Error submitting form.");
        console.error(error);
    }
});
