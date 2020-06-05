import { API } from "../../backend";

//category calls
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category), //need to stringify beacuse category is given in json
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

//delete categories
export const deleteaCate = (categoryId, userId, token) => {
  return fetch(`${API}//category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

export const getACate = (cateId) => {
  return fetch(`${API}/category/${cateId}`)
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

export const updateaCate = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
    //no need to stringify it beacuse we do not get it in json
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

//Products calls

//create a product
export const createaProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, //no need to stringify it beacuse we do not get it in json
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

//get all Products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};
//get a single product
export const getAProduct = (productId) => {
  return fetch(`${API}/product/${productId}`)
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};

//update a product
export const updateAProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, //no need to stringify it beacuse we do not get it in json
  })
    .then((response) => {
      return response.json();
      //json is easier to read in front end
    })
    .catch((err) => console.log(err));
};
