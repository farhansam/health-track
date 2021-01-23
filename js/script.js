$(document).ready(function () {

  //Start test
  console.log("hello");

  //Calculator Group JS
  $("#btnCalculate").click(function (e) {
    e.preventDefault();

    userHeight = $("#inputHeight").val();
    userWeight = $("#inputWeight").val();
    userAge = $("#inputAge").val();
    userGender = $(".inputGender:checked").val();
    userLifestyle = $("#inputLifestyle option:selected").val();
    bmi = userWeight / (userHeight / 100) ** 2;

    function bmiCalculator() {
      return bmi;
    }

    function bmiRange() {
      if (bmi >= 0 && bmi < 18.5) {
        cat = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25.0) {
        cat = "Normal Weight";
      } else if (bmi >= 25.0 && bmi < 30.0) {
        cat = "Overweight";
      } else if (bmi > 30.0) {
        cat = "Obese";
      } else {
        cat = "Error";
      }
      return cat;
    }

    function bmrCalculator() {
      if (userGender == "male") {
        bmr = 66.47 + 13.75 * userWeight + 5.003 * userHeight - 6.755 * userAge;
      } else if (userGender == "female") {
        bmr = 655.1 + 9.563 * userWeight + 1.85 * userHeight - 4.676 * userAge;
      }
      return bmr;
    }

    function calorieCalculator() {
      bmr = bmrCalculator();
      if (userLifestyle == "sedentary") {
        calorie = bmr * 1.2;
      } else if (userLifestyle == "moderately-active") {
        calorie = bmr * 1.55;
      } else if (userLifestyle == "active") {
        calorie = bmr * 1.9;
      }
      return calorie;
    }

    $("#bmiResult").html(bmiCalculator());
    $("#bmiCat").html(bmiRange());
    //$('#bmrResult').append(bmrCalculator());
    $("#calRec").html(calorieCalculator());
    $("#calculatorGroup").hide();
    $("#calculatorResultGroup").show();
  });

  //Counter Group JS
  totalCal = 0;
  newID = 0;

  $("#btnAdd").click(function (e) {
    e.preventDefault();

    inputFood = $("#inputFood").val();
    inputServing = $("#inputServing").val();
    inputMeal = $(".mealInput:checked").val();
    

    url =
      "https://calorieninjas.p.rapidapi.com/v1/nutrition?query=" + inputFood;

    fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6803216c5dmsh0c91485a08c444ap1b9884jsn19a6a7c34928",
        "x-rapidapi-host": "calorieninjas.p.rapidapi.com",
      },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        inputCal = data.items[0].calories;
        cal = (inputCal / 100) * inputServing;
        totalCal = totalCal + cal;
        newID += 1

        console.log("Base calories: " + inputCal);
        console.log("Calculated calories: " + cal);
        console.log("Accumulated calories: " + totalCal);

        $("#tableRow").before(
          `<tr class="newRow" id="${newID}">
            <th>${inputMeal}</th>
            <td>${inputFood}</td>
            <td>${inputServing}</td>
            <td>${cal}</td>
            <td><button type="button" class="btn btn-outline-primary">Remove</button></td>
           </tr>`
        );
        
        $("#sumCal").html(totalCal);
        
        })
      .catch(function (error) {
        console.error(error);
      })

    $(".newRow").click(function() {
        $(this).remove();
    })
   
    
  });

  //End test
  console.log("All OK");
});
