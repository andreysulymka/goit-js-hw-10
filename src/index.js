import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const inputRef = document.getElementById('search-box');
inputRef.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(e) {
        const countryName = e.target.value;
    console.log(countryName)
   fetchCountries(countryName)
    .then(userdata => console.log(userdata))
};

