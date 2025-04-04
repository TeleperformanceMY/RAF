document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        // Language Selection
        pageLangSelect: document.getElementById('page-lang-select'),
        pageLangLabel: document.getElementById('page-lang-label'),
        
        // Form Elements
        bmsId: document.getElementById('bms-id'),
        bmsIdLabel: document.getElementById('bms-id-label'),
        jobLangSelect: document.getElementById('job-lang-select'),
        jobLangLabel: document.getElementById('job-lang-label'),
        locationSelect: document.getElementById('location-select'),
        locationLabel: document.getElementById('location-label'),
        jobSelect: document.getElementById('job-select'),
        jobLabel: document.getElementById('job-label'),
        
        // Steps
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        
        // Referral Link
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        copyText: document.getElementById('copy-text'),
        
        // QR Code
        qrCode: document.getElementById('qr-code'),
        
        // Social Media
        malaysiaSocial: document.getElementById('malaysia-social'),
        thailandSocial: document.getElementById('thailand-social'),
        
        // Text Elements
        jobSelectionTitle: document.getElementById('job-selection-title'),
        thankYouTitle: document.getElementById('thank-you-title'),
        referralMessage: document.getElementById('referral-message'),
        scanText: document.getElementById('scan-text'),
        followUs: document.getElementById('follow-us'),
        backText: document.getElementById('back-text')
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';

    // Translations
    const translations = {
        english: {
            pageLangLabel: "Choose Your Language:",
            bmsIdLabel: "Please enter your BMS ID:",
            jobSelectionTitle: "Please select your referral's preferences",
            jobLangLabel: "Job Language:",
            locationLabel: "Working Location:",
            jobLabel: "Job Position:",
            nextBtn: "Next",
            thankYouTitle: "Thank you for your referral!",
            referralMessage: "Here's the personalized link for your friend to apply:",
            scanText: "Or scan this QR code to apply",
            followUs: "Follow Us On:",
            backText: "Back",
            copyText: "Copy",
            malaysiaSocial: "Malaysia Social Media:",
            thailandSocial: "Thailand Social Media:"
        },
        japanese: {
            pageLangLabel: "言語を選択してください:",
            bmsIdLabel: "BMS IDを入力してください:",
            jobSelectionTitle: "紹介者の希望を選択してください",
            jobLangLabel: "求人言語:",
            locationLabel: "勤務地:",
            jobLabel: "職種:",
            nextBtn: "次へ",
            thankYouTitle: "ご紹介ありがとうございます!",
            referralMessage: "友達が応募するためのパーソナライズされたリンクです:",
            scanText: "またはこのQRコードをスキャンして応募",
            followUs: "フォローしてください:",
            backText: "戻る",
            copyText: "コピー",
            malaysiaSocial: "マレーシアのソーシャルメディア:",
            thailandSocial: "タイのソーシャルメディア:"
        },
        // Add other languages as needed
    };

    // Initialize the application
    function init() {
        loadData();
        setupEventListeners();
        updatePageContent('english'); // Default language
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

    // Update page content based on selected language
    function updatePageContent(language) {
        const translation = translations[language] || translations.english;
        
        // Update form labels
        elements.pageLangLabel.textContent = translation.pageLangLabel;
        elements.bmsIdLabel.textContent = translation.bmsIdLabel;
        elements.jobSelectionTitle.textContent = translation.jobSelectionTitle;
        elements.jobLangLabel.textContent = translation.jobLangLabel;
        elements.locationLabel.textContent = translation.locationLabel;
        elements.jobLabel.textContent = translation.jobLabel;
        elements.nextBtn.textContent = translation.nextBtn;
        
        // Update step 2 content
        elements.thankYouTitle.textContent = translation.thankYouTitle;
        elements.referralMessage.textContent = translation.referralMessage;
        elements.scanText.textContent = translation.scanText;
        elements.followUs.textContent = translation.followUs;
        elements.backText.textContent = translation.backText;
        elements.copyText.textContent = translation.copyText;
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
        currentLocation = location.toLowerCase();
        
        const jobData = jsonData.find(
            item => item.Language === language && 
                   item.Location === location && 
                   item.Positions === job
        );
        
        if (jobData) {
            const referralLink = `${jobData['Evergreen link']}${bmsId}`;
            elements.referralLink.value = referralLink;
            generateQrCode(referralLink);
            
            // Show location-specific social media
            elements.malaysiaSocial.style.display = 'none';
            elements.thailandSocial.style.display = 'none';
            
            if (currentLocation.includes('malaysia')) {
                elements.malaysiaSocial.style.display = 'block';
            } else if (currentLocation.includes('thailand')) {
                elements.thailandSocial.style.display = 'block';
            }
            
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
        elements.copyText.textContent = 'Copied!';
        setTimeout(() => {
            elements.copyText.textContent = translations[elements.pageLangSelect.value]?.copyText || 'Copy';
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
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });
        
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
