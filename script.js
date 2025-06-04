document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        pageLangSelect: document.getElementById('page-lang-select'),
        bmsId: document.getElementById('bms-id'),
        bmsIdContainer: document.getElementById('bms-id').parentElement,
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        jobSelect: document.getElementById('job-select'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCodeCanvas: document.getElementById('qr-code-canvas'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareFacebook: document.getElementById('share-facebook'),
        referrerBmsId: document.getElementById('referrerBmsId'),
        referralNote: document.getElementById('referralNote'),
        bmsIdContainer: document.getElementById('bms-id').parentElement,
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';
    let lastJobLangSelection = '';
    let lastLocationSelection = '';
    let currentReferralLink = '';

    // Complete Translations for all languages
    const translations = {
        // ... (keep your existing translations object exactly as is)
    };
// Handle BMS ID from URL
function handleUrlBmsId() {
    // Get the current path
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const potentialBmsId = pathParts[pathParts.length - 1];
    
    // Check if it's a valid BMS ID (6-7 digits)
    if (/^\d{6,7}$/.test(potentialBmsId)) {
        // Hide the BMS ID input field and label
        elements.bmsIdContainer.style.display = 'none';
        
        // Set the BMS ID in the hidden field
        elements.referrerBmsId.value = potentialBmsId;
        
        // Display referral note
        elements.referralNote.textContent = `Referred by ${potentialBmsId}`;
        elements.referralNote.style.display = 'block';
    }
}
    // Initialize the application
    function init() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
        handleUrlBmsId();  // Add this line
        loadData();
        setupEventListeners();
        updatePageContent('english');
    }

    // Handle BMS ID from URL
    function handleUrlBmsId() {
        // Get the current path
        const path = window.location.pathname;
        const pathParts = path.split('/');
        const potentialBmsId = pathParts[pathParts.length - 1];
        
        // Check if it's a valid BMS ID (6-7 digits)
        if (/^\d{6,7}$/.test(potentialBmsId)) {
            // Hide the BMS ID input field and label
            elements.bmsIdContainer.style.display = 'none';
            
            // Set the BMS ID in the hidden field
            elements.referrerBmsId.value = potentialBmsId;
            
            // Display referral note
            elements.referralNote.textContent = `Referred by ${potentialBmsId}`;
            elements.referralNote.style.display = 'block';
        }
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
                initializeDropdowns();
            })
            .catch(error => {
                console.error('Error loading data:', error);
                showAlert('Failed to load job data. Please try again later.');
            });
    }

    // Initialize dropdowns with all options
    function initializeDropdowns() {
        populateDropdown(elements.jobLangSelect, getUniqueValues('Language'));
        populateDropdown(elements.locationSelect, getUniqueValues('Location'));
        populateDropdown(elements.jobSelect, []);
    }

    // Get unique values from a specific field
    function getUniqueValues(field) {
        return [...new Set(jsonData.map(item => item[field]))].filter(Boolean);
    }

    // Get locations for specific language
    function getLocationsForLanguage(language) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Language.toLowerCase() === language.toLowerCase())
                .map(item => item.Location)
        )].filter(Boolean);
    }

    // Get languages for specific location
    function getLanguagesForLocation(location) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Location === location)
                .map(item => item.Language)
        )].filter(Boolean);
    }

    // Get jobs for specific location and language
    function getJobsForLocationAndLanguage(location, language) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Location === location && item.Language === language)
                .map(item => item.Positions)
        )].filter(Boolean);
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options, preserveSelection = false) {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '';
        
        const defaultOption = new Option('-- ' + (translations[elements.pageLangSelect.value]?.selectText || 'Select') + ' --', '');
        defaultOption.disabled = true;
        defaultOption.selected = !currentValue;
        dropdown.appendChild(defaultOption);
        
        options.forEach(option => {
            const newOption = new Option(option, option);
            if (preserveSelection && option === currentValue) {
                newOption.selected = true;
            }
            dropdown.appendChild(newOption);
        });
    }

    // Update page content based on selected language
    function updatePageContent(language) {
        const translation = translations[language] || translations.english;
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) {
                if (el.tagName === 'INPUT' && el.type === 'button') {
                    el.value = translation[key];
                } else {
                    el.textContent = translation[key];
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
    }

    // Update jobs dropdown based on current selections
    function updateJobsDropdown() {
        const language = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        
        if (language && location) {
            const jobs = getJobsForLocationAndLanguage(location, language);
            populateDropdown(elements.jobSelect, jobs, true);
        } else {
            populateDropdown(elements.jobSelect, []);
        }
    }

    // When job language changes
    function handleJobLangChange() {
        const language = elements.jobLangSelect.value;
        lastJobLangSelection = language;
        
        if (language) {
            const locations = getLocationsForLanguage(language);
            populateDropdown(elements.locationSelect, locations, true);
            
            // Restore location selection if it's valid for this language
            if (lastLocationSelection && locations.includes(lastLocationSelection)) {
                elements.locationSelect.value = lastLocationSelection;
            }
        }
        
        updateJobsDropdown();
        validateForm();
    }

    // When location changes
    function handleLocationChange() {
        const location = elements.locationSelect.value;
        lastLocationSelection = location;
        
        if (location) {
            const languages = getLanguagesForLocation(location);
            populateDropdown(elements.jobLangSelect, languages, true);
            
            // Restore language selection if it's valid for this location
            if (lastJobLangSelection && languages.includes(lastJobLangSelection)) {
                elements.jobLangSelect.value = lastJobLangSelection;
            }
        }
        
        updateJobsDropdown();
        validateForm();
    }

    // Validate BMS ID (6 or 7 digits only)
    function validateBMSId(bmsId) {
        return /^\d{6,7}$/.test(bmsId);
    }

    // Validate form
    function validateForm() {
          let isValid = true;
    
    // Only validate BMS ID if the input is visible (not from URL)
    if (elements.bmsIdContainer.style.display !== 'none') {
        if (!validateBMSId(elements.bmsId.value.trim())) {
            elements.bmsId.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.bmsId.classList.remove('is-invalid');
        }
    }        
        // Job language validation
        if (!elements.jobLangSelect.value) {
            elements.jobLangSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobLangSelect.classList.remove('is-invalid');
        }
        
        // Location validation
        if (!elements.locationSelect.value) {
            elements.locationSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.locationSelect.classList.remove('is-invalid');
        }
        
        // Job validation
        if (!elements.jobSelect.value) {
            elements.jobSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobSelect.classList.remove('is-invalid');
        }
        
        elements.nextBtn.disabled = !isValid;
        return isValid;
    }

    // Generate and display referral link
    function generateReferralLink() {
       if (!validateForm()) return false;
    
    // Get BMS ID - either from input or URL
    const bmsId = elements.bmsIdContainer.style.display === 'none' 
        ? elements.referrerBmsId.value 
        : elements.bmsId.value.trim();
            
        const job = elements.jobSelect.value;
        const language = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        currentLocation = location.toLowerCase();
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            const referralLink = `${jobData['Evergreen link']}${bmsId}`;
            elements.referralLink.value = referralLink;
            generateQRCode(referralLink);
            return true;
        }
        
        showAlert(translations[elements.pageLangSelect.value]?.jobDataError || 'Error generating referral link');
        return false;
    }

    // Generate QR code using canvas
    function generateQRCode(url) {
        currentReferralLink = url;
        
        // Clear any existing QR code
        const ctx = elements.qrCodeCanvas.getContext('2d');
        ctx.clearRect(0, 0, elements.qrCodeCanvas.width, elements.qrCodeCanvas.height);
        
        // Generate new QR code
        QRCode.toCanvas(elements.qrCodeCanvas, url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error) {
            if (error) {
                console.error('QR Code generation error:', error);
                showAlert('Failed to generate QR code. Please try again.');
            }
        });
    }

    // Copy link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        // Show feedback
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[elements.pageLangSelect.value]?.copiedText || 'Copied!'}`;
        
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Share functions
    function shareWhatsApp() {
        const message = `${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${currentReferralLink}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function shareLine() {
        const message = `${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${currentReferralLink}`;
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function shareFacebook() {
        alert(translations[elements.pageLangSelect.value]?.facebookAlert || 'For Facebook, please copy the link and share it manually on your Facebook.');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentReferralLink)}`, '_blank');
    }

    // Show alert message
    function showAlert(message) {
        alert(message);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });
        
        // Only add BMS ID validation if the field is visible
    if (elements.bmsIdContainer.style.display !== 'none') {
        elements.bmsId.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/\D/g, '');
            validateForm();
            });
        }
        
        // Job language change
        elements.jobLangSelect.addEventListener('change', handleJobLangChange);
        
        // Location change
        elements.locationSelect.addEventListener('change', handleLocationChange);
        
        // Job change
        elements.jobSelect.addEventListener('change', validateForm);
        
        // Next button
        elements.nextBtn.addEventListener('click', function() {
            if (generateReferralLink()) {
                elements.step1.style.display = 'none';
                elements.step2.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
        elements.shareWhatsapp.addEventListener('click', shareWhatsApp);
        elements.shareLine.addEventListener('click', shareLine);
        elements.shareFacebook.addEventListener('click', shareFacebook);
    }

    // Initialize the app
    init();
});
