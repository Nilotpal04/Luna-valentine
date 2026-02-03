const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const heartsContainer = document.querySelector(".hearts-container");
const askGif = document.getElementById("askGif");

let yesScale = 1;

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💗";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 18 + "px";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 600);

function moveNo() {
  const padding = 80;

  const x = Math.random() * (window.innerWidth - padding * 2);
  const y = Math.random() * (window.innerHeight - padding * 2);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  yesScale += 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;

  askGif.classList.add("bounce");
  setTimeout(() => askGif.classList.remove("bounce"), 600);
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);

function heartBurst() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = yesBtn.getBoundingClientRect().left + "px";
    heart.style.top = yesBtn.getBoundingClientRect().top + "px";
    heart.style.position = "fixed";
    heart.style.animationDuration = "2s";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

yesBtn.addEventListener("click", () => {
  heartBurst();

  pingMe();

  setTimeout(() => {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        background:radial-gradient(circle at top, #ffe6ee, #f6b3c6);
        padding:20px;
        font-family:'Playfair Display', serif;
      ">
        <div>
          <img src="./assets/yes.gif" style="width:180px; margin-bottom:20px;" />
          <h1 style="font-size:42px; color:#d6336c;">Yay 💖</h1>
          <p style="font-family:Inter,sans-serif; font-size:18px; margin-top:20px;">
            Luna, thank you for being my Valentine 🥰<br>
            I’m really, really happy 💕
          </p>
        </div>
      </div>
    `;
  }, 600);
});


function pingMe() {
  const form = document.getElementById("notifyForm");
  const data = new FormData(form);

  data.set("time", new Date().toLocaleString());

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      "Accept": "application/json"
    }
  })
    .then(res => {
      if (!res.ok) {
        console.warn("Formspree failed", res.status);
      }
    })
    .catch(err => {
      console.error("Ping error", err);
    });
}

