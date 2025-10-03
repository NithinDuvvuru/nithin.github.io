const GITHUB_USERNAME = "NithinDuvvuru";

async function fetchRepos(){
  try{
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if(!res.ok) throw new Error("GitHub API rate limit or user not found.");
    const all = await res.json();
    const repos = all
      .filter(r => !r.fork)
      .sort((a,b)=> new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);
    const grid = document.getElementById("repo-grid") || document.getElementById("spotlight-projects");
    if(!grid) return;

    repos.forEach(r=>{
      const el = document.createElement("article");
      el.className = "card";
      el.innerHTML = `
        <h3>${r.name}</h3>
        <p>${r.description || "No description"}</p>
        <p><small>Updated ${new Date(r.pushed_at).toLocaleDateString()}</small></p>
        <p><a href="${r.html_url}" target="_blank" rel="noreferrer">View on GitHub ↗</a></p>`;
      grid.appendChild(el);
    });
  }catch(e){
    console.warn(e);
  }
}

function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('msg').value;
  const payload = {name, email, msg, ts: new Date().toISOString()};
  const inbox = JSON.parse(localStorage.getItem("nd_inbox") || "[]");
  inbox.push(payload);
  localStorage.setItem("nd_inbox", JSON.stringify(inbox));
  alert("Thanks! Your message has been saved locally.");
  e.target.reset();
  return false;
}

document.addEventListener("DOMContentLoaded", fetchRepos);
