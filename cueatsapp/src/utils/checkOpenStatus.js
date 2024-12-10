// Helper function to parse time
function parseTime(time) {
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1, 3).map(Number);
    const isPM = time.includes("PM");
    return isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours + minutes / 60;
  }
  
  // Function to check if a dining hall is open
  export function isDiningHallOpen(timesOpen) {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentDecimalTime = currentHours + currentMinutes / 60; // Convert current time to decimal
  
    for (const period in timesOpen) {
      const [start, end] = timesOpen[period].map(parseTime);
      if (currentDecimalTime >= start && currentDecimalTime <= end) {
        return true;
      }
    }
    return false;
  }