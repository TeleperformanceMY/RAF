document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        pageLangSelect: document.getElementById('page-lang-select'),
        bmsId: document.getElementById('bms-id'),
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        jobSelect: document.getElementById('job-select'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCode: document.getElementById('qr-code'),
        socialLinks: {
            facebook: document.querySelector('.social-icon.facebook'),
            instagram: document.querySelector('.social-icon.instagram')
        }
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';

    // Translations
    const translations = {
        english: {
            pageLangLabel: "Choose Your Language:",
            bmsIdLabel: "Please enter your BMS ID:",
            bmsIdPlaceholder: "Enter your BMS ID",
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
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "Location Social Media:"
        },
        japanese: {
            pageLangLabel: "言語を選択してください:",
            bmsIdLabel: "BMS IDを入力してください:",
            bmsIdPlaceholder: "BMS IDを入力",
            jobSelectionTitle: "紹介者の希望を選択してください",
            jobLangLabel: "求人言語:",
            locationLabel: "勤務地:",
            jobLabel: "職種:",
            nextBtn: "次へ",
            thankYouTitle: "ご紹介ありがとうございます!",
            referralMessage: "友達が応募するためのリンクです:",
            scanText: "QRコードをスキャンして応募",
            followUs: "フォローしてください:",
            backText: "戻る",
            copyText: "コピー",
            whatsappText: "WhatsApp",
            lineText: "Line",
            locationSocial: "現地のソーシャルメディア:"
        },
        // Add other languages as needed
    };

    // Location-specific social media links
    const locationSocialLinks = {
        malaysia: {
            facebook: "https://www.facebook.com/teleperformance.malaysia",
            instagram: "https://www.instagram.com/teleperformance_malaysia"
        },
        thailand: {
            facebook: "https://www.facebook.com/TeleperformanceTH",
            instagram: "https://www.instagram.com/teleperformance_thailand"
        },
        default: {
            facebook: "https://www.facebook.com/Teleperformance",
            instagram: "https://www.instagram.com/teleperformance"
        }
    };

    // Initialize the application
    function init() {
        loadData();
        setupEventListeners();
        updatePageContent('english');
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
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) el.textContent = translation[key];
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        // Update social media links based on location
        updateSocialLinks();
    }

    // Update social media links based on location
    function updateSocialLinks() {
        const links = locationSocialLinks[currentLocation] || locationSocialLinks.default;
        elements.socialLinks.facebook.href = links.facebook;
        elements.socialLinks.instagram.href = links.instagram;
    }

    // Generate and display referral link
    function generateReferralLink() {
        const bmsId = elements.bmsId.value.trim();
        if (!bmsId) {
            alert(translations[elements.pageLangSelect.value]?.bmsIdLabel || 'Please enter your BMS ID');
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
            updateSocialLinks();
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
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = '<i class="fas fa-check"></i> ' + 
            (translations[elements.pageLangSelect.value]?.copiedText || 'Copied!');
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Share via WhatsApp
    function shareWhatsApp() {
        const message = translations[elements.pageLangSelect.value]?.shareMessage || 
            'Check out this job opportunity at Teleperformance: ';
        const url = `https://wa.me/?text=${encodeURIComponent(message + elements.referralLink.value)}`;
        window.open(url, '_blank');
    }

    // Share via Line
    function shareLine() {
        const message = translations[elements.pageLangSelect.value]?.shareMessage || 
            'Check out this job opportunity at Teleperformance: ';
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message + elements.referralLink.value)}`;
        window.open(url, '_blank');
    }

    // Setup event listeners
    function setupEventListeners() {
        // Page language change
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });
        
        // Job language change
        elements.jobLangSelect.addEventListener('change', updateJobsDropdown);
        
        // Location change
        elements.locationSelect.addEventListener('change', updateJobsDropdown);
        
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
