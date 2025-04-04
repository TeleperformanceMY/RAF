document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        // Form Elements
        pageLangSelect: document.getElementById('page-lang-select'),
        bmsId: document.getElementById('bms-id'),
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        jobSelect: document.getElementById('job-select'),
        
        // Steps
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        
        // Referral Link
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        
        // QR Code
        qrCode: document.getElementById('qr-code')
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
                populateDropdown(elements.jobLangSelect, getUniqueValues('Language'));
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
        const language = elements.jobLangSelect.value;
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
        
        const language = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            const referralLink = `${jobData['Evergreen link']}${bmsId}`;
            elements.referralLink.value = referralLink;
            generateQrCode(referralLink);
            return true;
        }
        return false;
    }

    // Generate QR code
    function generateQrCode(url) {
        elements.qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&format=png&color=000&bgcolor=FFF&data=${encodeURIComponent(url)}`;
    }

    // Copy link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            elements.copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    }

    // Share via WhatsApp
    function shareWhatsApp() {
        const message = `Check out this job opportunity at Teleperformance: ${elements.referralLink.value}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Share via Line
    function shareLine() {
        const message = `Check out this job opportunity at Teleperformance: ${elements.referralLink.value}`;
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Job language change
        elements.jobLangSelect.addEventListener('change', function() {
            updateJobsDropdown();
        });
        
        // Location change
        elements.locationSelect.addEventListener('change', function() {
            updateJobsDropdown();
        });
        
        // Next button
        elements.nextBtn.addEventListener('click', function() {
            if (generateReferralLink()) {
                elements.step1.style.display = 'none';
                elements.step2.style.display = 'block';
                window.scrollTo(0, 0);
            }
        });
        
        // Back button
        elements.backBtn.addEventListener('click', function() {
            elements.step2.style.display = 'none';
            elements.step1.style.display = 'block';
        });
        
        // Copy button
        elements.copyBtn.addEventListener('click', copyToClipboard);
        
        // Share buttons
        document.getElementById('share-whatsapp').addEventListener('click', shareWhatsApp);
        document.getElementById('share-line').addEventListener('click', shareLine);
    }

    // Initialize the app
    init();
});
