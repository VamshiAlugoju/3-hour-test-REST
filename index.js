let Tprice = 0;

let InpName = document.querySelector("#Name");
let InpPrice = document.querySelector("#Price");
let ListItems = document.querySelector("#list-group");
let TotalPrice = document.querySelector("#Total_value");

document.querySelector("#submit_btn").addEventListener("click", addItem);
window.addEventListener("load", LoadFirst);

function LoadFirst() {
  axios
    .get("https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products")
    .then((res) => {
      res.data.forEach((item) => {
        // localStorage.setItem(item._id, JSON.stringify(item));
        Tprice += parseInt(item.price);
        addToDom(item);
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
      "https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products",
      obj
    )
    .then((res) => {
      localStorage.setItem(res.data._id, JSON.stringify(res.data));
      Tprice = Tprice + parseInt(res.data.price);
      addToDom(res.data);
    });
}

function addToDom(obj) {
  // let obj = JSON.parse(localStorage.getItem(Id));
  let newli = document.createElement("li");
  let newbtn = document.createElement("button");
 
  let span = document.createElement("span");
  newli.textContent = obj.name + " - ";
  span.textContent =  obj.price+" ";
  span.id = "Price";
  newli.classList = "list-group-item";
  newli.id = obj._id;
  newbtn.innerText = "Delete Product";
  newbtn.classList = "btn btn-danger btn-sm";
  newbtn.id = "delete_btn";
  newbtn.addEventListener("click", deleteList);
  
  newli.appendChild(span)
  newli.appendChild(newbtn);
  
  ListItems.appendChild(newli);

  console.log(Tprice);
  TotalPrice.innerHTML = Tprice;
}


function deleteList(e) {
  let parentLi = e.target.parentElement;
  console.log(parentLi);
  let ObjId = parentLi.getAttribute("id");
  // Tprice -= parseInt(JSON.parse(localStorage.getItem(ObjId)).price);
  // localStorage.removeItem(ObjId);
  Tprice -=  parseInt(parentLi.querySelector("#Price").innerText);
  ListItems.removeChild(parentLi);
  axios
    .delete(
      `https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products/${ObjId}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  TotalPrice.innerHTML = Tprice;
}
