// Take input and load data 
const loadPhonesData = () => {
    const inputField = document.getElementById("input-filed");
    const inputFieldValue = inputField.value;
    const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`;
    fetch (searchUrl)
    .then (res => res.json())
    .then (data => console.log(data.data))
}
// Loaded data display in HTML
const displayPhones = (phones) => {
    
}