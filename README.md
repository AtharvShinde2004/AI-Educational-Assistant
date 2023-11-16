# Educational Voice Assistant Documentation

## Overview

The Educational Voice Assistant is a web-based application that combines voice recognition, speech synthesis, and Wikipedia data retrieval to assist users in learning, exploring, and discovering new knowledge. This documentation provides an overview of its components and functionality.

## Key Components

1. **HTML (`index.html`):**
    - **Document Structure:** The HTML file structures the web page, including elements such as buttons, response boxes, and a commands section.
    - **Buttons:** The "Start Listening" and "Stop Assistant" buttons allow users to initiate and terminate voice interaction.
    - **Response Boxes:** "response" and "spoken-text" boxes display the assistant's responses and spoken text.
    - **Commands Section:** Lists available voice commands for the assistant.
    - **Footer:** Displays a watermark with the creator's name, Atharv Shinde.

2. **CSS (`styles.css`):**
    - **Styling:** CSS is used for visual presentation and layout, including fonts, colors, button styling, and responsiveness.
    - **Classes:** Classes like "button," "stop-button," "box," and "footer" define styling for specific elements.
    - **CORS Handling:** The CSS code contains styles for different parts of the web page, ensuring a visually appealing and user-friendly interface.

3. **JavaScript (`script.js`):**
    - **Speech Recognition:** Utilizes the Web Speech API for voice recognition and interprets user commands.
    - **Speech Synthesis:** Uses the Web Speech API for speech synthesis to provide responses and information.
    - **Wikipedia Integration:** Communicates with two PHP files to fetch Wikipedia search results and page summaries.
    - **User Interface Interaction:** Updates the user interface dynamically based on user input, recognition results, and the assistant's state.
    - **Error Handling:** Provides error handling for API requests and speech synthesis.

4. **PHP (`search-wikipedia.php` and `get-summary.php`):**
    - **Search-Wikipedia.php:** An API endpoint that interacts with the Wikipedia API to fetch search results based on user queries. It returns search results in JSON format.
    - **Get-Summary.php:** Another API endpoint that retrieves page summaries from Wikipedia based on page IDs. It returns page summaries in JSON format.
    - **CORS Handling:** Both PHP files include headers for Cross-Origin Resource Sharing (CORS) to allow cross-origin requests, making them accessible in web applications.

## Functionality

The Educational Voice Assistant offers the following functionality:

- **Voice Interaction:** Users can initiate voice interaction by clicking the "Start Listening" button and speak commands to the assistant.
- **Commands:** Users can greet the assistant with "Hello," ask for information on specific topics using "Teach me about [topic]," learn more about the assistant by saying "Tell me about yourself," and stop the assistant from listening by saying "Stop" or "Exit."
- **Response and Speech Synthesis:** The assistant responds with appropriate messages and synthesizes speech to provide information and responses.
- **Wikipedia Integration:** Users can ask for information on specific topics, and the assistant fetches data from Wikipedia, including search results and page summaries.
- **Error Handling:** The assistant includes error handling to manage unexpected issues with API requests and speech synthesis, providing user-friendly error messages.

## Usage

Users can interact with the Educational Voice Assistant by clicking the "Start Listening" button, speaking commands, and receiving responses and information from the assistant. The assistant's capabilities include answering questions, providing information on various topics, and offering an introduction to itself.

## Additional Notes

- This documentation covers the core components of the Educational Voice Assistant and its functionality. For complete integration and usage, it should be part of a web application, along with the associated CSS and JavaScript files.
- The code is designed to be easily extensible, allowing for the addition of more voice commands and features as needed.
- The system uses CORS headers in both PHP files to ensure compatibility with various web applications, making it accessible for integration into different platforms.

The Educational Voice Assistant is a user-friendly tool that combines voice technology and data retrieval to assist users in their educational journey, providing a hands-free way to access information and learn new things.

© Atharv Shinde | TechCognita
