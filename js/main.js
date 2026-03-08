"use strict";

const sectionHeader = document.querySelector(".header");
const navHeader = document.querySelector(".header__nav");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

const btnLink = document.querySelector(".btn-link");
const btnsOpenModal = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelector(".close-modal");
const btnSubmitModal = document.querySelector(".submit-modal");

const sectionFeatures = document.querySelector(".features");

const imagesLazy = document.querySelectorAll(".feature img:first-child");

btnLink.addEventListener("click", function (e) {
  e.preventDefault();

  sectionFeatures.scrollIntoView({
    behavior: "smooth",
  });
});

navHeader.addEventListener("click", function (e) {
  e.preventDefault();

  const link = e.target.closest(".header__nav-list-item");

  if (!link) return;

  const targetSection = document.querySelector(`.${link.dataset.to}`);

  targetSection.scrollIntoView({ behavior: "smooth" });
});

navHeader.addEventListener("mouseover", function (e) {
  e.preventDefault();

  const link = e.target.closest(".header__nav-list-item");

  const allLinks = document.querySelectorAll(".header__nav-list-item");

  if (!link) {
    allLinks.forEach((link) => link.classList.remove("opacity"));
  } else {
    allLinks.forEach((link) => link.classList.add("opacity"));
    link.classList.remove("opacity");
  }
});

btnsOpenModal.forEach((btnOpenModal) =>
  btnOpenModal.addEventListener("click", function (e) {
    e.preventDefault();

    backdrop.classList.remove("hidden-remove");
    modal.classList.remove("hidden-remove");
  }),
);

const closeModal = function () {
  backdrop.classList.add("hidden-remove");
  modal.classList.add("hidden-remove");
};

btnCloseModal.addEventListener("click", closeModal);
btnSubmitModal.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", function (e) {
  const btn = e.target.closest(".tab-item");

  if (!btn) return;

  e.currentTarget
    .querySelectorAll(".tab-item")
    .forEach((tabItem) => tabItem.classList.remove("active-tab"));

  btn.classList.add("active-tab");

  const operations = document.querySelectorAll(".operation");

  operations.forEach((operation) => operation.classList.add("hidden"));

  document
    .querySelector(`.operation--${btn.dataset.tab}`)
    .classList.remove("hidden");
});

const observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      navHeader.classList.add("fixed");
    } else {
      navHeader.classList.remove("fixed");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeader.offsetHeight}px`,
  },
);

observer.observe(sectionHeader);

const revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { target } = entry;

        target.classList.remove("dislocate");
        observer.unobserve(target);
      }
    });
  },
  {
    root: null,
    threshold: 0.2,
  },
);

document.querySelectorAll(".section").forEach((section) => {
  revealObserver.observe(section);
});

const lazyImagesObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("blur");
        entry.target.setAttribute("src", entry.target.dataset.src);

        observer.unobserve(entry.target);
      }
    });
  },
  { root: null, threshold: 0, rootMargin: "200px" },
);
imagesLazy.forEach((img) => {
  lazyImagesObserver.observe(img);
});

// SLIDER

const btnLeftSlider = document.querySelector(".slider__btn--left");
const btnRightSlider = document.querySelector(".slider__btn--right");
const sliders = document.querySelectorAll(".slider");
const slidersContainer = document.querySelector(".sliders");

slidersContainer.style.overflowX = "hidden";

let currentSlide = 0;
let slidersLength = sliders.length;

function onSlide(slide) {
  currentSlide += slide;

  if (currentSlide > slidersLength - 1) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slidersLength - 1;
  }
  sliders.forEach((slider, i) => {
    slider.style.transform = `translateX(${(i - currentSlide) * (slider.offsetWidth + 100)}px)`;
    console.log(i, currentSlide);
    if (i === currentSlide) {
      console.log(i);
      slider.classList.remove("hidden");
    } else {
      slider.classList.add("hidden");
    }
  });
}
onSlide(0);

btnLeftSlider.addEventListener("click", onSlide.bind(null, -1));
btnRightSlider.addEventListener("click", onSlide.bind(null, 1));
