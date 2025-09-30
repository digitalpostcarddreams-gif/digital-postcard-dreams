// Sistema dinamico universale per il caricamento prodotti
// Digital Postcard Dreams - Sistema Modulare

class ProductLoader {
  constructor(category, containerId) {
    this.category = category;
    this.containerId = containerId;
    this.products = this.getProductList(category);
    this.folderMapping = this.getFolderMapping();
  }

  // Lista prodotti per categoria (senza duplicazioni)
  getProductList(category) {
    const productLists = {
      partykit: [
        'bottiglia', 'invitoSitch', 'party2', 'party3', 'party4', 'party5', 
        'party6', 'party7', 'party8', 'party9', 'party10', 'party11', 
        'party12', 'party13', 'party14', 'party15', 'party16', 'party17', 
        'party18', 'party19', 'party20'
      ],
      matrimonio: [
        'matrimonio1', 'matrimonio2', 'matrimonio3'
      ],
      bomboniere: [
        'bomboniera1', 'bomboniera2', 'bomboniera3', 'bomboniera4', 
        'bomboniera5', 'bomboniera6', 'bomboniera7', 'bomboniera8'
      ]
    };
    
    return productLists[category] || [];
  }

  // Mapping per prodotti con nomi diversi dalle cartelle
  getFolderMapping() {
    return {
      'bottiglia1': 'bottiglia',
      'bottiglia2': 'bottiglia'
    };
  }

  // Carica tutti i prodotti
  async loadAllProducts() {
    const productsContainer = document.getElementById(this.containerId);
    if (!productsContainer) {
      console.error(`Container ${this.containerId} non trovato`);
      return;
    }

    console.log(`Inizio caricamento prodotti ${this.category}...`);
    
    let loadedProducts = [];
    let failedProducts = [];

    // Carica tutti i prodotti in parallelo
    const loadPromises = this.products.map(async (productId) => {
      try {
        const folderName = this.folderMapping[productId] || productId;
        const configPath = `categorie/${this.category}/${folderName}/config.json`;
        
        console.log(`Caricando configurazione per: ${productId} (cartella: ${folderName})`);
        
        const response = await fetch(configPath);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Config non trovato per ${productId}`);
        }
        
        const config = await response.json();
        
        // Trova la prima immagine disponibile
        const imagePath = await this.findFirstImage(productId, folderName);
        
        return {
          id: productId,
          folderName: folderName,
          config: config,
          imagePath: imagePath
        };
      } catch (error) {
        console.error(`Errore caricamento ${productId}:`, error);
        failedProducts.push({ id: productId, error: error.message });
        return null;
      }
    });

    // Aspetta che tutti i prodotti siano caricati
    const results = await Promise.all(loadPromises);
    loadedProducts = results.filter(result => result !== null);

    // Rimuovi duplicazioni basate sul titolo del prodotto
    loadedProducts = this.removeDuplicateProducts(loadedProducts);

    console.log(`Caricati ${loadedProducts.length} prodotti unici, ${failedProducts.length} errori`);
    
    if (failedProducts.length > 0) {
      console.warn('Prodotti con errori:', failedProducts);
    }

    // Genera l'HTML per i prodotti
    this.generateProductsHTML(loadedProducts);
  }

  // Rimuove prodotti duplicati basandosi sul titolo
  removeDuplicateProducts(products) {
    const seenTitles = new Set();
    const uniqueProducts = [];
    
    for (const product of products) {
      const title = product.config.title || product.id;
      
      if (!seenTitles.has(title)) {
        seenTitles.add(title);
        uniqueProducts.push(product);
      } else {
        console.log(`Rimosso prodotto duplicato: ${product.id} (titolo: ${title})`);
      }
    }
    
    return uniqueProducts;
  }

  // Trova tutte le immagini disponibili per un prodotto specifico
  async getAllProductImages(folderName) {
    console.log(`🔍 Ricerca ULTRA-VELOCE immagini per: ${folderName}`);
    
    const foundImages = [];

    // Solo i pattern più essenziali - ULTRA VELOCE
    const essentialPatterns = [
      'foto1.jpg', 'foto2.jpg', 'foto3.jpg', 'foto4.jpg', 'foto5.jpg'
    ];

    console.log(`📋 Testando solo ${essentialPatterns.length} pattern essenziali`);

    // Testa solo i pattern essenziali
    for (const fileName of essentialPatterns) {
      const imagePath = `categorie/${this.category}/${folderName}/immaginiProdotto/${fileName}`;
      if (await this.imageExists(imagePath)) {
        foundImages.push(imagePath);
        console.log(`✅ Trovata: ${imagePath}`);
      }
    }

    console.log(`🎯 TROVATE ${foundImages.length} immagini per ${folderName}:`, foundImages);
    return foundImages;
  }

  // Trova la prima immagine disponibile
  async findFirstImage(productId, folderName) {
    // Usa il nuovo schema foto1.jpg, foto2.jpg, etc.
    const imageNames = ['foto1.jpg', 'foto2.jpg', 'foto3.jpg'];

    // Prova i nomi del nuovo schema
    for (const name of imageNames) {
      const imagePath = `categorie/${this.category}/${folderName}/immaginiProdotto/${name}`;
      if (await this.imageExists(imagePath)) {
        return imagePath;
      }
    }

    // Fallback: usa l'immagine principale della categoria
    return `categorie/${this.category}/${productId}.jpg`;
  }

  // Verifica se un'immagine esiste
  imageExists(imagePath) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imagePath;
    });
  }

  // Genera l'HTML dei prodotti
  generateProductsHTML(products) {
    const productsContainer = document.getElementById(this.containerId);
    
    if (products.length === 0) {
      productsContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Nessun prodotto trovato</h4>
            <p>Non sono stati trovati prodotti da visualizzare.</p>
          </div>
        </div>
      `;
      return;
    }

    let productsHTML = '';
    
    products.forEach(product => {
      const productUrl = `descrizioneArticolo-simple.html?id=${product.id}&category=${this.category}`;
      const imageAlt = product.config.title || `${product.id} - Immagine prodotto`;
      
      productsHTML += `
        <div class="col-md-4 col-lg-3">
          <div class="card h-100">
            <a href="${productUrl}">
              <img src="${product.imagePath}" 
                   class="card-img-top img-hover" 
                   alt="${imageAlt}" 
                   style="height: 250px; object-fit: cover;"
                   onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0xMjUgMTAwSDIwMFYxNTBIMTI1VjEwMFoiIGZpbGw9IiNEOUQ5RDkiLz4KPHBhdGggZD0iTTEzNSAxMTBIMTkwVjE0MEgxMzVWMTEwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8dGV4dCB4PSIxMjUiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbW1hZ2luZSBub24gZGlzcG9uaWJpbGU8L3RleHQ+Cjwvc3ZnPgo='">
            </a>
            <div class="card-body">
              <a href="${productUrl}" class="text-decoration-none">
                <h5 class="card-title" style="font-family: 'Montserrat', sans-serif; color: #695841;">
                  ${product.config.title || product.id}
                </h5>
                <h6 class="text-primary">${product.config.price || 'Prezzo su richiesta'}</h6>
              </a>
            </div>
          </div>
        </div>
      `;
    });

    productsContainer.innerHTML = productsHTML;
    console.log(`Generati ${products.length} prodotti nella pagina ${this.category}`);
  }
}

// Funzione di utilità per inizializzare il caricamento prodotti
function initProductLoader(category, containerId) {
  const loader = new ProductLoader(category, containerId);
  loader.loadAllProducts();
  return loader;
}

// Esporta per uso globale
window.ProductLoader = ProductLoader;
window.initProductLoader = initProductLoader;
