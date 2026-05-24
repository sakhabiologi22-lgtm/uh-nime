document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const label    = document.getElementById("labelMasuk");
  const alertBox = document.getElementById("alertBox");

  // loading state
  label.innerText = "Memproses...";

  try {

    const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const data = await res.json();

    if (data.status === "success") {

      // simpan username ke localStorage
      localStorage.setItem("username", data.username);

      // arahkan ke halaman utama
      window.location.href = "../index.html";

    } else {

      // tampilkan pesan error
      alertBox.innerText   = "Username atau kata sandi salah, silakan coba lagi.";
      alertBox.className   = "pesan-box error";
      alertBox.style.display = "block";

      setTimeout(() => {
        alertBox.style.display = "none";
      }, 3000);

      label.innerText = "Masuk";
    }

  } catch (err) {

    alertBox.innerText   = "Gagal terhubung ke server. Periksa koneksi internetmu.";
    alertBox.className   = "pesan-box error";
    alertBox.style.display = "block";

    label.innerText = "Masuk";
  }

});
