var arr = Object.keys(localStorage);
//so that if the user changes the filters , our array is re-initialized and re-filtered according
//to the new filters and removing old effects of purification.

function optionRenderer(e) {
  var m = document.forms["form1"]["make"].value;

  var optionstr = `<option value=""> All </option>`;
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

function display(arr2) {
  console.log("inside display");
  resultstr = "";
  for (x of arr2) {
    var cat = (x[2] === "suv")? "Sports Utility Vehicle":(x[2] === "hatch")?"Hatchback":(x[2] === "sedan")? "Sedan":(x[2] === "conv")? "Convertible":"Wagon";

    var fu = (x[4] === "petrol")? "Petrol":(x[4] === "diesel")? "Diesel": (x[4] === "hybrid")? "Hybrid":(x[4] === "cng")? "CNG": "Electric";

    resultstr += `<div class="card mb-5" >
    <div class="row g-0">
      <div class="col-md-5">
        <img src="${x[6]}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-7 bg-light">
        <div class="card-body">
          <h5 class="card-title">${x[0]} ${x[1]}</h5><br>
          <p class="card-text">Price : <strong> &#8377; ${x[7]} - &#8377; ${x[8]} </strong>
          </p>
          <p class="card-text">Fuel Type : <strong>${fu}</strong></p>
          <p class="card-text">Safety Rating : <strong>${x[5]}</strong></p>
          <p class="card-text">Category : <strong>${cat}</strong></p>
          <p class="card-text">Model Year : <strong>${x[3]}</strong></p>
          <p class="card-text"><small class="text-body-secondary">Last updated 1 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>`;
  }

  document.getElementById("resholder").innerHTML = resultstr;
  document.getElementById("Ress").innerHTML = "Results";
}

function reinit() {
  arr = Object.keys(localStorage);
}

function navsearching(e) {
  e.preventDefault();

  var searchText = document.getElementById("navsearch").value.split(' ');
  console.log(searchText);
  var resarr = new Set();

  reinit();

  for (var i = 0; i < searchText.length; i++) {
    for (x of arr) {
      if (x.toLowerCase().indexOf(searchText[i].toLowerCase()) !== -1) 
      resarr.add(x);
    }
  }

  var finalarr = [];

  resarr.forEach((x) => {
    finalarr.push(JSON.parse(localStorage.getItem(x)));
  });

  display(finalarr);

  document.getElementById("sub").scrollIntoView(true);

}

function filterer(arr, make, model, year, filters) {
  if (make !== "") {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].indexOf(make) === -1) arr.splice(i, 1);
      else i++;
    }
  }

  if (model !== "") {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].indexOf(model) === -1) arr.splice(i, 1);
      else i++;
    }
  }

  var allfuels = false;
  if (!filters.petrol && !filters.diesel && !filters.cng && !filters.hybrid && !filters.electric)
    allfuels = true;

  if (filters.petrol === false && allfuels === false) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].endsWith("p")) arr.splice(i, 1);
      else i++;
    }
  }

  if (filters.diesel === false && allfuels === false) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].endsWith("d")) arr.splice(i, 1);
      else i++;
    }
  }

  if (filters.electric === false && allfuels === false) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].endsWith("e")) arr.splice(i, 1);
      else i++;
    }
  }

  if (filters.cng === false && allfuels === false) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].endsWith("c")) arr.splice(i, 1);
      else i++;
    }
  }

  if (filters.hybrid === false && allfuels === false) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].endsWith("h")) arr.splice(i, 1);
      else i++;
    }
  }

  //check-point before arr2 is created.

  var arr2 = [];

  for (x of arr) {
    var j = JSON.parse(localStorage.getItem(x));
    arr2.push(j);
  }

  //no problem in accessing arr2 data.

  if (year !== "") {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][3] !== year) arr2.splice(i, 1);
      else i++;
    }
  }

  if (filters.safety === true) {
    var i = 0;
    while (i < arr2.length) {
      if (Number(arr2[i][5]) < 4) arr2.splice(i, 1);
      else i++;
    }
  }

  var alltypes = false;
  if (!filters.suv && !filters.sedan && !filters.wagon && !filters.hatch && !filters.convertible)
    alltypes = true;

  if (filters.suv === false && alltypes === false) {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][2] === "suv") arr2.splice(i, 1);
      else i++;
    }
  }

  if (filters.sedan === false && alltypes === false) {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][2] === "sedan") arr2.splice(i, 1);
      else i++;
    }
  }

  if (filters.wagon === false && alltypes === false) {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][2] === "wagon") arr2.splice(i, 1);
      else i++;
    }
  }

  if (filters.hatch === false && alltypes === false) {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][2] === "hatch") arr2.splice(i, 1);
      else i++;
    }
  }

  if (filters.convertible === false && alltypes === false) {
    var i = 0;
    while (i < arr2.length) {
      if (arr2[i][2] === "conv") arr2.splice(i, 1);
      else i++;
    }
  }

  display(arr2);
}

function formreader(e) {
  e.preventDefault();

  var make = document.forms["form1"]["make"].value;
  var model = document.forms["form1"]["model"].value;
  var year = document.forms["form1"]["year"].value;

  const filters = {
    suv: document.forms["form1"]["suv"].checked, sedan: document.forms["form1"]["sedan"].checked,
    wagon: document.forms["form1"]["wagon"].checked,hatch: document.forms["form1"]["hatch"].checked,
    convertible: document.forms["form1"]["conv"].checked,petrol: document.forms["form1"]["petrol"].checked, diesel: document.forms["form1"]["diesel"].checked,electric: document.forms["form1"]["electric"].checked,hybrid: document.forms["form1"]["hybrid"].checked,cng: document.forms["form1"]["cng"].checked,safety: document.forms["form1"]["safety-first"].checked,
  };

  filterer(arr, make, model, year, filters);
  document.getElementById("sub").scrollIntoView(true);
}

document.getElementById("make").addEventListener("change", optionRenderer);
document.getElementById("sub").addEventListener("click", reinit);
document.getElementById("sub").addEventListener("click", formreader);
document.getElementById("s5").addEventListener("click", navsearching);
