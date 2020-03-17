import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

let bodyList = document.querySelector('body');


export default function fetchCountries (searchQuery) {
        if (searchQuery.target.value !== ''){
        const url = `https://restcountries.eu/rest/v2/name/${searchQuery.target.value}`;
        fetch(url)
        .then((response) => response.json())
        .then(countries => {
        if (countries.length > 10) {
               return notifyError();
        };
        if (countries.length > 2 && countries.length < 10) {
                return renderCountries(countries);
        };
        renderOneCountry (countries);
        })
        .catch(err => console.log(err));
        };
        delDOM();
};

const notifyError = () => {
        delDOM();
        PNotify.error({
                title: false,
                text: 'Too many matches found. Please enter a more specific query!'
        });
};

const renderCountries = (arr) => {
        delDOM();
        let newUl = document.createElement('ul');
        newUl.classList.add("coutries-list", "center-align", "card-panel", "lime");
        let newCountries = arr.map((country) => {
                return `<li class="country-name-item">${country.name}</li>`
        });
        newUl.insertAdjacentHTML('beforeend', newCountries.join(''));
        bodyList.insertAdjacentElement('beforeend', newUl);
};

const renderOneCountry = (arr) => {
        delDOM();
        let newCountry = document.createElement('div');
        newCountry.classList.add("country-info", "center-align", "cyan", "lighten-5");
        let languages = arr[0].languages;
        let langList = languages.map((language) => {
                return `<li class="country-langeuage">${language.name}</li>`   
        });
        newCountry.insertAdjacentHTML('beforeend',
        `<h2 class="center-align" style="dispay: flex">${arr[0].name}</h2>
        <div class="">
                <p><span>Capital: </span>${arr[0].capital}</p>
                <p><span>Population: </span>${arr[0].population}</p>
                <ul><span>Languages: </span>
                        ${langList.join('')}
                </ul>
        </div>
        <img class="" width="200px" src="${arr[0].flag}" alt="${arr[0].name} flag">`
        );
        bodyList.insertAdjacentElement('beforeend', newCountry);
};

const delDOM = () => {
let countriesList = document.querySelector('.coutries-list');
let countryTable = document.querySelector('.country-info');
        if (countriesList !== null) {
                countriesList.remove();
        };
        if (countryTable !== null) {
                countryTable.remove();
        };
};

