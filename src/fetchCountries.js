import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

const bodyList = document.querySelector('body');


export default function fetchCountries (searchQuery) {
        if (searchQuery.target.value !== ''){
        delDOM();
        const url = `https://restcountries.eu/rest/v2/name/${searchQuery.target.value}`;
        fetch(url)
        .then((response) => response.ok ? response : Promise.reject(response))
        .then((response) => response.json())
        .then(countries => {
                if (countries.length > 10) {
                        notifyErrorMany();
                };
                if (countries.length > 1 && countries.length < 10) {
                        renderCountries(countries);
                };
                if (countries.length === 1){
                        renderOneCountry (countries);
                };
        })
        .catch(err => {notifyErrorNothing();});
        };
};

const notifyErrorMany = () => {
        delDOM();
        PNotify.error({
                title: false,
                text: 'Too many matches found. Please enter a more specific query!'
        });
};

const notifyErrorNothing = () => {
        delDOM();
        PNotify.error({
                title: false,
                text: 'No matches found. Please enter a more specific query!'
        });
};

const renderCountries = (arr) => {
        delDOM();
        let newUl = document.createElement('ul');
        newUl.classList.add("coutries-list", "center-align", "card-panel", "lime");
        let newCountries = arr.reduce((acc, country) => {
                return acc + `<li class="country-name-item">${country.name}</li>`
        }, '');
        newUl.insertAdjacentHTML('beforeend', newCountries);
        bodyList.insertAdjacentElement('beforeend', newUl);
};

const renderOneCountry = (arr) => {
        delDOM();
        let newCountry = document.createElement('div');
        newCountry.classList.add("country-info", "center-align", "cyan", "lighten-5");
        let languages = arr[0].languages;
        let langList = languages.reduce((acc, language) => {
                return acc + `<li class="country-langeuage">${language.name}</li>`   
        }, '');
        newCountry.insertAdjacentHTML('beforeend',
        `<h2 class="center-align" style="dispay: flex">${arr[0].name}</h2>
        <div class="">
                <p>Capital: ${arr[0].capital}</p>
                <p>Population: ${prettify(arr[0].population)}</p>
                <ul>Languages:
                        ${langList}
                </ul>
        </div>
        <img class="" width="200px" src="${arr[0].flag}" alt="${arr[0].name} flag">`
        );
        bodyList.insertAdjacentElement('beforeend', newCountry);
};

const prettify = (num) => {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
};

const delDOM = () => {
let countriesList = document.querySelector('.coutries-list');
let countryTable = document.querySelector('.country-info');
        if (countriesList !== null) {
                countriesList.remove();
                return;
        };
        if (countryTable !== null) {
                countryTable.remove();
        };
};

