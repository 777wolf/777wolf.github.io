// Smooth Scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Typing Effect
const texts = [
    "Cybersecurity Analyst",
    "SOC Enthusiast",
    "Active Directory Lab Builder",
    "Detection Engineering Learner"
];

let count = 0;
let index = 0;

function typeEffect() {
    if (count >= texts.length) count = 0;

    const currentText = texts[count];
    document.getElementById("typing").textContent =
        currentText.slice(0, ++index);

    if (index === currentText.length) {
        setTimeout(() => {
            index = 0;
            count++;
        }, 1500);
    }

    setTimeout(typeEffect, 100);
}

typeEffect();


// GitHub Fetch
fetch("https://api.github.com/users/YOUR_GITHUB_USERNAME/repos")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("repo-container");
        if (!data || !Array.isArray(data)) return;

        data.slice(0, 6).forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("repo-card");
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;
            container.appendChild(card);
        });
    })
    .catch(err => console.error("GitHub API error:", err));

// ===== PROJECT DATA =====
const projects = {
    adlab: {
        title: "AI-Enhanced Active Directory SOC Lab | Splunk | Detection Engineering",

        environment: [
            "Kali Linux (Attacker)",
            "Ubuntu Server (Splunk Enterprise – CLI Based)",
            "Windows Server 2019 (Domain Controller – DC01)",
            "Windows 10 (Domain-Joined Client)",
            "VirtualBox Internal Network (Isolated SOC Lab)"
        ],

        attacks: [
            "Brute Force Attack",
            "Password Spraying Attack",
            "Lateral Movement (SMB Logon – Logon Type 3)",
            "Privilege Escalation (Admin Logon Monitoring)",
            "Login Volume Spike (AI Behavioral Anomaly Simulation)"
        ],

        detection: [
            "Event ID 4624 – Successful Logon Monitoring",
            "Event ID 4625 – Failed Logon Detection",
            "Event ID 4672 – Special Privilege Assignment",
            "Event ID 4728 / 4732 / 4756 – Group Membership Changes",
            "Logon Type 3 & 10 Monitoring",
            "Brute Force Correlation Rule (SPL)",
            "Password Spray Detection Rule",
            "Lateral Movement Monitoring Query",
            "Privilege Escalation Alert Logic",
            "AI-Based Login Anomaly Detection (2-Sigma Statistical Model)",
            "Risk Scoring Model for Suspicious IP Prioritization"
        ],

        tools: [
            "Active Directory (AD DS)",
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
            "Attacker IP Identification using SPL",
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


// ===== MODAL FUNCTION =====
function openProject(projectKey) {

    const project = projects[projectKey];
    const modal = document.getElementById("projectModal");
    const content = document.getElementById("modalContent");

    content.innerHTML = `
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

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeProject() {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("show");

    // Enable background scroll
    document.body.style.overflow = "auto";
}