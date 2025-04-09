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
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareFacebook: document.getElementById('share-facebook'),
        socialLinks: {
            facebook: document.querySelector('.social-icon.facebook'),
            instagram: document.querySelector('.social-icon.instagram')
        }
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';

    // Complete Translations for all languages
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
            facebookText: "Facebook",
            locationSocial: "Location Social Media:",
            shareMessage: "Check out this job opportunity at Teleperformance: "
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
            facebookText: "Facebook",
            locationSocial: "現地のソーシャルメディア:",
            shareMessage: "Teleperformanceのこの求人情報をチェックしてください: "
        },
        korean: {
            pageLangLabel: "언어 선택:",
            bmsIdLabel: "BMS ID를 입력하세요:",
            bmsIdPlaceholder: "BMS ID 입력",
            jobSelectionTitle: "추천인의 선호도를 선택하세요",
            jobLangLabel: "직무 언어:",
            locationLabel: "근무 위치:",
            jobLabel: "직위:",
            nextBtn: "다음",
            thankYouTitle: "추천해 주셔서 감사합니다!",
            referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
            scanText: "또는 이 QR 코드를 스캔하여 지원하세요",
            followUs: "팔로우 하세요:",
            backText: "뒤로",
            copyText: "복사",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "현지 소셜 미디어:",
            shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: "
        },
        malay: {
            pageLangLabel: "Pilih Bahasa Anda:",
            bmsIdLabel: "Sila masukkan ID BMS anda:",
            bmsIdPlaceholder: "Masukkan ID BMS",
            jobSelectionTitle: "Sila pilih keutamaan rujukan anda",
            jobLangLabel: "Bahasa Pekerjaan:",
            locationLabel: "Lokasi Kerja:",
            jobLabel: "Jawatan:",
            nextBtn: "Seterusnya",
            thankYouTitle: "Terima kasih atas rujukan anda!",
            referralMessage: "Berikut adalah pautan peribadi untuk rakan anda memohon:",
            scanText: "Atau imbas kod QR ini untuk memohon",
            followUs: "Ikuti Kami Di:",
            backText: "Kembali",
            copyText: "Salin",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "Media Sosial Lokasi:",
            shareMessage: "Lihat peluang pekerjaan ini di Teleperformance: "
        },
        mandarin: {
            pageLangLabel: "选择您的语言:",
            bmsIdLabel: "请输入您的BMS ID:",
            bmsIdPlaceholder: "输入BMS ID",
            jobSelectionTitle: "请选择您推荐的偏好",
            jobLangLabel: "工作语言:",
            locationLabel: "工作地点:",
            jobLabel: "职位:",
            nextBtn: "下一步",
            thankYouTitle: "感谢您的推荐!",
            referralMessage: "这是您朋友申请的个性化链接:",
            scanText: "或扫描此二维码申请",
            followUs: "关注我们:",
            backText: "返回",
            copyText: "复制",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "当地社交媒体:",
            shareMessage: "查看Teleperformance的这个工作机会: "
        },
        thai: {
            pageLangLabel: "เลือกภาษาของคุณ:",
            bmsIdLabel: "กรุณาใส่ BMS ID ของคุณ:",
            bmsIdPlaceholder: "ใส่ BMS ID",
            jobSelectionTitle: "กรุณาเลือกความต้องการของผู้ที่คุณจะแนะนำ",
            jobLangLabel: "ภาษาของงาน:",
            locationLabel: "สถานที่ทำงาน:",
            jobLabel: "ตำแหน่งงาน:",
            nextBtn: "ถัดไป",
            thankYouTitle: "ขอบคุณสำหรับการแนะนำ!",
            referralMessage: "นี่คือลิงก์ส่วนตัวสำหรับเพื่อนของคุณสมัครงาน:",
            scanText: "หรือสแกน QR code นี้เพื่อสมัคร",
            followUs: "ติดตามเราได้ที่:",
            backText: "กลับ",
            copyText: "คัดลอก",
            whatsappText: "WhatsApp",
            lineText: "Line",
            facebookText: "Facebook",
            locationSocial: "สื่อสังคมท้องถิ่น:",
            shareMessage: "ดูโอกาสงานนี้ที่ Teleperformance: "
        }
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
                updateLocationsDropdown('english');
            })
            .catch(error => {
                console.error('Error loading data:', error);
                showAlert('Failed to load job data. Please try again later.');
            });
    }

    // Get locations for specific language
    function getLocationsForLanguage(language) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Language.toLowerCase() === language.toLowerCase())
                .map(item => item.Location)
        ].filter(Boolean);
    }

    // Get languages for specific location
    function getLanguagesForLocation(location) {
        if (!jsonData.length) return [];
        return [...new Set(
            jsonData
                .filter(item => item.Location === location)
                .map(item => item.Language)
        ].filter(Boolean);
    }

    // Update locations dropdown based on page language
    function updateLocationsDropdown(language) {
        const locations = getLocationsForLanguage(language);
        populateDropdown(elements.locationSelect, locations);
        populateDropdown(elements.jobLangSelect, []);
        populateDropdown(elements.jobSelect, []);
    }

    // Populate dropdown with options
    function populateDropdown(dropdown, options) {
        dropdown.innerHTML = '';
        const defaultOption = new Option('-- ' + (translations[elements.pageLangSelect.value]?.selectText || 'Select') + ' --', '');
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
            populateDropdown(elements.jobSelect, []);
        }
    }

    // Update page content based on selected language
    function updatePageContent(language) {
        const translation = translations[language] || translations.english;
        
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translation[key]) el.textContent = translation[key];
        });
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        updateLocationsDropdown(language);
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
            showAlert(translations[elements.pageLangSelect.value]?.bmsIdLabel || 'Please enter your BMS ID');
            return false;
        }
        
        const job = elements.jobSelect.value;
        if (!job) {
            showAlert(translations[elements.pageLangSelect.value]?.selectJobText || 'Please select a job position');
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
        
        showAlert(translations[elements.pageLangSelect.value]?.jobDataError || 'Error generating referral link');
        return false;
    }

    // Generate QR code
    function generateQrCode(url) {
        elements.qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&color=000&bgcolor=FFF&data=${encodeURIComponent(url)}`;
    }

    // Copy link to clipboard
    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[elements.pageLangSelect.value]?.copiedText || 'Copied!'}`;
        
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    // Share via WhatsApp
    function shareWhatsApp() {
        const message = `${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${elements.referralLink.value}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Share via Line
    function shareLine() {
        const message = `${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${elements.referralLink.value}`;
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    // Share via Facebook
    function shareFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(elements.referralLink.value)}`;
        window.open(url, '_blank');
    }

    // Show alert message
    function showAlert(message) {
        alert(message);
    }

    // Setup event listeners
    function setupEventListeners() {
        elements.pageLangSelect.addEventListener('change', function() {
            updatePageContent(this.value);
        });
        
        elements.locationSelect.addEventListener('change', function() {
            const location = this.value;
            if (!location) return;
            
            const languages = getLanguagesForLocation(location);
            populateDropdown(elements.jobLangSelect, languages);
            populateDropdown(elements.jobSelect, []);
        });
        
        elements.jobLangSelect.addEventListener('change', updateJobsDropdown);
        
        elements.nextBtn.addEventListener('click', function() {
            if (generateReferralLink()) {
                elements.step1.style.display = 'none';
                elements.step2.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        elements.backBtn.addEventListener('click', function() {
            elements.step2.style.display = 'none';
            elements.step1.style.display = 'block';
        });
        
        elements.copyBtn.addEventListener('click', copyToClipboard);
        elements.shareWhatsapp.addEventListener('click', shareWhatsApp);
        elements.shareLine.addEventListener('click', shareLine);
        elements.shareFacebook.addEventListener('click', shareFacebook);
    }

    // Initialize the app
    init();
});
