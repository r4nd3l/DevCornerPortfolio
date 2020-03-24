let categoryAll = []
let categoryJS = []
let categoryCss = []
let categoryThemes = []
let categoryGames = []
let categoryCMS = []
let categoryPhp = []
let categoryTool = []

let gitId = "r4nd3l"
let reposPerCall = 20
let client_id = "0b1b1bd2e0fd2b13f108"
let client_secret = "a2e9cae12566e882854602f8644209267033fcc9"

function getSettings() {
    fetch() // local json
        .then() // load settings vars + call getGithubRepositories
}

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

function progressCallback(repos) {
    repos.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="bag">
                    <div class="inner">
                        ${item.name}
                    </div>
                </div>`
    })
}

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


document.getElementById("JSBtn").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryJS.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="bag">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});    
