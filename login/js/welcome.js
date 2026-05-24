const user =
localStorage.getItem("username");

const usernameDisplay =
document.getElementById("usernameDisplay");

const authArea =
document.getElementById("authArea");

/* =========================
   LOGIN STATE
========================= */

if(user){

  usernameDisplay.innerText =
  "Halo, " + user;

  authArea.innerHTML = `
    <button class="btn-login" onclick="logout()">
      Logout
    </button>
  `;
}

/* =========================
   LOGOUT
========================= */

function logout(){

  localStorage.removeItem("username");

  window.location.reload();
}

/* =========================
   COMMENT
========================= */

function sendComment(id){

  if(!user){

    alert("Login dulu untuk mengirim komentar");
    return;
  }

  const input =
  document.getElementById("comment" + id);

  const comments =
  document.getElementById("comments" + id);

  if(input.value.trim() === "") return;

  const div =
  document.createElement("div");

  div.className = "comment-item";

  div.innerHTML = `
    <strong>${user}</strong>
    <p>${input.value}</p>
  `;

  comments.prepend(div);

  input.value = "";
}

/* =========================
   POPUP
========================= */

const popupModal =
document.getElementById("popupModal");

const popupImage =
document.getElementById("popupImage");

const popupAudio =
document.getElementById("popupAudio");

const popupSubtitle =
document.getElementById("popupSubtitle");

/* =========================
   SUBTITLE DATA
========================= */

const subtitles = {

  monster:[

    {
      start:1,
      end:4,
      text:"“That's nonsense...”"
    },

    {
      start:4.5,
      end:10,
      text:"“That's not happiness.”"
    },

    {
      start:10.2,
      end:15,
      text:"“Happiness is something anyone can have.”"
    }

  ],

  ladybird:[

    {
      start:1,
      end:2,
      text:"Lady Bird : “Give me a number.”"
    },

    {
      start:2,
      end:3,
      text:"Mom : “I don't understand.”"
    },

    {
      start:3,
      end:14,
      text:"Lady Bird : “Give me a number for how much it cost to raise me...”"
    },

    {
      start:14,
      end:19,
      text:"Mom : “I highly doubt you'll get a job good enough for that.”"
    },

    {
      start:19,
      end:21,
      text:"Lady Bird : “I wish that you liked me.”"
    },

    {
      start:21,
      end:24,
      text:"Mom : “Of course I love you.”"
    },

    {
      start:24,
      end:26,
      text:"Lady Bird : “But do you like me?”"
    },

    {
      start:26,
      end:33,
      text:"Mom : “I want you to be the best version of yourself.”"
    },

    {
      start:33,
      end:38,
      text:"Lady Bird : “What if this is the best version?”"
    }

  ],

  dps:[

    {
      start:1,
      end:6,
      text:"Todd : “I'm not like you...”"
    },

    {
      start:6,
      end:7,
      text:"Neil : “Don't you think you could be?”"
    },

    {
      start:7,
      end:12,
      text:"Todd : “I don't know... that's not the point.”"
    },

    {
      start:12,
      end:19,
      text:"Todd : “There's nothing you can do about it.”"
    },

    {
      start:19,
      end:24,
      text:"Mr. Keating : “Mr. Anderson thinks everything inside him is worthless.”"
    },

    {
      start:24,
      end:28,
      text:"Mr. Keating : “Isn't that your worst fear, Todd?”"
    },

    {
      start:28,
      end:32,
      text:"Mr. Keating : “I think you're wrong.”"
    },

    {
      start:32,
      end:38,
      text:"Mr. Keating : “You have something inside you worth a great deal.”"
    }

  ]

};

let currentSubtitle = [];
let subtitleInterval;

/* =========================
   OPEN POPUP
========================= */

function openPopup(imageSrc,audioSrc,key){

  popupModal.style.display = "flex";

  popupImage.src = imageSrc;

  popupAudio.src = audioSrc;

  popupAudio.play();

  currentSubtitle =
  subtitles[key];

  clearInterval(subtitleInterval);

  subtitleInterval =
  setInterval(updateSubtitle,100);
}

/* =========================
   UPDATE SUBTITLE
========================= */

function updateSubtitle(){

  const currentTime =
  popupAudio.currentTime;

  for(let sub of currentSubtitle){

    if(
      currentTime >= sub.start &&
      currentTime <= sub.end
    ){

      popupSubtitle.innerText =
      sub.text;

      return;
    }
  }

  popupSubtitle.innerText = "";
}

/* =========================
   CLOSE POPUP
========================= */

function closePopup(){

  popupModal.style.display = "none";

  popupAudio.pause();

  popupAudio.currentTime = 0;

  popupSubtitle.innerText = "";

  clearInterval(subtitleInterval);
}
