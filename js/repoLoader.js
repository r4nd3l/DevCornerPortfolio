let categoryAll = []
let categoryJS = []
let categoryCss = []
let categoryThemes = []
let categoryGames = []
let categoryCMS = []
let categoryPhp = []
let categoryTool = []

let gitId
let reposPerCall
let client_id
let client_secret

let personalSettings
let viewType = "list"
let currentCateg = []

function gitCallSettings() {
  return new Promise((resolve, reject) => {
    fetch('https://r4nd3l.github.io/DevCornerPortfolio/settings.json')
      .then(response => {
        return response.json().then(data => {

          gitId = data.gitFetch.gitId
          reposPerCall = data.gitFetch.fetchPerPage
          client_id = data.gitFetch.clientId
          client_secret = data.gitFetch.clientsecret

          personalSettings = data.profileSettings
          // console.log(personalSettings)

          getGithubRepositories(progressCallback)
            .then(repos => {
              categoryAll = repos
              repos.forEach(repo => {
                if (repo.description.includes("[Js]")) {
                  categoryJS.push(repo)
                }
                if (repo.description.includes("[Css]")) {
                  categoryCss.push(repo)
                }
                if (repo.description.includes("[CMS]")) {
                  categoryCMS.push(repo)
                }
                if (repo.description.includes("[Theme]")) {
                  categoryThemes.push(repo)
                }
                if (repo.description.includes("[Game]")) {
                  categoryGames.push(repo)
                }
                if (repo.description.includes("[Php]")) {
                  categoryPhp.push(repo)
                }
                if (repo.description.includes("[Tool]")) {
                  categoryTool.push(repo)
                }
              })
            })

        }).catch(reject)
      }).catch(reject)
  })
}

function personalContent() {
  console.log(personalSettings.firstName);

  const kolbas = document.querySelector('#kolbas');

  kolbas.innerHTML = `
   ${personalSettings.firstName}
  `
}

gitCallSettings()

function getGithubRepositories(progress, url = `https://api.github.com/users/${gitId}/repos?page=1&per_page=${reposPerCall}&client_id=${client_id}&client_secret=${client_secret}`, repos = [], pageCount = 1) {
  return new Promise((resolve, reject) => fetch(url)
    .then(response => {
      if (response.status !== 200) {
        throw `${response.status}: ${response.statusText}`;
      }
      response.json().then(data => {
        repos = repos.concat(data);

        if (data.length == reposPerCall) {
          pageCount++;
          url = `https://api.github.com/users/${gitId}/repos?page=${pageCount}&per_page=${reposPerCall}&client_id=${client_id}&client_secret=${client_secret} `
          progress && progress(repos);
          getGithubRepositories(progress, url, repos, pageCount).then(resolve).catch(reject)
        } else {
          resolve(repos);
        }
      }).catch(reject);
    }).catch(reject));
}

function progressCallback(repos) { buildRepoList(repos) }

function buildRepoList(categoryArray) {
  newContent = ""

  if (viewType == "grid") {
    categoryArray.forEach(item => {
      newContent +=
        `<div class="box" data-id="all">
                  <div class="inner">
                    GRID STYLE
                    ${item.name}
                    <small>${item.description}</small>
                  </div>
                  <div class="ext-set">
                    <a href="https://github.com/r4nd3l/${item.name}/" target="_blank">
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                  </div>
              </div>`
    })
  }
  else {
    categoryArray.forEach(item => {
      newContent +=
        `<div class="box" data-id="all">
                  <div class="inner">
                    LIST STYLE
                    ${item.name}
                    <small>${item.description}</small>
                  </div>
                  <div class="ext-set">
                    <a href="https://github.com/r4nd3l/${item.name}/" target="_blank">
                      <i class="fas fa-external-link-alt"></i>
                    </a>
                  </div>
              </div>`
    })
  }
  currentCateg = categoryArray
  document.getElementById("items").innerHTML = newContent;
}


document.querySelector("[data-target='all']").addEventListener("click", () => { buildRepoList(categoryAll) });
document.querySelector("[data-target='Js']").addEventListener("click", () => { buildRepoList(categoryJS) });
document.querySelector("[data-target='Css']").addEventListener("click", () => { buildRepoList(categoryCss) });
document.querySelector("[data-target='CMS']").addEventListener("click", () => { buildRepoList(categoryCMS) });
document.querySelector("[data-target='Theme']").addEventListener("click", () => { buildRepoList(categoryThemes) });
document.querySelector("[data-target='Game']").addEventListener("click", () => { buildRepoList(categoryGames) });
document.querySelector("[data-target='Php']").addEventListener("click", () => { buildRepoList(categoryPhp) });
document.querySelector("[data-target='Tool']").addEventListener("click", () => { buildRepoList(categoryTool) });



// Change grid view to list view at portfolio section
document.getElementById("grid_btn").addEventListener("click", viewFlex);
function viewFlex() {
  viewType = "grid"
  buildRepoList(currentCateg)
  document.getElementById('items').style.cssText = `
    display: flex;
  `
  document.getElementById('list_btn').classList.remove("active");
  document.getElementById('grid_btn').classList.add("active");
  document.getElementById('items').style.animation = "fadeIn 1s";
}

document.getElementById("list_btn").addEventListener("click", viewList);
function viewList() {
  viewType = "list"
  buildRepoList(currentCateg)
  document.getElementById('items').style.cssText = `
    display: grid;
  `
  document.getElementById('grid_btn').classList.remove("active");
  document.getElementById('list_btn').classList.add("active");
  document.getElementById('items').style.animation = "fadeIn 1s";
}

// add and remove grid/list view
document.getElementById("grid_btn").onmouseover = function () { mouseOver() };
document.getElementById("list_btn").onmouseout = function () { mouseOut() };

function mouseOver() {
  document.getElementById("items").style.animation = "none";
}
function mouseOut() {
  document.getElementById("items").style.animation = "none";
}
