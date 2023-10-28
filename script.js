const startListeningButton = document.getElementById('start-listening');
const stopAssistantButton = document.getElementById('stop-assistant');
const response = document.getElementById('response');
const recognition = new webkitSpeechRecognition();
let isListening = false;
let shouldStopSpeaking = false;
let isSpeaking = false;

recognition.continuous = true;

recognition.onstart = function() {
  startListeningButton.textContent = 'Listening...';
  isListening = true;
};

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  response.innerText = `You said: "${transcript}"`;

  if (shouldStopSpeaking) {
    window.speechSynthesis.cancel();
    shouldStopSpeaking = false;
  }

  if (transcript.includes('hello')) {
    speak('Hello! How can I assist you?');
  } else if (transcript.includes('search')) {
    const query = transcript.replace('search', '').trim();
    searchWikipedia(query);
  } else if (transcript.includes('stop') || transcript.includes('exit')) {
    recognition.stop();
    isListening = false;
    startListeningButton.textContent = 'Start Listening';
    shouldStopSpeaking = true;
    speak('Assistant stopped. Click the button to start listening again.');
  } else if (transcript.includes('tell me about')) { // New code for "Tell me about" query
    const query = transcript.replace('tell me about', '').trim();
    searchWikipedia(query);
  }
};

recognition.onend = function() {
  if (isListening) {
    recognition.start();
  }
};

startListeningButton.addEventListener('click', function() {
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

stopAssistantButton.addEventListener('click', function() {
  // Stop recognition
  recognition.stop();
  isListening = false;
  startListeningButton.textContent = 'Start Listening';
  shouldStopSpeaking = true;
  speak('Assistant stopped.');
  
  // Stop speech synthesis if it's active
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
});

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.onstart = function() {
    isSpeaking = true;
  };

  utterance.onend = function() {
    isSpeaking = false;
    if (shouldStopSpeaking) {
      window.speechSynthesis.cancel();
      shouldStopSpeaking = false;
    }
  };

  synth.speak(utterance);
}
// Rest of your code...

async function searchWikipedia(query) {
  const apiUrl = `http://localhost/educational-assistant/search-wikipedia.php?query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.query.search.length > 0) {
      const pageId = data.query.search[0].pageid;
      getSummary(pageId);
    } else {
      speak('Sorry, I couldn\'t find any information on that topic.');
    }
  } catch (error) {
    console.error('Error:', error);
    speak('Sorry, I encountered an error while searching.');
  }
}

async function getSummary(pageId) {
  const apiUrl = `http://localhost/educational-assistant/get-summary.php?pageid=${pageId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.query.pages[pageId]) {
      const extract = data.query.pages[pageId].extract;
      // You can modify this to extract a shorter summary
      const summary = extract.split('.').slice(0, 2).join('.'); // Get the first two sentences

      speak(summary);
    } else {
      speak('Sorry, I couldn\'t find a summary for that topic.');
    }
  } catch (error) {
    console.error('Error:', error);
    speak('Sorry, I encountered an error while fetching the summary.');
  }
}
