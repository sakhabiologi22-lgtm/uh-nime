const API_URL = "https://herisusanta.my.id/javalogin/api/auth.php";

async function lakukanMasuk() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const pesanMasuk = document.getElementById("pesanMasuk");
  const labelMasuk = document.getElementById("labelMasuk");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset pesan
  pesanMasuk.style.display = "none";
  pesanMasuk.className = "pesan";
  pesanMasuk.textContent = "";

  // Validasi sederhana
  if (!username || !password) {
    pesanMasuk.classList.add("error");
    pesanMasuk.style.display = "block";
    pesanMasuk.textContent = "Username atau kata sandi salah.";
    return;
  }

  try {
    labelMasuk.textContent = "Memproses...";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        `action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const data = await response.json();

    if (data.status === "success") {

      // Simpan username
      localStorage.setItem("username", data.username);

      // Redirect ke halaman utama
      window.location.href = "../index.html";

    } else {

      pesanMasuk.classList.add("error");
      pesanMasuk.style.display = "block";
      pesanMasuk.textContent = "Username atau kata sandi salah.";
    }

  } catch (error) {

    pesanMasuk.classList.add("error");
    pesanMasuk.style.display = "block";
    pesanMasuk.textContent = "Terjadi kesalahan saat login.";
  }

  labelMasuk.textContent = "Masuk";
}