function getGrogeryList() {
  // calling the grocery list json file
  let request = new XMLHttpRequest();
  request.open('GET', 'https://bofacodinginterview.netlify.app/data/groceryJson.json', true);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      let res = JSON.parse(this.response);
      createGroceryList(res)
    } else {
      console.log('Fail to receive data.');
    }
  };
  request.onerror = function () {
    console.log("Fail to connect to server.");
  }
  request.send();
}

function createGroceryList(res) {
  // Find where the parent of the grocery list 
  let groceryList = document.querySelector('[data-grocery-list]');

  // Start to create grocery
  let groceryTemplate = '<ul class="grocery">';

  //create each item
  for (let i in res) {
    let thing = res[i];
    let
      category = thing["category"],
      item = thing["item"],
      brand = thing["brand"],
      type = thing["type"],
      qty = thing["qty"];




    brandType = brand + ' ' + type;
    groceryTemplate += '<li class="item"><div class="quantity"><p>qty: ' + qty + '</p></div><div class="txt-capitalize grocery-item"><h2>' + item + '</h2><p class="brand">' + brandType + '</p><p class="category txt-uppercase">' + category + '</p></div></li>';
  };

  // completed creation of grocery list
  groceryTemplate += '</ul>'
  groceryList.innerHTML = groceryTemplate;
}

(function ready(getGroceryList) {
  document.readyState != 'loading' ? getGroceryList() : document.addEventListener('DOMContentLoaded', getGroceryList());
})(getGrogeryList)