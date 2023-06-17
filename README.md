# Kaospilot toolbox
This project is a web application that displays workshops and allows users to search, filter, and view workshop details. It also includes a popup feature to display additional information about a specific workshop.

Try it here: https://marinazhu.github.io/toolbox/

## Getting Started
To get started with the project, follow these steps:

1. Clone the repository or download the project files.
2. Open the project in a web browser.

## Usage

### Cards
The application displays workshop cards in a gallery. Each card represents a workshop and includes the workshop title, image, difficulty level, number of participants, and duration. By default, the application loads the initial set of workshop cards from the workshops1.json file.

### Search
The search feature allows users to search for workshops by their title. Enter a search term in the search input field and click the search icon to perform a search. The application will display the matching workshop cards.

### Sort
The sort feature allows users to sort the workshops based on their attributes. On mobile devices, click the filters tab to access the sorting options. By default, the sorting option is set to "Select." Choose a sorting option from the list to sort the workshops accordingly.

### Filter
The filter feature allows users to filter the workshops based on various criteria. Click the filter trigger button to open the filter panel. The filter panel includes checkboxes for difficulty levels and workshop categories. Check or uncheck the checkboxes to filter the workshops accordingly. Additionally, there is a range slider filter that enables users to select a specific range of values for further customization. With the range slider, you can refine your search by specifying a desired range of workshop durations or number of participants.

### PopUp
The PopUp feature allows users to view additional details about a workshop. Clicking on a workshop card in the gallery or the swiper will open a popup window with detailed information about the workshop. The popup includes the workshop title, difficulty level, number of participants, duration, main image, pitch, description, materials, and source. It also displays the workshop steps with corresponding instructions. Users can close the popup by clicking the close button or anywhere outside the popup.

### Printing
Users can print the content of the popup by clicking the "Print" button in the popup window. A new window will open with the printable content, and the print dialog will automatically appear.

### Sharing
Users can share the popup using the share button. If the browser supports the Web Share API, clicking the share button will invoke the native sharing functionality of the browser, allowing users to share the popup with others. If the browser does not support the Web Share API, a fallback message will be displayed.

### Swiper
The application utilizes the Swiper library to create a responsive and interactive gallery of workshop cards. The Swiper allows users to navigate through the workshop cards using pagination or navigation arrows.

### Data Source
The workshop data is stored in the workshops1.json file. The application fetches the data using the Fetch API and renders the workshop cards based on the retrieved data. Each workshop object in the JSON file includes properties such as title, difficulty, number of participants, duration, images, pitch, description, materials, source, and instructions.

### Dependencies
This project uses the following dependencies:

Swiper: A library for creating responsive and touch-enabled carousels and sliders.
Acknowledgments
This project was developed as a demonstration of web development skills. The design and functionality of the application can be customized and extended to meet specific requirements.
