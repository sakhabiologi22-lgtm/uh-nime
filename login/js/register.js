document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const label    = document.getElementById("labelDaftar");
  const message  = document.getElementById("message");

  // loading state
  label.innerText = "Mendaftar...";

  try {

    const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    });

    const data = await res.json();

    if (data.status === "success") {

      // tampilkan pesan sukses lalu arahkan ke login
      message.innerText    = "Registrasi berhasil! Silakan login.";
      message.className    = "pesan-box sukses";
      message.style.display = "block";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);

    } else {

      // tampilkan pesan error (username sudah dipakai, dll)
      message.innerText    = data.message || "Registrasi gagal. Coba username lain.";
      message.className    = "pesan-box error";
      message.style.display = "block";

      label.innerText = "Daftar";
    }

  } catch (err) {

    message.innerText    = "Gagal terhubung ke server. Periksa koneksi internetmu.";
    message.className    = "pesan-box error";
    message.style.display = "block";

    label.innerText = "Daftar";
  }

});
