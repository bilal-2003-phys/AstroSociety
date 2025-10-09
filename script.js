// Hero Animated Text
const phrases = ["Exploring the Universe", "Sharing Knowledge", "Inspiring Minds"];
let i = 0, j = 0, currentPhrase = [], isDeleting = false;
const speed = 100, pause = 1500;

function type() {
  const p = document.querySelector(".animated-text");
  if (!isDeleting) {
    currentPhrase.push(phrases[i][j]);
    p.textContent = currentPhrase.join('');
    j++;
    if (j === phrases[i].length) { isDeleting = true; setTimeout(type, pause); return; }
  } else {
    currentPhrase.pop();
    p.textContent = currentPhrase.join('');
    if (currentPhrase.length === 0) { isDeleting=false; j=0; i=(i+1)%phrases.length; }
  }
  setTimeout(type, speed);
}
type();

// Team Expand/Collapse
const buttons = document.querySelectorAll(".team-btn");
const infoBox = document.getElementById("team-info");
const infoTitle = document.getElementById("info-title");
let activeButton = null;

buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const member = btn.dataset.member;
    infoTitle.textContent = btn.textContent + " Details";

    if (activeButton === btn && infoBox.classList.contains("show")) {
      infoBox.style.height='0'; infoBox.style.opacity='0'; infoBox.style.padding='0 20px';
      setTimeout(()=>infoBox.classList.remove("show"),500);
      activeButton=null; return;
    }

    infoBox.classList.add("show"); infoBox.style.height='0'; infoBox.style.opacity='0'; infoBox.style.padding='0 20px';
    setTimeout(()=>{
      const scrollHeight = infoBox.scrollHeight;
      infoBox.style.height=scrollHeight+'px';
      infoBox.style.opacity='1';
      infoBox.style.padding='20px';
    },10);

    activeButton = btn;
  });
});

// Close info if clicked outside
document.addEventListener("click", function(event){
  const isClickInside = infoBox.contains(event.target);
  const isClickOnBtn = Array.from(buttons).some(btn=>btn.contains(event.target));
  if(!isClickInside && !isClickOnBtn && infoBox.classList.contains("show")){
    infoBox.style.height='0'; infoBox.style.opacity='0'; infoBox.style.padding='0 20px';
    setTimeout(()=>infoBox.classList.remove("show"),500);
    activeButton=null;
  }
});

// Smooth Scroll Nav
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);
    if(targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block:'start' });
  });
});
