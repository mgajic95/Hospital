from app import app, db
from models import Doctor, Patient, Appointment

# Create the application context
app.app_context().push()

# Create the database and tables
db.create_all()
