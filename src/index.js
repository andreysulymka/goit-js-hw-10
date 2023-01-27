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
    const countryName = e.target.value;
    console.log(countryName);
    fetchCountries(countryName)
        .then(userdata => console.log(userdata))
        .catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        });
    // 
};
function renderProfile(userdata) {
    console.log(userdata)
    clearInput();
    if (userdata.length > 10) { Notiflix.Notify.info("Too many matches found. Please enter a more specific name."); }
    else if (userdata.length === 1) { countryInfo.innerHTML = rendercountryInfo(userdata[0]); }
    else {
        const renderListCountry = userdata.map(country => renderCountriesList(country)).join('');
        countryList.insertAdjacentHTML('beforeend', renderListCountry);
    }
};

function renderCountriesList({ flags, name }) {
    return `<li class='country-ListInfo'>
    <img class='country-flag' src='${flags.svg}'/>
    <h2 class='country-list-name'>${name.official}</h2>
    </li>`;
};

function rendercountryInfo({ name, capital, population, flags, languages }) {
    return `<li class='country-main-info'>
    <div class='wrapper-country-info'>
    <img class='country-flag-info src='${flags.svg}'/>'
    <h2 class='country-list-name'>${name.official}</h2>
    </div>
    <div class='country-secondary-info'>
    <p><b>capital:</b> ${capital}</p>
    <p><b>population:</b> ${population}</p>
    <p><b>languages:</b> ${languages}</p>
    </div>
    </li>`;
};


