# Garbage Classification Project

## Overview
This project is a web-based application designed to classify garbage into different categories using a Deep Learning model. It helps in automating the process of waste segregation, which is a crucial step in waste management and recycling. The application is built using Flask and utilizes a pre-trained Convolutional Neural Network (CNN) for image classification.

## Features
- **Image Upload**: Users can upload images of garbage items directly through the web interface.
- **Real-time Prediction**: The application processes the uploaded image and provides an instant classification of the garbage type.
- **Statistics**: View model statistics and performance metrics.
- **User-Friendly Interface**: Simple and intuitive design for easy interaction.

## Tech Stack
- **Backend**: Python, Flask
- **Machine Learning**: TensorFlow/Keras, NumPy, OpenCV
- **Frontend**: HTML, CSS (via Flask templates)
- **Data Processing**: Pillow, Werkzeug

## Project Structure
```
Garbage Classification/
├── app.py                  # Main Flask application
├── config.py               # Configuration settings
├── requirements.txt        # Python dependencies
├── models/                 # Directory for trained models
│   └── garbage_classification_final.h5
├── static/                 # Static files (CSS, JS, uploads)
├── templates/              # HTML templates
├── utils/                  # Utility functions
└── garbage_classification_cnn.ipynb # Jupyter notebook for model training
```

## Usage
1.  Start the Flask application (see [Installation Guide](INSTALLATION.md)).
2.  Open your web browser and navigate to `http://localhost:4040`.
3.  Upload an image of a waste item.
4.  Click "Predict" to see the classification result.
