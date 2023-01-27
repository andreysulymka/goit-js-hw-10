function fetchCountries(countryName) {
 return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name.official,capital,population,flags.svg,languages`)
     .then(res => {
         if (!res.ok) {
             throw new Error(res.status);
         }
         return res.json()
     })   
};

export { fetchCountries };