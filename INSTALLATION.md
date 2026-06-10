# Installation Guide

Follow these steps to set up and run the Garbage Classification project on your local machine.

## Prerequisites
- **Python 3.8+**: Ensure you have Python installed. You can check by running `python --version` or `python3 --version`.
- **pip**: Python package installer.

## Installation Steps


1.  **Clone the Repository**
    If you have the project as a zip file, extract it. If it's a git repository, clone it:
    ```bash
    Clone or Extracet the given zip file
    cd "Garbage Classification"
    ```

    Download the model and dataser and and extract that and put it in project folder
    Link : https://drive.google.com/drive/folders/1r84u3fy16qn6aOQgjiyxbuooH2UXteBP?usp=sharing

2.  **Create a Virtual Environment (Optional but Recommended)**
    It's good practice to use a virtual environment to manage dependencies.
    ```bash
    # macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # Windows
    python -m venv venv
    venv\Scripts\activate
    ```

3.  **Install Dependencies**
    Install the required Python packages using `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

1.  **Start the Flask Server**
    Run the `app.py` file to start the application.
    ```bash
    python app.py
    ```

2.  **Access the Application**
    Once the server is running, you will see output indicating the server address (usually `http://0.0.0.0:4040` or `http://127.0.0.1:4040`).
    
    Open your web browser and go to:
    [http://localhost:4040](http://localhost:4040)

## Troubleshooting
- **Port already in use**: If port 4040 is occupied, you can change the port in `app.py` at the bottom of the file:
  ```python
  app.run(debug=True, host='0.0.0.0', port=5000) # Change 4040 to another port like 5000
  ```
- **Missing modules**: Ensure you have activated your virtual environment and installed all requirements.
