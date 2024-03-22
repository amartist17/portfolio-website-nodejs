document.addEventListener("DOMContentLoaded", function() {
  function isLikelyEmbeddedBrowser() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
      // Look for specific strings in the user agent that are common in embedded browsers
      // This list can be expanded based on the embedded browsers you encounter
      return /FBAN|FBAV|Instagram|LinkedInApp|Pinterest|Snapchat/i.test(userAgent);
  }

  function suggestOpeningInExternalBrowser() {
      // Hide the main content or display a modal/pop-up suggesting to open in an external browser
      const suggestionElement = document.createElement('div');
      suggestionElement.innerHTML = `
          <p>Please open this site in your browser for the best experience.</p>
          <p>Copy the URL and paste it into your preferred browser.</p>
      `;
      suggestionElement.style.position = 'fixed';
      suggestionElement.style.left = '0';
      suggestionElement.style.top = '0';
      suggestionElement.style.width = '100%';
      suggestionElement.style.height = '100%';
      suggestionElement.style.backgroundColor = 'white';
      suggestionElement.style.zIndex = '10000';
      suggestionElement.style.display = 'flex';
      suggestionElement.style.flexDirection = 'column';
      suggestionElement.style.justifyContent = 'center';
      suggestionElement.style.alignItems = 'center';
      suggestionElement.style.fontSize = '20px';
      suggestionElement.style.padding = '20px';
      suggestionElement.style.boxSizing = 'border-box';
      document.body.appendChild(suggestionElement);
  }

  if (isLikelyEmbeddedBrowser()) {
      suggestOpeningInExternalBrowser();
  }
});





gsap.registerPlugin(ScrollTrigger);

const homeSection = $("section.index");
const aboutSection = $("section.about-me");
const skillsSection = $("section.skills");

const worksSection = $("section.works");
const contactSection = $("section.contact");
const teamSection = $("section.team");
sections = [
  homeSection,
  aboutSection,
  worksSection,
  contactSection,
  teamSection,
];

$(document).ready(function () {
  homeSection.addClass("show");
});

$(".nav-home").click(function () {
  sections.map((s) => s.removeClass("show"));
  homeSection.addClass("show");
  skillsSection.removeClass("none");

  gsap.from(".nav , .anim1", {
    opacity: 0,
    duration: 0.6,
    ease: Power1.easeOut,
    y: 50,
    delay: 0.5,
    stagger: 0.2,
  });
  gsap.from(" .anim2", {
    opacity: 0,
    duration: 0.6,
    ease: Power1.easeOut,
    x: -200,
    delay: 0.8,
    stagger: 0.2,
  });
});

$(".nav-about").click(function () {
  sections.map((s) => s.removeClass("show"));
  aboutSection.addClass("show");
  skillsSection.addClass("none");
  gsap.from(" .about-anim1", {
    opacity: 0,
    duration: 0.6,
    ease: Power1.easeOut,
    y: 50,
    delay: 0.4,
    stagger: 0.1,
  });

  gsap.from(" .about-anim2", {
    opacity: 0,
    duration: 0.8,
    ease: Power1.easeOut,
    scrollTrigger: ".skills",
    y: 50,
    delay: 0.4,
    stagger: 0.1,
  });
});

$(".nav-works").click(function () {
  sections.map((s) => s.removeClass("show"));
  worksSection.addClass("show");
  skillsSection.removeClass("none");

  gsap.from(" .works-anim1", {
    opacity: 0,
    duration: 0.6,
    ease: Power1.easeOut,
    y: 50,
    delay: 0.4,
    stagger: 0.1,
  });
});

$(".nav-contact").click(function () {
  sections.map((s) => s.removeClass("show"));
  contactSection.addClass("show");
  skillsSection.removeClass("none");

  gsap.from(" .contact-anim1", {
    opacity: 0,
    duration: 0.6,
    ease: Power1.easeOut,
    y: 50,
    delay: 0.4,
    stagger: 0.1,
  });
});

$(".nav-team").click(function () {
  sections.map((s) => s.removeClass("show"));
  teamSection.addClass("show");
  skillsSection.removeClass("none");
  $("card-container").removeClass("dis-none");

  gsap.from(" .teams-anim1", {
    opacity: 0,
    ease: Power1.easeOut,
    y: 50,
    delay: 0.4,
    stagger: 0.1,
  });
});
// gsap

gsap.from(".nav , .anim1", {
  opacity: 0,
  duration: 0.6,
  ease: Power1.easeOut,
  y: 50,
  delay: 0.5,
  stagger: 0.2,
});

gsap.from(" .anim2", {
  opacity: 0,
  duration: 0.6,
  ease: Power1.easeOut,
  x: -200,
  delay: 0.8,
  stagger: 0.2,
});
