var arr=Object.keys(localStorage);

function optionRenderer(e) {

    var m = document.forms["delete-data"]["make"].value;
  
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

function alerter(e)
{
    var make=document.forms["delete-data"]["make"].value;
    var model=document.forms["delete-data"]["model"].value;
    var fuel =document.forms["delete-data"]["fuel"].value;

    e.preventDefault();

    if(localStorage.getItem(make+model+fuel[0]) == null)
    {
      alert(`${make} ${model} ${fuel} does not exist`);
      return;
    }

    if(confirm(`Press OK to delete ${make} ${model} ${fuel[0].toUpperCase()+fuel.substring(1)}`))
    deleter(make,model,fuel);
}

function deleter(make,model,fuel) 
{
    var key= make+model+fuel[0];

    localStorage.removeItem(key);
    alert(`${make} ${model} has been removed successfully`);
}

document.getElementById("make").addEventListener("change",optionRenderer);
document.getElementById("submit4").addEventListener("click",alerter);