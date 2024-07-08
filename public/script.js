// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyASfWw4Oz1rdUytEEutqbsERIKean_Mkto",
        authDomain: "health-care-eb613.firebaseapp.com",
        projectId: "health-care-eb613",
        storageBucket: "health-care-eb613.appspot.com",
        messagingSenderId: "564796064751",
        appId: "1:564796064751:web:6c3bdad784633d87c0ac1a",
        measurementId: "G-2ELXWT9P6W"
    };

    // Initialize Firebase
   

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Get the modals
    var loginModal = document.getElementById('loginModal');
    var registerModal = document.getElementById('registerModal');

    // Get the buttons that open the modals
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');

    // Get the <span> elements that close the modals
    var closeBtns = document.getElementsByClassName('closeBtn');

    // Function to open login modal
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
    });

    // Function to open register modal
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
    });

    // Function to close modals
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Event listeners for closing modals when clicking on close buttons
    for (var i = 0; i < closeBtns.length; i++) {
        closeBtns[i].addEventListener('click', function() {
            closeModal(this.parentElement.parentElement);
        });
    }

    // Event listener for closing modals when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target == loginModal) {
            closeModal(loginModal);
        }
        if (event.target == registerModal) {
            closeModal(registerModal);
        }
    });

    // Handle user registration
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Registered successfully
                console.log("User registered successfully");
                alert('User registered successfully');
                closeModal(registerModal);
                updateProfileSection(); // Update profile section after registration
            })
            .catch((error) => {
                console.error('Error registering user:', error.message);
                alert('Error registering user: ' + error.message);
            });
    });

    // Handle user login
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Logged in successfully
                console.log("User logged in successfully");
                alert('User logged in successfully');
                closeModal(loginModal);
                updateProfileSection(); // Update profile section after login
            })
            .catch((error) => {
                console.error('Error logging in user:', error.message);
                alert('Error logging in user: ' + error.message);
            });
    });

    // Update profile section function
    function updateProfileSection() {
        const user = auth.currentUser;
        if (user) {
            // Display more profile details (customize as needed)
            const profileDetails = document.getElementById('profileDetails');
            profileDetails.innerHTML = `
                <p>Email: ${user.email}</p>
                <p>User ID: ${user.uid}</p>
                <!-- Add more fields as needed -->
            `;
            // Show profile details section
            document.getElementById('profile').scrollIntoView({ behavior: 'smooth' }); // Scroll to profile section
        }
    }
});