


document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const loginSection = document.getElementById('login-section');
    const quizSection = document.getElementById('quiz-section');
    const interestsDiv = document.getElementById('interests');
    const registerBtn = document.getElementById('register-btn');
    const registerStudentBtn = document.getElementById('register-student-btn');
    const orgRegisterSection = document.getElementById('org-register-section');
    const studentRegisterSection = document.getElementById('student-register-section');
    const orgDashboard = document.getElementById('org-dashboard');
    const sendNotificationForm = document.getElementById('send-notification-form');
    const notificationMessage = document.getElementById('notification-message');
    const studentRegisterForm = document.getElementById('student-register-form');
    const orgRegisterForm = document.getElementById('org-register-form');
    const notificationList = document.getElementById('notification-list');

    // Display notifications
    const displayNotifications = () => {
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notificationList.innerHTML = notifications.map(notif => `<li>${notif}</li>`).join('');
    };

    // Quiz form submission
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const answers = [
            parseInt(document.getElementById('question1').value),
            parseInt(document.getElementById('question2').value),
            parseInt(document.getElementById('question3').value),
            parseInt(document.getElementById('question4').value),
            parseInt(document.getElementById('question5').value),
        ];
        const totalPoints = answers.reduce((sum, current) => sum + current, 0);
        let finalResult = '';
        if (totalPoints <= 7) {
            finalResult = 'You are an Adventurer! It is likely that you love the outdoors and thrive in nature. Therefore, we recommend activities that involve aiding the environment such as collecting waste from the ground.';
        } else if (totalPoints <= 11) {
            finalResult = 'You are a Thinker! It is likely that you enjoy books and intellectual pursuits. Therefore, we recommend volunteering in areas that require you to use knowledge such as your local library or tutoring.';
        } else if (totalPoints <= 15) {
            finalResult = 'You are a Tech Enthusiast! You love gadgets and the latest technology. Therefore, we recommend taking part in places that require your technological abilites such as teaching useful computer skills or coding';
        } else {
            finalResult = 'You are an Artist! You are creative and express yourself through art. Therefore, we recommend volunteering in places that allow your artistic abilites to flourish such as a museum ';
        }
        interestsDiv.textContent = `Interests: ${finalResult}`;
        quizSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Show organization registration section
    registerBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        orgRegisterSection.style.display = 'block';
    });

    // Show student registration section
    registerStudentBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        studentRegisterSection.style.display = 'block';
    });

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate checking login credentials
        //const isOrganization = email.includes('@org.com'); // Example check
        const isOrganization = email.includes('.org') && email.includes('@');

        if (isOrganization) {
            // Redirect to organization dashboard
            loginSection.style.display = 'none';
            orgDashboard.style.display = 'block';
        } else {
            alert(`Logged in as ${email}`);
        }
    });

    // Handle organization registration form submission
    orgRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orgName = document.getElementById('org-name').value;
        const orgEmail = document.getElementById('org-email').value;
        const orgPassword = document.getElementById('org-password').value;

        // Save organization registration logic
        alert(`Organization ${orgName} registered with email ${orgEmail}`);
        
        // Redirect to login after registration
        orgRegisterSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Handle student registration form submission
    studentRegisterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('student-name').value;
        const studentEmail = document.getElementById('student-email').value;
        const studentPassword = document.getElementById('student-password').value;

        // Save student registration logic
        alert(`Student ${studentName} registered with email ${studentEmail}`);
        
        // Initialize notifications for the student
        if (!localStorage.getItem('notifications')) {
            localStorage.setItem('notifications', JSON.stringify([]));
        }

        // Redirect to login after registration
        studentRegisterSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Handle sending notifications
    sendNotificationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = notificationMessage.value;
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];

        // Add new notification to local storage
        notifications.push(message);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        // Clear the form and show confirmation
        notificationMessage.value = '';
        alert('Notification sent to all students!');
        displayNotifications();
    });

    // Initial display of notifications if logged in as student
    if (studentRegisterSection.style.display === 'block') {
        displayNotifications();
    }
});
