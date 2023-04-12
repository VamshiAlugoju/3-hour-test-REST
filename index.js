let Tprice = 0;

let InpName = document.querySelector("#Name");
let InpPrice = document.querySelector("#Price");
let ListItems = document.querySelector("#list-group");
let TotalPrice = document.querySelector("#Total_value");

document.querySelector("#submit_btn").addEventListener("click", addItem);
window.addEventListener("load", LoadFirst);

function LoadFirst() {
  axios
    .get("https://crudcrud.com/api/584702e96cda493b914c2adea6f0f34e/products")
    .then((res) => {
      res.data.forEach((item) => {
        localStorage.setItem(item._id, JSON.stringify(item));
        Tprice += parseInt(item.price);
        addToDom(item._id);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addItem(e) {
  e.preventDefault();
  let obj = {
    name: InpName.value,
    price: InpPrice.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/584702e96cda493b914c2adea6f0f34e/products",
      obj
    )
    .then((res) => {
      localStorage.setItem(res.data._id, JSON.stringify(res.data));
      Tprice = Tprice + parseInt(res.data.price);
      addToDom(res.data._id);
    });
}

function addToDom(Id) {
  let obj = JSON.parse(localStorage.getItem(Id));
  let newli = document.createElement("li");
  let newbtn = document.createElement("button");

  newli.innerText = obj.name + "-" + obj.price;
  newli.classList = "list-group-item";
  newli.id = obj._id;
  newbtn.innerText = "Delete Product";
  newbtn.classList = "btn btn-danger btn-sm";
  newbtn.id = "delete_btn";
  newbtn.addEventListener("click", deleteList);
  newli.appendChild(newbtn);
  ListItems.appendChild(newli);

  console.log(Tprice);
  TotalPrice.innerHTML = Tprice;
}


function deleteList(e) {
  let parentLi = e.target.parentElement;
  console.log(parentLi);
  let ObjId = parentLi.getAttribute("id");
  Tprice -= parseInt(JSON.parse(localStorage.getItem(ObjId)).price);
  localStorage.removeItem(ObjId);
  ListItems.removeChild(parentLi);
  axios
    .delete(
      `https://crudcrud.com/api/584702e96cda493b914c2adea6f0f34e/products/${ObjId}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  TotalPrice.innerHTML = Tprice;
}
