window.onload = function () {
  let quantity = document.getElementById("quantity");

  quantity.addEventListener("change", function () {
    let renderedQuantity = document.getElementById("rendered-quantity");
    renderedQuantity.innerText = quantity.value;
  });
};
