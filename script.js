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
        qrCodeCanvas: document.getElementById('qr-code-canvas'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareFacebook: document.getElementById('share-facebook')
    };
// Parse URL for BMS ID
const pathParts = window.location.pathname.split('/');
const bmsId = pathParts[pathParts.length - 1];

if (bmsId && !isNaN(bmsId)) {
    // Hide the BMS ID input field
    document.getElementById('bmsIdField').style.display = 'none';
    
    // Set the BMS ID in a hidden field
    document.getElementById('referrerBmsId').value = bmsId;
    
    // Optionally display "Referred by [BMS ID]" text
    document.getElementById('referralNote').textContent = `Referred by ${bmsId}`;
    document.getElementById('referralNote').style.display = 'block';
}
    // Application Data
    let jsonData = [];
    let currentLocation = '';
    let lastJobLangSelection = '';
    let lastLocationSelection = '';
    let currentReferralLink = '';

    // Complete Translations for all languages
    const translations = {
        english: {
            welcomeMessage: "Welcome to TP Internal Refer A Friend Program",
            pageLangLabel: "Choose Your Language:",
            bmsIdLabel: "Please enter your BMS ID:",
            bmsIdPlaceholder: "Enter your BMS ID",
            bmsIdError: "Please enter a valid 6 or 7 digit BMS ID",
            jobSelectionTitle: "Please select your referral's preferences",
            jobLangLabel: "Job Language:",
            jobLangError: "Please select a job language",
            locationLabel: "Working Location:",
            locationError: "Please select a location",
            jobLabel: "Job Position:",
            jobError: "Please select a job position",
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
            locationSocial: "Our Social Media:",
            shareMessage: "Check out this job opportunity at Teleperformance: ",
            sharePrompt: "Share this opportunity with your friends:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand",
            copiedText: "Copied!",
            facebookAlert: "For Facebook, please copy the link and share it manually on your Facebook."
        },
        japanese: {
            welcomeMessage: "TP内部友人紹介プログラムへようこそ",
            pageLangLabel: "言語を選択してください:",
            bmsIdLabel: "BMS IDを入力してください:",
            bmsIdPlaceholder: "BMS IDを入力",
            bmsIdError: "6桁または7桁の有効なBMS IDを入力してください",
            jobSelectionTitle: "紹介者の希望を選択してください",
            jobLangLabel: "求人言語:",
            jobLangError: "求人言語を選択してください",
            locationLabel: "勤務地:",
            locationError: "勤務地を選択してください",
            jobLabel: "職種:",
            jobError: "職種を選択してください",
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
            shareMessage: "Teleperformanceのこの求人情報をチェックしてください: ",
            sharePrompt: "この機会を友達と共有しましょう:",
            tpGlobal: "TP グローバル",
            tpMalaysia: "TP マレーシア",
            tpThailand: "TP タイ",
            copiedText: "コピーしました!",
            facebookAlert: "Facebookで共有するには、リンクをコピーしてFacebookで手動で共有してください。"
        },
        korean: {
            welcomeMessage: "TP 내부 친구 추천 프로그램에 오신 것을 환영합니다",
            pageLangLabel: "언어 선택:",
            bmsIdLabel: "BMS ID를 입력하세요:",
            bmsIdPlaceholder: "BMS ID 입력",
            bmsIdError: "6자리 또는 7자리 유효한 BMS ID를 입력하세요",
            jobSelectionTitle: "추천인의 선호도를 선택하세요",
            jobLangLabel: "직무 언어:",
            jobLangError: "직무 언어를 선택하세요",
            locationLabel: "근무 위치:",
            locationError: "근무 위치를 선택하세요",
            jobLabel: "직위:",
            jobError: "직위를 선택하세요",
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
            shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: ",
            sharePrompt: "이 기회를 친구들과 공유하세요:",
            tpGlobal: "TP 글로벌",
            tpMalaysia: "TP 말레이시아",
            tpThailand: "TP 태국",
            copiedText: "복사되었습니다!",
            facebookAlert: "Facebook에서 공유하려면 링크를 복사하여 Facebook에서 수동으로 공유하십시오."
        },
        malay: {
            welcomeMessage: "Selamat datang ke Program Rujuk Rakan Dalaman TP",
            pageLangLabel: "Pilih Bahasa Anda:",
            bmsIdLabel: "Sila masukkan ID BMS anda:",
            bmsIdPlaceholder: "Masukkan ID BMS",
            bmsIdError: "Sila masukkan ID BMS yang sah (6 atau 7 digit)",
            jobSelectionTitle: "Sila pilih keutamaan rujukan anda",
            jobLangLabel: "Bahasa Pekerjaan:",
            jobLangError: "Sila pilih bahasa pekerjaan",
            locationLabel: "Lokasi Kerja:",
            locationError: "Sila pilih lokasi kerja",
            jobLabel: "Jawatan:",
            jobError: "Sila pilih jawatan",
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
            shareMessage: "Lihat peluang pekerjaan ini di Teleperformance: ",
            sharePrompt: "Kongsi peluang ini dengan rakan anda:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand",
            copiedText: "Telah disalin!",
            facebookAlert: "Untuk Facebook, sila salin pautan dan kongsi secara manual di Facebook anda."
        },
        mandarin: {
            welcomeMessage: "欢迎来到TP内部推荐朋友计划",
            pageLangLabel: "选择您的语言:",
            bmsIdLabel: "请输入您的BMS ID:",
            bmsIdPlaceholder: "输入BMS ID",
            bmsIdError: "请输入6或7位有效的BMS ID",
            jobSelectionTitle: "请选择您推荐的偏好",
            jobLangLabel: "工作语言:",
            jobLangError: "请选择工作语言",
            locationLabel: "工作地点:",
            locationError: "请选择工作地点",
            jobLabel: "职位:",
            jobError: "请选择职位",
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
            shareMessage: "查看Teleperformance的这个工作机会: ",
            sharePrompt: "与朋友分享这个机会:",
            tpGlobal: "TP 全球",
            tpMalaysia: "TP 马来西亚",
            tpThailand: "TP 泰国",
            copiedText: "已复制!",
            facebookAlert: "要在Facebook上分享，请复制链接并在Facebook应用中手动分享。"
        },
        thai: {
            welcomeMessage: "ยินดีต้อนรับสู่โปรแกรมแนะนำเพื่อนภายใน TP",
            pageLangLabel: "เลือกภาษาของคุณ:",
            bmsIdLabel: "กรุณาใส่ BMS ID ของคุณ:",
            bmsIdPlaceholder: "ใส่ BMS ID",
            bmsIdError: "กรุณาใส่ BMS ID ที่ถูกต้อง (6 หรือ 7 หลัก)",
            jobSelectionTitle: "กรุณาเลือกความต้องการของผู้ที่คุณจะแนะนำ",
            jobLangLabel: "ภาษาของงาน:",
            jobLangError: "กรุณาเลือกภาษาของงาน",
            locationLabel: "สถานที่ทำงาน:",
            locationError: "กรุณาเลือกสถานที่ทำงาน",
            jobLabel: "ตำแหน่งงาน:",
            jobError: "กรุณาเลือกตำแหน่งงาน",
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
            shareMessage: "ดูโอกาสงานนี้ที่ Teleperformance: ",
            sharePrompt: "แบ่งปันโอกาสนี้กับเพื่อนของคุณ:",
            tpGlobal: "TP ระดับโลก",
            tpMalaysia: "TP มาเลเซีย",
            tpThailand: "TP ประเทศไทย",
            copiedText: "คัดลอกแล้ว!",
            facebookAlert: "สำหรับ Facebook โปรดคัดลอกลิงก์และแชร์ด้วยตนเองบน Facebook ของคุณ"
        }
    };

    // Initialize the application
    function init() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
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
        
        // BMS ID validation
        if (!validateBMSId(elements.bmsId.value.trim())) {
            elements.bmsId.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.bmsId.classList.remove('is-invalid');
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
        
        const bmsId = elements.bmsId.value.trim();
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
        
        // BMS ID input validation
        elements.bmsId.addEventListener('input', function() {
            // Only allow digits
            this.value = this.value.replace(/\D/g, '');
            validateForm();
        });
        
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
