const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

//ID를 가지고 와 section에 매핑(배열 형태) - html의 각 section 요소 가지고 옴
const sections = sectionIds.map((id) => document.querySelector(id));
//href를 가지고 있는 navbar 요소에 매핑 - navbar 요소 가지고옴
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`)
);
/* 자세한 동작은 아래서 지정, 여기서는 배열 선언 같은 느낌.
isIntersecting(화면에 노출되었는지 여부)를 사용하여 노출 되면 true,
노출되지 않으면 false 처리하여 배열에 담아서 저장. 처음 선언 할 때는 전부 false로 set */
const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: "-20% 0px 0px 0px",
  threshold: [0, 0.98],
};
// callback 함수명, options 순서. 옵션을 반영하려면 반드시 options를 인자로 넣어주어야함.
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

function observerCallback(entries) {
  let selectLastOne;
  entries.forEach((entry) => {
    // console.log(entry);
    /* - IntersectionObserver key value
    intersectionRatio: 화면에 노출된 비율
    isIntersecting: 화면에 노출되었는지 여부, 노출 시 -true/ 아닐 시 - false
    target: 물고있는 태그 전체(타켓), 여기서는 <section id='#id'></section>
    target.id: section 값의 정보가 들어있음, target안에 id 값 존재 */
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    /* isIntersecting(화면에 노출되었는지 여부)를 사용하여 노출되면 true,
  노출되지 않으면 false 처리하여 배열에 담아서 저장. */
    selectLastOne =
      index === sectionIds.length - 1 &&
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.95;
  });
  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true);
  /* indexOf() 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 
  지정한 요소가 배열에 존재하지 않으면 -1을 반환합니다. */
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove("active");
  activeNavItem = navItem;
  activeNavItem.classList.add("active");
}
