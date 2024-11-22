document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "kopi arabika", img: "1.jpg", price: "80.000 / 250g" },
      { id: 2, name: "Kopi Robusta", img: "2.jpg", price: "70.000 / 250g" },
      { id: 3, name: "Kopi Blend", img: "3.jpg", price: "75.000 / 250g" },
      {
        id: 4,
        name: "Kopi Honey Process",
        img: "4.jpg",
        price: "90.000 / 250g",
      },
      { id: 5, name: "Cold Brew", img: "5.jpg", price: "25.000 / botol 250ml" },
      { id: 6, name: "Espresso Shot", img: "6.jpg", price: "15.000 / shot" },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.item.find((item) => item.id === newItems.id);

      // jika ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
