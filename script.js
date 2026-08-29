const SPY_IMAGE = "spy-who-looked-back.png";

const catalog = [
  {title:"Matthew: The Movie", year:2026, desc:"Matthew's story takes center stage in this Mattflix original — a big-screen adventure filled with surprises, unforgettable moments, and one very determined hero.", category:"continue", progress:34,duration:"1h 37m",c1:"#8d1019",c2:"#111827"},
  {title:"The Flames Hit", year:2026, desc:"When the Flames start hitting they start winning.", category:"continue", progress:61,image:"flames-hit.png",duration:"2h 17m",c1:"#b91c1c",c2:"#422006"},
  {title:"The Spy Who Looked Back", year:2026, desc:"A spy on the run discovers that the biggest threat isn't ahead of him — it is him.", category:"continue", progress:25,image:SPY_IMAGE,duration:"2h 25m",c1:"#172554",c2:"#111827"},

  {title:"The High Marker", year:2026, desc:"A exciting tale about Mark and his intersting marker.", category:"continue", progress:72,c1:"#172554",c2:"#111827"},
  {title:"The Money Maker", year:2026, desc:"One guy makes his very own currency and is the greatest ever.", category:"continue", progress:41,c1:"#164e63",c2:"#312e81"},
  {title:"The Outpost", year:2025, desc:"A remote research team loses contact with the outside world after finding something buried beneath the ice.", category:"continue", progress:18,c1:"#334155",c2:"#0f172a"},
  {title:"After Dark", year:2026, desc:"Three friends discover that their town has a second life after midnight.", category:"continue", progress:88,c1:"#3f0b23",c2:"#111827"},
  {title:"Code Zero", year:2024, desc:"An ordinary programmer uncovers a security key that powerful people will do anything to recover.", category:"continue", progress:57,c1:"#064e3b",c2:"#172554"},
  {title:"Wild Horizon", year:2026, desc:"A survival expedition becomes a fight against a storm no one predicted.", category:"continue", progress:23,c1:"#713f12",c2:"#1e293b"},

  {title:"Night Shift", year:2025, desc:"A hospital security guard realizes one patient has never appeared on any record.", category:"popular",c1:"#450a0a",c2:"#1f2937"},
  {title:"Three Against Three", year:2026, desc:"Its a Marty story, with some others as well.", category:"popular",c1:"#3f6212",c2:"#172554"},
  {title:"Paper Kingdom", year:2025, desc:"A brilliant strategist assembles an unlikely crew for an impossible heist.", category:"popular",c1:"#713f12",c2:"#292524"},
  {title:"The Company", year:2025, desc:"In the middle of nothing a company was created to save everyone.", category:"popular",c1:"#581c87",c2:"#172554"},
  {title:"Black Tide", year:2025, desc:"A salvage crew finds a signal beneath the ocean floor.", category:"popular",c1:"#082f49",c2:"#0f172a"},
  {title:"The Avengers", year:2012, desc:"Earth's mightiest heros assemble to defeat the all powerfull Loki, of Asguard.", category:"popular",image:"the-avengers.png",rating:"PG-13",duration:"2h 26m",c1:"#7f1d1d",c2:"#292524"},

  {title:"The Stolen Card", year:2026, desc:"Three friends race to steal a card to copy it for their own good.", category:"new", c1:"#8d1019",c2:"#111827"},
  {title:"Static", year:2026, desc:"A radio host starts receiving broadcasts from tomorrow.", category:"new",c1:"#312e81",c2:"#111827"},
  {title:"Red Planet", year:2026, desc:"The first crewed mission to Mars loses communication just hours before landing.", category:"new",c1:"#9a3412",c2:"#1c1917"},
  {title:"Echo House", year:2026, desc:"A family moves into a house where every room remembers a different past.", category:"new",c1:"#334155",c2:"#3f0b23"},
  {title:"Velocity", year:2026, desc:"A street racer discovers a prototype vehicle capable of impossible speeds.", category:"new",c1:"#1d4ed8",c2:"#111827"},
  {title:"Wildfire", year:2026, desc:"A wildfire traps a rescue team between a canyon and a rapidly changing wind.", category:"new",c1:"#b91c1c",c2:"#422006"},
  {title:"Orbit", year:2026, desc:"Astronauts aboard a damaged station have one window to repair the system and return home.", category:"new",c1:"#0c4a6e",c2:"#1e1b4b"}
];

const sampleVideo = "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";
const $ = s => document.querySelector(s);
const allRows = {continue:"#continueRow", popular:"#popularRow", new:"#newRow"};

function card(item){
  const artStyle = item.image ? "" : `--c1:${item.c1};--c2:${item.c2};`;
  const poster = item.image ? `<img class="card-poster" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)} poster">` : "";
  return `<article class="card" data-title="${escapeHtml(item.title)}" style="${artStyle}">
    <div class="card-art" style="${artStyle}">${poster}<span class="badge">M</span><span class="card-title">${escapeHtml(item.title)}</span></div>
    ${item.progress ? `<div class="progress"><i style="width:${item.progress}%"></i></div>` : ""}
    <div class="card-actions">
      <button class="mini-btn play-mini" title="Play">▶</button>
      <button class="mini-btn info-mini" title="Info">i</button>
      <button class="mini-btn list-mini" title="My List">＋</button>
    </div>
  </article>`;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function findTitle(title){return catalog.find(x=>x.title===title)}
function metaHtml(item){
  const duration = item.duration ? `<span>${escapeHtml(item.duration)}</span>` : `<span>2 Seasons</span>`;
  return `<span class="match">98% Match</span><span>${item.year}</span><span>${escapeHtml(item.rating || "TV-14")}</span>${duration}<span>HD</span>`;
}

function renderRows(){
  Object.entries(allRows).forEach(([category,selector])=>{
    $(selector).innerHTML = catalog.filter(x=>x.category===category).map(card).join("");
  });
  renderMyList();
}
function getList(){try{return JSON.parse(localStorage.getItem("mattflix-list")||"[]")}catch{return[]}}
function setList(list){localStorage.setItem("mattflix-list",JSON.stringify(list))}
function renderMyList(){
  const list=getList();
  $("#myListRow").innerHTML=list.map(t=>{const x=findTitle(t);return x?card(x):""}).join("");
  $("#emptyList").style.display=list.length?"none":"block";
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}

function openInfo(title){
  const x=findTitle(title); if(!x)return;
  $("#modalTitle").textContent=x.title;
  $("#modalDescription").textContent=x.desc;
  $("#modalMeta").innerHTML = metaHtml(x);
  $("#modalArt").style.background = x.image ? `url("${x.image}") center/cover no-repeat` : `radial-gradient(circle at 75% 30%,${x.c1},${x.c2} 62%,#080808)`;
  $("#modalPlay").onclick=()=>{closeInfo();play(x.title)};
  const list=getList(); const inList=list.includes(x.title);
  $("#modalList").textContent=inList?"✓ In My List":"＋ My List";
  $("#modalList").onclick=()=>toggleList(x.title);
  $("#infoModal").classList.add("open");
}
function closeInfo(){$("#infoModal").classList.remove("open")}
function toggleList(title){
  let list=getList();
  if(list.includes(title)){list=list.filter(x=>x!==title);toast("Removed from My List")}
  else{list.push(title);toast("Added to My List")}
  setList(list);renderMyList();
  const btn=$("#modalList"); if(btn&&$("#modalTitle").textContent===title)btn.textContent=list.includes(title)?"✓ In My List":"＋ My List";
}
function play(title){
  const _mfVideo=document.getElementById("video"); if(_mfVideo) mattflixBindVideoResume(_mfVideo);
  const x=findTitle(title); if(!x)return;
  $("#playerTitle").textContent=x.title;
  $("#video").src = x.title === "The Spy Who Looked Back" ? "the-spy-who-looked-back.mp4" : sampleVideo;
  $("#player").classList.add("open");
  $("#video").play().catch(()=>{});
}
function closePlayer(){$("#video").pause();$("#video").removeAttribute("src");$("#video").load();$("#player").classList.remove("open")}

document.addEventListener("click",e=>{
  const cardEl=e.target.closest(".card");
  if(cardEl){
    const title=cardEl.dataset.title;
    if(e.target.closest(".play-mini"))play(title);
    else if(e.target.closest(".info-mini"))openInfo(title);
    else if(e.target.closest(".list-mini"))toggleList(title);
    else openInfo(title);
  }
  if(e.target.matches("[data-play]"))play(e.target.dataset.play);
  if(e.target.matches("[data-info]"))openInfo(e.target.dataset.info);
});
$("#closeModal").onclick=closeInfo;
$("#infoModal").addEventListener("click",e=>{if(e.target===$("#infoModal"))closeInfo()});
$("#playerClose").onclick=closePlayer;
$("#searchBtn").onclick=()=>{$("#searchOverlay").classList.add("open");$("#searchInput").focus()};
$("#closeSearch").onclick=()=>$("#searchOverlay").classList.remove("open");
$("#searchOverlay").addEventListener("click",e=>{if(e.target===$("#searchOverlay"))$("#searchOverlay").classList.remove("open")});
$("#searchInput").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase().trim();
  const results=q?catalog.filter(x=>x.title.toLowerCase().includes(q)||x.desc.toLowerCase().includes(q)):catalog.slice(0,6);
  $("#searchResults").innerHTML=results.length?results.map(card).join(""):`<p>No titles found for “${escapeHtml(q)}”.</p>`;
});
$("#bellBtn").onclick=()=>toast("You're all caught up!");
$("#profileBtn").onclick=()=>toast("Profile: Matthew");
window.addEventListener("scroll",()=>$("#topbar").classList.toggle("scrolled",scrollY>20));

const heroSlides=[
  {title:"MATTHEW: THE MOVIE",desc:"Matthew's story takes center stage in this Mattflix original — a big-screen adventure filled with surprises, unforgettable moments, and one very determined hero.",year:2026,duration:"1h 37m",bg:["#8d1019","#111827"]},
  {title:"THE FLAMES HIT",desc:"When the Flames start hitting they start winning.",year:2026,duration:"2h 17m",image:"flames-hit.png",bg:["#b91c1c","#422006"]},
  {title:"THE SPY WHO LOOKED BACK",desc:"A spy on the run discovers that the biggest threat isn't ahead of him — it is him.",year:2026,duration:"2h 25m",image:SPY_IMAGE,bg:["#172554","#111827"]}
];
let slide=0;
function showSlide(i){
  slide=i; const s=heroSlides[i];
  $("#heroTitle").textContent=s.title;$("#heroDescription").textContent=s.desc;$("#heroMeta").innerHTML=metaHtml({year:s.year||2026,duration:s.duration});
  $(".hero-buttons .play-btn").dataset.play=s.title;
  $(".hero-buttons .info-btn").dataset.info=s.title;
  $("#hero").style.background = s.image
    ? `linear-gradient(90deg,#080808 0%,rgba(8,8,8,.84) 30%,rgba(8,8,8,.16) 68%,#080808 100%),linear-gradient(0deg,#080808 0%,transparent 38%),url("${s.image}") center/cover no-repeat`
    : `radial-gradient(circle at 72% 38%,${s.bg[0]} 0,#2c0a0d 23%,${s.bg[1]} 48%,#080808 75%)`;
  [...$("#heroDots").children].forEach((d,n)=>d.classList.toggle("active",n===i));
}
heroSlides.forEach((_,i)=>{const d=document.createElement("span");d.className="dot";d.onclick=()=>showSlide(i);$("#heroDots").appendChild(d)});
showSlide(0);renderRows();
setInterval(()=>showSlide((slide+1)%heroSlides.length),8000);


/* Mattflix live Continue Watching progress */
function mattflixUpdateProgress(title, video){
  if(!video || !isFinite(video.duration) || video.duration <= 0) return;
  const item = (typeof find === "function" ? find(title) : (typeof getItem === "function" ? getItem(title) : null));
  if(item) item.progress = Math.max(0, Math.min(100, video.currentTime / video.duration * 100));
  document.querySelectorAll('.card[data-title]').forEach(card=>{
    if(card.dataset.title === title){
      const bar=card.querySelector('.progress i');
      if(bar) bar.style.width=(item ? item.progress : (video.currentTime/video.duration*100))+'%';
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const v=document.getElementById('video');
  if(!v) return;
  v.addEventListener('timeupdate', ()=>{
    const n=document.getElementById('playerName');
    if(n && n.textContent) mattflixUpdateProgress(n.textContent.trim(),v);
  });
});


/* Netflix-style persistent Continue Watching */
const MATTFLIX_PROGRESS_KEY = "mattflix-video-progress-v2";

function mattflixProgressStore(){
  try { return JSON.parse(localStorage.getItem(MATTFLIX_PROGRESS_KEY) || "{}"); }
  catch(e) { return {}; }
}
function mattflixSaveProgress(title, seconds, duration){
  if(!title || !isFinite(seconds)) return;
  const store = mattflixProgressStore();
  store[title] = {
    seconds: Math.max(0, seconds),
    duration: isFinite(duration) && duration > 0 ? duration : (store[title]?.duration || 0),
    updated: Date.now()
  };
  localStorage.setItem(MATTFLIX_PROGRESS_KEY, JSON.stringify(store));
}
function mattflixGetProgress(title){
  return mattflixProgressStore()[title] || null;
}
function mattflixApplyProgress(title, video){
  const saved = mattflixGetProgress(title);
  if(!saved || !isFinite(saved.seconds) || saved.seconds <= 0) return;
  const seek = () => {
    if(isFinite(video.duration) && video.duration > 0){
      const max = Math.max(0, video.duration - 1);
      video.currentTime = Math.min(saved.seconds, max);
      video.removeEventListener("loadedmetadata", seek);
    }
  };
  if(isFinite(video.duration) && video.duration > 0) seek();
  else video.addEventListener("loadedmetadata", seek);
}
function mattflixUpdateCardProgress(title, video){
  if(!video || !isFinite(video.duration) || video.duration <= 0) return;
  const pct = Math.max(0, Math.min(100, video.currentTime / video.duration * 100));
  document.querySelectorAll(".card[data-title]").forEach(card=>{
    if(card.dataset.title === title){
      const bar = card.querySelector(".progress i");
      if(bar) bar.style.width = pct + "%";
    }
  });
}
function mattflixBindVideoResume(video){
  if(!video || video.dataset.mattflixBound === "1") return;
  video.dataset.mattflixBound = "1";

  video.addEventListener("loadedmetadata", ()=>{
    const name = document.getElementById("playerTitle");
    if(name && name.textContent.trim()) mattflixApplyProgress(name.textContent.trim(), video);
  });

  video.addEventListener("timeupdate", ()=>{
    const name = document.getElementById("playerTitle");
    const title = name && name.textContent.trim();
    if(!title || !isFinite(video.currentTime)) return;
    mattflixSaveProgress(title, video.currentTime, video.duration);
    mattflixUpdateCardProgress(title, video);
  });

  video.addEventListener("pause", ()=>{
    const name = document.getElementById("playerTitle");
    const title = name && name.textContent.trim();
    if(title) mattflixSaveProgress(title, video.currentTime, video.duration);
  });

  video.addEventListener("ended", ()=>{
    const name = document.getElementById("playerTitle");
    const title = name && name.textContent.trim();
    if(title){
      const store = mattflixProgressStore();
      store[title] = {seconds: 0, duration: video.duration || 0, updated: Date.now()};
      localStorage.setItem(MATTFLIX_PROGRESS_KEY, JSON.stringify(store));
    }
  });
}
function mattflixRenderSavedProgress(){
  const store = mattflixProgressStore();
  document.querySelectorAll(".card[data-title]").forEach(card=>{
    const saved = store[card.dataset.title];
    const bar = card.querySelector(".progress i");
    if(bar && saved && saved.duration > 0){
      bar.style.width = Math.max(0, Math.min(100, saved.seconds / saved.duration * 100)) + "%";
    }
  });
}
document.addEventListener("DOMContentLoaded", ()=>{
  const video = document.getElementById("video");
  if(video) mattflixBindVideoResume(video);
  mattflixRenderSavedProgress();
});
