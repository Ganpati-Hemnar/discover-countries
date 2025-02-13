
let Modebtn = document.querySelector("#Modebtn");


document.getElementById('searchInput').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});

function searchCountry() {
    let inputField = document.getElementById('searchInput');
    let input = inputField.value.toLowerCase();
    let countryCards = document.querySelectorAll('.country-card');

    countryCards.forEach(card => {
        let countryName = card.querySelector('.cart-title').textContent.toLowerCase();
        card.style.display = countryName.includes(input) ? "block" : "none";

        // If the country matches
        if (countryName.includes(input)) {
            card.addEventListener('click', () => {
                inputField.value = ""; 
                resetCountries(); 
            });
        }
    });
}

// Function to reset the country list after clicking
function resetCountries() {
    document.querySelectorAll('.country-card').forEach(card => {
        card.style.display = "block";
    });
}

function changeMode() {
    
    if (document.body.style.backgroundColor === 'black') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        Modebtn.textContent = "Dark Mode"; 
    } else {
        // Switch to dark mode
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        Modebtn.textContent = "Light Mode"; 
    }
}

function goToHomePage() {
    window.location.href = "Homepage.html"; //For home page
  }





fetch("https://restcountries.com/v3.1/all")
.then((res)=> res.json())
.then((data) =>{
   data.forEach((country) =>{
    console.log(country.name)
const countriesContainer = document.querySelector('.countries-container')
const countryCard =document.createElement('a');
countryCard.classList.add('countryCard')


const cardHtml =`
            <a href="/DetailPage.html?name=${country.name.common}" class="country-card">
                <img src="${country.flags.svg}" alt="falg">
                <div class="card-text">
                <h3 class="cart-title" >${country.name.common}</h3>
                <p><b>Populations :</b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region : </b>${country.region}</p>
                <p><b>Capitals : </b>${country.capital}</p>
                </div>
            </a>
`
countryCard.innerHTML=cardHtml;
countriesContainer.append(countryCard)

   })
})



// for converting  number in indian digit
function formatIndianNumber(number) {
    let numStr = number.toString();
    return numStr.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}
