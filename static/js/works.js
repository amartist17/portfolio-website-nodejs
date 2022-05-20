$(".category-item").click(function () {
  $(".category-item").removeClass("active");
  $(this).addClass("active");
  let catSelected = $(this).text().toLowerCase();
  $(".work-image").addClass("hide");
  console.log(catSelected);

  if (catSelected == "all") {
    $(".work-image").removeClass("hide");
    gsap.fromTo(
      ".work-image",
      {
        opacity: 0,
        ease: Power1.easeOut,
        x: -50,
        delay: 0.2,
      },
      { opacity: 1, x: 0 }
    );
  }

  $(".work-image").each((index, element) => {
    // console.log($(element).data("type"));
    if ($(element).data("type") == catSelected) {
      //   console.log(element.data("type"));
      $(element).removeClass("hide");
    }
  });
  gsap.fromTo(
    ".work-image",
    {
      opacity: 0,
      ease: Power1.easeOut,
      x: -50,
      delay: 0.2,
    },
    { opacity: 1, x: 0 }
  );
});
