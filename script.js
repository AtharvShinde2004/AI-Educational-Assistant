// Get references to HTML elements
const startListeningButton = document.getElementById("start-listening");
const stopAssistantButton = document.getElementById("stop-assistant");
const response = document.getElementById("response");

// Create a speech recognition object
const recognition = new webkitSpeechRecognition();

// Initialize state variables
let isListening = false;
let shouldStopSpeaking = false;
let isSpeaking = false;

// Set continuous mode for speech recognition
recognition.continuous = true;

// Event handler when speech recognition starts
recognition.onstart = function () {
  startListeningButton.textContent = "Listening...";
  isListening = true;
};

// Event handler when speech recognition produces a result
recognition.onresult = function (event) {
  // Get the transcript from the last result
  const transcript =
    event.results[event.results.length - 1][0].transcript.toLowerCase();
  response.innerText = `You said: "${transcript}"`;

  // Update the commands section based on recognized commands
  const commandsSection = document.getElementById("commands-section");
  if (commandsSection) {
    const commandsList = commandsSection.querySelector("ul");
    if (commandsList) {
      // Clear the list first
      commandsList.innerHTML = "";

      // Check for recognized commands and perform actions
      if (transcript.includes("hello")) {
        speak("Hello! How can I assist you?");
      } else if (transcript.includes("teach me about")) {
        const query = transcript.replace("teach me about", "").trim();
        searchWikipedia(query);
      } else if (transcript.includes("stop") || transcript.includes("exit")) {
        recognition.stop();
        isListening = false;
        startListeningButton.textContent = "Start Listening";
        shouldStopSpeaking = true;
        speak("Assistant stopped. Click the button to start listening again.");
      } else if (transcript.includes("tell me about yourself")) {
        speak(
          "I am EDUCATIONAL ASSISTANT, your virtual teacher, here to assist and answer your questions. I was created by Atharv Shinde, the brilliant mind behind my design and functionality. Together, we're here to help you learn, explore, and discover new knowledge. Let's embark on this educational journey together! Say 'Teach me about' to learn something new!"
        );
      }

      // Add available commands to the list
      commandsList.innerHTML +=
        '<li>Say <strong>"Hello" </strong>to greet the assistant.</li>';
      commandsList.innerHTML +=
        '<li>Say <strong>"Teach me about [topic]"</strong> to get information on a specific topic</li>';
      commandsList.innerHTML +=
        '<li> Say <strong>"Stop" or "Exit" </strong>to stop the assistant from listening.</li>';
      commandsList.innerHTML +=
        '<li>Say <strong>"Tell me about yourself"</strong> to learn more about the assistant.</li>';
      // Add more commands as needed
    }
  }
};

// Event handler when speech recognition ends
recognition.onend = function () {
  // Restart recognition if it was stopped intentionally
  if (isListening) {
    recognition.start();
  }
};

// Event listener for the "Start/Stop Listening" button
startListeningButton.addEventListener("click", function () {
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

// Event listener for the "Stop Assistant" button
stopAssistantButton.addEventListener("click", function () {
  // Stop recognition
  recognition.stop();
  isListening = false;
  startListeningButton.textContent = "Start Listening";
  shouldStopSpeaking = true;
  speak("Assistant stopped.");

  // Stop speech synthesis if it's active
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
});

// Function to speak text using speech synthesis
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  // Event handler when speech synthesis starts
  utterance.onstart = function () {
    isSpeaking = true;
  };

  // Event handler when speech synthesis ends
  utterance.onend = function () {
    isSpeaking = false;
    if (shouldStopSpeaking) {
      window.speechSynthesis.cancel();
      shouldStopSpeaking = false;
    }
  };

  // Display the spoken text in the #spoken-text section
  const spokenTextSection = document.getElementById("spoken-text");
  if (spokenTextSection) {
    spokenTextSection.innerText = `Assistant says: "${text}"`;
  }

  // Trigger speech synthesis
  synth.speak(utterance);
}

// Function to search Wikipedia for a given query
async function searchWikipedia(query) {
  const apiUrl = `http://localhost/educational-assistant/search-wikipedia.php?query=${query}`;

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if there are search results
    if (data.query.search.length > 0) {
      const pageId = data.query.search[0].pageid;
      // Retrieve and speak a summary for the first search result
      getSummary(pageId);
    } else {
      speak("Sorry, I couldn't find any information on that topic.");
    }
  } catch (error) {
    console.error("Error:", error);
    speak("Sorry, I encountered an error while searching.");
  }
}

// Function to get a summary for a given Wikipedia page ID
async function getSummary(pageId) {
  const apiUrl = `http://localhost/educational-assistant/get-summary.php?pageid=${pageId}`;

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the page ID exists in the response
    if (data.query.pages[pageId]) {
      const extract = data.query.pages[pageId].extract;
      // You can modify this to extract a shorter summary
      const summary = extract.split(".").slice(0, 5).join("."); // Get the first five sentences

      // Speak the summary
      speak(summary);
    } else {
      speak("Sorry, I couldn't find a summary for that topic.");
    }
  } catch (error) {
    console.error("Error:", error);
    speak("Sorry, I encountered an error while fetching the summary.");
  }
}
