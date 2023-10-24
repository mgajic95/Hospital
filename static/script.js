document.addEventListener('DOMContentLoaded', function () {
  const addDoctorForm = document.getElementById('doctorForm');
  const addPatientForm = document.getElementById('patientForm');
  const scheduleAppointmentForm = document.getElementById('appointmentForm');

    function addDoctor() {
        const name = document.getElementById('doctorName').value;

        fetch('/add_doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Display feedback message for addDoctor
            document.getElementById('doctorFeedback').innerHTML = data.message;
        })
        .catch(error => console.error('Error:', error));
    }

    function addPatient() {
        const name = document.getElementById('patientName').value;
        const doctor = document.getElementById('patientDoctor').value;

        fetch('/add_patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, doctor }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Display feedback message for addPatient
            document.getElementById('patientFeedback').innerHTML = data.message;
        })
        .catch(error => console.error('Error:', error));
    }

    function scheduleAppointment() {
    const doctor = document.getElementById('appointmentDoctor').value;
    const patient = document.getElementById('appointmentPatient').value;
    const date = document.getElementById('appointmentDate').value;

    fetch('/schedule_appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ doctor, patient, date }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Display feedback message for scheduleAppointment
        document.getElementById('appointmentFeedback').innerHTML = data.message;
      })
      .catch(error => console.error('Error:', error));
  }

    // Add event listeners to forms
    addDoctorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addDoctor();
  });

  addPatientForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addPatient();
  });

  scheduleAppointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    scheduleAppointment();

    });
});
