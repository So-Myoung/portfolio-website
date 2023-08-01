"use strict";

// 페이지 위로 올렸을 때 navbar--dark css 적용
const navbar = document.querySelector("#navbar");
// getBoundingClientRect() = 홈페이지에 보여지는 최종 값을 반환
// ex) height = 100px; scale(0.5);를 하면 최종 값인 50px이 반환
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // console.log(`window.scrollY: ${window.scrollY}`)
  // console.log(`navbarHeight: ${navbarHeight}`)
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// navbar 메뉴 클릭 시 해당 위치로 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // console.log(event.target);
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(event.target.dataset.link); //null이 아닐 때만 dataset.link 값 출력
  scrollIntoView(link);
});

// 홈 배너 'Contact me' 클릭 시 data link #contact로 이동
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Arrow up 클릭시 data link #home으로 이동(최상위단으로 이동)
const arrowUp = document.querySelector(".arrow-up");
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// 작은 화면일 때 navbar 토글 버튼 접고 펴기 설정
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  /* toggle은 css로 스타일로 준 클래스명을 on/off처럼 껐다 켰다(왔다 갔다)하는 기능
    보통 classList를 이용하여 많이 쓰고, click 이벤트와 함께 많이 사용
    */
});

// 작은 화면 일때 메뉴 클릭시 navbar 닫기
navbarMenu.addEventListener("click", () => {
  navbarMenu.classList.remove("open");
});

// 스크롤 다운 시 홈 천천히 투명해짐
const home = document.querySelector(".home__container");
// # home -> id = home 전체를 의미하므로 전체가 transparent,
// 그러나 container안에 있는것만 바꾸고 싶으므로 .home__container
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // console.log(`homeHeight: ${homeHeight}`)
  // console.log(`opacity: ${1 - window.scrollY / homeHeight}`)
  // ex) homeHeight가 800 이라면
  // 1 - (0 / 800) = 투명도 1
  // 1 - (400 / 800) = 투명도 0.5 (반만 내렸을 경우)
  // 1 - (800 / 800) = 투명도 0
  // 1 - (1600 / 800) = 투명도 -1
  // 1 - (800초과 / 800) = 투명도 < 0, 0 이하부터는 모두 투명도 0으로 적용됨
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Arrow up버튼을 아래로 스크롤시 투명하게 처리함
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.style.opacity = 1;
  } else {
    arrowUp.style.opacity = 0;
  }
});

// 반복되는 문장은 function으로 정의하여 코드의 불필요한 반복을 줄인다.
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  // 사용 예)
  // const element = document.getElementById("box");
  // element.scrollIntoView();
  // element.scrollIntoView(false);
  // element.scrollIntoView({block: "end"});
  // element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
