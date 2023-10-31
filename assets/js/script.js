'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}
let lastClickedBtn = filterBtn[0];
const project1 = document.getElementById("project1");
project1.onclick = function(){
  selectValue.innerText="Machine Learning";
  elementToggleFunc(select);
  filterFunc("machine learning");

  lastClickedBtn.classList.remove("active");
  filterBtn[1].classList.add("active");
  lastClickedBtn = filterBtn[1];
}
const project2 = document.getElementById("project2");
project2.onclick = function(){
  selectValue.innerText="Reinforcement Learning";
  elementToggleFunc(select);
  filterFunc("reinforcement learning")

  lastClickedBtn.classList.remove("active");
  filterBtn[2].classList.add("active");
  lastClickedBtn = filterBtn[2];
}
const project3 = document.getElementById("project3");
project3.onclick = function(){
  selectValue.innerText="Mathematical Modeling";
  elementToggleFunc(select);
  filterFunc("mathematical modeling")

  lastClickedBtn.classList.remove("active");
  filterBtn[3].classList.add("active");
  lastClickedBtn = filterBtn[3];
}
const project4 = document.getElementById("project4");
project4.onclick = function(){
  selectValue.innerText="Other Projects";
  elementToggleFunc(select);
  filterFunc("other projects")

  lastClickedBtn.classList.remove("active");
  filterBtn[4].classList.add("active");
  lastClickedBtn = filterBtn[4];
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");  

    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// 处理图像点击效果
var modal = document.getElementById("myModal");
const imgs = document.getElementsByClassName("project-img-zoom");
var modal1Img = document.getElementById("img01");
var captionText = document.getElementById("caption");
for (let i = 0; i < imgs.length; i++) {
  imgs[i].onclick = function () {
    modal.style.display = "block";
    modal1Img.src = this.children[0].src;
  };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}