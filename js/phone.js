// Take input and load data 
const loadPhonesData = () => {
    const inputField = document.getElementById("input-filed");
    const inputFieldValue = inputField.value;
    const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`;
    fetch (searchUrl)
    .then (res => res.json())
    .then (data => displayPhones(data.data))
    inputField.value = '';
}
// Loaded data display in HTML
const displayPhones = (phones) => {
    const cardConatiner = document.getElementById("cards-container");
    cardConatiner.textContent='';
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card p-3 shadow text-center">
              <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" onclick="phoneData(${phone.slug})">Explore More</button>
                </div>
              </div>
            </div>
        `
        cardConatiner.appendChild(div);
    })    
}

