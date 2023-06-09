let Tprice = 0;

let InpName = document.querySelector("#Name");
let InpPrice = document.querySelector("#Price");
let ListItems = document.querySelector("#list-group");
let TotalPrice = document.querySelector("#Total_value");

document.querySelector("#submit_btn").addEventListener("click", addItem);
window.addEventListener("load", LoadFirst);


// to get the items from the crud crud api;
async function LoadFirst() {
  try {
    let res = await axios.get(
      "https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products"
    );
    res.data.forEach((item) => {
      Tprice += parseInt(item.price);
      addToDom(item);
    });
  } catch {}
}


// invoked when a new item is added
async function addItem(e) {
  e.preventDefault();
  let obj = {
    name: InpName.value,
    price: InpPrice.value,
  };

  try {
    await axios.post(
      "https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products",
      obj
    );

    Tprice += parseInt(obj.price);
    addToDom(obj);
  } catch {}
}


// function that adds items to dom
function addToDom(obj) {
  let newli = document.createElement("li");
  let newbtn = document.createElement("button");

  let span = document.createElement("span");
  newli.textContent = obj.name + " - ";
  span.textContent = obj.price + " ";
  span.id = "Price";
  newli.classList = "list-group-item";
  newli.id = obj._id;
  newbtn.innerText = "Delete Product";
  newbtn.classList = "btn btn-danger btn-sm";
  newbtn.id = "delete_btn";
  newbtn.addEventListener("click", deleteList);

  newli.appendChild(span);
  newli.appendChild(newbtn);

  ListItems.appendChild(newli);

  console.log(Tprice);
  TotalPrice.innerHTML = Tprice;
}


// function to remove the element 
async function deleteList(e) {
  let parentLi = e.target.parentElement;
  console.log(parentLi);
  let ObjId = parentLi.getAttribute("id");
  Tprice -= parseInt(parentLi.querySelector("#Price").innerText);
  ListItems.removeChild(parentLi);
  TotalPrice.innerHTML = Tprice;

  try {
    await axios.delete(
      `https://crudcrud.com/api/9923a9c77a3f4184bc6e38f16c6aa4f6/products/${ObjId}`
    );
  } catch {}
}
