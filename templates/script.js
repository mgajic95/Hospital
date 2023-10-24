function addDoctor() {
    var doctorName = document.getElementById("doctorName").value;

    // Make an API request to add a doctor
    fetch('/add_doctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: doctorName }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display feedback
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Prevent the form from submitting in the traditional way
    return false;
}

function addPatient() {
    var patientName = document.getElementById("patientName").value;

    // Make an API request to add a patient
    fetch('/add_patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: patientName }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display feedback
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Prevent the form from submitting in the traditional way
    return false;
}

function scheduleAppointment() {
    var doctor = document.getElementById("doctor").value;
    var patient = document.getElementById("patient").value;

    // Make an API request to schedule an appointment
    fetch('/schedule_appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor: doctor, patient: patient }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display feedback

        // Redirect to a blank form
        document.getElementById("doctor").value = "";
        document.getElementById("patient").value = "";
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Prevent the form from submitting in the traditional way
    return false;
}
