/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


/* =========================
   TYPING EFFECT
========================= */
const typingElement = document.getElementById("typing");

if (typingElement) {

    const texts = [
        "SOC Analyst | Detection Engineering",
        "Active Directory Security Monitoring",
        "Splunk SIEM | Threat Detection",
        "Blue Team & Defensive Security"
    ];

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function typeEffect() {

        if (count === texts.length) {
            count = 0;
        }

        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typingElement.textContent = letter;

        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
            }, 1500);
        }

        setTimeout(typeEffect, 90);
    })();
}


/* =========================
   GITHUB REPOSITORY FETCH
========================= */
const repoContainer = document.getElementById("repo-container");

if (repoContainer) {

    fetch("https://api.github.com/users/777wolf/repos")
        .then(response => response.json())
        .then(data => {

            if (!Array.isArray(data)) return;

            repoContainer.innerHTML = "";

            data
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6)
                .forEach(repo => {

                    const card = document.createElement("div");
                    card.classList.add("repo-card");

                    card.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description available."}</p>
                        <a href="${repo.html_url}" target="_blank">View Repository →</a>
                    `;

                    repoContainer.appendChild(card);
                });

        })
        .catch(error => console.error("GitHub API Error:", error));
}


/* =========================
   PROJECT DATA
========================= */
const projects = {

    adlab: {
        title: "AI-Enhanced Active Directory SOC Lab | Splunk | Detection Engineering",

        environment: [
            "Kali Linux (Attacker)",
            "Ubuntu Server (Splunk Enterprise – CLI Based)",
            "Windows Server 2019 (Domain Controller – DC01)",
            "Windows 10 (Domain-Joined Client)",
            "VirtualBox Internal Network"
        ],

        attacks: [
            "Brute Force Attack",
            "Password Spraying",
            "Lateral Movement (SMB Logon Type 3)",
            "Privilege Escalation Monitoring",
            "Login Volume Spike (Anomaly Simulation)"
        ],

        detection: [
            "Event ID 4624 & 4625 Authentication Monitoring",
            "Event ID 4672 Privilege Assignment Tracking",
            "Group Membership Change Monitoring",
            "Brute Force Correlation Rule (SPL)",
            "Password Spray Detection Logic",
            "AI-Based 2-Sigma Login Anomaly Model",
            "Risk Scoring for Suspicious IP Prioritization"
        ],

        tools: [
            "Active Directory",
            "Windows Event Logs",
            "Splunk Enterprise",
            "Splunk Universal Forwarder",
            "SPL (Search Processing Language)",
            "MITRE ATT&CK Mapping",
            "VirtualBox"
        ]
    },

    soclab: {
        title: "Real-Time SOC Monitoring Lab | Splunk SIEM | Threat Detection",

        environment: [
            "Kali Linux (Attacker)",
            "Windows 10 (Victim)",
            "Ubuntu Server (Splunk Enterprise)",
            "Splunk Universal Forwarder"
        ],

        attacks: [
            "Brute Force Attack (Hydra – RDP)",
            "Network Reconnaissance (Nmap)",
            "Suspicious Process Execution Monitoring"
        ],

        detection: [
            "Event ID 4625 – Failed Login Monitoring",
            "Event ID 4624 – Successful Login Detection",
            "Event ID 4688 – Process Creation Monitoring",
            "Attacker IP Identification via SPL",
            "Real-Time Alert Rule Configuration"
        ],

        tools: [
            "Splunk Enterprise",
            "Splunk Universal Forwarder",
            "Kali Linux",
            "Hydra",
            "Nmap",
            "VirtualBox"
        ]
    }

};


/* =========================
   MODAL FUNCTIONALITY
========================= */

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");

function openProject(projectKey) {

    const project = projects[projectKey];
    if (!project) return;

    modalContent.innerHTML = `
        <h2>${project.title}</h2>

        <h3>Environment</h3>
        <ul>${project.environment.map(item => `<li>${item}</li>`).join("")}</ul>

        <h3>Attack Simulations</h3>
        <ul>${project.attacks.map(item => `<li>${item}</li>`).join("")}</ul>

        <h3>Detection Engineering</h3>
        <ul>${project.detection.map(item => `<li>${item}</li>`).join("")}</ul>

        <h3>Tools & Technologies</h3>
        <ul>${project.tools.map(item => `<li>${item}</li>`).join("")}</ul>
    `;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProject() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}


/* =========================
   CLOSE MODAL BEHAVIORS
========================= */

// Close when clicking outside
modal.addEventListener("click", function (e) {
    if (e.target === this) {
        closeProject();
    }
});

// Close with ESC key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        closeProject();
    }
});