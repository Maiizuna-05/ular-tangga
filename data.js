// ===================================================
// data.js : materi dan soal Ular Tangga Arab (MTs)
// Isi: pengaturan papan, materi ringkas, dan bank soal.
// "jawaban" = nomor pilihan yang benar, dihitung dari 0.
// Semua harakat dan penjelasan sebaiknya dicek oleh guru bahasa Arab.
// ===================================================

// ---------- 1. PENGATURAN PAPAN (6x6 = 36 petak) ----------
const papan = {
  jumlahPetak: 36,
  tangga: [ { dari: 3, ke: 13 }, { dari: 11, ke: 24 }, { dari: 20, ke: 31 } ],
  ular:   [ { dari: 17, ke: 6 }, { dari: 27, ke: 15 }, { dari: 34, ke: 21 } ]
};

// Warna petak berulang: biru, merah, hijau, biru, merah, hijau, ...
function kategoriPetak(nomor) {
  return ["mufradat", "nahwu", "sharaf"][(nomor - 1) % 3];
}

// ---------- 2. MATERI RINGKAS (dibaca sebelum bermain) ----------
const materi = {

  mufradat: {
    judul: "Mufradat (kosakata)",
    tema: [
      { nama: "Madrasah", kata: [
        ["مَدْرَسَةٌ", "madrasah"], ["فَصْلٌ", "kelas"], ["مَكْتَبَةٌ", "perpustakaan"],
        ["سَبُّورَةٌ", "papan tulis"], ["قَلَمٌ", "pena"], ["كِتَابٌ", "buku"],
        ["دَفْتَرٌ", "buku tulis"], ["مُدَرِّسٌ", "guru (laki-laki)"], ["طَالِبٌ", "siswa (laki-laki)"] ] },
      { nama: "Keluarga", kata: [
        ["أَبٌ", "ayah"], ["أُمٌّ", "ibu"], ["أَخٌ", "saudara laki-laki"],
        ["أُخْتٌ", "saudara perempuan"], ["جَدٌّ", "kakek"], ["جَدَّةٌ", "nenek"] ] },
      { nama: "Rumah", kata: [
        ["بَيْتٌ", "rumah"], ["بَابٌ", "pintu"], ["نَافِذَةٌ", "jendela"],
        ["كُرْسِيٌّ", "kursi"], ["مَكْتَبٌ", "meja"], ["غُرْفَةٌ", "kamar"] ] },
      { nama: "Makanan dan minuman", kata: [
        ["خُبْزٌ", "roti"], ["مَاءٌ", "air"], ["حَلِيبٌ", "susu"], ["تُفَّاحَةٌ", "apel"] ] },
      { nama: "Warna", kata: [
        ["أَحْمَرُ", "merah"], ["أَزْرَقُ", "biru"], ["أَخْضَرُ", "hijau"],
        ["أَبْيَضُ", "putih"], ["أَسْوَدُ", "hitam"], ["أَصْفَرُ", "kuning"] ] },
      { nama: "Kata kerja", kata: [
        ["ذَهَبَ", "pergi"], ["كَتَبَ", "menulis"], ["قَرَأَ", "membaca"],
        ["جَلَسَ", "duduk"], ["فَتَحَ", "membuka"] ] }
    ]
  },

  nahwu: {
    judul: "Nahwu (kedudukan kata)",
    poin: [
      "Kalimat dalam bahasa Arab terdiri dari tiga jenis kata: isim (nama), fi'il (kata kerja), dan huruf.",
      "Tanda isim: diawali ال atau berakhiran tanwin. Contoh: الْكِتَابُ, كِتَابٌ.",
      "Fa'il = pelaku. Hukumnya marfu', tandanya dhammah. Contoh: ذَهَبَ الطَّالِبُ.",
      "Maf'ul bih = objek. Hukumnya manshub, tandanya fathah. Contoh: قَرَأَ مُحَمَّدٌ الدَّرْسَ.",
      "Huruf jar: مِنْ، إِلَى، عَنْ، عَلَى، فِي، بِ، لِ، كَ. Isim setelahnya majrur, tandanya kasrah.",
      "Mubtada' dan khabar membentuk jumlah ismiyyah. Keduanya marfu', tandanya dhammah. Contoh: الْمَسْجِدُ كَبِيرٌ.",
      "Idhafah = mudhaf + mudhaf ilaih. Mudhaf tidak memakai ال dan tanwin, mudhaf ilaih majrur. Contoh: كِتَابُ الطَّالِبِ."
    ],
    rumus: [
      ["Fa'il", "marfu'", "dhammah"],
      ["Maf'ul bih", "manshub", "fathah"],
      ["Majrur (setelah huruf jar)", "majrur", "kasrah"],
      ["Mubtada' dan khabar", "marfu'", "dhammah"],
      ["Mudhaf ilaih", "majrur", "kasrah"]
    ]
  },

  sharaf: {
    judul: "Sharaf (perubahan kata kerja)",
    poin: [
      "Fi'il madhi = kata kerja lampau. Contoh: كَتَبَ (dia telah menulis).",
      "Fi'il mudhari' = kata kerja sedang atau akan. Berawalan ي untuk 'dia (laki-laki)'. Contoh: يَكْتُبُ.",
      "Fi'il amr = kata kerja perintah. Contoh: اُكْتُبْ (tulislah!).",
      "Mashdar = kata benda dari kata kerja. Contoh: كِتَابَةٌ (menulis, penulisan).",
      "Akhiran pada fi'il madhi menunjukkan pelaku: كَتَبَ (dia lk), كَتَبَتْ (dia pr), كَتَبْتُ (aku), كَتَبْنَا (kami)."
    ],
    tashrif: [
      ["كَتَبَ", "يَكْتُبُ", "اُكْتُبْ", "كِتَابَةٌ"],
      ["ذَهَبَ", "يَذْهَبُ", "اِذْهَبْ", "ذَهَابٌ"],
      ["جَلَسَ", "يَجْلِسُ", "اِجْلِسْ", "جُلُوسٌ"],
      ["فَتَحَ", "يَفْتَحُ", "اِفْتَحْ", "فَتْحٌ"],
      ["قَرَأَ", "يَقْرَأُ", "اِقْرَأْ", "قِرَاءَةٌ"]
    ],
    kepalaTabel: ["Madhi", "Mudhari'", "Amr", "Mashdar"]
  }
};

// ---------- 3. BANK SOAL ----------
const soal = {

  mufradat: [
    { arab: "مَكْتَبَةٌ", tanya: "Apa arti kata ini?", pilihan: ["Perpustakaan", "Kantin", "Masjid"], jawaban: 0,
      penjelasan: "مَكْتَبَةٌ artinya perpustakaan, yaitu tempat buku-buku." },
    { arab: "فَصْلٌ", tanya: "Apa arti kata ini?", pilihan: ["Kantin", "Kelas", "Rumah"], jawaban: 1,
      penjelasan: "فَصْلٌ artinya kelas." },
    { arab: "سَبُّورَةٌ", tanya: "Apa arti kata ini?", pilihan: ["Meja", "Pintu", "Papan tulis"], jawaban: 2,
      penjelasan: "سَبُّورَةٌ artinya papan tulis." },
    { arab: "مُدَرِّسٌ", tanya: "Apa arti kata ini?", pilihan: ["Siswa", "Guru (laki-laki)", "Penjaga"], jawaban: 1,
      penjelasan: "مُدَرِّسٌ artinya guru laki-laki. Siswa adalah طَالِبٌ." },
    { arab: "دَفْتَرٌ", tanya: "Apa arti kata ini?", pilihan: ["Buku tulis", "Pena", "Tas"], jawaban: 0,
      penjelasan: "دَفْتَرٌ artinya buku tulis." },
    { arab: "", tanya: "Bahasa Arab dari 'pena' adalah ...", pilihan: ["كِتَابٌ", "قَلَمٌ", "بَابٌ"], jawaban: 1,
      penjelasan: "قَلَمٌ artinya pena. كِتَابٌ adalah buku dan بَابٌ adalah pintu." },
    { arab: "أُمٌّ", tanya: "Apa arti kata ini?", pilihan: ["Ayah", "Nenek", "Ibu"], jawaban: 2,
      penjelasan: "أُمٌّ artinya ibu. Ayah adalah أَبٌ." },
    { arab: "جَدَّةٌ", tanya: "Apa arti kata ini?", pilihan: ["Kakek", "Nenek", "Saudara perempuan"], jawaban: 1,
      penjelasan: "جَدَّةٌ artinya nenek. Kakek adalah جَدٌّ." },
    { arab: "", tanya: "Bahasa Arab dari 'saudara perempuan' adalah ...", pilihan: ["أَخٌ", "أُخْتٌ", "أَبٌ"], jawaban: 1,
      penjelasan: "أُخْتٌ artinya saudara perempuan. أَخٌ adalah saudara laki-laki." },
    { arab: "بَابٌ", tanya: "Apa arti kata ini?", pilihan: ["Jendela", "Pintu", "Kursi"], jawaban: 1,
      penjelasan: "بَابٌ artinya pintu. Jendela adalah نَافِذَةٌ." },
    { arab: "نَافِذَةٌ", tanya: "Apa arti kata ini?", pilihan: ["Jendela", "Kamar", "Meja"], jawaban: 0,
      penjelasan: "نَافِذَةٌ artinya jendela." },
    { arab: "", tanya: "Bahasa Arab dari 'kursi' adalah ...", pilihan: ["مَكْتَبٌ", "كُرْسِيٌّ", "بَيْتٌ"], jawaban: 1,
      penjelasan: "كُرْسِيٌّ artinya kursi. مَكْتَبٌ adalah meja dan بَيْتٌ adalah rumah." },
    { arab: "حَلِيبٌ", tanya: "Apa arti kata ini?", pilihan: ["Air", "Roti", "Susu"], jawaban: 2,
      penjelasan: "حَلِيبٌ artinya susu. Air adalah مَاءٌ." },
    { arab: "خُبْزٌ", tanya: "Apa arti kata ini?", pilihan: ["Roti", "Apel", "Susu"], jawaban: 0,
      penjelasan: "خُبْزٌ artinya roti." },
    { arab: "أَخْضَرُ", tanya: "Warna apa ini?", pilihan: ["Hijau", "Merah", "Biru"], jawaban: 0,
      penjelasan: "أَخْضَرُ artinya hijau. Merah adalah أَحْمَرُ dan biru adalah أَزْرَقُ." },
    { arab: "أَزْرَقُ", tanya: "Warna apa ini?", pilihan: ["Kuning", "Biru", "Hitam"], jawaban: 1,
      penjelasan: "أَزْرَقُ artinya biru." },
    { arab: "جَلَسَ", tanya: "Apa arti kata kerja ini?", pilihan: ["Menulis", "Duduk", "Membaca"], jawaban: 1,
      penjelasan: "جَلَسَ artinya dia (laki-laki) telah duduk." },
    { arab: "قَرَأَ", tanya: "Apa arti kata kerja ini?", pilihan: ["Membaca", "Pergi", "Membuka"], jawaban: 0,
      penjelasan: "قَرَأَ artinya dia (laki-laki) telah membaca." }
  ],

  nahwu: [
    { arab: "", tanya: "Manakah yang termasuk isim?", pilihan: ["كَتَبَ", "الْكِتَابُ", "مِنْ"], jawaban: 1,
      penjelasan: "الْكِتَابُ diawali ال, itu tanda isim. كَتَبَ adalah fi'il dan مِنْ adalah huruf." },
    { arab: "ذَهَبَ", tanya: "Kata ini termasuk jenis kata apa?", pilihan: ["Isim", "Fi'il", "Huruf"], jawaban: 1,
      penjelasan: "ذَهَبَ menunjukkan pekerjaan di masa lampau, jadi fi'il (madhi)." },
    { arab: "فِي", tanya: "Kata ini termasuk jenis kata apa?", pilihan: ["Isim", "Fi'il", "Huruf"], jawaban: 2,
      penjelasan: "فِي adalah huruf jar yang artinya 'di'." },
    { arab: "ذَهَبَ الطَّالِبُ", tanya: "Apa kedudukan الطَّالِبُ?", pilihan: ["Maf'ul bih", "Fa'il", "Majrur"], jawaban: 1,
      penjelasan: "الطَّالِبُ adalah pelaku dan berharakat dhammah, jadi fa'il (marfu')." },
    { arab: "ضَرَبَ الْوَلَدَ مُحَمَّدٌ", tanya: "Siapa fa'il pada kalimat ini?", pilihan: ["الْوَلَدَ", "مُحَمَّدٌ", "ضَرَبَ"], jawaban: 1,
      penjelasan: "مُحَمَّدٌ berharakat dhammah, jadi fa'il. الْوَلَدَ berharakat fathah, jadi maf'ul bih. Pelaku tidak selalu berada tepat setelah fi'il." },
    { arab: "قَرَأَ مُحَمَّدٌ الدَّرْسَ", tanya: "Apa kedudukan الدَّرْسَ?", pilihan: ["Fa'il", "Maf'ul bih", "Khabar"], jawaban: 1,
      penjelasan: "الدَّرْسَ adalah objek yang dibaca dan berharakat fathah, jadi maf'ul bih (manshub)." },
    { arab: "شَرِبَ الْوَلَدُ الْحَلِيبَ", tanya: "Apa kedudukan الْحَلِيبَ?", pilihan: ["Maf'ul bih", "Fa'il", "Majrur"], jawaban: 0,
      penjelasan: "الْحَلِيبَ adalah yang diminum, berharakat fathah, jadi maf'ul bih (manshub)." },
    { arab: "ذَهَبْتُ إِلَى الْمَدْرَسَةِ", tanya: "Apa kedudukan الْمَدْرَسَةِ?", pilihan: ["Fa'il", "Maf'ul bih", "Majrur"], jawaban: 2,
      penjelasan: "الْمَدْرَسَةِ ada setelah huruf jar إِلَى dan berharakat kasrah, jadi majrur." },
    { arab: "", tanya: "Manakah yang termasuk huruf jar?", pilihan: ["عَلَى", "كَتَبَ", "الْقَلَمُ"], jawaban: 0,
      penjelasan: "عَلَى (di atas) adalah huruf jar. كَتَبَ adalah fi'il dan الْقَلَمُ adalah isim." },
    { arab: "الْمَسْجِدُ كَبِيرٌ", tanya: "Apa kedudukan الْمَسْجِدُ?", pilihan: ["Mubtada'", "Khabar", "Fa'il"], jawaban: 0,
      penjelasan: "الْمَسْجِدُ adalah pokok pembicaraan di awal kalimat ismiyyah, jadi mubtada' (marfu')." },
    { arab: "الْمَسْجِدُ كَبِيرٌ", tanya: "Apa kedudukan كَبِيرٌ?", pilihan: ["Mubtada'", "Khabar", "Maf'ul bih"], jawaban: 1,
      penjelasan: "كَبِيرٌ menjelaskan mubtada' (besar), jadi khabar (marfu', dhammah)." },
    { arab: "الْبَابُ مَفْتُوحٌ", tanya: "Apa tanda i'rab khabar مَفْتُوحٌ?", pilihan: ["Fathah", "Kasrah", "Dhammah"], jawaban: 2,
      penjelasan: "Khabar marfu', tandanya dhammah. Di sini berupa tanwin dhammah (ـٌ)." },
    { arab: "كِتَابُ الطَّالِبِ", tanya: "Apa kedudukan الطَّالِبِ?", pilihan: ["Mudhaf ilaih", "Fa'il", "Maf'ul bih"], jawaban: 0,
      penjelasan: "الطَّالِبِ adalah pemilik buku dan berharakat kasrah, jadi mudhaf ilaih (majrur)." },
    { arab: "بَيْتُ الْمُدَرِّسِ", tanya: "Manakah yang menjadi mudhaf?", pilihan: ["بَيْتُ", "الْمُدَرِّسِ", "Keduanya"], jawaban: 0,
      penjelasan: "بَيْتُ adalah mudhaf: tidak memakai ال dan tanwin. الْمُدَرِّسِ adalah mudhaf ilaih (majrur)." }
  ],

  sharaf: [
    { arab: "كَتَبَ", tanya: "Fi'il mudhari' dari kata ini adalah ...", pilihan: ["يَكْتُبُ", "يَكْتِبُ", "يَكْتَبُ"], jawaban: 0,
      penjelasan: "كَتَبَ menjadi يَكْتُبُ (huruf tengah berdhammah)." },
    { arab: "ذَهَبَ", tanya: "Fi'il mudhari' dari kata ini adalah ...", pilihan: ["يَذْهِبُ", "يَذْهَبُ", "يَذْهُبُ"], jawaban: 1,
      penjelasan: "ذَهَبَ menjadi يَذْهَبُ (huruf tengah berfathah)." },
    { arab: "جَلَسَ", tanya: "Fi'il mudhari' dari kata ini adalah ...", pilihan: ["يَجْلِسُ", "يَجْلَسُ", "يَجْلُسُ"], jawaban: 0,
      penjelasan: "جَلَسَ menjadi يَجْلِسُ (huruf tengah berkasrah)." },
    { arab: "فَتَحَ", tanya: "Fi'il mudhari' dari kata ini adalah ...", pilihan: ["يَفْتُحُ", "يَفْتَحُ", "يَفْتِحُ"], jawaban: 1,
      penjelasan: "فَتَحَ menjadi يَفْتَحُ (huruf tengah berfathah)." },
    { arab: "دَخَلَ", tanya: "Fi'il mudhari' dari kata ini adalah ...", pilihan: ["يَدْخِلُ", "يَدْخَلُ", "يَدْخُلُ"], jawaban: 2,
      penjelasan: "دَخَلَ menjadi يَدْخُلُ (huruf tengah berdhammah)." },
    { arab: "", tanya: "Fi'il amr dari فَتَحَ (bukalah!) adalah ...", pilihan: ["اِفْتَحْ", "فَتَحَ", "يَفْتَحُ"], jawaban: 0,
      penjelasan: "اِفْتَحْ adalah perintah 'bukalah!'. فَتَحَ adalah madhi dan يَفْتَحُ adalah mudhari'." },
    { arab: "", tanya: "Fi'il amr dari كَتَبَ (tulislah!) adalah ...", pilihan: ["اِكْتَبْ", "اُكْتُبْ", "كَتَبَ"], jawaban: 1,
      penjelasan: "اُكْتُبْ berawalan hamzah dhammah karena mudhari'-nya يَكْتُبُ (huruf tengah dhammah)." },
    { arab: "", tanya: "Fi'il amr dari جَلَسَ (duduklah!) adalah ...", pilihan: ["اُجْلُسْ", "جَلَسَ", "اِجْلِسْ"], jawaban: 2,
      penjelasan: "اِجْلِسْ berawalan hamzah kasrah karena mudhari'-nya يَجْلِسُ (huruf tengah kasrah)." },
    { arab: "يَقْرَأُ", tanya: "Apa arti kata kerja ini?", pilihan: ["Dia telah membaca", "Dia sedang atau akan membaca", "Bacalah!"], jawaban: 1,
      penjelasan: "يَقْرَأُ adalah fi'il mudhari', artinya sedang atau akan membaca." },
    { arab: "كَتَبَتْ", tanya: "Apa arti kata kerja ini?", pilihan: ["Dia (laki-laki) telah menulis", "Dia (perempuan) telah menulis", "Aku telah menulis"], jawaban: 1,
      penjelasan: "Tambahan ـتْ pada akhir fi'il madhi menunjukkan pelakunya perempuan." },
    { arab: "كَتَبْتُ", tanya: "Apa arti kata kerja ini?", pilihan: ["Kami telah menulis", "Dia telah menulis", "Aku telah menulis"], jawaban: 2,
      penjelasan: "Akhiran ـتُ menunjukkan pelakunya 'aku'. Untuk 'kami' akhirannya ـنَا (كَتَبْنَا)." },
    { arab: "كَتَبَ", tanya: "Mashdar dari kata ini adalah ...", pilihan: ["كِتَابَةٌ", "مَكْتَبٌ", "كَاتِبٌ"], jawaban: 0,
      penjelasan: "كِتَابَةٌ adalah mashdar (menulis). مَكْتَبٌ adalah meja dan كَاتِبٌ adalah penulis." },
    { arab: "قَرَأَ", tanya: "Mashdar dari kata ini adalah ...", pilihan: ["قَارِئٌ", "قِرَاءَةٌ", "مَقْرَأٌ"], jawaban: 1,
      penjelasan: "قِرَاءَةٌ adalah mashdar (membaca). قَارِئٌ artinya pembaca." },
    { arab: "", tanya: "Manakah yang termasuk fi'il madhi?", pilihan: ["يَذْهَبُ", "اِذْهَبْ", "ذَهَبَ"], jawaban: 2,
      penjelasan: "ذَهَبَ adalah madhi (lampau). يَذْهَبُ adalah mudhari' dan اِذْهَبْ adalah amr." }
  ]
};
