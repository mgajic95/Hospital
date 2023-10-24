from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABSE_URI'] = 'sqlite:///site.db' #using sqlite for db
db = SQLAlchemy(app)


doctors = []
patients = []
appointments = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_doctor', methods=['POST'])
def add_doctor():
    data = request.get_json()
    doctors.append(data)
    return jsonify({"message": "Doctor added successfully"})

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.get_json()
    patients.append(data)
    return jsonify({"message" : "Patient added successfully"})

@app.route('/schedule_appointment', methods=['POST'])
def schedule_appointment():
    data = request.get_json()
    appointments.append(data)
    return jsonify({"message": "Appointment scheduled successfully"})


# Add a new route to retrieve a list of patients for a doctor
@app.route('/get_patients_for_doctor', methods=['GET'])
def get_patients_for_doctor():
    doctor_name = request.args.get('doctor_name')

    # Find patients associated with the specified doctor
    doctor_patients = [patient for patient in patients if patient.get('doctor') == doctor_name]

    return jsonify({"patients": doctor_patients})

if __name__ == '__main__':
    app.run(debug=True)

