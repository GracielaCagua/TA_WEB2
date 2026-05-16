function ejecutarBucle() {
  var a = parseFloat(document.getElementById("num1").value);
  var b = parseFloat(document.getElementById("num2").value);

  var operaciones = ["Suma", "Resta", "Multiplicación", "División", "Módulo"];
  var resultados = [a + b, a - b, a * b, a / b, a % b];
  var simbolos   = ["+", "-", "×", "÷", "%"];

  var html = "";
  for (var i = 0; i < 5; i++) {
    var res = (i === 3 || i === 4) && b === 0 ? "Error (div/0)" : resultados[i].toFixed(2);
    html += "<div class='fila'>" +
              "<p>Iteración " + (i+1) + " — " + operaciones[i] +
              " (" + a + " " + simbolos[i] + " " + b + ")</p>" +
              "<span>" + res + "</span>" +
            "</div>";
  }

  document.getElementById("resultado").innerHTML = html;
}