import os
from pathlib import Path
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- BEST PRACTICE & PRODUCTION SETTINGS ---

# Read the SECRET_KEY from an environment variable.
# Set this in Render's "Environment" tab.
SECRET_KEY = os.environ.get('SECRET_KEY')

# DEBUG is False in production, but can be True in development if you set the env var.
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# ALLOWED_HOSTS is configured to work automatically with Render's domain.
ALLOWED_HOSTS = []
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
# You can add your local host for development if needed
ALLOWED_HOSTS.append('127.0.0.1')


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Whitenoise Middleware for serving static files in production
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'jobportal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jobportal.wsgi.application'

# --- DATABASE CONFIGURATION (Local & Production) ---

DATABASES = {
    # Default to a local SQLite database for development
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# If the DATABASE_URL environment variable is set (on Render), use it.
if 'DATABASE_URL' in os.environ:
    DATABASES['default'] = dj_database_url.config(
        conn_max_age=600,
        ssl_require=True
    )

# --- PASSWORD VALIDATORS ---
AUTH_PASSWORD_VALIDATORS = [
    # ... (Your validators are fine, no changes needed) ...
]

# --- REST FRAMEWORK (Corrected for Token Auth) ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny', # Adjust as needed
    ],
}

# --- CORS (Secure for Production) ---
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "job-portal-umber-seven.vercel.app", # <-- IMPORTANT: REPLACE with your Vercel URL
]

# --- STATIC & MEDIA FILES ---
STATIC_URL = 'static/'
# This tells Django where to collect all static files for production
STATIC_ROOT = BASE_DIR / 'staticfiles'
# This enables Whitenoise to serve files efficiently
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ... (rest of the file is fine, no changes needed) ...

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Default auto primary key
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
