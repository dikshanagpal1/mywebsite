//get all category
function getallcategory() {
    fetch('https://fakestoreapi.com/products/categories').then((res) => {
        return res.json();
    }).then((data) => {
        let row = "";
        data.forEach((items, index) => {
            row += `<li><a class="dropdown-item dropdown-text" onclick='getproductcategory(this)' href="#">${items}</a></li>`
        });
        //console.log(row);
        document.getElementById('category-data').innerHTML = row;
    })

}
getallcategory();
//get all products
function getlimitedproducts() {
    fetch("https://fakestoreapi.com/products?limit=8").then((res) => {
        return res.json();
    }).then((data) => {
        let row = '';
        data.forEach((items, index) => {
            row += `<div class="col-sm-4">
             <div class="card mt-4" style="">
            <img class="card-img-top" src="${items.image}" style="height:350px" alt="Card image">
            <div class="card-body">
              <h4 class="card-title">${items.title.slice(0, 26)}</h4>
              <p class="card-text"><strong>price:${items.price}.</strong></p>
              <p class="card-text"><strong>rating:${items.rating.rate}.</strong></p>
              <p class="card-text"><strong>count:${items.rating.count}.</strong></p>
              <a href="#" class="btn btn-primary">view in cart</a>
            </div>
           
          </div>
           
          </div>`

        })
        document.getElementById('index-products').innerHTML = row;
    })
}
getlimitedproducts();
//get all product
function getallproduct() {
    fetch('https://fakestoreapi.com/products').then((res) => {
        return res.json();
    }).then((data) => {
        let row = '';
        console.log(data)
        data.forEach((items, index) => {
            row += `<div class="col-sm-4">
            <div class="card mt-4" style="">
           <img class="card-img-top" src="${items.image}" style="height:350px" alt="Card image">
           <div class="card-body">
             <h4 class="card-title">${items.title.slice(0, 26)}</h4>
             <p class="card-text"><strong>price:${items.price}.</strong></p>
             <p class="card-text"><strong>rating:${items.rating.rate}.</strong></p>
             <p class="card-text"><strong>count:${items.rating.count}.</strong></p>
             <a href="#" class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#myModal' onclick='getproductdetails(${items.id})'>view in cart</a>
           </div>
         </div>
         </div>`

        })
        document.getElementById('shop-data').innerHTML = row;
    })
}
getallproduct();
//get all product category data
function getproductcategory(t) {
    let category_name = t.innerText.toLowerCase();
    fetch(`https://fakestoreapi.com/products/category/${category_name}`).then((res) => {
        return res.json();
    }).then((data) => {
        let row = "";
        data.forEach((items, index) => {
            row += `<div class="col-sm-4">
            <div class="card mt-4" style="">
           <img class="card-img-top" src="${items.image}" style="height:350px" alt="Card image">
           <div class="card-body">
             <h4 class="card-title">${items.title.slice(0, 26)}</h4>
             <p class="card-text"><strong>price:${items.price}.</strong></p>
             <p class="card-text"><strong>rating:${items.rating.rate}.</strong></p>
             <p class="card-text"><strong>count:${items.rating.count}.</strong></p>
             <a href="#" class="btn btn-primary">view in cart</a>
           </div>
         </div>
         </div>`
        })
        // console.log(row);
        document.getElementById('shop-data').innerHTML = row;
    })
}
//get product details
function getproductdetails(pid) {
    //console.log(pid);
    axios.get(`https://fakestoreapi.com/products/${pid}`).then((res) => {
        // console.log(res.data);
        document.getElementById('title').innerHTML = res.data.title;
        document.getElementById('productimage').innerHTML = `<img src=${res.data.image} class='img-fluid'>`;
        document.getElementById('productdescription').innerHTML = res.data.description;
        document.getElementById('productprice').innerHTML = `<strong>price:${res.data.price}</strong>`;
        document.getElementById('productrating').innerHTML = `<strong>rating:${res.data.rating.rate}</strong>`;

    }).catch((error) => console.log(error))
}
//search product
async function search_product() {
    let search_value = document.getElementById("search_data").value;
    let res = await axios.get('https://fakestoreapi.com/products');
    console.log(res.data);
    let response = res.data.filter((items) => {
        return items.title.toLowerCase().includes(search_value.toLowerCase())
    });
    console.log(response);
    let row = "";
    response.forEach((items, index) => {
        row += `<div class="col-sm-4">
            <div class="card mt-4" style="">
           <img class="card-img-top" src="${items.image}" style="height:350px" alt="Card image">
           <div class="card-body">
             <h4 class="card-title">${items.title.slice(0, 26)}</h4>
             <p class="card-text"><strong>price:${items.price}.</strong></p>
             <p class="card-text"><strong>rating:${items.rating.rate}.</strong></p>
             <p class="card-text"><strong>count:${items.rating.count}.</strong></p>
             <a href="#" class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#myModal' onclick='getproductdetails(${items.id})'>view in cart</a>
           </div>
         </div>
         </div>`
    });
    console.log(row);
    document.getElementById('shop-data').innerHTML = row;

}


