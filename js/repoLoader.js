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

let proSet
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
          proSet = data.profileSettings

          personalContent();
          // console.log(proSet)

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
  });
}

function personalContent() {
  // console.log(proSet.firstName);
  // console.log(proSet.lastName);

  document.querySelector('.js-name').innerHTML = `
    <h1 class="mb-0">
      ${proSet.firstName}
      <span class="text-primary">${proSet.lastName}</span>
    </h1>
    <div class="subheading mb-5">${proSet.address} · ${proSet.city_and_zip} · ${proSet.phone} ·
      <a href="mailto:matemolnar88@gmail.com">${proSet.email}</a>
    </div>
    <p class="lead mb-5">${proSet.bio}</p>
    <div class="social-icons">
      <a href="${proSet.url_linkedIn}">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a href="${proSet.url_github}">
        <i class="fab fa-github"></i>
      </a>
      <a href="${proSet.url_facebook}">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="${proSet.url_email}">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  `
  function proSetExp(){
    proSet.workExperiences.forEach((item) => {
      document.querySelector('.js-workExperiences').innerHTML += `
        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0">${item.position}</h3>
            <div class="subheading mb-3">${item.company} <br>
              <small>${item.place}</small></div>
            <p>${item.description}</p>
          </div>
          <div class="resume-date text-md-right">
            <span class="text-primary">${item.from} - ${item.to}</span>
          </div>
        </div>
      `;
    });
  }
  proSetExp();

  function proSetEdu(){
    proSet.schoolEducation.forEach((item) => {
      document.querySelector('.js-schoolEducation').innerHTML += `
        <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">
          <div class="resume-content">
            <h3 class="mb-0" title="${item.sTitle}">${item.school}</h3>
            <div class="subheading mb-3">${item.course} ${item.dissLink}</div>
            <p>Description</p>
            <div>${item.description}</div>
          </div>
          <div class="resume-date text-md-right">
            <span class="text-primary">${item.from} - ${item.to}</span>
          </div>
        </div>
      `;
    });
  }
  proSetEdu();

  document.querySelector('.js-Skills').innerHTML = `
    <div class="subheading mb-3">Programming Languages &amp; Tools</div>
    <ul class="list-inline dev-icons">
      <li class="list-inline-item">${proSet.skills.html5}</li>
      <li class="list-inline-item">${proSet.skills.css3}</li>
      <li class="list-inline-item">${proSet.skills.js}</li>
      <li class="list-inline-item">${proSet.skills.angular}</li>
      <li class="list-inline-item">${proSet.skills.vuejs}</li>
      <li class="list-inline-item">${proSet.skills.nodjs}</li>
      <li class="list-inline-item">${proSet.skills.wordpress}</li>
      <li class="list-inline-item">${proSet.skills.npm}</li>
      <li class="list-inline-item">${proSet.skills.php}</li>
    </ul>

    <div class="subheading mb-3">Workflow</div>
    <ul class="fa-ul mb-0">
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.agile}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.Responsive}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.uxi}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.adobe}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.browser}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.git}</li>
      <li><i class="fa-li fa fa-check"></i>${proSet.skills.os}</li>
    </ul>
  `

  function interests(){
    proSet.ints.forEach((item) => {
      document.querySelector('.js-ints').innerHTML += `
        ${item.paragraph}
      `;
    });
  }
  interests();
  // called from resume.js - tooltip func
  // tooltip();

  document.querySelector('.js-cert').innerHTML = `
    <h2 class="mb-5">Certifications <a
        href="https://www.dropbox.com/sh/wcp304fo3bo5rwi/AAA9p13kFUKjNZfs229akMuOa?dl=0" target="_blank"
        title="CISCO Certifications"><i class="fas fa-external-link-alt"></i></a></h2>
    <div class="mb-5">
      <div class="subheading mb-3">Cisco Certified Network Associate</div>
      <ul class="fa-ul mb-0">
        <li class="mb-2"><i class="fa-li fas fa-award text-warning"></i>${proSet.cert.CCNA_1}</li>
        <li class="mb-2"><i class="fa-li fas fa-award text-warning"></i>${proSet.cert.CCNA_2}</li>
        <li class="mb-2"><i class="fa-li fas fa-award text-warning"></i>${proSet.cert.CCNA_3}</li>
        <li class="mb-2"><i class="fa-li fas fa-award text-warning"></i>${proSet.cert.CCNA_4}</li>
      </ul>
    </div>
    <div class="mb-5">
      <div class="subheading mb-3">Information Technology of PC Hardware and Software</div>
      <ul class="fa-ul mb-0">
        <li class="mb-2"><i class="fa-li fas fa-award text-warning fa-lg"></i>${proSet.cert.IT_1}</li>
        <li class="mb-2"><i class="fa-li fas fa-award text-warning fa-lg"></i>${proSet.cert.IT_2}</li>
      </ul>
    </div>
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

        if (data.length === reposPerCall) {
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
      newContent +=`
        <div class="box" data-id="all">
          <div class="inner">
            GRID STYLE
            ${item.name}
            <small>${item.description}</small>
          </div>
        </div>
      `})
  }
  else {
    categoryArray.forEach(item => {
      newContent +=`
        <div class="box preview" data-id="all">
          <div class="inner">
            LIST STYLE
            ${item.name}
            <small>${item.description}</small>
          </div>
          <span id="tooltip"><img src="https://raw.githubusercontent.com/r4nd3l/${item.name}/master/img/${item.name}.png" alt="${item.name}"></span>
        </div>
      `})
  }
  currentCateg = categoryArray
  document.getElementById("items").innerHTML = newContent;
  // called from resume.js - tooltip func
  tooltip();
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
