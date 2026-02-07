// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Reveal animation
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
});

cards.forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(40px)';
  observer.observe(card);
});

// =======================
// EmailJS Init
// =======================
(function () {
  emailjs.init("1PhbXKtOHcwy3kEo8");
})();

// =======================
// Contact Form Submission
// =======================
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#94a3b8";

    const templateParams = {
      user_name: contactForm.user_name.value,
      user_email: contactForm.user_email.value,
      message: contactForm.message.value,
    };

    Promise.all([
      // ADMIN EMAIL
      emailjs.send(
        "service_lsyfdad",
        "template_20x0lee",
        templateParams
      ),

      // CLIENT EMAIL
      emailjs.send(
        "service_lsyfdad",
        "template_bicxoer",
        templateParams
      )
    ])
      .then(() => {
        formStatus.textContent = "Message sent successfully";
        formStatus.style.color = "#22c55e";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        formStatus.textContent =
          error.text || "Something went wrong. Please try again.";
        formStatus.style.color = "#ef4444";
      });
  });
}



