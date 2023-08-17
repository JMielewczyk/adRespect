import Macy from "macy";

const macyContainer = document.getElementById("macy-container");

var macyInstance = Macy({
  container: macyContainer,
  trueOrder: false,
  waitForImages: true,
  margin: 20,
  columns: 3,
});

const btnLoadMoreImg = document.querySelector("#btnLoadMoreImg");
btnLoadMoreImg.addEventListener("click", async () => {
  const imagesToLoad = 6;
  for (let i = 0; i < imagesToLoad; i++) {
    const getRandomImg = async () => {
      const randomImgUrl = fetch("https://picsum.photos/200/300");
      const randomImg = await randomImgUrl;
      return randomImg.url;
    };
    const createElements = (urlToImage) => {
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      newImg.setAttribute("loading", "lazy");
      newImg.setAttribute("src", urlToImage);
      newImg.setAttribute("alt", "");
      newImg.className = "w-full h-full";
      macyContainer.appendChild(newDiv);
      newDiv.appendChild(newImg);
      console.log("img");
    };

    const randomImg = await getRandomImg();
    createElements(randomImg);
  }
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true);
  }, true);
  console.log("recalculate");
});

const navOfferContainer = document.querySelector("#navOfferContainer");
navOfferContainer.addEventListener("click", () => {
  const dropDownMenu = navOfferContainer.querySelector("#dropDownMenu");
  dropDownMenuClasses = ["h-28"];
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
