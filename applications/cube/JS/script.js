document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    function createApplicationForm() {
        const container = document.createElement("div");
        container.className = "container";

        container.innerHTML = `
            <a href="#" id="admin-login" class="login-icon" aria-label="Admin Login">
                <i class="fas fa-user-shield"></i>
            </a>
            <h1>Ethereal Heaven</h1>
            <h2>Staff Application</h2>
            <div class="requirements">
                <h3>Requirements:</h3>
                <ul>
                    <li>Must be at least 18 years old</li>
                    <li>Active member for at least 3 months</li>
                    <li>No previous warnings or bans</li>
                    <li>Excellent communication skills</li>
                    <li>Ability to handle conflicts professionally</li>
                </ul>
            </div>
            <form id="application-form">
                <div class="form-grid">
                    ${createFormGroup("discord-name", "Discord Name", "text", "Your full Discord username, including the #")}
                    ${createFormGroup("display-name", "Display Name", "text", "The name you'd like to be called")}
                    ${createFormGroup("discord-id", "Discord ID", "text", "Your unique 18-digit Discord ID")}
                    ${createFormGroup("age", "Age", "number", "Must be 18 or older")}
                    ${createFormGroup("role", "Desired Role", "select", "Select the role you're applying for", [
                        { value: "", text: "Select Role", disabled: true, selected: true },
                        { value: "Moderator", text: "Moderator" },
                        { value: "Event Coordinator", text: "Event Coordinator" },
                        { value: "Support Staff", text: "Support Staff" }
                    ])}
                    ${createFormGroup("join-date", "Server Join Date", "date", "When did you join our server?")}
                    ${createFormGroup("experience", "Relevant Experience", "textarea", "Tell us about your experience in community management or similar roles", null, null, "full-width")}
                    ${createFormGroup("reason", "Why do you want to join our team?", "textarea", "Explain your motivation and what you can bring to the team", null, null, "full-width")}
                    ${createFormGroup("availability", "Weekly Availability", "text", "How many hours per week can you dedicate?", null, null, "full-width")}
                    ${createFormGroup("skills", "Special Skills", "text", "Any unique skills that could benefit the team?", null, null, "full-width")}
                    ${createFormGroup("timezone", "Timezone", "select", "Select your timezone", [
                        { value: "", text: "Select Timezone", disabled: true, selected: true },
                        { value: "UTC-12:00", text: "UTC-12:00" },
                        { value: "UTC-11:00", text: "UTC-11:00" },
                        { value: "UTC-10:00", text: "UTC-10:00" },
                        { value: "UTC-09:00", text: "UTC-09:00" },
                        { value: "UTC-08:00", text: "UTC-08:00" },
                        { value: "UTC-07:00", text: "UTC-07:00" },
                        { value: "UTC-06:00", text: "UTC-06:00" },
                        { value: "UTC-05:00", text: "UTC-05:00" },
                        { value: "UTC-04:00", text: "UTC-04:00" },
                        { value: "UTC-03:00", text: "UTC-03:00" },
                        { value: "UTC-02:00", text: "UTC-02:00" },
                        { value: "UTC-01:00", text: "UTC-01:00" },
                        { value: "UTC+00:00", text: "UTC+00:00" },
                        { value: "UTC+01:00", text: "UTC+01:00" },
                        { value: "UTC+02:00", text: "UTC+02:00" },
                        { value: "UTC+03:00", text: "UTC+03:00" },
                        { value: "UTC+04:00", text: "UTC+04:00" },
                        { value: "UTC+05:00", text: "UTC+05:00" },
                        { value: "UTC+06:00", text: "UTC+06:00" },
                        { value: "UTC+07:00", text: "UTC+07:00" },
                        { value: "UTC+08:00", text: "UTC+08:00" },
                        { value: "UTC+09:00", text: "UTC+09:00" },
                        { value: "UTC+10:00", text: "UTC+10:00" },
                        { value: "UTC+11:00", text: "UTC+11:00" },
                        { value: "UTC+12:00", text: "UTC+12:00" }
                    ])}
                    ${createFormGroup("terms", "Terms and Conditions", "checkbox", "I agree to the terms and conditions", null, null, "full-width")}
                </div>
                <div class="progress-container">
                    <div class="progress-bar"><div class="progress" id="form-progress"></div></div>
                    <p class="progress-text">Application Progress: <span id="progress-percentage">0%</span></p>
                </div>
                <button type="submit">Submit Application</button>
            </form>
        `;

        return container;
    }

    function createFormGroup(id, label, type, infoText, options = null, rows = null, className = "") {
        let input;
        if (type === "select") {
            input = `<select id="${id}" required>
                ${options.map(option => `<option value="${option.value}" ${option.disabled ? 'disabled' : ''} ${option.selected ? 'selected' : ''}>${option.text}</option>`).join('')}
            </select>`;
        } else if (type === "textarea") {
            input = `<textarea id="${id}" rows="${rows || 4}" required></textarea>`;
        } else if (type === "checkbox") {
            input = `
                <label class="custom-checkbox">
                    <input type="checkbox" id="${id}" required>
                    <span class="checkmark"></span>
                    ${label}
                </label>
            `;
        } else {
            input = `<input type="${type}" id="${id}" required>`;
        }

        return `
            <div class="form-group ${className}">
                ${type !== "checkbox" ? `<label for="${id}">${label}</label>` : ''}
                ${input}
                <p class="info-text">${infoText}</p>
            </div>
        `;
    }

    function createSuccessModal() {
        const modal = document.createElement("div");
        modal.id = "success-modal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Application Submitted Successfully!</h3>
                <p>Thank you for applying to join our staff team. We appreciate your interest in contributing to our community.</p>
                <p>Our team will carefully review your application and get back to you within 7-10 business days.</p>
                <button id="close-modal">Close</button>
            </div>
        `;
        return modal;
    }

    function setupEventListeners() {
        const applicationForm = document.getElementById("application-form");
        const successModal = document.getElementById("success-modal");
        const closeModal = document.getElementById("close-modal");
        const adminLogin = document.getElementById("admin-login");
        const formInputs = applicationForm.querySelectorAll("input, select, textarea");

        applicationForm.addEventListener("submit", handleApplicationSubmit);
        closeModal.addEventListener("click", () => {
            gsap.to(successModal, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => successModal.style.display = "none" });
        });
        adminLogin.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Admin login functionality is not available in this demo.");
        });

        formInputs.forEach(input => {
            input.addEventListener("input", updateProgressBar);
        });

        window.addEventListener("click", (event) => {
            if (event.target === successModal) {
                gsap.to(successModal, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => successModal.style.display = "none" });
            }
        });
    }

    function updateProgressBar() {
        const form = document.getElementById("application-form");
        const progressBar = document.getElementById("form-progress");
        const progressPercentage = document.getElementById("progress-percentage");
        const inputs = form.querySelectorAll("input, select, textarea");
        const totalInputs = inputs.length;
        let filledInputs = 0;

        inputs.forEach(input => {
            if (input.type === "checkbox") {
                if (input.checked) filledInputs++;
            } else if (input.value.trim() !== "") {
                filledInputs++;
            }
        });

        const progress = Math.round((filledInputs / totalInputs) * 100);
        gsap.to(progressBar, { width: `${progress}%`, duration: 0.5, ease: "power2.out" });
        progressPercentage.textContent = `${progress}%`;
    }

    async function handleApplicationSubmit(event) {
        event.preventDefault();

        if (!validateForm(event.target)) {
            return;
        }

        const formData = {
            discordName: document.getElementById("discord-name").value,
            displayName: document.getElementById("display-name").value,
            discordId: document.getElementById("discord-id").value,
            age: document.getElementById("age").value,
            role: document.getElementById("role").value,
            joinDate: document.getElementById("join-date").value,
            experience: document.getElementById("experience").value,
            reason: document.getElementById("reason").value,
            availability: document.getElementById("availability").value,
            skills: document.getElementById("skills").value,
            timezone: document.getElementById("timezone").value,
            termsAgreed: document.getElementById("terms").checked
        };

        try {
            const submitButton = event.target.querySelector("button[type='submit']");
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitButton.disabled = true;

            await new Promise(resolve => setTimeout(resolve, 2000));

            const successModal = document.getElementById("success-modal");
            successModal.style.display = "block";
            gsap.fromTo(successModal.querySelector(".modal-content"), 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            event.target.reset();
            updateProgressBar();

            submitButton.innerHTML = "Submit Application";
            submitButton.disabled = false;
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while submitting your application. Please try again.");
        }
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll("input, select, textarea");

        inputs.forEach(input => {
            if (input.type === "checkbox") {
                if (!input.checked) {
                    isValid = false;
                    showErrorMessage(input, "You must agree to the terms and conditions");
                } else {
                    removeErrorMessage(input);
                }
            } else if (!input.value.trim()) {
                isValid = false;
                input.classList.add("error");
                showErrorMessage(input, "This field is required");
            } else {
                input.classList.remove("error");
                removeErrorMessage(input);
            }
        });

        const age = parseInt(document.getElementById("age").value);
        if (age < 18) {
            isValid = false;
            const ageInput = document.getElementById("age");
            ageInput.classList.add("error");
            showErrorMessage(ageInput, "You must be at least 18 years old");
        }

        if (!isValid) {
            alert("Please fill in all required fields correctly before submitting.");
        }

        return isValid;
    }

    function showErrorMessage(input, message) {
        let errorMessage = input.parentNode.querySelector(".error-message");
        if (!errorMessage) {
            errorMessage = document.createElement("p");
            errorMessage.className = "error-message";
            input.parentNode.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        gsap.fromTo(errorMessage, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.3 });
    }

    function removeErrorMessage(input) {
        const errorMessage = input.parentNode.querySelector(".error-message");
        if (errorMessage) {
            gsap.to(errorMessage, { opacity: 0, y: -10, duration: 0.3, onComplete: () => errorMessage.remove() });
        }
    }

    const container = createApplicationForm();
    app.appendChild(container);
    app.appendChild(createSuccessModal());
    setupEventListeners();

    gsap.fromTo(container, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
});