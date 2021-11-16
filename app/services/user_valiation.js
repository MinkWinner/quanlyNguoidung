function Validation() {
  this.isEmpty = (value, id) => {
    if (value.trim() != "") {
      document.getElementById(id).innerHTML = "";
      return true;
    }
    document.getElementById(id).innerHTML = "Dữ liệu nhập bị trống";
    return false;
  };

  this.isExist = (value, id, listUser) => {
    let exist = false;
    listUser.map((user) => {
      if (user.taiKhoan == value) {
        exist = true;
      }
    });
    if (!exist) {
      document.getElementById(id).innerHTML = "";
      return true;
    }
    document.getElementById(id).innerHTML = "Tài khoản đã tồn tại";
    return false;
  };

  this.isOptionSelected = (value, idThongbao, id) => {
    let select = document.getElementById(id).options[0].value;
    if (value != select) {
      document.getElementById(idThongbao).innerHTML = "";
      return true;
    }
    document.getElementById(idThongbao).innerHTML = "Chưa chọn dữ liệu";
    return false;
  };

  this.checkPattern = (value, pattern, id, alert) => {
    if (value.match(pattern)) {
      document.getElementById(id).innerHTML = "";
      return true;
    }
    document.getElementById(id).innerHTML = alert;
    return false;
  };

  this.isNameCorrect = (value, id, alert) => {
    let pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
    );
    return this.checkPattern(value, pattern, id, alert);
  };

  this.isPassCorrect = (value, id, alert) => {
    let pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
    return this.checkPattern(value, pattern, id, alert);
  };

  this.isEmailCorrect = (value, id, alert) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.checkPattern(value, pattern, id, alert);
  };

  this.isDesCorrect = (value, id, alert) => {
    let pattern = /^.{0,60}$/;
    return this.checkPattern(value, pattern, id, alert);
  };
}
