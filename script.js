// ===================================================
// script.js : logika Ular Tangga Arab
// Membutuhkan data.js (papan, materi, soal, kategoriPetak)
// ===================================================

const WARNA_TIM = ["#f2b84b", "#ff7ab6", "#4fd1e8", "#a78bfa"];
const NAMA_KATEGORI = { mufradat: "Mufradat", nahwu: "Nahwu", sharaf: "Sharaf" };
const WARNA_KATEGORI = { mufradat: "#3b82f6", nahwu: "#e5484d", sharaf: "#30a46c" };
const WAJAH_DADU = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

let jumlahTim = 2;
let tim = [];
let giliran = 0;
let sibuk = false;          // true saat bidak berjalan atau soal tampil
const antrean = {};         // soal yang belum dipakai per kategori
const sel = {};             // elemen petak: sel[nomor]

const $ = function (id) { return document.getElementById(id); };

// ---------- 1. FUNGSI BANTU ----------
function acak(daftar) {
  for (let i = daftar.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [daftar[i], daftar[j]] = [daftar[j], daftar[i]];
  }
  return daftar;
}

// Ambil soal tanpa mengulang sampai semua soal kategori itu terpakai
function ambilSoal(kategori) {
  if (!antrean[kategori] || antrean[kategori].length === 0) {
    antrean[kategori] = acak(soal[kategori].slice());
  }
  return antrean[kategori].pop();
}

// Nomor petak -> posisi di grid (baris genap dari kiri, baris ganjil dari kanan)
function koordinat(nomor) {
  const barisDariBawah = Math.floor((nomor - 1) / 6);
  let kolom = (nomor - 1) % 6;
  if (barisDariBawah % 2 === 1) kolom = 5 - kolom;
  return { baris: 5 - barisDariBawah, kolom: kolom };
}

// ---------- 2. LAYAR AWAL ----------
function gambarPilihanTim() {
  const kotak = $("pilih-jumlah");
  kotak.innerHTML = "";
  [1, 2, 3, 4].forEach(function (n) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = n;
    if (n === jumlahTim) b.classList.add("aktif");
    b.addEventListener("click", function () { jumlahTim = n; gambarPilihanTim(); });
    kotak.append(b);
  });

  const isi = $("isi-nama");
  isi.innerHTML = "";
  for (let i = 0; i < jumlahTim; i++) {
    const label = document.createElement("label");
    const titik = document.createElement("span");
    titik.className = "warna";
    titik.style.background = WARNA_TIM[i];
    const input = document.createElement("input");
    input.value = "Tim " + (i + 1);
    input.maxLength = 20;
    input.setAttribute("aria-label", "Nama tim " + (i + 1));
    label.append(titik, input);
    isi.append(label);
  }
}

function mulaiPermainan() {
  const namaInput = $("isi-nama").querySelectorAll("input");
  tim = [];
  namaInput.forEach(function (input, i) {
    tim.push({
      nama: input.value.trim() || "Tim " + (i + 1),
      warna: WARNA_TIM[i],
      pos: 1,
      stat: { mufradat: { b: 0, t: 0 }, nahwu: { b: 0, t: 0 }, sharaf: { b: 0, t: 0 } }
    });
  });
  giliran = 0;
  sibuk = false;
  $("layar-awal").hidden = true;
  $("layar-main").hidden = false;
  gambarPapan();
  gambarBidak();
  perbaruiInfo();
}

// ---------- 3. PAPAN ----------
function gambarPapan() {
  const papanEl = $("papan");
  papanEl.innerHTML = "";
  for (let n = 1; n <= papan.jumlahPetak; n++) {
    const p = koordinat(n);
    const el = document.createElement("div");
    el.className = "petak " + kategoriPetak(n);
    el.style.gridRow = p.baris + 1;
    el.style.gridColumn = p.kolom + 1;

    const no = document.createElement("span");
    no.className = "no";
    no.textContent = n === 1 ? "Mulai" : n;
    el.append(no);

    const ikon = document.createElement("span");
    ikon.className = "ikon";
    if (n === papan.jumlahPetak) ikon.textContent = "🏁";
    if (papan.tangga.some(function (t) { return t.dari === n; })) ikon.textContent = "🪜";
    if (papan.ular.some(function (u) { return u.dari === n; })) ikon.textContent = "🐍";
    el.append(ikon);

    const kotakBidak = document.createElement("div");
    kotakBidak.className = "bidak-kotak";
    el.append(kotakBidak);

    sel[n] = kotakBidak;
    papanEl.append(el);
  }
  gambarGaris();
}

// Garis hijau = tangga, garis titik-titik merah = ular
function gambarGaris() {
  function tengah(n) {
    const p = koordinat(n);
    return { x: p.kolom * 100 + 50, y: p.baris * 100 + 50 };
  }
  let svg = "";
  papan.tangga.forEach(function (t) {
    const a = tengah(t.dari), b = tengah(t.ke);
    svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y +
           '" stroke="#7fe0b0" stroke-width="9" stroke-linecap="round" opacity="0.9"/>';
  });
  papan.ular.forEach(function (u) {
    const a = tengah(u.dari), b = tengah(u.ke);
    svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y +
           '" stroke="#ff6b6b" stroke-width="10" stroke-linecap="round" stroke-dasharray="1 16" opacity="0.95"/>';
  });
  $("garis").innerHTML = svg;
}

function gambarBidak() {
  for (const n in sel) sel[n].innerHTML = "";
  tim.forEach(function (t) {
    const b = document.createElement("span");
    b.className = "bidak";
    b.style.background = t.warna;
    b.title = t.nama;
    sel[t.pos].append(b);
  });
  const daftar = $("skor-tim");
  daftar.innerHTML = "";
  tim.forEach(function (t, i) {
    const li = document.createElement("li");
    if (i === giliran) li.classList.add("aktif");
    const titik = document.createElement("span");
    titik.className = "warna";
    titik.style.background = t.warna;
    const nama = document.createElement("span");
    nama.textContent = t.nama;
    const pos = document.createElement("span");
    pos.className = "pos";
    pos.textContent = "Petak " + t.pos;
    li.append(titik, nama, pos);
    daftar.append(li);
  });
}

function perbaruiInfo() {
  $("giliran").textContent = "Giliran: " + tim[giliran].nama;
  $("btn-dadu").disabled = sibuk;
  gambarBidak();
}

function tulisPesan(teks) { $("pesan").textContent = teks; }

// ---------- 4. DADU DAN GERAK ----------
function lemparDadu() {
  if (sibuk) return;
  sibuk = true;
  $("btn-dadu").disabled = true;
  tulisPesan("");
  const hasil = Math.floor(Math.random() * 6) + 1;
  let putaran = 0;
  const pengacak = setInterval(function () {
    $("dadu").textContent = WAJAH_DADU[Math.floor(Math.random() * 6)];
    putaran++;
    if (putaran >= 7) {
      clearInterval(pengacak);
      $("dadu").textContent = WAJAH_DADU[hasil - 1];
      jalan(tim[giliran], hasil);
    }
  }, 70);
}

function jalan(t, langkah) {
  if (t.pos + langkah > papan.jumlahPetak) {
    tulisPesan(t.nama + " butuh angka yang pas untuk sampai petak " + papan.jumlahPetak + ".");
    selesaiGiliran();
    return;
  }
  tulisPesan(t.nama + " maju " + langkah + " langkah.");
  let sisa = langkah;
  const jalanKaki = setInterval(function () {
    t.pos++;
    sisa--;
    gambarBidak();
    if (sisa === 0) {
      clearInterval(jalanKaki);
      mendarat(t);
    }
  }, 250);
}

function mendarat(t) {
  if (t.pos === papan.jumlahPetak) { tampilkanHasil(t); return; }
  tampilkanSoal(t, kategoriPetak(t.pos));
}

function selesaiGiliran() {
  giliran = (giliran + 1) % tim.length;
  sibuk = false;
  perbaruiInfo();
}

// ---------- 5. SOAL ----------
function tampilkanSoal(t, kategori) {
  const s = ambilSoal(kategori);
  const tangga = papan.tangga.find(function (x) { return x.dari === t.pos; });
  const ular = papan.ular.find(function (x) { return x.dari === t.pos; });

  let konteks = "";
  if (tangga) konteks = "Tangga! Jawab benar untuk naik ke petak " + tangga.ke + ".";
  if (ular) konteks = "Ular! Jawab benar supaya selamat, jawab salah akan turun ke petak " + ular.ke + ".";

  const info = $("soal-info");
  info.innerHTML = "";
  const badge = document.createElement("span");
  badge.textContent = NAMA_KATEGORI[kategori];
  badge.style.background = WARNA_KATEGORI[kategori];
  info.append(badge, document.createTextNode(t.nama + ", petak " + t.pos + (konteks ? ". " + konteks : "")));

  $("soal-arab").textContent = s.arab;
  $("soal-tanya").textContent = s.tanya;
  $("soal-hasil").textContent = "";
  $("btn-lanjut").hidden = true;

  // Acak urutan pilihan, tandai mana yang benar
  const opsi = acak(s.pilihan.map(function (teks, i) { return { teks: teks, benar: i === s.jawaban }; }));
  const kotak = $("soal-pilihan");
  kotak.innerHTML = "";

  opsi.forEach(function (o) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = o.teks;
    b.addEventListener("click", function () {
      kotak.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
      b.classList.add(o.benar ? "benar" : "salah");
      if (!o.benar) {
        // tunjukkan jawaban yang benar
        kotak.querySelectorAll("button").forEach(function (x, i) { if (opsi[i].benar) x.classList.add("benar"); });
      }
      t.stat[kategori].t++;
      if (o.benar) t.stat[kategori].b++;
      $("soal-hasil").textContent = (o.benar ? "Benar! " : "Belum tepat. ") + s.penjelasan;
      $("btn-lanjut").hidden = false;
      $("btn-lanjut").focus();
      $("btn-lanjut").onclick = function () {
        $("dlg-soal").close();
        terapkanHasil(t, o.benar, tangga, ular);
      };
    });
    kotak.append(b);
  });

  $("dlg-soal").showModal();
}

// Tangga hanya aktif kalau benar, ular hanya menggigit kalau salah
function terapkanHasil(t, benar, tangga, ular) {
  if (tangga && benar) {
    t.pos = tangga.ke;
    tulisPesan(t.nama + " naik tangga ke petak " + t.pos + "!");
  } else if (tangga) {
    tulisPesan("Jawaban salah, " + t.nama + " tidak bisa naik tangga.");
  } else if (ular && !benar) {
    t.pos = ular.ke;
    tulisPesan(t.nama + " digigit ular dan turun ke petak " + t.pos + ".");
  } else if (ular) {
    tulisPesan(t.nama + " selamat dari ular!");
  } else {
    tulisPesan(benar ? "Jawaban benar!" : "Belum tepat, tetap semangat.");
  }
  gambarBidak();
  selesaiGiliran();
}

// ---------- 6. HASIL DAN RAPOR ----------
function tampilkanHasil(pemenang) {
  $("layar-main").hidden = true;
  $("layar-akhir").hidden = false;
  $("juara").textContent = "Pemenang: " + pemenang.nama + " 🏆";

  const rapor = $("rapor");
  rapor.innerHTML = "";

  tim.forEach(function (t) {
    const kotak = document.createElement("div");
    kotak.className = "rapor-tim";
    const judul = document.createElement("h3");
    judul.textContent = t.nama;
    kotak.append(judul);

    let terlemah = null;
    let persenTerendah = 101;

    Object.keys(NAMA_KATEGORI).forEach(function (kat) {
      const s = t.stat[kat];
      const persen = s.t === 0 ? 0 : Math.round((s.b / s.t) * 100);
      if (s.t > 0 && persen < persenTerendah) { persenTerendah = persen; terlemah = kat; }

      const baris = document.createElement("div");
      baris.className = "baris";
      const nama = document.createElement("span");
      nama.textContent = NAMA_KATEGORI[kat];
      const bar = document.createElement("div");
      bar.className = "bar";
      const isi = document.createElement("i");
      isi.style.width = persen + "%";
      isi.style.background = WARNA_KATEGORI[kat];
      bar.append(isi);
      const angka = document.createElement("span");
      angka.textContent = s.t === 0 ? "belum ada soal" : s.b + "/" + s.t + " (" + persen + "%)";
      baris.append(nama, bar, angka);
      kotak.append(baris);
    });

    const saran = document.createElement("p");
    saran.className = "saran";
    saran.textContent = terlemah && persenTerendah < 70
      ? "Saran: ulangi materi " + NAMA_KATEGORI[terlemah] + "."
      : "Bagus! Semua kategori sudah kuat.";
    kotak.append(saran);
    rapor.append(kotak);
  });
}

// ---------- 7. MATERI ----------
function isiMateri() {
  const m = materi;
  let h = "<h3>" + m.mufradat.judul + "</h3>";
  m.mufradat.tema.forEach(function (tema) {
    h += "<h4>" + tema.nama + '</h4><ul class="kata">' +
      tema.kata.map(function (k) { return '<li><span class="arab" lang="ar">' + k[0] + "</span> " + k[1] + "</li>"; }).join("") + "</ul>";
  });
  h += "<h3>" + m.nahwu.judul + "</h3><ul>" + m.nahwu.poin.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>";
  h += "<table><tr><th>Kedudukan</th><th>Hukum</th><th>Tanda</th></tr>" +
    m.nahwu.rumus.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  h += "<h3>" + m.sharaf.judul + "</h3><ul>" + m.sharaf.poin.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>";
  h += "<table><tr>" + m.sharaf.kepalaTabel.map(function (c) { return "<th>" + c + "</th>"; }).join("") + "</tr>" +
    m.sharaf.tashrif.map(function (r) { return "<tr>" + r.map(function (c) { return '<td class="arab" lang="ar">' + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  $("isi-materi").innerHTML = h;
}

// ---------- 8. PASANG TOMBOL ----------
$("btn-mulai").addEventListener("click", mulaiPermainan);
$("btn-dadu").addEventListener("click", lemparDadu);
$("btn-ulang").addEventListener("click", function () { window.location.reload(); });
$("btn-materi").addEventListener("click", function () { $("dlg-materi").showModal(); });
$("btn-tutup-materi").addEventListener("click", function () { $("dlg-materi").close(); });
// Jendela soal tidak boleh ditutup dengan tombol Esc sebelum dijawab
$("dlg-soal").addEventListener("cancel", function (e) { e.preventDefault(); });

isiMateri();
gambarPilihanTim();
