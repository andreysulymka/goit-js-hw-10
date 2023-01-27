function fetchCountries(countryName) {
 return fetch(`https://restcountries.com/v2/name/${countryName}`)
        .then(res => res.json())   
};

export { fetchCountries };