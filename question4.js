document.addEventListener("DOMContentLoaded", function () {
  const downloadSpan = document.querySelector(".d-flex.align-items-center");
  // Add event listener to the Download span
  downloadSpan.addEventListener("click", function () {
    console.log("download clicked!");
    const questionElement = document.getElementById("question4");
    questionElement.style.display = "block";
  });
});
