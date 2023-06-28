## Description
The project is a Node.js application that utilizes ffmpeg to add an announcement at the end of an input file.

## Installation
To install and set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git](https://github.com/AsbDaryaee/Node.JS_AudioConcater.git

2. Navigate to the project directory

3. Install dependencies using npm or Yarn:

   
## Usage
1. Make sure you have installed all the dependencies and completed the installation steps.

2. Create a new input file in a compatible format (e.g., MP3).

3. Open the routes/router.js file and modify the following lines:

4. Modify the necessary routes according to your requirements.

5. Start the application:

6. Access the application in your browser at http://localhost:3000.

## File Structure

- controllers/
  - MainPageView.js
  - ResultPageView.js
  - UploadFile.js
  - UploadFilesRead.js
  - AnnounceFile.js
  - CleanUp.js
- routes/
  - router.js


## Controllers
1. `MainPageView.js`: Renders the main page view for the application.
2. `ResultPageView.js`:  Renders the result page view for the application.
3. `UploadFile.js`: Handles file upload functionality, allowing users to upload input files. It is responsible for processing audio files and adding announcements to them. It reads data from a JSON file, performs various operations such as bitrate conversion and concatenation, and then adds ID3v2 tags to the output files.
4. `UploadFilesRead.js`:  Reads and processes uploaded files.
5. `AnnounceFile.js`:  Adds an announcement at the end of the input file using ffmpeg.
6. `CleanUp.js`:  Performs cleanup operations, such as deleting temporary files.

## Routes
### Index Route (`index.js`)
- `GET /`:  Renders the main page view.
- `POST /upload`: Handles file uploads and initiates the process of adding an announcement.

## Examples
1. Accessing the main page:

Open your web browser and navigate to http://localhost:3000. This will display the main page of the application.

## Contributing
Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix.

3. Make the necessary changes and commit them.

4. Push your changes to your forked repository.

5 Submit a pull request from your branch to the original repository.
## License
This project is licensed under the Apache-2.0 license.
Feel free to copy and paste this Markdown code into your documentation file on GitHub. Make sure to modify any placeholder values or instructions with the appropriate information for your project.
