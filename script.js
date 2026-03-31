/* =========================
   MATRIX CANVAS BACKGROUND
========================= */
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";
const fontSize = 13;
let columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(6, 10, 15, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 45);


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
    let isDeleting = false;

    function typeEffect() {
        const current = texts[count % texts.length];

        if (!isDeleting) {
            index++;
            typingElement.textContent = current.slice(0, index);
            if (index === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            index--;
            typingElement.textContent = current.slice(0, index);
            if (index === 0) {
                isDeleting = false;
                count++;
            }
        }

        setTimeout(typeEffect, isDeleting ? 40 : 80);
    }

    typeEffect();
}


/* =========================
   PROJECT DATA
========================= */
const projects = {
    adlab: {
        title: "Active Directory Security Monitoring Lab",
        subtitle: "Splunk Enterprise | Detection Engineering | MITRE ATT&CK",
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
        title: "Real-Time Cyber Attack Detection using Splunk SIEM",
        subtitle: "Splunk SIEM | Threat Detection | SOC Lab",
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
   MODAL
========================= */
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");

function openProject(projectKey) {
    const project = projects[projectKey];
    if (!project) return;

    modalContent.innerHTML = `
        <button class="modal-close-btn" onclick="closeProject()">✕</button>
        <h2>${project.title}</h2>
        <p style="font-family: var(--font-mono); font-size: 12px; color: var(--cyan); letter-spacing: 1px; margin-bottom: 10px;">${project.subtitle}</p>

        <h3>// Environment</h3>
        <ul>${project.environment.map(i => `<li>${i}</li>`).join("")}</ul>

        <h3>// Attack Simulations</h3>
        <ul>${project.attacks.map(i => `<li>${i}</li>`).join("")}</ul>

        <h3>// Detection Engineering</h3>
        <ul>${project.detection.map(i => `<li>${i}</li>`).join("")}</ul>

        <h3>// Tools & Technologies</h3>
        <ul>${project.tools.map(i => `<li>${i}</li>`).join("")}</ul>
    `;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProject() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeProject();
});


/* =========================
   SCROLL REVEAL
========================= */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .cert-card, .about-grid, .thm-profile-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
});
