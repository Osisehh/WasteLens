import os
import gdown
from tensorflow.keras.models import load_model


class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    UPLOAD_FOLDER = 'static/uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    
    # Model configuration
    MODEL_PATH = 'models/garbage_classification_final.h5'
    MODEL_URL = "https://drive.google.com/uc?id=16YRol2LR3F5I08SBxDEL938CqR6vkQ9b"
    IMG_SIZE = 224
    
    # Class names
    CLASS_NAMES = [
        'battery', 'biological', 'brown-glass', 'cardboard', 
        'clothes', 'green-glass', 'metal', 'paper', 
        'plastic', 'shoes', 'trash', 'white-glass'
    ]
    
    # Class descriptions
    CLASS_DESCRIPTIONS = {
        'battery': 'Hazardous waste - requires special disposal',
        'biological': 'Organic waste - compostable material',
        'brown-glass': 'Recyclable glass - brown/amber colored',
        'cardboard': 'Recyclable paper product - boxes and packaging',
        'clothes': 'Textile waste - can be donated or recycled',
        'green-glass': 'Recyclable glass - green colored',
        'metal': 'Recyclable metal - cans, foils, and metal objects',
        'paper': 'Recyclable paper - documents and paper products',
        'plastic': 'Recyclable plastic - bottles and containers',
        'shoes': 'Textile waste - can be donated or recycled',
        'trash': 'General waste - non-recyclable items',
        'white-glass': 'Recyclable glass - clear/white colored'
    }
    
    # Disposal recommendations
    DISPOSAL_RECOMMENDATIONS = {
        'battery': '⚠️ Take to hazardous waste collection center',
        'biological': '♻️ Compost bin or organic waste collection',
        'brown-glass': '♻️ Glass recycling bin',
        'cardboard': '♻️ Paper recycling bin - flatten before disposal',
        'clothes': '👕 Donate to charity or textile recycling',
        'green-glass': '♻️ Glass recycling bin',
        'metal': '♻️ Metal recycling bin',
        'paper': '♻️ Paper recycling bin',
        'plastic': '♻️ Plastic recycling bin - check recycling number',
        'shoes': '👟 Donate to charity or textile recycling',
        'trash': '🗑️ General waste bin',
        'white-glass': '♻️ Glass recycling bin'
    }


def load_ml_model():
    os.makedirs("models", exist_ok=True)

    if not os.path.exists(Config.MODEL_PATH):
        print("Downloading model from Google Drive...")
        gdown.download(Config.MODEL_URL, Config.MODEL_PATH, quiet=False)

    print("Loading model...")
    model = load_model(Config.MODEL_PATH)

    return model


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}