
let input = document.getElementById('input');
const noResult = document.getElementById('noResult');

function debounce(search , delay = 300){
    let timer;
    clearTimeout(timer);
    timer = setTimeout(search,delay)
}

function check(){
    if(input.value == ""){
        noResult.classList.replace('d-block','d-none');
    }
}


input.addEventListener('keyup' , function(){
    check();
    debounce(searchInput);
});

async function searchInput(){
    let inputValue = input.value.trim();
    try{
        let results = await getArticles(inputValue);
        let articles = await results.query.search;
        display(articles);
    }
    catch{
          if(input.value === ""){
            let cartona=``;
            document.getElementById('articles').innerHTML= cartona ;
            }
    }
} 

async function getArticles(inputValue)
{
    let response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${inputValue}`);
    let finalResult = await response.json();
    if(finalResult.query.search == 0){
        noResult.classList.replace('d-none','d-block');
    }else {
        noResult.classList.replace('d-block','d-none');
        return finalResult;
    }
        
    }
    


function display(articles){
    let cartona= ``;
    articles.forEach((article) => {
        cartona += `
            <div class="article mt-5">
                <h3>${article.title}</h3>
                <a href="https://en.wikipedia.org/?curid=${article.pageid} target="_self">https://en.wikipedia.org/?curid=${article.pageid}</a>
                <small class="w-50 d-block pt-3">${article.snippet}</small>
            </div> ` ;
    });
document.getElementById('articles').innerHTML= cartona ;
}



































// let header = document.querySelectorAll('h3');
// let headerArr = Array.from(header);

// inputSearch.addEventListener('keyup',function(){
    
//     let cartona = ``;
//     for(let i = 0 ; i<headerArr.length ; i++){

//         if(headerArr[i].innerHTML.includes(inputSearch.value)== true){
//             cartona +=`
//             <div class="col-lg-3 mt-5">
//                 <h3>${headerArr[i].innerHTML}</h3>
//                 <p>
//                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, exercitationem error esse fugit ducimus minus vero incidunt sit architecto delectus, dicta provident tenetur modi corrupti facilis rerum consequuntur obcaecati ex.
//                 </p>
//             `
//         };
//         };
    
//     document.getElementById('articles').innerHTML = cartona;
// });
// const params = {
//     'Access-Control-Allow-Methods': 'GET',
//     'Access-Control-Allow-Headers': 'application/json',
// }
// (async function getArticles(){
//     console.log('hi')
//     let response= await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots`);
//     let finalResult = await response.json();
//     console.log(response);
//     console.log(finalResult);
// })();
// inputSearch.addEventListener('input',getArticles());



    
// async function getNews(category){
// let response= await fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=e2752b3ad1834f15a0de154fad34d02f`);
// let finalResult= await response.json();
// news = finalResult.articals ;
// displayNews();
// console.log(finalResult);
// console.log(response)
// }