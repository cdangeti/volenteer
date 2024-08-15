document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        quizForm: document.getElementById('quiz-form'),
        loginSection: document.getElementById('login-section'),
        quizSection: document.getElementById('quiz-section'),
        interestsDiv: document.getElementById('interests'),
        registerBtn: document.getElementById('register-btn'),
        registerStudentBtn: document.getElementById('register-student-btn'),
        orgRegisterSection: document.getElementById('org-register-section'),
        studentRegisterSection: document.getElementById('student-register-section'),
        orgDashboard: document.getElementById('org-dashboard'),
        sendNotificationForm: document.getElementById('send-notification-form'),
        notificationMessage: document.getElementById('notification-message'),
        studentRegisterForm: document.getElementById('student-register-form'),
        orgRegisterForm: document.getElementById('org-register-form'),
        notificationList: document.getElementById('notification-list'),
        hoursList: document.getElementById('hours-list'),
        sendHoursForm: document.getElementById('send-hours-form')
    };

    // Display notifications
    const displayNotifications = () => {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        elements.notificationList.innerHTML = notifications.map(notif => `<li>${notif}</li>`).join('');
    };

    // Display hours
    const displayHours = () => {
        const hours = JSON.parse(localStorage.getItem('hours')) || [];
        elements.hoursList.innerHTML = hours.map(hour => `<li>${hour.studentEmail}: ${hour.hours} hours</li>`).join('');
    };

    // Quiz form submission
    elements.quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const answers = Array.from({ length: 5 }, (_, i) => parseInt(document.getElementById(`question${i+1}`).value, 10));
        const totalPoints = answers.reduce((sum, current) => sum + current, 0);
        let finalResult = '';

        if (totalPoints <= 7) {
            finalResult = 'You are an Adventurer! It is likely that you love the outdoors and thrive in nature. We recommend activities such as collecting waste from the ground.';
        } else if (totalPoints <= 11) {
            finalResult = 'You are a Thinker! It is likely that you enjoy intellectual pursuits. We recommend volunteering in areas such as your local library or tutoring.';
        } else if (totalPoints <= 15) {
            finalResult = 'You are a Tech Enthusiast! You love gadgets and technology. We recommend volunteering in tech-related activities like teaching computer skills.';
        } else {
            finalResult = 'You are an Artist! You express yourself through art. We recommend volunteering in creative environments such as a museum.';
        }

        elements.interestsDiv.textContent = `Interests: ${finalResult}`;
        elements.quizSection.style.display = 'none';
        elements.loginSection.style.display = 'block';
    });

    // Show organization registration section
    elements.registerBtn.addEventListener('click', () => {
        elements.loginSection.style.display = 'none';
        elements.orgRegisterSection.style.display = 'block';
    });

    // Show student registration section
    elements.registerStudentBtn.addEventListener('click', () => {
        elements.loginSection.style.display = 'none';
        elements.studentRegisterSection.style.display = 'block';
    });

    // Handle login form submission
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const organizations = JSON.parse(localStorage.getItem('organizations')) || [];
        const students = JSON.parse(localStorage.getItem('students')) || [];

        const orgFound = organizations.some(org => org.email === email && org.password === password);
        const studentFound = students.some(stu => stu.email === email && stu.password === password);

        if (orgFound) {
            elements.loginSection.style.display = 'none';
            elements.orgDashboard.style.display = 'block';
            displayNotifications();
            displayHours();
        } else if (studentFound) {
            // Redirect to student dashboard
            window.location.href = 'student-dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });

    // Handle organization registration form submission
    elements.orgRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orgName = document.getElementById('org-name').value;
        const orgEmail = document.getElementById('org-email').value;
        const orgPassword = document.getElementById('org-password').value;

        const organizations = JSON.parse(localStorage.getItem('organizations')) || [];
        organizations.push({ name: orgName, email: orgEmail, password: orgPassword });
        localStorage.setItem('organizations', JSON.stringify(organizations));

        elements.orgRegisterSection.style.display = 'none';
        elements.loginSection.style.display = 'block';
    });

    // Handle student registration form submission
    elements.studentRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('student-name').value;
        const studentEmail = document.getElementById('student-email').value;
        const studentPassword = document.getElementById('student-password').value;

        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name: studentName, email: studentEmail, password: studentPassword });
        localStorage.setItem('students', JSON.stringify(students));

        if (!localStorage.getItem('notifications')) {
            localStorage.setItem('notifications', JSON.stringify([]));
        }

        elements.studentRegisterSection.style.display = 'none';
        elements.loginSection.style.display = 'block';
    });

    // Handle sending notifications
    elements.sendNotificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = elements.notificationMessage.value;
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

        notifications.push(message);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        elements.notificationMessage.value = '';
        alert('Notification sent to all students!');
        displayNotifications();
    });

    // Handle sending volunteer hours
    elements.sendHoursForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentEmail = document.getElementById('student-email-for-hours').value;
        const hoursAmount = parseInt(document.getElementById('hours-amount').value, 10);
        const hours = JSON.parse(localStorage.getItem('hours')) || [];
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

        hours.push({ studentEmail, hours: hoursAmount });
        localStorage.setItem('hours', JSON.stringify(hours));

        const newNotification = `Recorded ${hoursAmount} hours for ${studentEmail}.`;
        notifications.push(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        document.getElementById('student-email-for-hours').value = '';
        document.getElementById('hours-amount').value = '';
        alert('Hours recorded!');

        displayHours();
        displayNotifications();
    });

    // Display notifications if logged in as student
    if (elements.studentRegisterSection.style.display === 'block') {
        displayNotifications();
    }
});
