const API_URL = "https://herisusanta.my.id/javalogin/api/auth.php";

async function lakukanDaftar() {
  const usernameInput = document.getElementById("regUsername");
  const passwordInput = document.getElementById("regPassword");
  const pesanDaftar = document.getElementById("pesanDaftar");
  const labelDaftar = document.getElementById("labelDaftar");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Reset pesan
  pesanDaftar.style.display = "none";
  pesanDaftar.className = "pesan";
  pesanDaftar.textContent = "";

  // Validasi
  if (!username || !password) {
    pesanDaftar.classList.add("error");
    pesanDaftar.style.display = "block";
    pesanDaftar.textContent = "Username dan kata sandi wajib diisi.";
    return;
  }

  try {
    labelDaftar.textContent = "Memproses...";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        `action=register&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const data = await response.json();

    if (data.status === "success") {

      pesanDaftar.classList.add("sukses");
      pesanDaftar.style.display = "block";
      pesanDaftar.textContent = "Registrasi berhasil! Silakan login.";

      // Kosongkan input
      usernameInput.value = "";
      passwordInput.value = "";

      // Kembali ke tab login
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);

    } else {

      pesanDaftar.classList.add("error");
      pesanDaftar.style.display = "block";
      pesanDaftar.textContent =
        data.message || "Gagal melakukan registrasi.";
    }

  } catch (error) {

    pesanDaftar.classList.add("error");
    pesanDaftar.style.display = "block";
    pesanDaftar.textContent = "Terjadi kesalahan saat registrasi.";
  }

  labelDaftar.textContent = "Daftar";
}