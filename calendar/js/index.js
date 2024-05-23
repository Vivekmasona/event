const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const todayBtn = document.querySelector(".today");
const month = document.querySelector(".month");
const taskModal = document.getElementById("taskModal");
const displayTaskModal = document.getElementById("displayTaskModal");
const closeModal = document.querySelectorAll(".close");
const taskInput = document.getElementById("taskInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskDetails = document.getElementById("taskDetails");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Load events from local storage or use an empty object if there are none
let events = JSON.parse(localStorage.getItem('events')) || {};

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let selectedDate = null;

const renderCalendar = () => {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  month.innerHTML = months[currentMonth] + ' ' + currentYear;

  let daysHTML = "";

  for (let x = firstDay.getDay(); x > 0; x--) {
    daysHTML += '<div class="day prev">' + (prevLastDayDate - x + 1) + '</div>';
  }

  for (let i = 1; i <= lastDayDate; i++) {
    const eventKey = currentYear + '-' + (currentMonth + 1) + '-' + i;
    const eventDot = events[eventKey] ? '<div class="dot"></div>' : '';
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      daysHTML += '<div class="day today" data-date="' + eventKey + '">' + i + eventDot + '</div>';
    } else {
      daysHTML += '<div class="day" data-date="' + eventKey + '">' + i + eventDot + '</div>';
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    daysHTML += '<div class="day next">' + j + '</div>';
  }

  daysContainer.innerHTML = daysHTML;
  hideTodayBtn();
  addEventListeners();
};

const addEventListeners = () => {
  const calendarDays = document.querySelectorAll(".day");
  calendarDays.forEach(day => {
    day.addEventListener("click", (event) => {
      const date = day.dataset.date;
      const eventText = events[date];
      if (eventText) {
        taskDetails.innerText = eventText;
        displayTaskModal.style.display = "block";
      }
    });

    day.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      selectedDate = day.dataset.date;
      taskModal.style.display = "block";
    });

    day.addEventListener("mousedown", (event) => {
      const date = day.dataset.date;
      if (event.button === 2 && events[date]) {
        delete events[date];
        localStorage.setItem('events', JSON.stringify(events));
        renderCalendar();
      }
    });
  });
};

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

todayBtn.addEventListener("click", () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
});

closeModal.forEach(btn => {
  btn.addEventListener("click", () => {
    taskModal.style.display = "none";
    displayTaskModal.style.display = "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === taskModal || event.target === displayTaskModal) {
    taskModal.style.display = "none";
    displayTaskModal.style.display = "none";
  }
});

saveTaskBtn.addEventListener("click", () => {
  const task = taskInput.value;
  if (task) {
    events[selectedDate] = task;
    // Save events to local storage
    localStorage.setItem('events', JSON.stringify(events));
    taskInput.value = "";
    taskModal.style.display = "none";
    renderCalendar();
  }
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  daysContainer.style.transform = "translateX(-100%)";
  setTimeout(() => {
    renderCalendar();
    daysContainer.style.transform = "translateX(0)";
  }, 300); // 300 milliseconds ka delay rakha hai, adjust kar sakte hain agar chahiye
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  daysContainer.style.transform = "translateX(100%)";
  setTimeout(() => {
    renderCalendar();
    daysContainer.style.transform = "translateX(0)";
  }, 300); // 300 milliseconds ka delay rakha hai, adjust kar sakte hain agar chahiye
});



const deleteTaskBtn = document.getElementById("deleteTaskBtn");

deleteTaskBtn.addEventListener("click", () => {
  if (selectedDate && events[selectedDate]) {
    delete events[selectedDate];
    localStorage.setItem('events', JSON.stringify(events));
    taskModal.style.display = "none";
    renderCalendar();
  }
});

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}
// Example events
events["2024-1-1"] = "Naya Saal";
events["2024-1-14"] = "Makar Sankranti";
events["2024-1-26"] = "Republic Day";
events["2024-2-14"] = "Valentine s Day";
events["2024-3-10"] = "Holi";
events["2024-3-25"] = "Ram Navami";
events["2024-4-2"] = "Mahavir Jayanti";
events["2024-4-5"] = "Good Friday";
events["2024-4-14"] = ["Baisakhi", "Ambedkar Jayanti"];
events["2024-4-25"] = "Rama Navami";
events["2024-5-1"] = "Maharashtra Day";
events["2024-8-15"] = "Independence Day";
events["2024-9-2"] = "Janmashtami";
events["2024-10-2"] = "Gandhi Jayanti";
events["2024-10-13"] = "Dussehra";
events["2024-10-27"] = "Diwali";
events["2024-11-12"] = "Guru Nanak Jayanti";
events["2024-12-25"] = "Christmas";


renderCalendar();
