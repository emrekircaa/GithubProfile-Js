const APIURL = "https://api.github.com/users/";
const input = document.getElementById("input");
const main = document.getElementById("main");
const form = document.getElementById("form");


async function getUser(name) {
    const resp = await fetch(APIURL + name);
    const respData = await resp.json();

    userCard(respData);
    getRepos(name);
    getFollowers(name);


}
async function getRepos(name) {
    const resp = await fetch(APIURL + name + "/repos");
    const respData = await resp.json();

    addRepo(respData);
}
async function getFollowers(name) {
    const resp = await fetch(APIURL + name + "/following");
    const respData = await resp.json();

    console.log(respData);
    add(respData);

}

function userCard(name) {
    const cardHTML = `
    <div class="main">
            <div class="card">
                <div>
                    <img class="image" src="${name.avatar_url}" alt="${name.name}" />
                </div>
                <div class="user-info">
                    <div>
                    <h2>${name.name}</h2>

                    </div>
                    <p>${name.bio}</p>
                    <ul class="info">
                        <li>${name.followers}<strong>Followers</strong></li>
                        <li>${name.following}<strong>Following</strong></li>
                        <li>${name.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repos"></div>
                </div>
            </div>
            
            <div id="follower" class="follow" >
             <span>Following</span>
            </div>
        
           
    </div>
    `;
    main.innerHTML = cardHTML;
}

function addRepo(repo) {
    const reposEl = document.getElementById("repos");
    repo.slice(0, 20).forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.innerText = repo.name;
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        reposEl.appendChild(repoEl);
    });
}
function add(repo) {

    const follow = document.getElementById("follower")
    repo.map((repo) => {
        const follower = document.createElement("div");
        follower.classList.add("menu")
        follower.innerHTML =  `
        
                <div id="followers-img">
                    <img src="${repo.avatar_url}" alt="${repo.name}"/>
                </div>
                <div id="followers-bio">
                    <p><strong>${repo.login}</strong></p>
                    <a href="${repo.html_url}">${repo.html_url}</a>
                </div>
        
        `;
        follow.appendChild(follower);

        });

   
}

form.addEventListener("submit", (e) => {
    console.log("tik")
    e.preventDefault();
    const user = input.value;
    if (user) {
        getUser(user)
        input.value = "";
    }
})