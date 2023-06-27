const file = document.querySelector("#file");
const form = document.querySelector(".form");
const label = document.getElementById("label");

file.addEventListener("change", () => {
  label.remove();
  const img = document.createElement("img");
  img.src = "/image/sync.png";
  img.className = "loading";
  form.appendChild(img);
  form.submit();
});
