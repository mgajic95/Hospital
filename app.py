from flask import Flask, request, jsonify

app = Flask(__name__)

doctors = []
patients = []
appointments = []

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
    return jsonify({"message": "Appointmnt scheduled successfully"})

if __name__ == '__main__':
    app.run(debug=True)

