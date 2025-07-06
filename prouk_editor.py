import json
import os
import tkinter as tk
from tkinter import messagebox

# === PATH FILE JSON ===
produk_file = "produk.json"

# Buat file jika belum ada
if not os.path.exists(produk_file):
    with open(produk_file, "w") as f:
        json.dump([], f)

# Load data produk
def load_produk():
    with open(produk_file, "r") as f:
        return json.load(f)

# Simpan data produk
def simpan_produk(data):
    with open(produk_file, "w") as f:
        json.dump(data, f, indent=2)

# Tambah produk
def tambah_produk():
    name = entry_nama.get().strip()
    price = entry_harga.get().strip()
    image = entry_gambar.get().strip()

    if not name or not price or not image:
        messagebox.showerror("Error", "Semua field wajib diisi.")
        return

    try:
        price = float(price)
    except ValueError:
        messagebox.showerror("Error", "Harga harus berupa angka.")
        return

    produk = load_produk()
    new_id = max([p["id"] for p in produk], default=0) + 1

    produk_baru = {
        "id": new_id,
        "name": name,
        "price": price,
        "image": image
    }

    produk.append(produk_baru)
    simpan_produk(produk)
    tampilkan_produk()
    messagebox.showinfo("Sukses", f"Produk '{name}' ditambahkan.")
    entry_nama.delete(0, tk.END)
    entry_harga.delete(0, tk.END)
    entry_gambar.delete(0, tk.END)

# Hapus produk berdasarkan ID
def hapus_produk():
    id_hapus = entry_hapus_id.get().strip()
    if not id_hapus:
        messagebox.showerror("Error", "Masukkan ID yang akan dihapus.")
        return

    try:
        id_hapus = int(id_hapus)
    except ValueError:
        messagebox.showerror("Error", "ID harus berupa angka.")
        return

    produk = load_produk()
    produk_baru = [p for p in produk if p["id"] != id_hapus]

    if len(produk) == len(produk_baru):
        messagebox.showwarning("Info", f"Tidak ada produk dengan ID {id_hapus}")
    else:
        simpan_produk(produk_baru)
        tampilkan_produk()
        messagebox.showinfo("Sukses", f"Produk dengan ID {id_hapus} telah dihapus.")

    entry_hapus_id.delete(0, tk.END)

# Tampilkan produk di textarea
def tampilkan_produk():
    produk = load_produk()
    teks_output.delete(1.0, tk.END)
    if not produk:
        teks_output.insert(tk.END, "(Belum ada produk)")
    else:
        for p in produk:
            teks_output.insert(tk.END, f"ID: {p['id']} | {p['name']} | Rp{p['price']:,.0f} | {p['image']}\n")

# === UI ===
window = tk.Tk()
window.title("Editor Produk JSON")
window.geometry("600x600")

# Tambah Produk
tk.Label(window, text="Tambah Produk Baru", font=("Arial", 12, "bold")).pack(pady=5)

entry_nama = tk.Entry(window, width=50)
entry_nama.insert(0, "Nama Produk")
entry_nama.pack()

entry_harga = tk.Entry(window, width=50)
entry_harga.insert(0, "Harga (angka)")
entry_harga.pack()

entry_gambar = tk.Entry(window, width=50)
entry_gambar.insert(0, "Path Gambar (ex: images/kaos.jpg)")
entry_gambar.pack()

tk.Button(window, text="Tambah Produk", command=tambah_produk).pack(pady=5)

# Hapus Produk
tk.Label(window, text="Hapus Produk (berdasarkan ID)", font=("Arial", 10)).pack(pady=10)
entry_hapus_id = tk.Entry(window, width=20)
entry_hapus_id.pack()
tk.Button(window, text="Hapus Produk", command=hapus_produk).pack()

# Output
tk.Label(window, text="Daftar Produk Saat Ini", font=("Arial", 12, "bold")).pack(pady=10)
teks_output = tk.Text(window, width=70, height=15)
teks_output.pack()

tampilkan_produk()

window.mainloop()
