const { shell } = require('electron')

// Open URL in the default browser
shell.openExternal('https://www.amartist.tech')




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
