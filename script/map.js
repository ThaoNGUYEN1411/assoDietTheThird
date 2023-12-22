const recievedAdresse = (window.location.href).split('?')[1];
const title = document.querySelector('#map h1');
title.innerHTML = recievedAdresse;

const googleMapIframe = document.getElementById('googleMaps');
const apiKey = window.config.apiKey;
console.log(apiKey);

const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${recievedAdresse}`;
googleMapIframe.setAttribute('src', url);