import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchcountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
const countryList = document.getElementsByClassName("country-list");
const countryInfo = document.getElementsByClassName("country-info");

function onInput(e) {
    e.preventDefault();
    const inputRef = e.target.value.trim();
   fetchCountries(inputRef).then(renderCountryList)
    // .catch(onError);
    
};


// countriesObj це об'єкт країни
function renderCountryList(countriesObj) {
  
    console.log(countriesObj)
    
    if (countriesObj.length > 10) { Notiflix.Notify.info("Too many matches found. Please enter a more specific name.") }
    else if (countriesObj === 0){ countryList.innerHTML = '' }
    else if (countriesObj.length === 1) { countryInfo.innerHTML = renderCountryInfo(countriesObj[0]) }
    else {const renderListCountry = countriesObj.map(country => renderCountriesList(country)).join('');
        countryList.insertAdjacentHTML('beforeend', renderListCountry);
    } ;
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
    <img class='country-flag-info src='${flags.svg}'</img>
    <h2 class='country-list-name'>${name}</h2>
    </div>
    <div class='country-secondary-info'>
    <p><b>capital:</b> ${capital}</p>
    <p><b>population:</b> ${population}</p>
    <p><b>languages:</b> ${languages}</p>
    </div>
    </li>;`
};

// function onError(err) {
//     console.log(err)
//     // Notiflix.Notify.failure("Oops, there is no country with that name")
// }


// function clearInput() {
//     countryList.innerHTML = ''; 
//     countryInfo.innerHTML = '';
// }