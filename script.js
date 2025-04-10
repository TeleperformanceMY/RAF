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
        shareWechat: document.getElementById('share-wechat'),
        socialLinks: {
            linkedin: document.querySelector('.social-icon.linkedin'),
            facebookMalaysia: document.querySelector('.social-icon.facebook-malaysia'),
            instagramMalaysia: document.querySelector('.social-icon.instagram-malaysia'),
            facebookThailand: document.querySelector('.social-icon.facebook-thailand'),
            instagramThailand: document.querySelector('.social-icon.instagram-thailand')
        }
    };

    // Application Data
    let jsonData = [];
    let currentLocation = '';
    let lastJobLangSelection = '';
    let lastLocationSelection = '';
    let currentReferralLink = '';

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
            wechatText: "WeChat",
            locationSocial: "Location Social Media:",
            shareMessage: "Check out this job opportunity at Teleperformance: ",
            sharePrompt: "Share this opportunity with your friends:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand"
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
            wechatText: "WeChat",
            locationSocial: "現地のソーシャルメディア:",
            shareMessage: "Teleperformanceのこの求人情報をチェックしてください: ",
            sharePrompt: "この機会を友達と共有しましょう:",
            tpGlobal: "TP グローバル",
            tpMalaysia: "TP マレーシア",
            tpThailand: "TP タイ"
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
            wechatText: "WeChat",
            locationSocial: "현지 소셜 미디어:",
            shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: ",
            sharePrompt: "이 기회를 친구들과 공유하세요:",
            tpGlobal: "TP 글로벌",
            tpMalaysia: "TP 말레이시아",
            tpThailand: "TP 태국"
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
            wechatText: "WeChat",
            locationSocial: "Media Sosial Lokasi:",
            shareMessage: "Lihat peluang pekerjaan ini di Teleperformance: ",
            sharePrompt: "Kongsi peluang ini dengan rakan anda:",
            tpGlobal: "TP Global",
            tpMalaysia: "TP Malaysia",
            tpThailand: "TP Thailand"
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
            wechatText: "WeChat",
            locationSocial: "当地社交媒体:",
            shareMessage: "查看Teleperformance的这个工作机会: ",
            sharePrompt: "与朋友分享这个机会:",
            tpGlobal: "TP 全球",
            tpMalaysia: "TP 马来西亚",
            tpThailand: "TP 泰国"
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
            wechatText: "WeChat",
            locationSocial: "สื่อสังคมท้องถิ่น:",
            shareMessage: "ดูโอกาสงานนี้ที่ Teleperformance: ",
            sharePrompt: "แบ่งปันโอกาสนี้กับเพื่อนของคุณ:",
            tpGlobal: "TP ระดับโลก",
            tpMalaysia: "TP มาเลเซีย",
            tpThailand: "TP ประเทศไทย"
        }
    };

    // Social media links
    const socialLinks = {
        global: {
            linkedin: "https://www.linkedin.com/company/teleperformance/"
        },
        malaysia: {
            facebook: "http://www.facebook.com/TPinMalaysia/",
            instagram: "http://www.instagram.com/tp_malaysia/"
        },
        thailand: {
            facebook: "http://www.facebook.com/TPinThailand/",
            instagram: "http://www.instagram.com/tpinthailand/"
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
            if (translation[key]) el.textContent = translation[key];
        });
        
        // Update placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        updateSocialLinks();
    }

    // Update social media links
    function updateSocialLinks() {
        // Global links
        elements.socialLinks.linkedin.href = socialLinks.global.linkedin;
        
        // Malaysia links
        elements.socialLinks.facebookMalaysia.href = socialLinks.malaysia.facebook;
        elements.socialLinks.instagramMalaysia.href = socialLinks.malaysia.instagram;
        
        // Thailand links
        elements.socialLinks.facebookThailand.href = socialLinks.thailand.facebook;
        elements.socialLinks.instagramThailand.href = socialLinks.thailand.instagram;
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
            return true;
        }
        
        showAlert(translations[elements.pageLangSelect.value]?.jobDataError || 'Error generating referral link');
        return false;
    }

   // Generate QR code with error handling
    function generateQrCode(url) {
        currentReferralLink = url;
        const qrSize = 200;
        const qrColor = '000000'; // Black
        const bgColor = 'FFFFFF'; // White
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&color=${qrColor}&bgcolor=${bgColor}&data=${encodeURIComponent(url)}`;
        
        // Create new image to handle loading/errors
        const img = new Image();
        img.onload = function() {
            elements.qrCode.src = qrUrl;
            // Make QR code clickable for sharing
            elements.qrCode.style.cursor = 'pointer';
            elements.qrCode.title = translations[elements.pageLangSelect.value]?.clickToShare || 'Click to share';
        };
        img.onerror = function() {
            console.error('Failed to load QR code');
            elements.qrCode.src = '';
            elements.qrCode.alt = 'QR Code Generation Failed';
        };
        img.src = qrUrl;
    }

    // Make QR code clickable to share
    function setupQrCodeSharing() {
        elements.qrCode.addEventListener('click', function() {
            if (currentReferralLink) {
                const shareOptions = [
                    { name: 'WhatsApp', action: shareWhatsApp },
                    { name: 'Line', action: shareLine },
                    { name: 'Facebook', action: shareFacebook },
                    { name: 'WeChat', action: shareWechat },
                    { name: 'Copy Link', action: copyToClipboard }
                ];
                
                const lang = elements.pageLangSelect.value;
                const shareText = translations[lang]?.sharePrompt || 'Share via:';
                
                // Create simple share menu
                const shareMenu = shareOptions.map(option => 
                    `<button class="share-option-btn" onclick="(${option.action.toString()})()">
                        ${option.name}
                    </button>`
                ).join('');
                
                const modal = document.createElement('div');
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
                modal.style.display = 'flex';
                modal.style.flexDirection = 'column';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '1000';
                
                modal.innerHTML = `
                    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h3>${shareText}</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${shareMenu}
                        </div>
                        <button style="margin-top: 20px; padding: 8px 16px;" onclick="this.parentElement.parentElement.remove()">
                            ${translations[lang]?.backText || 'Cancel'}
                        </button>
                    </div>
                `;
                
                document.body.appendChild(modal);
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

   // Enhanced share functions that can handle QR code sharing
    function shareWhatsApp() {
        const prompt = translations[elements.pageLangSelect.value]?.sharePrompt || 'Share this opportunity with your friends:';
        const message = `${prompt}\n\n${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${currentReferralLink}`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function shareLine() {
        const prompt = translations[elements.pageLangSelect.value]?.sharePrompt || 'Share this opportunity with your friends:';
        const message = `${prompt}\n\n${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${currentReferralLink}`;
        const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    function shareFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentReferralLink)}`;
        window.open(url, '_blank');
    }

    function shareWechat() {
        const prompt = translations[elements.pageLangSelect.value]?.sharePrompt || 'Share this opportunity with your friends:';
        const message = `${prompt}\n\n${translations[elements.pageLangSelect.value]?.shareMessage || 'Check out this job opportunity at Teleperformance:'} ${currentReferralLink}`;
        alert(`${message}\n\nScan the QR code to share via WeChat`);
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
             // Initialize QR code sharing after DOM is ready
        setTimeout(setupQrCodeSharing, 500);
        });
        
        // Job language change
        elements.jobLangSelect.addEventListener('change', handleJobLangChange);
        
        // Location change
        elements.locationSelect.addEventListener('change', handleLocationChange);
        
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
        elements.shareWechat.addEventListener('click', shareWechat);
    }

    // Initialize the app
    init();
});
