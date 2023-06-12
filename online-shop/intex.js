(function () {
    console.log(0);
  
    const response = fetch("http://localhost:5000/api/categories/");
    response.then((data) => {
      console.log(data);
      data.json().then((d) => {
        let list = "";
        d.data.forEach((element) => {
          list =
            list +
            `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link">${element.name}</a>`;
        });
        document.getElementById("categories-menu").innerHTML = list;
        console.log(d.data);
      });
    });
  
    console.log(1);
  })();