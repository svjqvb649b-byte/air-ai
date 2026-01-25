window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const button = document.getElementById("tap");

  button.addEventListener("click", () => {
    status.textContent = "起動しました";
    console.log("Air 起動");
  });
});
