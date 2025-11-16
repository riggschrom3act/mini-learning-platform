import os # adding fallback SQLite file path
from flask import Flask
from flask_cors import CORS
from models import db

app = Flask(__name__)
CORS(app)

# try to load user config.config- otherwise fallback to SQLite conig
try: # if class is missing or misconfiged the app should fall back to local SQLite file dev.db
    app.config.from_object('config.Config')
    print("Loaded config.Config from config.py")
except Exception as e: 
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    sqlite_path = os.path.join(BASE_DIR, "dev.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL") or f"sqlite:///{sqlite_path}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    print("Could not load config.Config — using fallback SQLite at", sqlite_path)

# Attach SQLAlchecmy to app
db.init_app(app)

# Import and register blueprint 
# Keep these imports AFTER app and db exist to avoid circular-import issues.
try:
    from routes import auth, courses
    app.register_blueprint(auth.bp)
    app.register_blueprint(courses.bp)
    print("Registered blueprints: auth, courses")
except Exception as e:
    # if routes packed does work or errors, print error and keep running
    print("Warning: failed to import or register routes:", e)

# Create DB tables on first run and added message to indicate status
def ensure_db_created():
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created")
        except Exception as exc:
            print("Error creating database tables:", exc)


if __name__ == "__main__":
    ensure_db_created()
    # run debug on localhost
    app.run(host="127.0.0.1", port=5000, debug=True)
