function fetchCountries(countryName) {
 return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`)
     .then(res => {
         if (!res.ok) {
             throw new Error(res.status);
         }
         return res.json()
     })   
};

export { fetchCountries };