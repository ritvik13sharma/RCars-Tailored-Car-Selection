//Make, Model and fuel type are required to get the key for retrieval.

// 0-> Make
// 1-> Model
// 2-> Category
// 3-> Year
// 4-> Fuel
// 5-> Safety
// 6-> Image
// 7-> Starting Prices
// 8-> Highest Price

var arr = Object.keys(localStorage);
console.log(localStorage.getItem("HyundaiExterc"));

function optionRenderer(e) {
    var m = document.forms["edit-data"]["make"].value;
  
    var optionstr ="";
    var s = new Set();
    for (x of arr) {
      if (x.indexOf(m) !== -1) {
        var j = x.substring(m.length, x.length - 1);
        if (s.has(j) == false) {
          s.add(j);
          optionstr += `<option value="${j}">` + j + "</option>";
        }
      }
    }
  
    document.getElementById("model").innerHTML = optionstr;
  }

  function editor(e) 
  {
    e.preventDefault();

    var make=document.forms["edit-data"]["make"].value;
    var model=document.forms["edit-data"]["model"].value;
    var category =document.forms["edit-data"]["editcat"].value;
    var year= document.forms["edit-data"]["edityear"].value;
    var fuel =document.forms["edit-data"]["editfuel"].value;
    var safety =document.forms["edit-data"]["editsafety"].value;
    var img= document.forms["edit-data"]["img1"].value;
    var startp=document.forms["edit-data"]["stprice"].value;
    var endp=document.forms["edit-data"]["endprice"].value;

    var key=make+model+fuel[0];

    var obj=JSON.parse(localStorage.getItem(key));

    if(category !== '')
    obj[2]=category;

    if(year !== '')
    obj[3]=year;

    if(safety !== '')
    obj[5]=safety;

    if(img !== '')
    obj[6]=img;

    if(startp !== '')
    obj[7]=startp;

    if(endp !== '')
    obj[8]=endp;

    localStorage.setItem(key,JSON.stringify(obj));
    alert("Edited Successfully");

    console.log(localStorage.getItem(key));

}

  document.getElementById("make").addEventListener("change",optionRenderer);
  document.getElementById("submit3").addEventListener("click",editor);