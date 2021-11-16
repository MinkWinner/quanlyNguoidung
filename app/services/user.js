function User(id, tk, name, pass, email, img, usertype, langtype, des) {
  this.id = id;
  this.taiKhoan = tk;
  this.hoTen = name;
  this.matKhau = pass;
  this.email = email;
  this.loaiND = usertype;
  this.ngonNgu = langtype;
  this.moTa = des;
  this.hinhAnh = img;
}
