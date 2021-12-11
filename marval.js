const get = async (query) => {
  let data = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  data = await data.json();
  console.log(data);
  appendData(data);
};

function throttle() {
  let query = document.getElementById("search").value;
  if (query.length >= 2) {
    let interval = setTimeout(() => {
      let time = setTimeout(() => {
        console.log(query);
        get(query);
        setTimeout(time);
        
      }, 200);
      clearTimeout(interval);
    }, 100);
  }

  
}
async function search() {
  let query = document.getElementById("search").value;
  document.getElementById("search").value = "";
  let data = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  data = await data.json();
  appendData(data);
}
function addPersonalData(item) {
  
  if (localStorage !== null) {
    localStorage.removeItem("character");
    localStorage.setItem("character", JSON.stringify(item));
  }
}
function appendData(data) {
  let container = document.getElementById("root");
  container.innerHTML = null;
  const { results } = data;
  for (let x of results) {
    let div = document.createElement("div");
    div.setAttribute("class", "single");
    let span = document.createElement("span");
    span.innerHTML = x.name;
    let span2 = document.createElement("span");
    span2.innerHTML = x.birth_year;
    div.append(span, span2);
    container.appendChild(div);
    div.addEventListener("click", () => {
     
      addPersonalData(x);

      window.location.href = `singleCharacter.html`;
    });
  }
}
