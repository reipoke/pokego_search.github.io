const grid = document.getElementById("pokemonGrid");
let numbers = [];
let allPokemon = [];

fetch("./pokemon.json")
  .then(res => {
    if (!res.ok) throw new Error("pokemon.json error");
    return res.json();
  })
  .then(pokemon => {
    allPokemon = pokemon;
    renderCards(pokemon);
  })
  .catch(err => {
    console.error(err);
    grid.innerHTML = `<p style="color:#FF7070;padding:20px">pokemon.json の読み込みに失敗しました</p>`;
  });


/* ── Render ──────────────────────── */

function renderCards(list) {
  const noResults = document.getElementById("noResults");

  grid.innerHTML = "";

  if (list.length === 0) {
    noResults.style.display = "flex";
    const q = document.getElementById("searchInput").value.trim();
    document.getElementById("noResultsQuery").textContent = q;
    return;
  }

  noResults.style.display = "none";

  list.forEach(p => {
    const isSelected = numbers.includes(p.id);
    const card = document.createElement("div");
    card.className = "card" + (isSelected ? " selected" : "");
    card.id = `card-${p.id}`;

    const img = String(p.id).padStart(4, "0");

    card.innerHTML = `
      <div class="check-badge" aria-hidden="true">✓</div>
      <div class="card-title">No.${p.id} ${p.name}</div>
      <div class="card-img">
        <img src="images/${img}.png" alt="${p.name}" loading="lazy">
      </div>
      <div class="card-buttons">
        <button class="btn-add" onclick="add(${p.id})">追加</button>
        <button class="btn-remove" onclick="removeNum(${p.id})">削除</button>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ── Search ──────────────────────── */

function filterPokemon() {
  const query = document.getElementById("searchInput").value.trim();
  const clearBtn = document.getElementById("clearBtn");

  clearBtn.style.display = query ? "flex" : "none";

  if (!query) {
    renderCards(allPokemon);
    return;
  }

  const filtered = allPokemon.filter(p => {
    const idStr    = String(p.id);
    const idPadded = idStr.padStart(4, "0");
    return (
      p.name.includes(query) ||
      idStr.startsWith(query) ||
      idPadded.startsWith(query)
    );
  });

  renderCards(filtered);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("clearBtn").style.display = "none";
  renderCards(allPokemon);
  document.getElementById("searchInput").focus();
}


/* ── Add / Remove ────────────────── */

function add(num) {
  if (!numbers.includes(num)) {
    numbers.push(num);
    const card = document.getElementById(`card-${num}`);
    if (card) card.classList.add("selected");
  }
  update();
}

function removeNum(num) {
  numbers = numbers.filter(x => x !== num);
  const card = document.getElementById(`card-${num}`);
  if (card) card.classList.remove("selected");
  update();
}


/* ── Update UI ───────────────────── */

function update() {
  document.getElementById("result").value = numbers.join(",");
  document.getElementById("countDisplay").textContent = numbers.length;
}


/* ── Copy ────────────────────────── */

function copyText() {
  const text = document.getElementById("result").value;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.classList.add("copied");
    btn.textContent = "コピーしました";
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        コピー`;
    }, 1800);
  });
}
