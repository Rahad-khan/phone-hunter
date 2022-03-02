// Global variable
const cardConatiner = document.getElementById("cards-container");
// col div function
const colDiv = () => {
  const div = document.createElement("div");
  div.classList.add("col");
  return div;
};
// DIsplay Function
const isDisplayShow = (id, displayProperty) => {
  document.getElementById(id).style.display = displayProperty;
};
// Take input and load data
const loadPhonesData = () => {
  const inputField = document.getElementById("input-filed");
  isDisplayShow("spinner-toogler", "block");
  const inputFieldValue = inputField.value;
  const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`;
  fetch(searchUrl)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
  inputField.value = "";
};
// Loaded data display in HTML
const displayPhones = (phones) => {
  // First twenty phones
  const twentyPhones = phones.slice(0, 20);
  const restOfPhones = phones.slice(20, phones.length);
  cardConatiner.textContent = "";
  //No data found
  if (phones.length === 0) {
    isDisplayShow("spinner-toogler", "none");
    isDisplayShow("show-more", "none");
    isDisplayShow("no-phone", "block");
    return;
  } else {
    isDisplayShow("no-phone", "none");
  }
  twentyPhones?.forEach((phone) => {
    const div = colDiv();
    div.innerHTML = `
            <div class="card p-3 shadow text-center">
              <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" onclick="loadPhoneSlug('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Explore More</button>
                </div>
              </div>
            </div>
        `;
    cardConatiner.appendChild(div);
  });
  if (phones.length > 20) {
    isDisplayShow("show-more", "block");
  }
  // SHowmore phone;
  document.getElementById("show-more").addEventListener("click", function () {
    cardConatiner.textContent = "";
    restOfPhones?.forEach((phone) => {
      const div = colDiv();
      div.innerHTML = `
                <div class="card p-3 shadow text-center">
                  <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                  <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <div class="d-flex justify-content-center">
                      <button class="btn btn-primary" onclick="loadPhoneSlug('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Explore More</button>
                    </div>
                  </div>
                </div>
            `;
      cardConatiner.appendChild(div);
    });
    isDisplayShow("show-more", "none");
  });
  isDisplayShow("spinner-toogler", "none");
};

const loadPhoneSlug = (phoneSlug) => {
  const phoneId = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(phoneId)
    .then((res) => res.json())
    .then((data) => loadUniquePhone(data.data));
};
// display one phone details using slug by Modal
const loadUniquePhone = (phoneId) => {
  // main fetures
  const mainFeatures = phoneId.mainFeatures;
  // sensors
  const sensors = mainFeatures.sensors;
  const allSensors = sensors.join(", ");
  // others
  const others = phoneId.others;
  const modalDiv = document.getElementById("modal-div");
  modalDiv.textContent = "";
  const card = document.createElement("div");
  card.classList.add("card", "border-primary");
  card.innerHTML = `
  <img src="${phoneId.image}" class="card-img-top w-50 mx-auto pt-2" alt="...">
  `;
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.innerHTML = `
  <h4 class="card-title fw-bold m-0">${phoneId.name}</h4>
    <p class="card-text text-secondary"><i class="fa-solid fa-calendar-days"></i> <span>Release date: </span> ${
      phoneId.releaseDate ? phoneId.releaseDate : "Sorry! No release date found"
    }</p>
    <div class="list-group">
      <div class="row row-cols-1 g-1">
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-hard-drive"></i> <span class="fw-bold text-black">Storage:</span> ${
            mainFeatures.storage ? mainFeatures.storage : "Sorry! No date found"
          }</p>
        </div>
        <div class="col h-100">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-mobile-screen-button"></i> <span class="fw-bold text-black">Display Size: </span> ${
            mainFeatures.displaySize
              ? mainFeatures.displaySize
              : "Sorry! No date found"
          }</p>
        </div>
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-microchip"></i> <span class="fw-bold text-black">Processor:</span>  ${
            mainFeatures.chipSet ? mainFeatures.chipSet : "Sorry! No date found"
          }</p>
        </div>
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-bahai"></i> <span class="fw-bold text-black">Sensor:</span> ${
            allSensors ? allSensors : "Sorry! No date found"
          }</p>
        </div>
      </div>
  `;
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `<span class="fw-bold ms-3"><i class="fa-solid fa-arrow-up-wide-short"></i> Others: </span>`;
  if (others == undefined) {
    const p = document.createElement("p");
    p.classList.add(
      "list-group-item",
      "list-group-item-action",
      "list-group-item-light"
    );
    p.innerText = `No Data Availbale`;
    col.appendChild(p);
  } else {
    for (const [key, value] of Object.entries(others)) {
      const p = document.createElement("p");
      p.classList.add(
        "list-group-item",
        "list-group-item-action",
        "list-group-item-light"
      );
      p.innerText = `${key} : ${value}`;
      col.appendChild(p);
    }
  }
  card.appendChild(cardBody);
  cardBody.appendChild(col);
  modalDiv.appendChild(card);
};
