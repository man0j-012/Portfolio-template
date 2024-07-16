// Smooth scrolling for navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    document.getElementById(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Console message when the page is fully loaded
window.addEventListener("load", () => {
  console.log("Page fully loaded");
  displayGreeting();
});

// Function to display a dynamic greeting message based on the time of day
function displayGreeting() {
  const greetingElement = document.createElement("p");
  greetingElement.className = "greeting";
  const currentHour = new Date().getHours();
  let greetingMessage;

  if (currentHour < 12) {
    greetingMessage = "Good morning!";
  } else if (currentHour < 18) {
    greetingMessage = "Good afternoon!";
  } else {
    greetingMessage = "Good evening!";
  }

  greetingElement.textContent = greetingMessage;
  document.body.prepend(greetingElement);
}
