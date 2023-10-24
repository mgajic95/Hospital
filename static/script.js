function addDoctor() {
    var doctorName = document.getElementById("doctorName").value;

    fetch('/add_doctor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: doctorName }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.message) {
            // Display feedback message for addDoctor
            document.getElementById("doctorFeedback").innerHTML = '<div class="alert alert-info">' + data.message + '</div>';
        } else {
            throw new Error('Invalid response format');
        }
    })
    .catch(error => {
        console.error('Add Doctor Error:', error);
        document.getElementById("doctorFeedback").innerHTML = '<div class="alert alert-danger">An error occurred. Please try again.</div>';
    });

    return false;
}

function addPatient() {
    var patientName = document.getElementById("patientName").value;

    fetch('/add_patient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: patientName }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.message) {
            // Display feedback message for addPatient
            document.getElementById("patientFeedback").innerHTML = '<div class="alert alert-info">' + data.message + '</div>';
        } else {
            throw new Error('Invalid response format');
        }
    })
    .catch(error => {
        console.error('Add Patient Error:', error);
        document.getElementById("patientFeedback").innerHTML = '<div class="alert alert-danger">An error occurred. Please try again.</div>';
    });

    return false;
}

function scheduleAppointment() {
    var doctor = document.getElementById("doctor").value;
    var patient = document.getElementById("patient").value;

    fetch('/schedule_appointment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor: doctor, patient: patient }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.message) {
            // Display feedback message for scheduleAppointment
            document.getElementById("appointmentFeedback").innerHTML = '<div class="alert alert-info">' + data.message + '</div>';

            // Redirect to a blank form
            document.getElementById("doctor").value = "";
            document.getElementById("patient").value = "";
        } else {
            throw new Error('Invalid response format');
        }
    })
    .catch(error => {
        console.error('Schedule Appointment Error:', error);
        document.getElementById("appointmentFeedback").innerHTML = '<div class="alert alert-danger">An error occurred. Please try again.</div>';
    });

    return false;
}
