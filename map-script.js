document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('leaflet-map').setView([-4.5, 118], 5);

  const baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }),
  
    "ESRI World Imagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    }),
  
    "Carto Light": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB'
    }),
  
    "Carto Dark": L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB'
    }),
  
    "Stamen Toner": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://stamen.com/">Stamen Design</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
  
    "Stamen Terrain": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="https://stamen.com/">Stamen Design</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
  
    "Stamen Watercolor": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="https://stamen.com/">Stamen Design</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
  
    "Esri Topographic": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, USGS, NOAA'
    }),
  
    "Google Satellite (tidak resmi)": L.tileLayer('http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      attribution: '© Google (unofficial)',
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    })
  };
  

  baseMaps["OpenStreetMap"].addTo(map);

    const categoryColors = {
      "Badan Pertanahan Nasional": "#007bff",
      "Badan Informasi Geospasial": "#28a745",
      "Badan Nasional Pengelolaan Perbatasan": "#dc3545",
      "PT Socfin Indonesia": "#ffc107",
      "Dinas Pekerjaan Umum dan Perumahan Rakyat": "#17a2b8",
      "Badan Pusat Statistik": "#6f42c1",
      "Badan Penelitian dan Pengembangan Daerah": "#fd7e14",
      "My Home": "#6c757d"
    };
    
    function getMarkerColor(category) {
      return categoryColors[category] || "#cccccc";
    }
    

   // Daftar lokasi (dengan kategori)
   const locations = [
     {
       coords: [-7.573898, 110.784237],
       title: "Bashra's",
       desc: "Home Sweet Home.",
       category: "Pribadi"
     },
     {
       coords: [-6.491099, 106.849352],
       title: "Badan Informasi Geospasial",
       desc: "Operator Penginderaan Jauh dalam program penegasan batas desa (PT Geotrav Bhuana Survey) dan Tenaga Ahli GIS dalam program penyusunan Atlas Bentanglahan Gunungapi Sumatera (PT Inasa Sakha Kirana)",
       category: "Badan Informasi Geospasial"
     },
     {
       coords: [-2.747615, 111.166621],
       title: "BPN Kabupaten Sukamara",
       desc: "Operator GIS dalam program PTSL-PM (PT Geotrav Bhuana Survey).",
       category: "Badan Pertanahan Nasional"
     },
     {
       coords: [-6.895215, 109.388360],
       title: "BPN Kabupaten Pemalang",
       desc: "Operator GIS dalam program PTSL-PM (PT Geotrav Bhuana Survey).",
       category: "Badan Pertanahan Nasional"
     },
     {
       coords: [-7.325040, 110.194333],
       title: "BPN Kabupaten Temanggung",
       desc: "Koordinator GIS dalam program PTSL-PM (PT Geotrav Bhuana Survey)",
       category: "Badan Pertanahan Nasional"
     },
     {
       coords: [-6.979226, 109.138949],
       title: "BPN Kabupaten Tegal",
       desc: "Operator GIS dalam program PUNA (KJSM Febrian Bayu)",
       category: "Badan Pertanahan Nasional"
     },
     {
       coords: [3.5668, 98.6584],
       title: "PT Socfin Indonesia",
       desc: "Monitoring pokok dan produktifitas kelapa sawit (CV Multikreasindo Nusantara)",
       category: "PT Socfin Indonesia"
     },
     {
       coords: [-8.6853, 121.0662],
       title: "BAPPELITBANGDA Kabupaten Nagekeo",
       desc: "Tenaga Ahli GIS dalam program penyusunan Roadmap Pariwisata Kabupaten Nagekeo",
       category: "Badan Penelitian dan Pengembangan Daerah"
     },
     {
       coords: [-7.7049, 110.6152],
       title: "PUPR Kabupaten Klaten",
       desc: "Operator GIS dalam penyusunan RTRW Kabupaten Klaten",
       category: "Dinas Pekerjaan Umum dan Perumahan Rakyat"
     },
     {
       coords: [-6.9192, 110.1971],
       title: "PUPR Kabupaten Kendal",
       desc: "Operator GIS dalam digitalisasi saluran irigasi Kabupaten Kendal (PT Arenco Lima Bintang)",
       category: "Dinas Pekerjaan Umum dan Perumahan Rakyat"
     },
     {
       coords: [-7.5650, 110.8250],
       title: "BPS Kota Surakarta",
       desc: "Surveyor dalam persiapan muatan Sensus Penduduk 2020",
       category: "Badan Pusat Statistik"
     },
     {
       coords: [-6.1751, 106.8650],
       title: "BNPP",
       desc: "Tenaga Ahli GIS dalam program digitalisasi data (PT Mitratech Indonesia)",
       category: "Badan Nasional Pengelolaan Perbatasan"
     }
   ];

   locations.forEach(loc => {
       const icon = L.divIcon({
         className: "custom-marker",
         html: `<span style="background-color: ${getMarkerColor(loc.category)};"></span>`
       });

       L.marker(loc.coords, { icon })
         .addTo(map)
         .bindPopup(`<b>${loc.title}</b><br><span class="popup-subtext">${loc.desc}</span>`);
     });

     // Buat legend control
const legend = L.control({ position: "topright" });

legend.onAdd = function () {
  const div = L.DomUtil.create("div", "leaflet-legend");
  let html = `<h4>Legenda</h4><ul>`;
  for (const [category, color] of Object.entries(categoryColors)) {
    html += `<li><span style="background-color: ${color};"></span> ${category}</li>`;
  }
  html += `</ul>`;
  div.innerHTML = html;
  return div;
};

legend.addTo(map);

// Buat tombol toggle control
const toggleButton = L.control({ position: "topright" });

toggleButton.onAdd = function () {
  const div = L.DomUtil.create("div", "leaflet-toggle-button");
  div.innerHTML = `
    <button id="toggle-legend-btn" onclick="toggleLegend()">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8.354 1.146a.5.5 0 0 0-.708 0L1 7.793V14a1 1 0 0 0 1 1h4v-4h4v4h4a1 1 0 0 0 1-1V7.793l-6.646-6.647z"/>
      </svg>
      <span class="toggle-label">Tutup Legenda</span>
    </button>
  `;
  return div;
};

toggleButton.addTo(map);

// Fungsi toggle
window.toggleLegend = function () {
  const legendContainer = legend.getContainer();
  const label = document.querySelector(".toggle-label");

  if (legendContainer.classList.contains("hidden")) {
    legendContainer.classList.remove("hidden");
    label.textContent = "Tutup Legenda";
  } else {
    legendContainer.classList.add("hidden");
    label.textContent = "Buka Legenda";
  }
};

     L.control.layers(baseMaps, null, { position: 'topleft' }).addTo(map);
   });