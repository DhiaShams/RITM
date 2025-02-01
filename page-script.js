document.getElementById("toggle-chords").addEventListener("click", function() {
    const chordsContainer = document.getElementById("chords-container");
    const artistInfo = document.getElementById("artist-info");

    if (chordsContainer.classList.contains("hidden")) {
        chordsContainer.classList.remove("hidden");
        artistInfo.classList.add("hidden");
    } else {
        chordsContainer.classList.add("hidden");
        artistInfo.classList.remove("hidden");
    }
});

// Seek Bar Sync with Audio (Mock Implementation)
document.getElementById("seek-bar").addEventListener("input", function(event) {
    console.log("Seek position:", event.target.value);
});

// Karaoke Mode (Mock Implementation)
document.getElementById("toggle-karaoke").addEventListener("click", function() {
    alert("Karaoke Mode Coming Soon!");
});

// Share Functionality
document.querySelectorAll(".share-btn").forEach(button => {
    button.addEventListener("click", function() {
        alert("Share link copied to clipboard!");
    });
});
