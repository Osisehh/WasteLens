/* =========================================
   EcoClassify - Main JavaScript
   ========================================= */

// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll and active link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu
        navLinksContainer.classList.remove('active');
    });
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
}

// ===== FIXED CHARTS INITIALIZATION =====
function initializeCharts() {
    // Common chart options to prevent height expansion
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false, // Important: allows fixed height
        plugins: {
            legend: {
                labels: {
                    boxWidth: 12,
                    padding: 10
                }
            }
        }
    };

    // Chart 1: Class Distribution
    const ctx1 = document.getElementById('classDistributionChart');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Battery', 'Bio', 'Brown Glass', 'Cardboard', 'Clothes', 
                         'Green Glass', 'Metal', 'Paper', 'Plastic', 'Shoes', 'Trash', 'White Glass'],
                datasets: [{
                    label: 'Number of Images',
                    data: [1035, 1300, 1050, 1400, 1200, 1100, 1350, 1500, 1450, 950, 1080, 1000],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 2,
                    borderRadius: 5
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { padding: 5 }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { 
                            maxRotation: 45,
                            minRotation: 45,
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // Chart 2: Training Accuracy
    const ctx2 = document.getElementById('accuracyChart');
    if (ctx2) {
        const epochs = Array.from({length: 50}, (_, i) => i + 1);
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: epochs,
                datasets: [{
                    label: 'Training Accuracy',
                    data: generateAccuracyData(0.3, 0.895, 50),
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0 // Remove points for cleaner look
                }, {
                    label: 'Validation Accuracy',
                    data: generateAccuracyData(0.3, 0.85, 50),
                    borderColor: 'rgba(52, 211, 153, 1)',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                ...commonOptions,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { 
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { 
                            maxTicksLimit: 10 // Limit x-axis labels
                        }
                    }
                }
            }
        });
    }

    // Chart 3: Recyclable vs Non-Recyclable
    const ctx3 = document.getElementById('recyclableChart');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Recyclable', 'Non-Recyclable', 'Hazardous'],
                datasets: [{
                    data: [9, 2, 1],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                ...commonOptions,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 11 }
                        }
                    }
                },
                cutout: '60%' // Donut style
            }
        });
    }

    // Chart 4: Performance Metrics
    const ctx4 = document.getElementById('metricsChart');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'radar',
            data: {
                labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score', 'Specificity'],
                datasets: [{
                    label: 'Model Performance',
                    data: [0.85, 0.83, 0.84, 0.835, 0.87],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 1,
                        ticks: { 
                            stepSize: 0.2,
                            callback: function(value) {
                                return (value * 100).toFixed(0) + '%';
                            },
                            backdropColor: 'transparent'
                        },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
}

function generateAccuracyData(start, end, epochs) {
    const data = [];
    for (let i = 0; i < epochs; i++) {
        const progress = i / epochs;
        const value = start + (end - start) * (1 - Math.exp(-5 * progress));
        const noise = (Math.random() - 0.5) * 0.02;
        data.push(Math.min(1, value + noise));
    }
    return data;
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 EcoClassify initialized');

    // Initialize charts with a small delay to ensure proper sizing
    setTimeout(() => {
        if (document.getElementById('classDistributionChart')) {
            initializeCharts();
        }
    }, 100);
});

// Re-initialize charts on window resize (debounced)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Chart.js handles responsive resizing automatically
        console.log('Window resized - charts adjusted');
    }, 250);
});


// ===== IMAGE UPLOAD & PREDICTION =====
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const previewArea = document.getElementById('previewArea');
const imagePreview = document.getElementById('imagePreview');
const classifyBtn = document.getElementById('classifyBtn');
const resetBtn = document.getElementById('resetBtn');
const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');

let selectedFile = null;

// Drag and drop
if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#059669';
        uploadArea.style.background = '#f0fdf4';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.background = '#f3f4f6';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#10b981';
        uploadArea.style.background = '#f3f4f6';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file);
        }
    });
}

// File input change
if (imageInput) {
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    });
}

function handleFileSelect(file) {
    selectedFile = file;
    const reader = new FileReader();
    
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewArea.style.display = 'block';
    };
    
    reader.readAsDataURL(file);
}

// Classify button
if (classifyBtn) {
    classifyBtn.addEventListener('click', async () => {
        if (!selectedFile) return;
        
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        // Show loading
        previewArea.style.display = 'none';
        loadingArea.style.display = 'block';
        
        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.error) {
                alert('Error: ' + result.error);
                loadingArea.style.display = 'none';
                previewArea.style.display = 'block';
                return;
            }
            
            // Show results
            displayResults(result);
            
        } catch (error) {
            alert('Error processing image: ' + error.message);
            loadingArea.style.display = 'none';
            previewArea.style.display = 'block';
        }
    });
}

// Reset button
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        selectedFile = null;
        imageInput.value = '';
        previewArea.style.display = 'none';
        uploadArea.style.display = 'block';
    });
}

function displayResults(result) {
    loadingArea.style.display = 'none';
    resultArea.style.display = 'block';
    
    // Update result details
    document.getElementById('resultIcon').textContent = result.category_icon;
    document.getElementById('resultClass').textContent = result.predicted_class.toUpperCase();
    document.getElementById('resultConfidence').textContent = result.confidence.toFixed(2) + '%';
    document.getElementById('resultDescription').textContent = result.description;
    document.getElementById('resultRecommendation').textContent = result.disposal_recommendation;
    
    // Update confidence bar
    const confidenceFill = document.getElementById('confidenceFill');
    confidenceFill.style.width = result.confidence + '%';
    
    // Color based on confidence
    if (result.confidence > 80) {
        confidenceFill.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
    } else if (result.confidence > 60) {
        confidenceFill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
    } else {
        confidenceFill.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
    }
    
    // Create prediction chart
    createPredictionChart(result.all_predictions);
}

function createPredictionChart(predictions) {
    const ctx = document.getElementById('predictionChart');
    if (!ctx) return;
    
    // Destroy existing chart if any
    if (window.predictionChartInstance) {
        window.predictionChartInstance.destroy();
    }
    
    const labels = predictions.map(p => p.class);
    const data = predictions.map(p => p.probability);
    
    window.predictionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Confidence (%)',
                data: data,
                backgroundColor: data.map((value, index) => 
                    index === 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.3)'
                ),
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 EcoClassify initialized');
    
    // Initialize charts if on visualization section
    if (document.getElementById('classDistributionChart')) {
        initializeCharts();
    }
});