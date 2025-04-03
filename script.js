// Enhanced JavaScript for Original JSON Structure
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        empLangSelect: document.getElementById('emp-lang-select'),
        languageSelect: document.getElementById('language-select'),
        locationSelect: document.getElementById('location-select'),
        jobSelect: document.getElementById('job-type-select'),
        bmsId: document.getElementById('bms-id'),
        generatedLink: document.getElementById('generated-link'),
        qrImg: document.getElementById('qrImg'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        jobTitleDisplay: document.getElementById('job-title-display'),
        jobLinkDisplay: document.getElementById('job-link-display')
    };

    // Application Data
    let jsonData = [];
    
    // Initialize the application
    function init() {
        loadData();
        setupEventListeners();
    }

    // Load JSON data
    function loadData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                jsonData = data;
                populateDropdown(elements.empLangSelect, getUniqueValues('Language'));
                populateDropdown(elements.languageSelect, getUniqueValues('Language'));
                populateDropdown(elements.locationSelect, getUniqueValues('Location'));
            })
            .catch(error => {
                console.error('Error loading data:', error);
                alert('Failed to load job data. Please try again later.');
            });
    }

    // Get unique values from a specific field
    function getUniqueValues(field) {
        return [...new Set(jsonData.map(item => item[field]))];
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = '';
        const defaultOption = new Option('-- Select --', '');
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.appendChild(defaultOption);
        
        options.forEach(option => {
            dropdown.appendChild(new Option(option, option));
        });
    }

    // Update jobs dropdown based on selections
    function updateJobsDropdown() {
        const language = elements.languageSelect.value;
        const location = elements.locationSelect.value;
        
        if (language && location) {
            const jobs = jsonData
                .filter(item => item.Language === language && item.Location === location)
                .map(item => item.Positions);
            populateDropdown(elements.jobSelect, [...new Set(jobs)]);
        } else {
            elements.jobSelect.innerHTML = '';
        }
    }

    // Update job preview information
    function updateJobPreview() {
        const job = elements.jobSelect.value;
        if (!job) return;
        
        const language = elements.languageSelect.value;
        const location = elements.locationSelect.value;
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            elements.jobTitleDisplay.textContent = jobData['Evergreen title'];
            elements.jobLinkDisplay.href = jobData['Evergreen link'];
            elements.jobLinkDisplay.textContent = 'View Job Details';
        }
    }

    // Generate and display referral link
    function generateReferralLink() {
        const bmsId = elements.bmsId.value.trim();
        if (!bmsId) {
            alert('Please enter your BMS ID');
            return false;
        }
        
        const job = elements.jobSelect.value;
        if (!job) {
            alert('Please select a job position');
            return false;
        }
        
        const language = elements.languageSelect.value;
        const location = elements.locationSelect.value;
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            const referralLink = `${jobData['Evergreen link']}${bmsId}`;
            elements.generatedLink.innerHTML = `
                <p>Share this link with your friend:</p>
                <div class="link-container">
                    <input type="text" value="${referralLink}" readonly>
                    <button onclick="copyToClipboard(this)">Copy</button>
                </div>
            `;
            generateQrCode(referralLink);
            return true;
        }
        return false;
    }

    // Copy link to clipboard
    window.copyToClipboard = function(button) {
        const input = button.previousElementSibling;
        input.select();
        document.execCommand('copy');
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
    };

    // Generate QR code
    function generateQrCode(url) {
        elements.qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
    }

    // Go to next step
    function nextStep() {
        if (generateReferralLink()) {
            elements.step1.style.display = 'none';
            elements.step2.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        elements.languageSelect.addEventListener('change', function() {
            updateJobsDropdown();
            updateJobPreview();
        });
        
        elements.locationSelect.addEventListener('change', function() {
            updateJobsDropdown();
            updateJobPreview();
        });
        
        elements.jobSelect.addEventListener('change', updateJobPreview);
        
        // Employee language change (for translations)
        elements.empLangSelect.addEventListener('change', function() {
            // Your translation logic here
        });
    }

    // Initialize the app
    init();
});
