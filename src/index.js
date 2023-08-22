import Macy from "macy";

// Navbar - styling for smaller devices

let offerHamburgerFlag = false;

const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener("click", () => {
  const hamburgerMenu = document.querySelector("#hamburgerMenu");
  hamburgerMenu.style.transform = `translateX(0)`;
});

const offerHamburger = document.querySelector("#offerHamburger");
offerHamburger.addEventListener("click", () => {
  const allChildsOfOffer = document.querySelectorAll(
    `[data-id="childOfferHamburger"`
  );
  const offerHamburgerContainer = document.querySelector(
    "#offerHamburgerContainer"
  );
  if (offerHamburgerFlag === true) {
    offerHamburgerContainer.style.minHeight = "100px";
    allChildsOfOffer.forEach((child) => (child.style.height = "0"));
    offerHamburgerFlag = false;
  } else {
    offerHamburgerContainer.style.minHeight = "400px";
    allChildsOfOffer.forEach((child) => (child.style.height = "100%"));
    offerHamburgerFlag = true;
  }
});

const closeBtnHamburgerMenu = document.querySelector("#closeBtnHamburgerMenu");
closeBtnHamburgerMenu.addEventListener("click", () => {
  const hamburgerMenu = document.querySelector("#hamburgerMenu");
  hamburgerMenu.style.transform = `translateX(100%)`;
});

//Navbar drop down menu - only for devices from 768px

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

// ---------------------------------------------------------------------------
// Header - slideShow + manual change. After manual change there is a delay of 1 second to next interval.

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
let onGoingTimeout = false;
const handleInterval = () => {
  onGoingTimeout = false;
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
  if (onGoingTimeout) return;
  setTimeout(handleInterval, 1000);
  onGoingTimeout = true;
});

// Btn to scroll down to photos section
const sectionProjects = document.querySelector("#sectionProjects");
const btnsScroll = document.querySelectorAll('[data-id="btnScroll"');

btnsScroll.forEach((btn) => {
  btn.addEventListener("click", () => {
    const topOfSection = sectionProjects.getBoundingClientRect().top;
    window.scrollTo({
      top: topOfSection,
      left: 0,
      behavior: "smooth",
    });
  });
});

//-------------------------------------------------------------------------

//Section 1 - under Header. After click element is making rotation on X axis of 180deg.
// Elements on front side hide and on the back(front after click) they appear visible.

const boxesSection1 = document.querySelectorAll('[data-id="boxSection1"');
boxesSection1.forEach((box) => {
  box.addEventListener("click", () => {
    const childs = [...box.children];
    setTimeout(() => {
      childs.forEach((child) => {
        if (child.dataset.id === "inverseText") {
          child.classList.toggle("activeInverseText");
        } else {
          child.classList.toggle("activeHide");
        }
      });
    }, 150);
    box.classList.toggle("activeBox");
  });
});

// -----------------------------------------------------------------

// Photos section. After clicking button 10 more images are being fetched from random images API.
// Then new elements are being created and appended to photos section container.
// This is a small simulation of how it could be working when fetching images from server.
// After clicking on photo pop up will appear and will fetch a full resolution image - only for previously fetched images from API.

// Macy.js used for styling the section of photos.
const macyContainer = document.getElementById("macy-container");

var macyInstance = Macy({
  container: macyContainer,
  trueOrder: false,
  waitForImages: true,
  margin: 20,
  columns: 3,
  breakAt: {
    640: 2,
  },
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
    " w-[80vw] max-w-[1536px] h-[75vh] relative border-2 border-black bg-white";
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
// -------------------------------------------------------------------------
