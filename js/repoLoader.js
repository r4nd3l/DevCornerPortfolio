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

function gitCallSettings() {
    return new Promise((resolve, reject) => {
        fetch('https://r4nd3l.github.io/DevCornerPortfolio/settings.json')
            .then(response => {
                return response.json().then(data => {

                    gitId = data.gitFetch.gitId
                    reposPerCall = data.gitFetch.fetchPerPage
                    client_id = data.gitFetch.clientId
                    client_secret = data.gitFetch.clientsecret

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

function progressCallback(repos) {
    repos.forEach(item => {
        document.getElementById("items").innerHTML +=
        `<div class="box" data-id="all">
            <div class="inner">
                ${item.name}
            </div>
        </div>`
    })
}

// All category
document.querySelector("[data-target='all']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryAll.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="all">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// JS
document.querySelector("[data-target='Js']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryJS.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Js">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// CSS
document.querySelector("[data-target='Css']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryCss.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Css">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// CMS
document.querySelector("[data-target='CMS']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryCMS.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="CMS">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// Theme
document.querySelector("[data-target='Theme']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryThemes.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Theme">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// Game
document.querySelector("[data-target='Game']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryGames.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Game">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// Php
document.querySelector("[data-target='Php']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryPhp.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Php">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});

// Tool
document.querySelector("[data-target='Tool']").addEventListener("click", function () {
    document.getElementById("items").innerHTML = '';

    categoryTool.forEach(item => {
        document.getElementById("items").innerHTML +=
            `<div class="box" data-id="Tool">
                <div class="inner">
                    ${item.name}
                </div>
            </div>`
    })

});
