const tombolTema = document.getElementById('tombolTema');

function aturTombol() {
    if (document.body.classList.contains('terang')) {
        tombolTema.textContent = '🌙 Dark Mode';
    } else {
        tombolTema.textContent = '☀️ Light Mode';
    }
}

if (tombolTema) {
    try {
        if (localStorage.getItem('tema') === 'terang') {
            document.body.classList.add('terang');
        }
    } catch (err) {}

    aturTombol();

    tombolTema.addEventListener('click', function () {
        document.body.classList.toggle('terang');
        aturTombol();

        try {
            const sekarang = document.body.classList.contains('terang') ? 'terang' : 'gelap';
            localStorage.setItem('tema', sekarang);
        } catch (err) {}
    });
}

// FORMULIR RESERVASI
const form = document.getElementById('formReservasi');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const telp = document.getElementById('telp').value.trim();
        const tanggal = document.getElementById('tanggal').value;
        const jumlah = Number(document.getElementById('jumlah').value);
        const catatan = document.getElementById('catatan').value.trim();

        const hariIni = new Date().toISOString().split('T')[0];

        const error = {
            Nama: nama === '' ? 'Nama tidak boleh kosong atau hanya spasi.' : '',
            Email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Format email tidak valid.' : '',
            Telp: !/^08\d{8,11}$/.test(telp) ? 'No. telepon harus diawali 08 dan 10-13 digit.' : '',
            Tanggal: tanggal === '' ? 'Tanggal wajib diisi.' : (tanggal < hariIni ? 'Tanggal tidak boleh sebelum hari ini.' : ''),
            Jumlah: (jumlah < 1 || jumlah > 10) ? 'Jumlah orang harus antara 1 sampai 10.' : ''
        };

        let valid = true;
        for (const kunci in error) {
            document.getElementById('err' + kunci).textContent = error[kunci];
            if (error[kunci] !== '') {
                valid = false;
            }
        }

        
        const ringkasan = document.getElementById('ringkasan');
        ringkasan.textContent = '';

        if (!valid) {
            const p = document.createElement('p');
            p.className = 'mb-0 pesan-error';
            p.textContent = 'Periksa kembali isian Anda.';
            ringkasan.appendChild(p);
            return;
        }

        const data = [
            ['Nama', nama],
            ['Email', email],
            ['Telepon', telp],
            ['Tanggal', tanggal],
            ['Jumlah Orang', jumlah],
            ['Catatan', catatan === '' ? '-' : catatan]
        ];

        data.forEach(function (item) {
            const p = document.createElement('p');
            p.className = 'mb-1';
            p.textContent = item[0] + ': ' + item[1];
            ringkasan.appendChild(p);
        });

        form.reset();
    });
}