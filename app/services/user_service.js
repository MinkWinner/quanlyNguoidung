function DataApi() {
  this.getUserApi = () => {
    return axios({
      url: "https://6183cae691d76c00172d1b57.mockapi.io/api/user",
      method: "GET",
    });
  };

  this.delUserApi = (id) => {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/user/${id}`,
      method: "DELETE",
    });
  };

  this.addUserApi = (user) => {
    return axios({
      url: "https://6183cae691d76c00172d1b57.mockapi.io/api/user",
      method: "POST",
      data: user,
    });
  };

  this.editUserApi = (user) => {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/user/${user.id}`,
      method: "PUT",
      data: user,
    });
  };

  this.getOneUserApi = (id) => {
    return axios({
      url: `https://6183cae691d76c00172d1b57.mockapi.io/api/user/${id}`,
      method: "GET",
    });
  };
}
