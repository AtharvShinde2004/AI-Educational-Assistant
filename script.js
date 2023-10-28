const startListeningButton = document.getElementById('start-listening');
const response = document.getElementById('response');
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.onstart = function() {
  startListeningButton.textContent = 'Listening...';
};

recognition.onresult = function(event) {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  response.innerText = `You said: "${transcript}"`;

  if (transcript.includes('hello')) {
    speak('Hello! How can I assist you?');
  } else if (transcript.includes('search')) {
    const query = transcript.replace('search', '').trim();
    searchWikipedia(query);
  }
};

recognition.onend = function() {
  startListeningButton.textContent = 'Start Listening';
  recognition.start();
};

startListeningButton.addEventListener('click', function() {
  if (recognition.active) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

async function searchWikipedia(query) {
  const apiUrl = `http://localhost/search-wikipedia.php?query=${query}`;

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
  const apiUrl = `http://localhost/get-summary.php?pageid=${pageId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.query.pages[pageId]) {
      const summary = data.query.pages[pageId].extract;
      speak(summary);
    } else {
      speak('Sorry, I couldn\'t find a summary for that topic.');
    }
  } catch (error) {
    console.error('Error:', error);
    speak('Sorry, I encountered an error while fetching the summary.');
  }
}
