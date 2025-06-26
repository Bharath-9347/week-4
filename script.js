const container = document.getElementById("planner-container");
const dateInput = document.getElementById("planner-date");

const startHour = 7;
const endHour = 22;

// Default to today
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

let currentDateKey = today;
loadPlanner(currentDateKey);

// Load new planner when date changes
dateInput.addEventListener("change", () => {
  currentDateKey = dateInput.value;
  loadPlanner(currentDateKey);
});

// Load tasks for a specific date
function loadPlanner(dateKey) {
  container.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks_" + dateKey)) || {};

  for (let hour = startHour; hour <= endHour; hour++) {
    const row = document.createElement("div");
    row.className = "time-block";

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = formatHour(hour);

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Enter task...";
    textarea.value = tasks[hour]?.text || "";
    if (tasks[hour]?.done) textarea.classList.add("done");

    const prioritySelect = document.createElement("select");
    const priorities = ["high", "medium", "low"];
    prioritySelect.className = "priority-selector";

    priorities.forEach(p => {
      const option = document.createElement("option");
      option.value = p;
      option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
      if ((tasks[hour]?.priority || "medium") === p) option.selected = true;
      prioritySelect.appendChild(option);
    });

    const priorityClass = `priority-${tasks[hour]?.priority || "medium"}`;
    row.classList.add(priorityClass);

    const button = document.createElement("button");
    button.textContent = "Save";

    button.onclick = () => {
      const newPriority = prioritySelect.value;

      tasks[hour] = {
        text: textarea.value,
        done: textarea.classList.contains("done"),
        priority: newPriority
      };
      localStorage.setItem("tasks_" + dateKey, JSON.stringify(tasks));

      row.classList.remove("priority-high", "priority-medium", "priority-low");
      row.classList.add(`priority-${newPriority}`);

      alert("Task saved for " + dateKey + "!");
    };

    textarea.addEventListener("dblclick", () => {
      textarea.classList.toggle("done");
    });

    row.appendChild(time);
    row.appendChild(textarea);
    row.appendChild(prioritySelect);
    row.appendChild(button);
    container.appendChild(row);
  }
}

function formatHour(hour) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const formatted = ((hour + 11) % 12 + 1) + ':00 ' + suffix;
  return formatted;
}

// Bubble animation
createBubbles();
function createBubbles() {
  const count = 20;
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
    document.body.appendChild(bubble);
  }
}
