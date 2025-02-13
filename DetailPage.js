
// Create and append a loading message to the body
const loadingMessage = document.createElement('div');
loadingMessage.id = 'loading';
loadingMessage.innerHTML = '<h2>Loading, please wait...</h2>';
document.body.appendChild(loadingMessage);
const name = new URLSearchParams(window.location.search).get('name');
fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)

  .then((rev) => rev.json())
  .then((data) => {
    data.forEach((ele) => {
      
      const root = document.querySelector('.root');
      const Main = document.createElement('div');
      Main.classList.add('main');
      // Creating a string to hold all languages 
      const languages = Object.values(ele.languages).join(', ');

      // Fetching border country names and creating href links
      const borders = ele.borders.map(border => {
        // Fetch the full name of the border country
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then(res => res.json())
          .then(borderData => {
            const borderName = borderData[0].name.common;
            return `<a href="/DetailPage.html?name=${borderName}">${borderName}</a>`;
          });
      });

      // Wait for all border fetches to complete
      Promise.all(borders).then(bordersList => {
        Main.innerHTML = `
          <div class="flag">
            <img src="${ele.flags.svg}" alt="flag">
          </div>
          <div class="details1">
            <h2 class="title">${ele.name.common}</h2>
            <p><b>Native Name : </b>${ele.name.common}</p>
            <p><b>Population : </b>${ele.population.toLocaleString('en-IN')}</p>
            <p><b>Region : </b>${ele.region}</p>
            <p><b>Sub Region : </b>${ele.subregion}</p>
            <p><b>Capital : </b>${ele.capital}</p>
          </div>
          <div class="details2">
            <p><b>Top Level Domain : </b>${ele.altSpellings[0]}</p>
            <p><b>Currencies : </b>${Object.values(ele.currencies)[0].name}</p>
            <p><b>Languages : </b>${languages}</p>
          </div>
          <div class="details3">
            <p><b>Border Countries : </b>${bordersList.join(' | ')}</p>
          </div> 
        `;
        // Remove the loading message after the content is ready
        document.body.removeChild(loadingMessage);
        root.append(Main);
      });
    });
  })
 

  
  .catch((error) => console.error('Error:', error));

 
