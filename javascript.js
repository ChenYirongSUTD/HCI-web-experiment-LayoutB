document.addEventListener("DOMContentLoaded", function () {
  let isEditing = false;
  const editButton = document.getElementById("edit-all-btn");
  const addActionItemButton = document.getElementById("add-action-item-btn");

  editButton.addEventListener("click", function () {
    if (isEditing) {
      // Save changes

      // Save Minutes
      const minutesInput = document.querySelector(
        "#minutes-text > textarea.edit-mode"
      );
      if (minutesInput) {
        const minutesText = minutesInput.value;
        const minutesElement = document.getElementById("minutes-text");
        const keywords = [
          "Event Overview and Objectives",
          "Venue and Logistics",
          "Budget and Fundraising",
          "Marketing and Promotion",
          "Volunteer Coordination",
          "Entertainment and Activities",
          "Safety and Health Measures",
          "Post-Event Evaluation",
          "Next Steps and Follow-Up",
          "Agenda Summaries",
        ];

        let formattedText = minutesText.replace(/\n/g, "<br>");
        keywords.forEach((keyword) => {
          const regex = new RegExp(`(${keyword})`, "g");
          formattedText = formattedText.replace(
            regex,
            "<strong><u>$1</u></strong>"
          );
        });
        minutesElement.innerHTML = `<p id="#minutes-text" class="minutes-text">${formattedText}</p>`;
      }

      // Save Title
      const titleInput = document.querySelector(
        "#meeting-title input.edit-mode"
      );
      if (titleInput) {
        const titleText = titleInput.value;
        const titleElement = document.getElementById("meeting-title");
        titleElement.innerHTML = "";
        titleElement.innerText = titleText;
      }

      // Save Participants
      const participantsInput = document.querySelector(
        "#participants input.edit-mode"
      );
      if (participantsInput) {
        const participantsText = participantsInput.value;
        const participantsElement = document.getElementById("participants");
        participantsElement.innerHTML = "";
        participantsElement.innerText = participantsText;
      }

      // Save Description
      const descriptionInput = document.querySelector(
        "#description-text textarea.edit-mode"
      );
      if (descriptionInput) {
        const descriptionText = descriptionInput.value;
        const descriptionElement = document.getElementById("description-text");
        descriptionElement.innerHTML = "";
        descriptionElement.innerText = descriptionText;
      }

      // Save Agenda
      const agendaInputs = document.querySelectorAll(
        "#agenda-list input.edit-mode"
      );
      agendaInputs.forEach((input) => {
        const agendaText = input.value;
        const listItem = input.parentElement;
        listItem.innerHTML = "";
        listItem.innerText = agendaText;
      });

      // Save Action Items
      const inputs = document.querySelectorAll("#action-items input.edit-mode");
      inputs.forEach((input) => {
        const listItem = input.parentElement;
        const span = document.createElement("span");
        span.innerText = input.value;
        listItem.insertBefore(span, input);
        listItem.removeChild(input);
      });

      // Disable assign inputs
      document.querySelectorAll(".assign-input").forEach((input) => {
        if (input.value) {
          input.classList.add("assign-label");
        }
        input.disabled = true;
      });

      // Hide the add action item button
      addActionItemButton.style.display = "none";

      editButton.innerHTML =
        '<i class="bi bi-pencil" style="margin-right: 8px;"></i>Edit All';
      isEditing = false;
    } else {
      // Enter edit mode

      // Edit Minutes
      const minutesElement = document.getElementById("minutes-text");
      const minutesText = minutesElement.innerText;
      const minutesInput = document.createElement("textarea");
      minutesInput.value = minutesText;
      minutesInput.classList.add("edit-mode");
      minutesInput.style.width = "100%";
      minutesInput.style.height = "200vh";
      minutesInput.style.whiteSpace = "pre-wrap"; // Preserve whitespace and wrap text
      minutesInput.style.overflowY = "hidden"; // Prevent vertical scrolling
      minutesInput.style.overflowX = "auto"; // Allow horizontal scrolling if needed
      minutesInput.style.resize = "none"; // Prevent manual resizin
      minutesElement.innerHTML = "";
      minutesElement.appendChild(minutesInput);

      // Edit Title
      const titleElement = document.getElementById("meeting-title");
      const titleText = titleElement.innerText;
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = titleText;
      titleInput.classList.add("edit-mode");
      titleElement.innerHTML = "";
      titleElement.appendChild(titleInput);

      // Edit Participants
      const participantsElement = document.getElementById("participants");
      const participantsText = participantsElement.innerText;
      const participantsInput = document.createElement("input");
      participantsInput.type = "text";
      participantsInput.value = participantsText;
      participantsInput.classList.add("edit-mode");
      participantsElement.innerHTML = "";
      participantsElement.appendChild(participantsInput);

      // Edit Description
      const descriptionElement = document.getElementById("description-text");
      const descriptionText = descriptionElement.innerText;
      const descriptionInput = document.createElement("textarea");
      descriptionInput.value = descriptionText;
      descriptionInput.classList.add("edit-mode");
      descriptionElement.innerHTML = "";
      descriptionElement.appendChild(descriptionInput);

      // Edit Agenda
      const agendaList = document.getElementById("agenda-list");
      const agendaItems = agendaList.querySelectorAll("li");
      agendaItems.forEach((item) => {
        const agendaText = item.innerText;
        const agendaInput = document.createElement("input");
        agendaInput.type = "text";
        agendaInput.value = agendaText;
        agendaInput.classList.add("edit-mode");
        item.innerHTML = "";
        item.appendChild(agendaInput);
      });

      // Edit Action Items
      const actionItems = document.querySelectorAll("#action-items li");
      actionItems.forEach((listItem) => {
        const span = listItem.querySelector("span");
        const currentText = span.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("edit-mode");

        listItem.insertBefore(input, span);
        listItem.removeChild(span);
      });

      // Enable assign inputs
      document.querySelectorAll(".assign-input").forEach((input) => {
        input.disabled = false;
        input.classList.remove("assign-label");
      });

      // Show the add action item button
      addActionItemButton.style.display = "block";

      editButton.innerHTML =
        '<i class="bi bi-save" style="margin-right: 8px;"></i>Save All';
      isEditing = true;
    }
  });

  addActionItemButton.addEventListener("click", function () {
    const actionItemsList = document.getElementById("action-items");
    const newListItem = document.createElement("li");
    newListItem.classList.add("action-item-row");

    const newSpan = document.createElement("span");
    newSpan.innerText = "New Action Item";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "Assign to …";
    newInput.style.position = "relative";
    newInput.style.flex = "0 0 28%";
    newInput.style.marginRight = "9px";
    newInput.classList.add("assign-input");

    const newSuggestionList = document.createElement("div");
    newSuggestionList.classList.add("suggestion-list");

    newListItem.appendChild(newSpan);
    newListItem.appendChild(newInput);
    newListItem.appendChild(newSuggestionList);
    actionItemsList.appendChild(newListItem);

    // Make the new input editable
    newSpan.addEventListener("click", function () {
      const currentText = newSpan.innerText;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.classList.add("edit-mode");
      newListItem.insertBefore(input, newSpan);
      newListItem.removeChild(newSpan);
    });

    // Enable new input for assignment
    newInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const suggestionBox = this.nextElementSibling;

      suggestionBox.innerHTML = ""; // Clear previous suggestions

      if (value) {
        const suggestions = participants
          .filter((name) => name.toLowerCase().startsWith(value))
          .slice(0, 5);
        suggestions.forEach((suggestion) => {
          const div = document.createElement("div");
          div.innerText = suggestion;
          div.addEventListener("click", () => {
            newInput.value = suggestion;
            suggestionBox.innerHTML = ""; // Clear suggestions after selection
            newInput.disabled = false;
          });
          suggestionBox.appendChild(div);
        });
      }
    });

    newInput.addEventListener("blur", function () {
      setTimeout(() => {
        this.nextElementSibling.innerHTML = ""; // Clear suggestions when input loses focus
      }, 200); // Delay to allow click event on suggestion to fire
    });

    newInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === "Tab") {
        newInput.disabled = false;
      }
    });

    newInput.addEventListener("focus", function () {
      if (newInput.classList.contains("assign-label")) {
        newInput.classList.remove("assign-label");
        newInput.disabled = false;
      }
    });
  });

  // Assign Participants
  const participants = "<%= @meeting&.participants || '' %>".split(", ");

  document.querySelectorAll(".assign-input").forEach((input) => {
    input.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const suggestionBox = this.nextElementSibling;

      suggestionBox.innerHTML = ""; // Clear previous suggestions

      if (value) {
        const suggestions = participants
          .filter((name) => name.toLowerCase().startsWith(value))
          .slice(0, 5);
        suggestions.forEach((suggestion) => {
          const div = document.createElement("div");
          div.innerText = suggestion;
          div.addEventListener("click", () => {
            input.value = suggestion;
            suggestionBox.innerHTML = ""; // Clear suggestions after selection
            input.disabled = false;
          });
          suggestionBox.appendChild(div);
        });
      }
    });

    input.addEventListener("blur", function () {
      setTimeout(() => {
        this.nextElementSibling.innerHTML = ""; // Clear suggestions when input loses focus
      }, 200); // Delay to allow click event on suggestion to fire
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === "Tab") {
        input.disabled = false;
      }
    });

    input.addEventListener("focus", function () {
      if (input.classList.contains("assign-label")) {
        input.classList.remove("assign-label");
        input.disabled = false;
      }
    });
  });

  editButton.click();
  setTimeout(() => editButton.click(), 0);
});
