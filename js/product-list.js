class ProductList {
  constructor(productsUrl, cart) {
    this.cart = cart;
    fetch(productsUrl)
      .then(result => result.json())
      .then(products => {
        this.products = products;
        productList.renderProducts('#externalAntennas-items', 'External_Antennas');
        productList.renderProducts('#internalAntennas-items', 'Internal_Antennas');
        productList.renderProducts('#tuner-items', 'tuner');
        productList.renderProducts('#amplifier-items', 'amplifier');
        $('.addToCart').click(event => {
            const button = $(event.target);
            const id = button.data('id');
            this.cart.addItem(id);
        });
      });
  }
  getProductById(id) {
    return this.products.find(el => el.id === id);
  }

  filterByCategory(categoryKey){
    return this.products.filter(el => el.category === categoryKey);
  }

  renderProducts(htmlSelector, categoryKey){
      let productListDomString = '';
      
      let categoryProducts = this.filterByCategory(categoryKey);
      categoryProducts && categoryProducts.forEach(product => {
            productListDomString += `<section class="productCard">
               <h3 lang="en">${product.title}</h3>
               <img src="${product.imgSource}" alt="home-m5">
               <ul>
                   <li>${product.description}</li>`
                   
                if(product.minDistance){
                    productListDomString += `<li>Відстань:(${product.minDistance} - ${product.maxDistance})км</li>`
                }
               productListDomString += `</ul>
               <button class="addToCart" data-id="${product.id}">Купити</button>
           </section>`;
      });
console.log(productListDomString);
      $(htmlSelector).html(productListDomString);
  }
}