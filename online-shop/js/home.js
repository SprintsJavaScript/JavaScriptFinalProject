//window.onload = window.localStorage.clear();
(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/categories/");
  response.then((data) => {
    data.json().then((d) => {
      let list = "";
      d.data.forEach((element) => {
        list =
          list +
          `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link">${element.name}</a>`;
      });
      document.getElementById("categories-menu").innerHTML = list;
      console.log(d.data);
      let sortedcategories = d.data.sort(
        (p1, p2) => (p1.productCount < p2.productCount) ? 1 : (p1.productCount > p2.productCount) ? -1 : 0);
      console.log(sortedcategories) ; 
    });
  });

  console.log(1);
})();

(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/categories/");
  response.then((data) => {
    data.json().then((d) => {
      let list = "";
      let categories4=[];
      let sortedcategories = d.data.sort(
        (p1, p2) => (p1.productCount < p2.productCount) ? 1 : (p1.productCount > p2.productCount) ? -1 : 0);
        if(d.data.length>4){
          len=4
        }
        else{len=d.data.length}
      for(let i=0;i<len;i++){
        list =
        list +
        ` <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
           <a class="text-decoration-none" href="">
          <div class="cat-item d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${d.data[i].image}" alt="" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${d.data[i].name}</h6>
              <small class="text-body">${d.data[i].productCount}</small>
            </div>
          </div>
        </a>
      </div>`;
      }    
      document.getElementById("categories-navbar").innerHTML = list;
      console.log(d.data);
    });
  });

  console.log(1);
})();


(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/products/getFeatured");
  response.then((data) => {
    data.json().then((d) => {
      console.log(d.data);
      let list = "";
      console.log("length")
      console.log(d.data.length)
      if(d.data.length>8){
        len=8
      }
      else{len=d.data.length}
      for(let i=0;i<len;i++){
        //console.log(d.data[i].rating)
        //console.log(d.data[i]._id)
        let FeaturedId=d.data[i]._id.toString()
        console.log(FeaturedId)
        let discountedprice=parseFloat(d.data[i].price)-(parseFloat(d.data[i].price)*parseFloat(d.data[i].discount))
        
        list =
        list +
        `  <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div class="product-item bg-light mb-4">
          <div class="product-img position-relative overflow-hidden">
            <img class="img-fluid w-100" src="${d.data[i].image}" alt="" />
            <div class="product-action">
              <a
                class="btn btn-outline-dark btn-square"
                href="#"
                onclick= "addToCart({id:'${d.data[i]._id}'})"
                ><i class="fa fa-shopping-cart"></i
              ></a>
              <a class="btn btn-outline-dark btn-square" 
              onclick= "addLove({id:'${d.data[i]._id}'})"
              href="#"
                ><i class="far fa-heart"></i
              ></a>
              <a class="btn btn-outline-dark btn-square" href="#"
                ><i class="fa fa-sync-alt"></i
              ></a>
              <a class="btn btn-outline-dark btn-square" href="#"
                ><i class="fa fa-search"></i
              ></a>
            </div>
          </div>
          <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href=""
              >${d.data[i].name}</a
            >
            <div
              class="d-flex align-items-center justify-content-center mt-2"
            >
              <h5>$${discountedprice}</h5>
              <h6 class="text-muted ml-2"><del>$${d.data[i].price}</del></h6>
            </div>
            <div
              class="d-flex align-items-center justify-content-center mb-1">
              <div id="star-ratings${i}">

              </div>
              <small>(${d.data[i].rating_count})</small>
            </div>
          </div>
        </div>
      </div>`;
        // let x="star-ratings"+i;
        //document.getElementById(x).innerHTML=getStarRating(d.data[i].rating)
      }
      document.getElementById("products").innerHTML = list;
    });
  });
})();

function getStarRating(rating){
  let r = ``
  switch(rating) {
    case 0:
      r=  `<small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
      break;
    case 0.5:
    r=  ` <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
      break;
    case 1:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
      break; 
    case 1.5:
      r=  `<small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
       break;
    case 2:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
       break;
    case 2.5:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
      break;   
    case 3:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star text-primary mr-1"></small>
             <small class="far fa-star text-primary mr-1"></small>
             <small class="far fa-star text-primary mr-1"></small> ` 
      break; 
    case 3.5:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
      break;  
    case 4:
      r=  `  <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small> ` 
        break;  
    case 4.5:
      r= `   <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star text-primary mr-1"></small>
             <small class="fa fa-star-half-alt text-primary mr-1"></small>` 
      break;  
    case 5:
      r = ` <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small>
            <small class="fa fa-star text-primary mr-1"></small> `
      
      break;         
  }
  return r;
}

(function () {
  console.log(0);

  const response = fetch("http://localhost:5000/api/products/getRecent");
  response.then((data) => {
    data.json().then((d) => {
      let list = "";
      if(d.data.length>8){
        len=8
      }
      else{len=d.data.length}
      for(let i=0;i<len;i++){
        let discountedprice=parseFloat(d.data[i].price)-(parseFloat(d.data[i].price)*parseFloat(d.data[i].discount))
        let FeaturedId=d.data[i]._id.toString()
        list =list +
          ` <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <div class="product-item bg-light mb-4">
            <div class="product-img position-relative overflow-hidden">
              <img class="img-fluid w-100" src="${d.data[i].image}" alt="" />
              <div class="product-action">
                <a class="btn btn-outline-dark btn-square" 
                onclick= "addToCart({id:'${d.data[i]._id}'})"
                href=""
                  ><i class="fa fa-shopping-cart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square"
                onclick= "addLove({id:'${d.data[i]._id}'})"
                 href=""
                  ><i class="far fa-heart"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-sync-alt"></i
                ></a>
                <a class="btn btn-outline-dark btn-square" href=""
                  ><i class="fa fa-search"></i
                ></a>
              </div>
            </div>
            <div class="text-center py-4">
              <a class="h6 text-decoration-none text-truncate" href=""
                >${d.data[i].name}</a
              >
              <div
                class="d-flex align-items-center justify-content-center mt-2"
              >
                <h5>$${discountedprice}</h5>
                <h6 class="text-muted ml-2"><del>$${d.data[i].price}</del></h6>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mb-1"
              >
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small>(${d.data[i].rating_count})</small>
              </div>
            </div>
          </div>
        </div>`;
      }
      document.getElementById("recentProducts").innerHTML = list;
      console.log(d.data);
      let sortedcategories = d.data.sort(
        (p1, p2) => (p1.productCount < p2.productCount) ? 1 : (p1.productCount > p2.productCount) ? -1 : 0);
      console.log(sortedcategories) ; 
    });
  });

  console.log(1);
})();


(function () {
  console.log(0);
  const RecentProductsResponse = fetch("http://localhost:5000/api/products/getRecent");
  const FeaturedProductResponse = fetch("http://localhost:5000/api/products/getFeatured");
  RecentProductsResponse.then((data) => {
    data.json().then((d) => {
      localStorage.setItem("RecentProducts", JSON.stringify(d.data)); 
      if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]");
      }
      if(!localStorage.getItem("LovedProducts")){
        localStorage.setItem("LovedProducts", "[]");
      }
     });
     
  });
  FeaturedProductResponse.then((data) => {
    data.json().then((d) => {
      localStorage.setItem("FeaturedProducts",JSON.stringify( d.data)); 
      if(!localStorage.getItem("cart")){
        localStorage.setItem("cart", "[]");
      }
     });
     
  });
  localStorage.setItem("CartCounter", 0);
  localStorage.setItem("LoveCounter", 0);
  // localStorage.setItem("cart", "[]")
  // localStorage.setItem("RecentProducts", "[]"); 
  // localStorage.setItem("FeaturedProducts", "[]"); 
  // 
  // document.getElementById("LoveCount").innerHTML = localStorage.getItem("LoveCounter");
 
  console.log(1);
})();

function addLove(productIdInput){
  productId=productIdInput.id
  let RecentProducts = JSON.parse(localStorage.getItem("RecentProducts"));
  let FeaturedProducts = JSON.parse(localStorage.getItem("FeaturedProducts"));
  let cart = JSON.parse(localStorage.getItem("LovedProducts"));
  let product;
  let product1 = RecentProducts.find(function(item){return item._id === productId;});
  console.log(product1)
  let product2 = FeaturedProducts.find(function(item){return item._id=== productId;});
  console.log(product2)
  if(product1){
    product=product1}
  else{product=product2}
  // if(!product.quantity){
  //   product.quantity=0
  // }
  console.log(product)
 if(cart.length == 0){
    cart.push(product);
 }else{
    let res = cart.find(element => element?._id === product._id);
    if(res === undefined ){
      product.quantity=1
      cart.push(product);
    }
    else{
      let quantity=res.quantity++;
      updateQuantity(product._id,quantity)
    }
      

 }
 localStorage.setItem("LovedProducts", JSON.stringify(cart));

  let cCounter=localStorage.getItem("LoveCounter")
  let x=parseInt(cCounter)+1
  localStorage.setItem("LoveCounter",x );
  document.getElementById("LoveCount").innerHTML = localStorage.getItem("LoveCounter");
}


function addToCart(productId){
  console.log("balabizo")
  console.log(productId.id);
  addItemToCart(productId.id);

}

function addItemToCart(productId){
  console.log("entered here ")
  let RecentProducts = JSON.parse(localStorage.getItem("RecentProducts"));
  let FeaturedProducts = JSON.parse(localStorage.getItem("FeaturedProducts"));
  let cart = JSON.parse(localStorage.getItem("cart"));
  let product;
  let product1 = RecentProducts.find(function(item){return item._id === productId;});
  console.log(product1)
  let product2 = FeaturedProducts.find(function(item){return item._id=== productId;});
  console.log(product2)
  if(product1){
    product=product1}
  else{product=product2}
  // if(!product.quantity){
  //   product.quantity=0
  // }
  console.log(product)
 if(cart.length == 0){
    cart.push(product);
 }else{
    let res = cart.find(element => element?._id === product._id);
    if(res === undefined ){
      product.quantity=1
      cart.push(product);
    }
    else{
      let quantity=res.quantity++;
      updateQuantity(product._id,quantity)
    }
      

 }
 localStorage.setItem("cart", JSON.stringify(cart));
 let cCounter=localStorage.getItem("CartCounter")
 let x=parseInt(cCounter)+1
 localStorage.setItem("CartCounter",x );
 document.getElementById("CartCount").innerHTML = localStorage.getItem("CartCounter");
}

function updateQuantity(productId, quantity){
  let cart = JSON.parse(localStorage.getItem("cart"));
  for(let product of cart){
     if(product.id == productId){
        product.quantity = quantity;
     }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}




// const products = [
//   {
//     _id: "1",
//     name: "Product 1",
//     price: 100,
//     discount: 0.1,
//     image: "",
//     rating: 3.5,
//     rating_count: 100,
//   },
//   {
//     _id: "2",
//     name: "Product 2",
//     price: 150,
//     discount: 0.1,
//     image: "",
//     rating: 3.5,
//     rating_count: 100,
//   },
//   {
//     _id: "3",
//     name: "Product 3",
//     price: 80,
//     discount: 0.1,
//     image: "",
//     rating: 3.5,
//     rating_count: 100,
//   },
//   {
//     _id: "1",
//     name: "Product 1",
//     price: 100,
//     discount: 0.1,
//     image: "",
//     rating: 3.5,
//     rating_count: 100,
//   },
// ];

class Product {
  id;
  name;
  price;
  discount;
  image;
  rating;
  rating_count;
  constructor(obj) {
    this.id = obj._id;
    this.name = obj.name;
    this.price = obj.price;
    this.discount = obj.discount;
    this.rating = obj.rating;
    this.rating_count = obj.rating_count;
  }

  getPriceAfterDiscount() {
    return this.price - this.price * this.discount;
  }

  getRatingHTML() {
    return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small>(99)</small>
  </div>`;
  }

  getHomeHTML() {
    return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${this.image}" alt="">
        <div class="product-action">
          <a class="btn btn-outline-dark btn-square" href="#" onclick=""><i class="fa fa-shopping-cart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="far fa-heart"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
          <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
        </div>
      </div>
      <div class="text-center py-4">
        <a class="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
        <div class="d-flex align-items-center justify-content-center mt-2">
          <h5>$${this.getPriceAfterDiscount()}</h5>
          <h6 class="text-muted ml-2"><del>$${this.price}</del></h6>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-1">
          ${this.getRatingHTML()}
        </div>
      </div>
    </div>
  </div>`;
  }

  getHTML() {
    return ``;
  }
}

class CartLine {
  product;
  quantity;
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.getPriceAfterDiscount() * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }
}

class Cart {
  cartlines;
  constructor(productsArray) {
    this.cartlines = [];
    //loop to add products into cartlines array
  }

  remove(productId) {}

  getTotal() {}

  getSubTotal() {}
}
//Cart
//CartLine
//Product
//Category
