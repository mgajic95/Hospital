
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from models import db, Doctor, Patient, Appointment
from datetime import datetime
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    db.init_app(app)
    return app

app = create_app()

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_doctor', methods=['POST'])
def add_doctor():
    data = request.get_json()
    doctor = Doctor(name=data['name'])
    db.session.add(doctor)
    db.session.commit()
    return jsonify({"message": "Doctor added successfully"})

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.get_json()
    patient_name = data['name']
    doctor_name = data['doctor']

    doctor = Doctor.query.filter_by(name=doctor_name).first()

    if doctor:
        patient = Patient(name=patient_name, doctor_id=doctor.id)
        db.session.add(patient)
        db.session.commit()
        return jsonify({"message": "Patient added successfully"})
    else:
        return jsonify({"message": "Doctor not found"})

@app.route('/schedule_appointment', methods=['POST'])
def schedule_appointment():
    # Get data from the form
    doctor_name = request.json['doctor']
    patient_name = request.json['patient']
    appointment_date_str = request.json['date']

    # Convert the string to a Python date object
    appointment_date = datetime.strptime(appointment_date_str, '%Y-%m-%d').date()

    # Query the database to get Doctor and Patient objects
    doctor = Doctor.query.filter_by(name=doctor_name).first()
    patient = Patient.query.filter_by(name=patient_name).first()

    # Check if Doctor and Patient exist
    if doctor and patient:
        # Create an Appointment object
        appointment = Appointment(doctor_id=doctor.id, patient_id=patient.id, date=appointment_date)

        # Add and commit to the database
        db.session.add(appointment)
        db.session.commit()

        return jsonify({'message': 'Appointment scheduled successfully'})
    else:
        return jsonify({'message': 'Doctor or Patient not found'}), 404
@app.route('/get_patients_for_doctor', methods=['GET'])
def get_patients_for_doctor():
    doctor_name = request.args.get('doctor')
    doctor_patients = Patient.query.filter_by(doctor_name=doctor_name).all()
    return jsonify({"patients": doctor_patients})

if __name__ == '__main__':
    app.run(debug=True)
