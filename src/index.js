import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchcountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const inputRef = document.getElementById('search-box');
inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
const countryList = document.getElementsByClassName("country-list");
const countryInfo = document.getElementsByClassName("country-info");

function onInput(e) {
    const countryName = e.target.value.trim();
    console.log(countryName);
    fetchCountries(countryName)
        .then(renderCountryList)
     .catch(error=>{
    Notiflix.Notify.failure("Oops, there is no country with that name")
    });
    
};

function clearInput() {
    countryList.innerHTML = ''; 
    countryInfo.innerHTML = '';
}

function renderCountryList(res) {
  
    console.log(res)
    clearInput();

    if (res.length > 10) { Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); }
    else if (res.length === 1) { countryInfo.innerHTML = renderCountryInfo(res[0]); }
    else {
        const renderListCountry = res.map(country => renderCountriesList(country)).join('');
        countryList.insertAdjacentHTML('beforeend', renderListCountry);
    }
};

function renderCountriesList({ flags, name }) {
    return `<li class='country-listInfo'>
    <img class='country-flag' src='${flags}'/>
    <h2 class='country-list-name'>${name}</h2>
    </li>`;
};

function renderCountryInfo({ name, capital, population, flags, languages }) {
    return `<li class='country-main-info'>
    <div class='wrapper-country-info'>
    <img class='country-flag-info src='${flags}'/>'
    <h2 class='country-list-name'>${name}</h2>
    </div>
    <div class='country-secondary-info'>
    <p><b>capital:</b> ${capital}</p>
    <p><b>population:</b> ${population}</p>
    <p><b>languages:</b> ${languages}</p>
    </div>
    </li>`;
};


