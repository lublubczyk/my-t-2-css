class Cart {
    constructor() {
        this.items = {};
        $(".cart").click(event => {
            this.renderCart();
        });
    }

    addItem(productId) {
        if(!this.items[productId]) {
            this.items[productId] = 0;
        }
        this.items[productId]++;
    }

    renderCart(){
        let cartItemsHtml = '';
        let hasItems = false;
        var cartTotal = 0;
        for(let productId in this.items){
            hasItems = true;
            let product = productList.getProductById(productId);
            var productTotal = product.price * this.items[productId];
            cartTotal += productTotal;
            cartItemsHtml += `<tr><td>${product.title}</td><td>${productTotal}</td><td>${this.items[productId]}</tr>`;
        }
        let cartTitle = 'Нема замовлень';
        if(hasItems){
            cartItemsHtml = `<table>
                <tr>
                    <th>Продукт</th>
                    <th>Ціна</th>
                    <th>Кількість</th>
                </tr>${cartItemsHtml}
                </table>
                <div class="total">Загальна сума - ${cartTotal}</div>`;
            cartTitle = 'Ваше замовлення';
        }
        let cartHtml = '<div class="cart"><h3>'+cartTitle+'</h3>'+cartItemsHtml+'</div>'
        $( "#cart-window" ).html(cartHtml)
        $( "#cart-window" ).dialog();
    }
}