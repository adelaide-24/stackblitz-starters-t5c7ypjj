# 📦 MaterialStock

**Gestione materiali per il riciclo da allestimenti**

Una web app per organizzare e tracciare materiali provenienti da disallestimenti di mostre, eventi e padiglioni, destinati al riutilizzo in nuovi progetti.

![MaterialStock Preview](https://via.placeholder.com/800x400/F5F0E8/1A1A1A?text=MaterialStock+Preview)

---

## 🎯 Mission

> **Creare una web app intuitiva dove l'utente può inserire e modificare i materiali nel proprio archivio personale, ottenendo una visione generale completa di tutti i materiali disponibili per il riciclo in futuri allestimenti.**

MaterialStock nasce dall'esigenza di dare una seconda vita ai materiali provenienti da mostre temporanee, padiglioni fieristici e installazioni artistiche. Invece di smaltire, cataloghiamo per riutilizzare.

---

## ✅ SOTA (State Of The Art) - Funzionalità Implementate

### 🔐 Sistema di Autenticazione

| Funzionalità | Stato | Descrizione |
|--------------|:-----:|-------------|
| Login | ✅ | Accesso con email e password |
| Registrazione | ✅ | Creazione nuovo account utente |
| Multi-utente | ✅ | Ogni utente ha il proprio archivio separato |
| Sessione persistente | ✅ | Rimani loggato anche dopo refresh |
| Logout | ✅ | Disconnessione sicura |
| Account demo | ✅ | Credenziali preconfigurate per test |

### 📦 Gestione Materiali (CRUD Completo)

| Funzionalità | Stato | Descrizione |
|--------------|:-----:|-------------|
| Visualizza lista | ✅ | Tabella desktop / Card mobile |
| Aggiungi materiale | ✅ | Form completo con tutti i campi |
| Modifica materiale | ✅ | Editing inline di tutti i dati |
| Elimina materiale | ✅ | Con modale di conferma |
| Dettaglio materiale | ✅ | Vista espansa con tutte le info |
| Dati precaricati | ✅ | 7 materiali demo dalla Biennale di Venezia |

### 📝 Campi per Ogni Materiale

| Campo | Obbligatorio | Descrizione |
|-------|:------------:|-------------|
| Nome | ✅ | Descrizione del materiale |
| Quantità | ✅ | Numero di pezzi disponibili |
| Stato conservazione | ✅ | Ottimo / Buono / Discreto / Da verificare |
| Collocazione | ✅ | Dove si trova fisicamente |
| Provenienza | ❌ | Da quale evento/mostra proviene |
| Destinazione | ❌ | Verso quale progetto è destinato |
| Note | ❌ | Dettagli aggiuntivi, dimensioni, avvertenze |
| Immagine | ❌ | Foto del materiale |
| Timestamp | Auto | Data creazione e ultima modifica |

### 🖼️ Gestione Immagini

| Funzionalità | Stato | Descrizione |
|--------------|:-----:|-------------|
| Upload foto | ✅ | Caricamento da dispositivo |
| Anteprima | ✅ | Preview prima del salvataggio |
| Compressione automatica | ✅ | Ridimensionamento a max 800px |
| Rimozione immagine | ✅ | Possibilità di eliminare la foto |
| Fallback errori | ✅ | Placeholder se immagine non carica |

### 🔍 Ricerca e Ordinamento

| Funzionalità | Stato | Descrizione |
|--------------|:-----:|-------------|
| Ricerca globale | ✅ | Filtra su nome, collocazione, provenienza, destinazione, note |
| Ricerca in tempo reale | ✅ | Risultati istantanei mentre digiti |
| Ordinamento colonne | ✅ | Click sulle intestazioni per ordinare |
| Ordine ASC/DESC | ✅ | Alterna direzione con doppio click |

### 📊 Dashboard e Statistiche

| Funzionalità | Stato | Descrizione |
|--------------|:-----:|-------------|
| Contatore materiali | ✅ | Numero totale nel catalogo |
| Somma pezzi | ✅ | Quantità totale di tutti i materiali |
| Stato buono | ✅ | Materiali in condizioni ottimo/buono |

### 📱 Responsive Design

| Viewport | Vista | Caratteristiche |
|----------|-------|-----------------|
| Desktop (>768px) | Tabella | Colonne ordinate, azioni rapide |
| Tablet | Tabella ridotta | Collocazione nascosta |
| Mobile (<768px) | Card | Layout verticale, tap per dettagli |

### 🎨 Design System

| Elemento | Valore |
|----------|--------|
| **Font titoli** | DM Sans (500, 600, 700) |
| **Font corpo** | Source Sans 3 (400, 500, 600) |
| **Colore primario** | `#C4B49A` (Beige) |
| **Sfondo principale** | `#F5F0E8` (Sabbia chiara) |
| **Sfondo card** | `#FFFFFF` (Bianco) |
| **Testo primario** | `#1A1A1A` (Nero) |
| **Testo secondario** | `#6B6B6B` (Grigio) |
| **Successo** | `#4A7C59` (Verde) |
| **Warning** | `#B8860B` (Giallo scuro) |
| **Danger** | `#A65D57` (Rosso mattone) |

---

## 📁 Struttura File
materialstock/
├── index.html # Pagina unica dell'applicazione
├── css/
│ └── style.css # Tutti gli stili custom
├── js/
│ └── app.js # Logica completa (auth, CRUD, UI)
└── README.md # Questa documentazione

text


---

## 🗄️ Struttura Dati (localStorage)

### Chiavi utilizzate

```javascript
ms_users           // Array di tutti gli utenti registrati
ms_current         // Utente attualmente loggato
ms_materials_[id]  // Materiali dell'utente con quel ID
Schema Utente
JavaScript

{
  id: "abc123xyz",
  name: "Mario Rossi",
  email: "mario@email.com",
  passwordHash: "hashed_value",
  organization: "Studio Architettura",
  createdAt: 1699999999999
}
Schema Materiale
JavaScript

{
  id: "mat_abc123",
  name: "Travi in legno di abete 300×15×15cm",
  quantity: 24,
  condition: "buono",           // ottimo | buono | discreto | da verificare
  location: "Magazzino A - Scaffale 1",
  origin: "Biennale di Venezia 2023",
  destination: "Mostra Milano 2024",
  notes: "Alcune presentano segni di montaggio",
  image: "data:image/jpeg;base64,...",  // o URL esterno
  createdAt: 1699999999999,
  updatedAt: 1699999999999
}
🚀 Installazione e Avvio
Requisiti
Browser moderno (Chrome, Firefox, Safari, Edge)
Nessun server richiesto (funziona da file locale)
Metodo 1: Apertura diretta
Bash

# Semplicemente apri index.html nel browser
Metodo 2: Server locale (consigliato)
Bash

# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000

# Poi apri http://localhost:8000
Account Demo
Email: (configurato nel codice)
Password: (configurato nel codice)
📱 Compatibilità
Browser	Versione	Supporto
Chrome	80+	✅
Firefox	75+	✅
Safari	13+	✅
Edge	80+	✅
Mobile Chrome	Ultime	✅
Mobile Safari	iOS 13+	✅
🔄 Changelog: Dal Codice Iniziale al Finale
Cosa è cambiato (spiegazione semplice)
1️⃣ Architettura semplificata
Prima	Dopo	Perché
4 file JS separati	1 file JS unico	Più facile da gestire e modificare
Testi in file esterno	Testi nel HTML	Sviluppo più veloce
Bootstrap 5	CSS custom	Design più personalizzato
2️⃣ Sistema utenti potenziato
Prima	Dopo
Solo login	Login + Registrazione
1 account hardcoded	Multi-utente dinamico
Tutti vedono gli stessi materiali	Ogni utente ha il suo archivio
3️⃣ Design rinnovato
Elemento	Prima	Dopo
Font	Space Grotesk + Inter	DM Sans + Source Sans 3
Icone	Bootstrap Icons (CDN)	SVG inline (no dipendenze)
Modali mobile	Standard	Bottom sheet (più naturale)
4️⃣ Materiali demo migliorati
Prima	Dopo
Senza immagini	Con immagini reali (Unsplash)
Descrizioni base	Descrizioni dettagliate
5️⃣ Funzionalità aggiunte
✅ Tab switch Login/Registrazione
✅ Campo "Organizzazione" nel profilo
✅ Visualizzazione data creazione/modifica
✅ Gestione errori caricamento immagini
✅ Toast feedback per tutte le azioni
✅ Animazioni modali migliorate
6️⃣ Funzionalità rimosse (temporaneamente)
❌ PWA (manifest.json + service worker)
❌ Supporto offline
❌ Installazione come app
🔮 EVOLUTION (Prossimi Sviluppi)
Priorità Alta
 Export dati - Esportare l'archivio in CSV/Excel
 Import dati - Importare materiali da file
 PWA - Rendere nuovamente installabile
 Offline mode - Funzionamento senza connessione
Priorità Media
 Categorie - Raggruppare materiali per tipologia
 Tag - Etichette personalizzate
 Filtri avanzati - Per stato, collocazione, origine
 Galleria multi-immagine - Più foto per materiale
 Storico movimenti - Tracciare spostamenti
Priorità Bassa
 QR Code - Generare etichette stampabili
 Condivisione - Condividere archivio con altri utenti
 Report - Statistiche dettagliate sull'inventario
 Dark mode - Tema scuro opzionale
 Multi-lingua - Supporto inglese
🎯 MISSION (Obiettivo Finale)
Visione
MaterialStock vuole diventare lo strumento di riferimento per:

Studi di architettura e design che lavorano con allestimenti temporanei
Musei e fondazioni che gestiscono mostre itineranti
Organizzatori di fiere ed eventi che vogliono ridurre gli sprechi
Cooperative e associazioni impegnate nel riuso dei materiali
Obiettivi
Obiettivo	Descrizione
Semplicità	Usabile da personale tecnico senza formazione
Accessibilità	Funziona su qualsiasi dispositivo
Indipendenza	Nessun abbonamento, nessun server esterno
Sostenibilità	Promuovere il riuso anziché lo smaltimento
Metriche di Successo
📊 Numero di materiali catalogati
♻️ Percentuale di materiali riutilizzati
⏱️ Tempo risparmiato nella ricerca materiali
💰 Risparmio economico evitando nuovi acquisti
👥 Team
Ruolo	Nome	Contatto
Project Lead	[Nome]	[email]
Frontend Dev	[Nome]	[email]
UX/UI Designer	[Nome]	[email]
📝 Note per lo Sviluppo
Convenzioni Codice
JavaScript

// Variabili: camelCase
let currentMaterialId = null;

// Costanti: SCREAMING_SNAKE_CASE
const STORAGE_KEYS = { ... };

// Funzioni: camelCase con verbo
function handleLogin() { ... }
function renderMaterials() { ... }
function openModal() { ... }
Commenti
JavaScript

// ============================================
// SEZIONE PRINCIPALE
// ============================================

// Commento breve per singola riga
const result = doSomething();

/**
 * Commento multi-riga per funzioni complesse
 * @param {string} id - ID del materiale
 * @returns {Object|null} - Materiale trovato o null
 */
function getMaterialById(id) { ... }
📄 Licenza
[Da definire - MIT / Apache 2.0 / Proprietaria]

🙏 Crediti
Materiali demo: Ispirati al Padiglione Italia, Biennale di Venezia
Immagini: Unsplash (licenza gratuita)
Font: Google Fonts (licenza OFL)
Icone: SVG custom
Ultimo aggiornamento: [28/01/2026]

Versione: 1.0.0

text


---

## 📊 Riepilogo Visuale delle Modifiche
┌─────────────────────────────────────────────────────────────────┐
│ EVOLUZIONE MATERIALSTOCK │
├─────────────────────────────────────────────────────────────────┤
│ │
│ VERSIONE INIZIALE VERSIONE FINALE │
│ ───────────────── ────────────────── │
│ │
│ 📁 5 file JS/JSON → 📁 1 file JS │
│ 🎨 Bootstrap 5 → 🎨 CSS Custom │
│ 👤 Solo Login → 👤 Login + Registrazione │
│ 📦 Archivio condiviso → 📦 Archivio per utente │
│ 🖼️ Senza immagini demo → 🖼️ Con immagini Unsplash │
│ 📱 PWA completa → 📱 Web app (no PWA) │
│ 🔤 Space Grotesk → 🔤 DM Sans │
│ 🎯 Bootstrap Icons → 🎯 SVG inline │
│ │
└─────────────────────────────────────────────────────────────────┘
