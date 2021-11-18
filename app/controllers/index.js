let getApi = new DataApi();
let checkVal = new Validation();

const getEle = (id) => document.getElementById(id);

const getUser = () => {
  getApi
    .getUserApi()
    .then(function (result) {
      renderUser(result.data);
    })
    .catch(function (err) {
      alert("Không tìm thấy dữ liệu");
    });
};

getUser();

const renderUser = (userData) => {
  let content = "";
  userData.forEach((user, index) => {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button onclick="updateBtn('${
                  user.id
                }')" class="btn btn-info" data-toggle="modal"
                data-target="#myModal">Sửa</button>
                <button onclick="delUser('${
                  user.id
                }')" class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = content;
};

const updateUser = (id) => {
  let tk = getEle("TaiKhoan").value;
  let name = getEle("HoTen").value;
  let pass = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let img = getEle("HinhAnh").value;
  let userType = getEle("loaiNguoiDung").value;
  let langType = getEle("loaiNgonNgu").value;
  let des = getEle("MoTa").value;

  let isValidation = true;

  getApi
    .getUserApi()
    .then(function (result) {
      isValidation &= checkVal.isEmpty(tk, "tbTaiKhoan");

      isValidation &=
        checkVal.isEmpty(name, "tbHoTen") &&
        checkVal.isNameCorrect(
          name,
          "tbHoTen",
          "Không chứa số và ký tự đặc biệt"
        );

      isValidation &=
        checkVal.isEmpty(pass, "tbMatKhau") &&
        checkVal.isPassCorrect(
          pass,
          "tbMatKhau",
          "Phải chứa ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8"
        );

      isValidation &=
        checkVal.isEmpty(email, "tbEmail") &&
        checkVal.isEmailCorrect(email, "tbEmail", "Sai format email");

      isValidation &= checkVal.isEmpty(img, "tbHinhAnh");

      isValidation &= checkVal.isOptionSelected(
        userType,
        "tbLoaiND",
        "loaiNguoiDung"
      );

      isValidation &= checkVal.isOptionSelected(
        langType,
        "tbNgonNgu",
        "loaiNgonNgu"
      );

      isValidation &=
        checkVal.isEmpty(des, "tbMoTa") &&
        checkVal.isDesCorrect(des, "tbMoTa", "Không vượt quá 60 ký tự");

      if (isValidation) {
        let updatedUser = new User(
          id,
          tk,
          name,
          pass,
          email,
          img,
          userType,
          langType,
          des
        );

        getApi
          .editUserApi(updatedUser)
          .then(function (result) {
            getUser();
            $("#myModal").modal("hide");
          })
          .catch(function (err) {
            alert("Không tìm thấy dữ liệu");
          });
      }
    })
    .catch(function (err) {
      alert("Không tìm thấy dữ liệu");
    });
};

const addUser = () => {
  let tk = getEle("TaiKhoan").value;
  let name = getEle("HoTen").value;
  let pass = getEle("MatKhau").value;
  let email = getEle("Email").value;
  let img = getEle("HinhAnh").value;
  let userType = getEle("loaiNguoiDung").value;
  let langType = getEle("loaiNgonNgu").value;
  let des = getEle("MoTa").value;

  let isValidation = true;

  getApi
    .getUserApi()
    .then(function (result) {
      isValidation &=
        checkVal.isEmpty(tk, "tbTaiKhoan") &&
        checkVal.isExist(tk, "tbTaiKhoan", result.data);

      isValidation &=
        checkVal.isEmpty(name, "tbHoTen") &&
        checkVal.isNameCorrect(
          name,
          "tbHoTen",
          "Không chứa số và ký tự đặc biệt"
        );

      isValidation &=
        checkVal.isEmpty(pass, "tbMatKhau") &&
        checkVal.isPassCorrect(
          pass,
          "tbMatKhau",
          "Phải chứa ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8"
        );

      isValidation &=
        checkVal.isEmpty(email, "tbEmail") &&
        checkVal.isEmailCorrect(email, "tbEmail", "Sai format email");

      isValidation &= checkVal.isEmpty(img, "tbHinhAnh");

      isValidation &= checkVal.isOptionSelected(
        userType,
        "tbLoaiND",
        "loaiNguoiDung"
      );

      isValidation &= checkVal.isOptionSelected(
        langType,
        "tbNgonNgu",
        "loaiNgonNgu"
      );

      isValidation &=
        checkVal.isEmpty(des, "tbMoTa") &&
        checkVal.isDesCorrect(des, "tbMoTa", "Không vượt quá 60 ký tự");

      if (isValidation) {
        let newUser = new User(
          "",
          tk,
          name,
          pass,
          email,
          img,
          userType,
          langType,
          des
        );

        getApi
          .addUserApi(newUser)
          .then(function (result) {
            getUser();
            $("#myModal").modal("hide");
          })
          .catch(function (err) {
            alert("Không tìm thấy dữ liệu");
          });
      }
    })
    .catch(function (err) {
      alert("Không tìm thấy dữ liệu");
    });
};

const delUser = (id) => {
  getApi
    .delUserApi(id)
    .then(function (result) {
      getUser();
    })
    .catch(function (err) {
      alert("Không tìm thấy dữ liệu");
    });
};

getEle("btnThemNguoiDung").onclick = () => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add User";
  document.getElementsByClassName(
    "modal-footer"
  )[0].innerHTML = `<button onclick="addUser()" class="btn btn-success">Add new</button>`;

  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = getEle("loaiNguoiDung").options[0].value;
  getEle("loaiNgonNgu").value = getEle("loaiNgonNgu").options[0].value;
  getEle("MoTa").value = "";

  let tb = document.getElementsByClassName("tbModal");
  for (let i = 0; i < tb.length; i++) {
    tb[i].innerHTML = "";
  }
};

const updateBtn = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";
  document.getElementsByClassName(
    "modal-footer"
  )[0].innerHTML = `<button onclick="updateUser('${id}')" class="btn btn-success">Update</button>`;

  getApi
    .getOneUserApi(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (err) {
      alert("Không tìm thấy dữ liệu");
    });

  let tb = document.getElementsByClassName("tbModal");
  for (let i = 0; i < tb.length; i++) {
    tb[i].innerHTML = "";
  }
};
