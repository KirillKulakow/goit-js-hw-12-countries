import '../node_modules/pnotify/dist/PNotifyBrightTheme.css'
import fetchCountries from './fetchCountries.js'

const inputCountry = document.querySelector('#icon_prefix')


inputCountry.addEventListener('input', _.debounce(fetchCountries, 500));
