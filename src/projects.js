"use strict";

// 프로젝트 필터링 기능
const workCategories = document.querySelector(".work__categories");
const workProjects = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workCategories.addEventListener("click", (event) => {
  const filter = event.target.dataset.filter;
  if (filter == null) {
    return;
  }
  selectedChange(event.target);
  filterProjects(filter);
});

function selectedChange(target) {
  const active = document.querySelector(".selected");
  active.classList.remove("selected");
  target.classList.add("selected");
}

function filterProjects(filter) {
  projects.forEach((project) => {
    if (filter === "all" || filter === project.dataset.type) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
  workProjects.classList.add("anim-out");
  setTimeout(() => {
    workProjects.classList.remove("anim-out");
  }, 250);
}
