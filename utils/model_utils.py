import numpy as np
import cv2
from tensorflow import keras
import os
from config import Config

class GarbageClassifier:
    """Garbage Classification Model Handler"""
    
    def __init__(self, model_path='models/garbage_classification_final.h5'):
        """Initialize the classifier with trained model"""
        self.model_path = model_path
        self.img_size = Config.IMG_SIZE
        self.class_names = Config.CLASS_NAMES
        self.class_descriptions = Config.CLASS_DESCRIPTIONS
        self.disposal_recommendations = Config.DISPOSAL_RECOMMENDATIONS
        
        # Load model
        self.model = self._load_model()
        
    def _load_model(self):
        """Load the trained Keras model"""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model not found at {self.model_path}")
        
        model = keras.models.load_model(self.model_path)
        print(f"✅ Model loaded successfully from {self.model_path}")
        return model
    
    def preprocess_image(self, image_path):
        """Preprocess image for prediction"""
        # Read image
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        # Resize
        img_resized = cv2.resize(img, (self.img_size, self.img_size))
        
        # Normalize
        img_array = img_resized / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    
    def predict(self, image_path):
        """Predict garbage category for an image"""
        # Preprocess
        img_array = self.preprocess_image(image_path)
        
        # Predict
        predictions = self.model.predict(img_array, verbose=0)
        
        # Get results
        predicted_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_idx]) * 100
        predicted_class = self.class_names[predicted_idx]
        
        # Get all class probabilities
        all_predictions = []
        for idx, prob in enumerate(predictions[0]):
            all_predictions.append({
                'class': self.class_names[idx],
                'probability': float(prob) * 100
            })
        
        # Sort by probability
        all_predictions.sort(key=lambda x: x['probability'], reverse=True)
        
        # Prepare result
        result = {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'description': self.class_descriptions.get(predicted_class, ''),
            'disposal_recommendation': self.disposal_recommendations.get(predicted_class, ''),
            'all_predictions': all_predictions[:5],  # Top 5
            'is_recyclable': predicted_class not in ['trash', 'battery'],
            'category_icon': self._get_category_icon(predicted_class)
        }
        
        return result
    
    def _get_category_icon(self, class_name):
        """Get emoji icon for category"""
        icons = {
            'battery': '🔋',
            'biological': '🌱',
            'brown-glass': '🟤',
            'cardboard': '📦',
            'clothes': '👕',
            'green-glass': '🟢',
            'metal': '🔩',
            'paper': '📄',
            'plastic': '🥤',
            'shoes': '👟',
            'trash': '🗑️',
            'white-glass': '⚪'
        }
        return icons.get(class_name, '♻️')
    
    def get_model_stats(self):
        """Get model statistics"""
        return {
            'total_classes': len(self.class_names),
            'class_names': self.class_names,
            'model_parameters': self.model.count_params(),
            'input_shape': str(self.model.input_shape),
            'accuracy': 84.97  # From your training results
        }