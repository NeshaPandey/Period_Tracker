// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Period Tracking Feature
    const periodDateInput = document.getElementById("period-date");
    const saveDateButton = document.getElementById("save-date");
    const nextPeriodText = document.getElementById("next-period");

    // Load saved period date
    const savedDate = localStorage.getItem("lastPeriodDate");
    if (savedDate) {
        periodDateInput.value = savedDate;
        calculateNextPeriod(new Date(savedDate));
    }

    saveDateButton.addEventListener("click", function() {
        const selectedDate = periodDateInput.value;
        if (selectedDate) {
            localStorage.setItem("lastPeriodDate", selectedDate);
            calculateNextPeriod(new Date(selectedDate));
        }
    });

    function calculateNextPeriod(lastPeriodDate) {
        const cycleLength = 28; // Average cycle length
        const nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
        nextPeriodText.textContent = `Your next period is expected around: ${nextPeriodDate.toDateString()}`;
    }

    // Mood & Cravings Feature
    const moodInput = document.getElementById("mood-input");
    const saveMoodButton = document.getElementById("save-mood");
    const moodList = document.getElementById("mood-list");

    // Load saved moods
    const savedMoods = JSON.parse(localStorage.getItem("moodEntries")) || [];
    savedMoods.forEach(addMoodEntry);

    saveMoodButton.addEventListener("click", function() {
        const moodText = moodInput.value.trim();
        if (moodText) {
            const moodEntry = { text: moodText, date: new Date().toLocaleDateString() };
            savedMoods.push(moodEntry);
            localStorage.setItem("moodEntries", JSON.stringify(savedMoods));
            addMoodEntry(moodEntry);
            moodInput.value = "";
        }
    });

    function addMoodEntry(entry) {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.date}: ${entry.text}`;
        moodList.appendChild(listItem);
    }
});
