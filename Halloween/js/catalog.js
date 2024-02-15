class Catalog {
    constructor() {
        this.products = [
            // Costumes
            { id: 1, name: "DUO COSTUME", code: "Duo costume", image: "../Halloween/assets/costumes1.jpg", description: "DUO COSTUME PACK.", price: 18.99 },
            { id: 2, name: "WITCH COSTUME", code: "Witch Costume", image: "../Halloween/assets/costumes2.jpg", description: "WITCH COSTUME", price: 12.99 },
            { id: 3, name: "CHILDREN HORROR OUTFIT", code: "childrenhorror", image: "../Halloween/assets/costumes3.jpg", description: "CHILDREN HORROR OUTFIT", price: 12.99 },

            // Masks
            { id: 4, name: "SCARY MASK", code: "mask1", image: "../Halloween/assets/mask1.jpg", description: "UNLEASH YOUR INNER FEAR WITH THIS TERRIFYING MASK. FEATURING A SPOOKY DESIGN PERFECT FOR HAUNTING NIGHTS.", price: 9.99 },
            { id: 5, name: "ENCHANTED MASK", code: "mask2", image: "../Halloween/assets/mask2.jpg", description: "TRANSPORT YOURSELF TO A MAGICAL REALM WITH THIS ENCHANTED MASK. FEATURES INTRICATE DESIGNS AND MYSTERIOUS AURA.", price: 9.99 },
            { id: 6, name: "PLAGUE DOCTOR MASK", code: "mask3", image: "../Halloween/assets/mask3.jpg", description: "EMBODY THE SPIRIT OF THE PLAGUE DOCTOR WITH THIS AUTHENTIC MASK. PERFECT FOR A HAUNTING MEDIEVAL LOOK.", price: 9.99 },

            // Props
            { id: 7, name: "SKELETON PROP", code: "prop1", image: "../Halloween/assets/prop1.jpg", description: "GREET TRICK-OR-TREATERS WITH THIS MENACING SKELETON. CRAFTED WITH HIGH-QUALITY MATERIALS.", price: 22.99 },
            { id: 8, name: "GLOWING SKELETONS PROP", code: "prop2", image: "../Halloween/assets/prop2.jpg", description: "GLOW IN THE DARK. CRAFTED WITH HIGH-QUALITY MATERIALS.", price: 15.99 },
            { id: 9, name: "PUMPKIN PROP", code: "prop3", image: "../Halloween/assets/prop3.jpg", description: "PUMPKIN PROP TO SCARE THE TRICK-OR-TREATERS. CUSTOMIZE YOUR FRONT DOOR OR YARD. CRAFTED WITH HIGH-QUALITY MATERIALS.", price: 32.99 }
        ];
    }

    getItem(code) {
        return this.products.find(product => product.code === code) || null;
    }

    findItem(code) {
        return this.products.some(product => product.code === code);
    }
}

class ItemOrder {
    constructor(item) {
        this.item = item;
        this.numItems = 1;
    }

    getItem() { return this.item; }
    setItem(item) { this.item = item; }
    getNumItems() { return this.numItems; }
    setNumItems(n) { this.numItems = n; }
    getItemId() { return ((this.getItem()).id); }
    getItemCode() { return ((this.getItem()).code); }
    getItemName() { return ((this.getItem()).name); }
    getItemImage() { return ((this.getItem()).image); }
    getDescription() { return ((this.getItem()).description); }
    getUnitCost() { return ((this.getItem()).price).toFixed(2); }
    incrementNumItems() { this.setNumItems(parseInt(this.getNumItems()) + 1); }
    cancelOrder() { this.setNumItems(0); }
    getTotalCost() { return (parseInt(this.getNumItems()) * parseFloat(this.getUnitCost())).toFixed(2); }
}

class ShoppingCart {
    constructor(userid) {
        this.userid = userid;
        this.itemsOrdered = [];
        this.loadCart();
    }

    getItemImage(id) {
        for (let i = 0; i < this.itemsOrdered.length; ++i) {
            let item = this.itemsOrdered[i];
            if (item.getItemId() == id) {
                return (this.itemsOrdered[i]).getItemImage();
            }
        }
        return '';
    }

    getItemsOrdered() { return this.itemsOrdered; }

    printShoppingCart() {
        for (let i = 0; i < this.itemsOrdered.length; ++i) {
            let item = this.itemsOrdered[i];
            console.log("id=" + item.getItemId() + ": desc=" + item.getDescription() + " qty=" + item.getNumItems());
        }
    }

    addItem(itemCode) {
        for (let i = 0; i < this.itemsOrdered.length; ++i) {
            let item = this.itemsOrdered[i];
            if (item.getItemCode() == itemCode) {
                (this.itemsOrdered[i]).incrementNumItems();
                this.storeCart();
                return;
            }
        }
        let catalog = new Catalog();
        let newOrder = new ItemOrder(catalog.getItem(itemCode));
        this.itemsOrdered.push(newOrder);
        this.storeCart();
    }

    setNumOrdered(itemCode, numOrdered) {
        for (let i = 0; i < this.itemsOrdered.length; ++i) {
            let item = this.itemsOrdered[i];
            if (item.getItemCode() == itemCode) {
                if (numOrdered <= 0) {
                    this.itemsOrdered.splice(i, 1);
                    this.storeCart();
                    return;
                } else {
                    (this.itemsOrdered[i]).setNumItems(numOrdered);
                    this.storeCart();
                    return;
                }
            }
        }
        let catalog = new Catalog();
        let newOrder = new ItemOrder(catalog.getItem(itemCode));
        newOrder.setNumItems(numOrdered);
        this.itemsOrdered.push(newOrder);
        this.storeCart();
    }

    getTotalCost() {
        let total = 0;
        for (let i = 0; i < this.itemsOrdered.length; ++i) {
            let item = this.itemsOrdered[i];
            total += parseFloat(item.getTotalCost());
        }
        return total.toFixed(2);
    }

    addTax() {
        let total = parseFloat(this.getTotalCost());
        return (total * 0.1 + total).toFixed(2);
    }

    addShipping(shipcost = 0) {
        return (parseFloat(this.addTax()) + parseFloat(shipcost)).toFixed(2);
    }

    emptyShoppingCart() {
        this.itemsOrdered = [];
        var usercart = this.userid + "cart";
        setCookie(usercart, "", -1);
    }

    storeCart() {
        var usercart = this.userid + "cart";
        var cart = "";
        var atleastone = false;
        let items = this.getItemsOrdered();
        for (let i = 0; i < items.length; i++) {
            var qty = parseInt(items[i].getNumItems());
            if (qty >= 1) {
                cart = cart + (items[i].getItemCode() + ":" + qty + "@");
                atleastone = true;
            }
        }
        if (atleastone) {
            cart = cart.substring(0, cart.length - 1);
            setCookie(usercart, cart, 30);
        } else setCookie(usercart, "", -1);
    }

    loadCart() {
        let cartname = this.userid + "cart";
        let cart = getCookie(cartname);
        if (cart != null) {
            var str = cart.split("@");
            for (var i = 0; i < str.length; i++) {
                var item = str[i].split(":");
                var cookiename = item[0];
                var cookievalue = item[1];
                this.setNumOrdered(cookiename, cookievalue);
            }
        }
    }
}
