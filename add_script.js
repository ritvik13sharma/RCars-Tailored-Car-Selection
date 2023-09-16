var arr={};
// 0-> Make
// 1-> Model
// 2-> Category
// 3-> Year
// 4-> Fuel
// 5-> Safety
// 6-> Image
// 7-> Starting Prices
// 8-> Highest Price

//Object key: make+model name.

//Adding Principle: Ex: Mahindra XUV700 (no spaces after name).

function adder(e)
{
    e.preventDefault();

    var make=document.forms["submit-data"]["addmake"].value;
    var model=document.forms["submit-data"]["addmodel"].value;
    var category =document.forms["submit-data"]["addcat"].value;
    var year= document.forms["submit-data"]["addyear"].value;
    var fuel =document.forms["submit-data"]["addfuel"].value;
    var safety =document.forms["submit-data"]["addsafety"].value;
    var img= document.forms["submit-data"]["img1"].value;
    var start =document.forms["submit-data"]["stprice"].value;
    var end=c=document.forms["submit-data"]["endprice"].value;
    
    arr[0]=make; //Object creation
    arr[1]=model;
    arr[2]=category;
    arr[3]=year;
    arr[4]=fuel;
    arr[5]=safety;
    arr[6]=img;
    arr[7]=start;
    arr[8]=end;

   // [make,model,category,year,fuel,safety,img,start,end]

    localStorage.setItem(`${make+model+fuel[0]}`,JSON.stringify(arr));

   alert("Car Successfully Added");
}


document.getElementById('submit2').addEventListener('click', adder);
