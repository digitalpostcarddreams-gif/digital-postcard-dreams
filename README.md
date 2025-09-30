# Sistema Prodotti Modulare - Digital Postcard Dreams

## 🎯 Sistema Completo

Il sito ora utilizza un sistema modulare dove tutti i prodotti sono gestiti da una singola pagina template.

## 📁 Struttura

```
public/categorie/
├── partykit/ (22 prodotti)
│   ├── bottiglia/
│   ├── invitoSitch/
│   ├── party2/ - party20/
│   └── [ogni prodotto ha config.json + immaginiProdotto/]
├── bomboniere/ (8 prodotti)
│   ├── bomboniera1/ - bomboniera8/
│   └── [ogni prodotto ha config.json + immaginiProdotto/]
└── matrimonio/ (3 prodotti)
    ├── matrimonio1/ - matrimonio3/
    └── [ogni prodotto ha config.json + immaginiProdotto/]
```

## 🔗 Come Accedere ai Prodotti

**URL Pattern:**
```
descrizioneArticolo-simple.html?id=[NOME_PRODOTTO]&category=[CATEGORIA]
```

**Esempi:**
- Bottiglia: `descrizioneArticolo-simple.html?id=bottiglia&category=partykit`
- Bomboniera 3: `descrizioneArticolo-simple.html?id=bomboniera3&category=bomboniere`
- Matrimonio 2: `descrizioneArticolo-simple.html?id=matrimonio2&category=matrimonio`

## 📋 Prodotti Disponibili

- **Party Kit**: 22 prodotti (bottiglia, invitoSitch, party2-party20)
- **Bomboniere**: 8 prodotti (bomboniera1-bomboniera8)
- **Matrimonio**: 3 prodotti (matrimonio1-matrimonio3)

**Totale: 33 prodotti**

## ✅ Vantaggi

- Un solo file HTML da mantenere
- Sistema modulare e scalabile
- Funziona senza server web
- Struttura organizzata e pulita
- Facile aggiungere nuovi prodotti

## 🚀 Sistema Pronto

Il sistema è completamente funzionale e pronto per l'uso!
