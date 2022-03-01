// Take input and load data
const loadPhonesData = () => {
  const inputField = document.getElementById("input-filed");
  const inputFieldValue = inputField.value;
  const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`;
  fetch(searchUrl)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
  inputField.value = "";
};
loadPhonesData();
// Loaded data display in HTML
const displayPhones = (phones) => {
  const cardConatiner = document.getElementById("cards-container");
  cardConatiner.textContent = "";
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
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
};

const loadPhoneSlug = (phoneSlug) => {
  const phoneId = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  fetch(phoneId)
    .then((res) => res.json())
    .then((data) => loadUniquePhone(data.data));
};
// display one phone details using slug
const loadUniquePhone = (phoneId) => {
  const mainFeatures = phoneId.mainFeatures;
  const sensors = mainFeatures.sensors;
  const allSensors = sensors.join(", ");
  const modalDiv = document.getElementById("modal-div");
  modalDiv.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card", "border-primary");
  div.innerHTML = `
  <img src="${phoneId.image}" class="card-img-top w-50 mx-auto pt-2" alt="...">
  <div class="card-body">
    <h4 class="card-title fw-bold m-0">${phoneId.name}</h4>
    <p class="card-text text-secondary"><i class="fa-solid fa-calendar-days"></i> <span>Release date: </span> ${
      phoneId.releaseDate ? phoneId.releaseDate : "Sorry! No release date found"
    }</p>
    <div class="list-group">
      <div class="row row-cols-1 g-1">
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-hard-drive"></i> <span class="fw-bold">Storage:</span> ${
            mainFeatures.storage ? mainFeatures.storage : "Sorry! No date found"
          }</p>
        </div>
        <div class="col h-100">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-mobile-screen-button"></i> <span class="fw-bold">Display Size: </span> ${
            mainFeatures.displaySize
              ? mainFeatures.displaySize
              : "Sorry! No date found"
          }</p>
        </div>
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-microchip"></i> <span class="fw-bold">Processor:</span>  ${
            mainFeatures.chipSet ? mainFeatures.chipSet : "Sorry! No date found"
          }</p>
        </div>
        <div class="col">
          <p class="list-group-item list-group-item-action list-group-item-light"><i class="fa-solid fa-bahai"></i> <span class="fw-bold">Sensor:</span> ${
            allSensors ? allSensors : "Sorry! No date found"
          }</p>
        </div>
      </div>
   </div>

  </div>
  `;
  modalDiv.appendChild(div);
};
