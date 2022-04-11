const moviesContainer = document.querySelector(".movies");
const selector = document.querySelector(".selector");
const search = document.getElementById('searchBox');
const searchBtn = document.getElementById('searchBtn');
const movieDate = document.getElementById('date');
const img = "https://image.tmdb.org/t/p/original";
const api = {
  movie: "https://api.themoviedb.org/3/search/movie",
  id:
    "https://api.themoviedb.org/3/movie/5?api_key=e4684d37a732211173533d0ec685c6ae",
  key: "api_key=e4684d37a732211173533d0ec685c6ae",
  series:
    "https://api.themoviedb.org/3/search/tv?api_key=e4684d37a732211173533d0ec685c6ae&query=",
    movieYear:"https://api.themoviedb.org/3/discover/movie?primary_release_year=",
    seriesYear:"https://api.themoviedb.org/3/discover/tv?primary_release_year="
};


//Get Year
  let date = new Date();
  let currentYear = date.getFullYear();
  let startYear = 1950;
  let diff = currentYear - 1950;
  //  console.log(diff)
  for (let x = 0; x <= diff; x++) {
    let a = `${startYear++}`;
    movieDate.innerHTML += `<option value="${a}">${a}</option>`;
  }
//Get Year




//Destructuring
const {movie,series,key,movieYear,seriesYear} = api;

//On Search
selector.addEventListener('click',(selected)=>{
    let select = selected.target.value;

    if(select ==="movies"){
  moviesContainer.innerHTML = "";

      if(search.value.length != 0){
      
            const movieUrl = `${movie}?${key}&query=${search.value}`;
      fetch(movieUrl).then(response=>response.json()).then(datas=>{
          datas.results.forEach(data=>{
           
            processingMovies(data)

          })
      })

      }
      search.setAttribute("placeholder", "Search Movies");

    }else if(select ==="series"){
      if (search.value.length != 0) {
        moviesContainer.innerHTML = "";

        const seriesUrl = `${series}?${key}&query=${search.value}`;

        fetch(seriesUrl)
          .then((response) => response.json())
          .then((datas) => {
            datas.results.forEach((data) => {
              processingSeries(data);
            });
          });
      }

      search.setAttribute('placeholder','Search Series')

    }
})


searchBtn.addEventListener('click',()=>{

 let value = search.value; 
  moviesContainer.innerHTML = "";

      if(search.value.length != 0){

 if(selector.value === "movies"){
     const movieUrl = `${movie}?${key}&query=${value}`;
      fetch(movieUrl).then(response=>response.json()).then(datas=>{
          datas.results.forEach(data=>{
           
            processingMovies(data)

          })
      })
  }else if(selector.value === "series"){
         const seriesUrl = `${series}?${key}&query=${value}`;

      fetch(seriesUrl).then(response=>response.json()).then(datas=>{
          datas.results.forEach(data=>{
           
            processingSeries(data)

          })
      })
  }
    
      }


 



})

const processingSeries = (data)=>{
  let imgurl;

if(data.backdrop_path ===null){ 
 imgurl = img + data.poster_path;

}else{ 
 imgurl =  img + data.backdrop_path;

}

let altimg = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";


   let htmlData = `   <div class="card">

                    <div class="hidden" style="background:url( ${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }); background-size:cover; color:white; " alt="${data.original_title}"> ${data.overview} </div>
                <div class="card-head">
                    <img src="${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }" alt="${data.original_title}">
                </div>
                <div class="card-body">
                    <small class="category category-2">${data.first_air_date}</small>
                    <h3>${data.name}</h3>
                    <p>${data.overview}</p>
                    <div class="user">
                    <small class="category rating">Rating: ${data.vote_average}</small>
                      
                      
                    </div>
                </div>
            </div>`;


            

            moviesContainer.innerHTML += htmlData;
}
const processingMovies = (data)=>{
  let imgurl;

if(data.backdrop_path ===null){ 
 imgurl = img + data.poster_path;

}else{ 
 imgurl =  img + data.backdrop_path;

}

let altimg = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";


   let htmlData = `   <div class="card">

                    <div class="hidden" style="background:url( ${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }); background-size:cover; color:white; " alt="${data.original_title}"> ${data.overview} </div>
                <div class="card-head">
                    <img src="${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }" alt="${data.original_title}">
                </div>
                <div class="card-body">
                    <small class="category category-2">${data.release_date}</small>
                    <h3>${data.original_title}</h3>
                    <p>${data.overview}</p>
                    <div class="user">
                       
                         <small class="category rating">Rating:${data.vote_average}</small>
                       
                    </div>
                </div>
            </div>`;


            

            moviesContainer.innerHTML += htmlData;
}

moviesContainer.addEventListener("click", (e) => {
    const movieDiv = e.target.parentElement;
  if (movieDiv.style.transform == "rotateY(180deg)") {
    if (movieDiv.childNodes[1].classList[0] === "hidden") {
      movieDiv.style.transform = "rotateY(0deg)";
        // movieDiv.childNodes[1].style.transform = "rotateY(0deg)";

      setTimeout(() => {
        movieDiv.childNodes[3].setAttribute("id", "anticard");
        movieDiv.childNodes[5].setAttribute("id", "anticard");
        movieDiv.childNodes[1].style.display = "none";

      }, 300);

      // movieDiv.setAttribute("id", "anticard");
    }
   

  }else{
   
    if (movieDiv.childNodes[1].classList[0] === "hidden") {
      movieDiv.style.transform = "rotateY(180deg)";
        movieDiv.childNodes[1].style.transform = "rotateY(180deg)";

      setTimeout(() => {
        movieDiv.childNodes[3].setAttribute("id", "card");
        movieDiv.childNodes[5].setAttribute("id", "card");
        movieDiv.childNodes[1].style.display = "block";
      }, 300);
      //
    }
    
  }

});

//Search By Year

movieDate.addEventListener('change',()=>{
  console.log(movieDate.value);
if(selector.value ==="movies"){

  const YearSearch = `${movieYear}${movieDate.value}&${key}`;
   moviesContainer.innerHTML = "";

  fetch(YearSearch)
    .then((response) => response.json())
    .then((datas) => {
      datas.results.forEach((data) => {
        processingMovies(data);
      });
    });

}else if (selector.value === "series") {
    const YearSearch = `${seriesYear}${movieDate.value}&${key}`;
    console.log(YearSearch);
    fetch(YearSearch)
      .then((response) => response.json())
      .then((datas) => {
        datas.results.forEach((data) => {
        processingSeries(data);
        });
      });
}
   
})

//Search By Year

//Dark Mode

//Dark Mode


 
    