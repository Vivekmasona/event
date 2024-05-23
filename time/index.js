function updateTime() {
      const currentTimeElement = document.getElementById('currentTime');
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;
      currentTimeElement.textContent = formattedTime;
    }

    setInterval(updateTime, 1000);
    updateTime(); // Initialize immediately
