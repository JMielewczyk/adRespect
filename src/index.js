import Macy from "macy";

const macyContainer = document.getElementById("macy-container");

var macyInstance = Macy({
  container: macyContainer,
  trueOrder: false,
  waitForImages: true,
  margin: 20,
  columns: 3,
});

const header = document.querySelector("#header");

let slideElements = [];
for (let i = 0; i < header.children.length; i++) {
  if (header.children[i].dataset.id === "slide") {
    slideElements = [...slideElements, "slide"];
  }
}
slideElements = slideElements.length;

let currentSlideIndex = 0;
let currentTransformX = 0;
const widthOfOneElement = 100 / slideElements;

const changePosition = (slideIndex, type) => {
  if (slideIndex > slideElements - 1) {
    currentTransformX = 0;
    header.style.transform = `translateX(${currentTransformX})`;
    currentSlideIndex = 0;
  } else if (slideIndex < 0) {
    currentTransformX = widthOfOneElement * slideElements - widthOfOneElement;
    header.style.transform = `translateX(-${currentTransformX}%)`;
    currentSlideIndex = slideElements - 1;
  } else if (type === "arrowLeft") {
    currentTransformX = currentTransformX - widthOfOneElement;
    header.style.transform = `translateX(-${currentTransformX}%)`;
  } else if (type === "arrowRight" || type === "auto") {
    currentTransformX = currentTransformX + widthOfOneElement;
    header.style.transform = `translateX(-${currentTransformX}%)`;
  }
};

let intervalDelay = 3000;
let headerSlideShow;
const handleInterval = () => {
  headerSlideShow = setInterval(() => {
    currentSlideIndex++;
    changePosition(currentSlideIndex, "auto");
  }, intervalDelay);
};
handleInterval();

const slideBtnsContainer = document.querySelector("#slideBtnsContainer");
slideBtnsContainer.addEventListener("click", (e) => {
  const arrowId = e.target.id;
  if (arrowId === "arrowLeft") {
    currentSlideIndex--;
    changePosition(currentSlideIndex, "arrowLeft");
  } else if (arrowId === "arrowRight") {
    currentSlideIndex++;
    changePosition(currentSlideIndex, "arrowRight");
  }
  clearInterval(headerSlideShow);
  setTimeout(handleInterval, 1000);
});

let fetchedImages = [];

const btnLoadMoreImg = document.querySelector("#btnLoadMoreImg");
btnLoadMoreImg.addEventListener("click", async () => {
  const imagesToLoad = 10;
  for (let i = 0; i < imagesToLoad; i++) {
    const getRandomImg = async () => {
      const randomImgUrl = fetch("https://picsum.photos/400/600");
      const randomImg = await randomImgUrl;
      return { id: randomImg.headers.get("Picsum-ID"), url: randomImg.url };
    };
    const createElements = (imgObject) => {
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      newImg.setAttribute("loading", "lazy");
      newImg.setAttribute("src", imgObject.url);
      newImg.setAttribute("alt", "");
      newImg.className = "w-full h-full";
      newImg.id = "fetchedImg";
      newImg.dataset.id = imgObject.id;
      macyContainer.appendChild(newDiv);
      newDiv.appendChild(newImg);
      fetchedImages = [...fetchedImages, imgObject];
    };

    const randomImgObject = await getRandomImg();
    createElements(randomImgObject);
  }
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true);
  }, true);
});

macyContainer.addEventListener("click", async (e) => {
  const idImg = "fetchedImg";
  let fullImgPath = "";
  if (e.target.id === idImg) {
    const req = fetch(
      `https://picsum.photos/id/${e.target.dataset.id}/info`
    ).then((res) => res.json());
    const data = await req;
    fullImgPath = data.download_url;
  } else {
    fullImgPath = e.target.src;
  }

  const background = document.createElement("div");
  const newContainer = document.createElement("div");
  const newImg = document.createElement("img");
  const exitBtn = document.createElement("div");

  background.className =
    "fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-10 bg-gray-500/75";
  background.id = "popUpBackground";
  newContainer.className =
    " w-[80vw] max-w-[1280px] h-[55vh] relative border-2 border-black bg-white";
  newImg.className = "w-full h-full object-contain overflow-hidden";
  exitBtn.className =
    "absolute cursor-pointer right-0 top-0 rounded-full border-[1px] border-black bg-white w-[25px] h-[25px] flex justify-center items-center -translate-y-[50%] translate-x-[50%]";
  exitBtn.textContent = "X";
  exitBtn.id = "exitBtn";
  newImg.setAttribute("src", fullImgPath);
  document.body.appendChild(background);
  background.appendChild(newContainer);
  newContainer.appendChild(newImg);
  newContainer.appendChild(exitBtn);

  background.addEventListener("click", (e) => {
    if (e.target.id === background.id || e.target.id === exitBtn.id) {
      background.remove();
    } else return;
  });
});

const navOfferContainer = document.querySelector("#navOfferContainer");
navOfferContainer.addEventListener("click", () => {
  const dropDownMenu = navOfferContainer.querySelector("#dropDownMenu");
  const dropDownMenuClasses = ["h-28"];
  dropDownMenuClasses.forEach((className) =>
    dropDownMenu.classList.toggle(className)
  );

  const offerArrowClasses = ["rotate-180"];
  const offerArrow = document.querySelector("#offerArrow");
  offerArrowClasses.forEach((className) =>
    offerArrow.classList.toggle("rotate-180")
  );
});

const magnifier = document.querySelector("#magnifier");
magnifier.addEventListener("click", () => {
  const magnifierClasses = ["left-0"];
  magnifierClasses.forEach((className) => magnifier.classList.add(className));

  const searchInputClasses = ["w-full", "pl-6", "pr-12"];
  const searchInput = document.querySelector("#searchInput");
  searchInputClasses.forEach((className) =>
    searchInput.classList.add(className)
  );
  searchInput.focus();

  const searchContainerClasses = [
    "flex",
    "justify-center",
    "items-center",
    "basis-[300%]",
    "relative",
  ];
  const searchContainer = document.querySelector("#searchContainer");

  searchContainerClasses.forEach(
    (className) =>
      (searchContainer.className = searchContainerClasses.join(" "))
  );

  const btnSubmitClasses = [
    "absolute",
    "w-12",
    "right-0",
    "justify-center",
    "items-center",
  ];
  const btnSubmit = document.querySelector("#btnSubmit");
  btnSubmitClasses.forEach(
    (className) => (btnSubmit.className = btnSubmitClasses.join(" "))
  );
});
