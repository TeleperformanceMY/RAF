const translations = {
    en: {
        pageLangLabel: "Choose Your Language:",
        yourInfoTitle: "Your Information",
        friendInfoTitle: "Friend's Information",
        fullNameLabel: "Full Name:",
        fullNamePlaceholder: "Enter your full name",
        fullNameError: "Please provide your full name.",
        phoneLabel: "Phone Number:",
        phonePlaceholder: "Enter your phone number",
        phoneError: "Please provide a valid phone number.",
        emailLabel: "Email Address:",
        emailPlaceholder: "Enter your email address",
        emailError: "Please provide a valid email address.",
        jobLangLabel: "Job Language:",
        jobLangError: "Please select a job language.",
        locationLabel: "Working Location:",
        locationError: "Please select a location.",
        selectOption: "Select an option",
        consentText1: "I agree to the",
        termsLink: "terms and conditions",
        consentText2: "of the Refer a Friend program. I confirm that I have obtained my friend's consent to share their information with Teleperformance for recruitment purposes.",
        consentError: "You must agree to the terms and conditions.",
        nextBtn: "Submit Referral",
        thankYouTitle: "Thank you for your referral!",
        referralMessage: "Here's the personalized link for your friend to apply:",
        scanText: "Or scan this QR code to apply",
        followUs: "Follow Us On:",
        backText: "Back",
        copyText: "Copy",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "Our Social Media:",
        shareMessage: "Check out this job opportunity at Teleperformance: ",
        termsTitle: "Terms and Conditions",
        closeBtn: "Close",
        copiedText: "Copied!",
        termsContent: `
            <h4>Refer a Friend Program Terms</h4>
            <p>By participating in the Teleperformance Refer a Friend program, you agree to the following terms:</p>
            <ol>
                <li>You must be a current employee or authorized representative to refer candidates.</li>
                <li>All referred candidates must meet the minimum qualifications for the position.</li>
                <li>You must obtain consent from the referred individual before submitting their information.</li>
                <li>Referral bonuses (if applicable) will be paid according to company policy.</li>
                <li>Teleperformance reserves the right to modify or terminate this program at any time.</li>
                <li>All hiring decisions are made at the sole discretion of Teleperformance.</li>
            </ol>
            <p>Last updated: ${new Date().toLocaleDateString('en-US')}</p>
        `,
        noJobError: "No job found for the selected criteria",
        wechatAlert: "For WeChat, please copy the link and share it manually within the WeChat app.",
        loadError: "Failed to load job data. Please try again later."
    },
    ja: {
        pageLangLabel: "言語を選択してください:",
        yourInfoTitle: "あなたの情報",
        friendInfoTitle: "友人情報",
        fullNameLabel: "氏名:",
        fullNamePlaceholder: "氏名を入力してください",
        fullNameError: "氏名を入力してください。",
        phoneLabel: "電話番号:",
        phonePlaceholder: "電話番号を入力してください",
        phoneError: "有効な電話番号を入力してください。",
        emailLabel: "メールアドレス:",
        emailPlaceholder: "メールアドレスを入力してください",
        emailError: "有効なメールアドレスを入力してください。",
        jobLangLabel: "職務言語:",
        jobLangError: "職務言語を選択してください。",
        locationLabel: "勤務地:",
        locationError: "勤務地を選択してください。",
        selectOption: "選択してください",
        consentText1: "私はTeleperformanceの",
        termsLink: "利用規約",
        consentText2: "「友人を紹介する」プログラムに同意します。私は採用目的で友人の情報をTeleperformanceと共有することについて、友人の同意を得たことを確認します。",
        consentError: "利用規約に同意する必要があります。",
        nextBtn: "紹介を送信",
        thankYouTitle: "ご紹介ありがとうございます!",
        referralMessage: "友達が応募するためのリンクです:",
        scanText: "QRコードをスキャンして応募",
        followUs: "フォローしてください:",
        backText: "戻る",
        copyText: "コピー",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "ソーシャルメディア:",
        shareMessage: "Teleperformanceのこの求人情報をチェックしてください: ",
        termsTitle: "利用規約",
        closeBtn: "閉じる",
        copiedText: "コピーしました!",
        termsContent: `
            <h4>友人紹介プログラム利用規約</h4>
            <p>Teleperformanceの「友人を紹介する」プログラムに参加することで、以下の規約に同意したものとみなされます:</p>
            <ol>
                <li>候補者を紹介するには、現在の従業員または承認された代表者である必要があります。</li>
                <li>紹介されたすべての候補者は、ポジションの最低資格を満たしている必要があります。</li>
                <li>紹介する個人の情報を送信する前に、その個人の同意を得る必要があります。</li>
                <li>紹介ボーナス（該当する場合）は、会社のポリシーに従って支払われます。</li>
                <li>Teleperformanceは、いつでもこのプログラムを変更または終了する権利を留保します。</li>
                <li>すべての採用決定は、Teleperformanceの単独の裁量で行われます。</li>
            </ol>
            <p>最終更新日: ${new Date().toLocaleDateString('ja-JP')}</p>
        `,
        noJobError: "選択した条件に該当する仕事が見つかりません",
        wechatAlert: "WeChatで共有するには、リンクをコピーしてWeChatアプリ内で手動で共有してください。",
        loadError: "仕事のデータの読み込みに失敗しました。後ほど再度お試しください。"
    },
    ko: {
        pageLangLabel: "언어 선택:",
        yourInfoTitle: "귀하의 정보",
        friendInfoTitle: "친구 정보",
        fullNameLabel: "성명:",
        fullNamePlaceholder: "성명을 입력하세요",
        fullNameError: "성명을 입력해 주세요.",
        phoneLabel: "전화번호:",
        phonePlaceholder: "전화번호를 입력하세요",
        phoneError: "유효한 전화번호를 입력해 주세요.",
        emailLabel: "이메일 주소:",
        emailPlaceholder: "이메일 주소를 입력하세요",
        emailError: "유효한 이메일 주소를 입력해 주세요.",
        jobLangLabel: "직무 언어:",
        jobLangError: "직무 언어를 선택해 주세요.",
        locationLabel: "근무 위치:",
        locationError: "근무 위치를 선택해 주세요.",
        selectOption: "선택하세요",
        consentText1: "나는 Teleperformance의",
        termsLink: "이용 약관",
        consentText2: "에 동의합니다. 채용 목적으로 친구의 정보를 Teleperformance와 공유하는 것에 대해 친구의 동의를 얻었음을 확인합니다.",
        consentError: "이용 약관에 동의해야 합니다.",
        nextBtn: "추천 제출",
        thankYouTitle: "추천해 주셔서 감사합니다!",
        referralMessage: "친구가 지원할 수 있는 개인화된 링크입니다:",
        scanText: "QR 코드를 스캔하여 지원하세요",
        followUs: "팔로우 하세요:",
        backText: "뒤로",
        copyText: "복사",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "WeChat",
        locationSocial: "소셜 미디어:",
        shareMessage: "Teleperformance의 이 채용 기회를 확인하세요: ",
        termsTitle: "이용 약관",
        closeBtn: "닫기",
        copiedText: "복사되었습니다!",
        termsContent: `
            <h4>친구 추천 프로그램 약관</h4>
            <p>Teleperformance의 친구 추천 프로그램에 참여함으로써 다음 약관에 동의하는 것으로 간주됩니다:</p>
            <ol>
                <li>후보자를 추천하려면 현재 직원이거나 승인된 대표자여야 합니다.</li>
                <li>추천된 모든 후보자는 해당 직위의 최소 자격 요건을 충족해야 합니다.</li>
                <li>추천하는 개인의 정보를 제출하기 전에 해당 개인의 동의를 얻어야 합니다.</li>
                <li>추천 보너스(해당하는 경우)는 회사 정책에 따라 지급됩니다.</li>
                <li>Teleperformance는 언제든지 이 프로그램을 수정 또는 종료할 권리를 보유합니다.</li>
                <li>모든 채용 결정은 Teleperformance의 단독 재량에 따라 이루어집니다.</li>
            </ol>
            <p>최종 업데이트: ${new Date().toLocaleDateString('ko-KR')}</p>
        `,
        noJobError: "선택한 기준에 맞는 직업을 찾을 수 없습니다",
        wechatAlert: "WeChat에서 공유하려면 링크를 복사하여 WeChat 앱 내에서 수동으로 공유하십시오.",
        loadError: "작업 데이터를 로드하지 못했습니다. 나중에 다시 시도하십시오."
    },
    "zh-CN": {
        pageLangLabel: "选择您的语言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "输入您的全名",
        fullNameError: "请提供您的全名。",
        phoneLabel: "电话号码:",
        phonePlaceholder: "输入您的电话号码",
        phoneError: "请输入有效的电话号码。",
        emailLabel: "电子邮件地址:",
        emailPlaceholder: "输入您的电子邮件地址",
        emailError: "请输入有效的电子邮件地址。",
        jobLangLabel: "工作语言:",
        jobLangError: "请选择工作语言。",
        locationLabel: "工作地点:",
        locationError: "请选择工作地点。",
        selectOption: "选择选项",
        consentText1: "我同意",
        termsLink: "条款和条件",
        consentText2: "的推荐朋友计划。我确认已获得朋友的同意，将其信息分享给Teleperformance用于招聘目的。",
        consentError: "您必须同意条款和条件。",
        nextBtn: "提交推荐",
        thankYouTitle: "感谢您的推荐!",
        referralMessage: "这是您朋友申请的个性化链接:",
        scanText: "扫描二维码申请",
        followUs: "关注我们:",
        backText: "返回",
        copyText: "复制",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "微信",
        locationSocial: "社交媒体:",
        shareMessage: "查看Teleperformance的这个工作机会: ",
        termsTitle: "条款和条件",
        closeBtn: "关闭",
        copiedText: "已复制!",
        termsContent: `
            <h4>推荐朋友计划条款</h4>
            <p>通过参与Teleperformance推荐朋友计划，您同意以下条款:</p>
            <ol>
                <li>您必须是当前员工或授权代表才能推荐候选人。</li>
                <li>所有被推荐的候选人必须满足该职位的最低资格要求。</li>
                <li>在提交被推荐人的信息之前，您必须获得被推荐人的同意。</li>
                <li>推荐奖金(如适用)将根据公司政策支付。</li>
                <li>Teleperformance保留随时修改或终止本计划的权利。</li>
                <li>所有聘用决定均由Teleperformance全权决定。</li>
            </ol>
            <p>最后更新: ${new Date().toLocaleDateString('zh-CN')}</p>
        `,
        noJobError: "找不到符合所选条件的工作",
        wechatAlert: "要在微信上分享，请复制链接并在微信应用中手动分享。",
        loadError: "无法加载工作数据。请稍后再试。"
    },
    "zh-HK": {
        pageLangLabel: "選擇您的語言:",
        yourInfoTitle: "您的信息",
        friendInfoTitle: "朋友信息",
        fullNameLabel: "全名:",
        fullNamePlaceholder: "輸入您的全名",
        fullNameError: "請提供您的全名。",
        phoneLabel: "電話號碼:",
        phonePlaceholder: "輸入您的電話號碼",
        phoneError: "請輸入有效的電話號碼。",
        emailLabel: "電子郵件地址:",
        emailPlaceholder: "輸入您的電子郵件地址",
        emailError: "請輸入有效的電子郵件地址。",
        jobLangLabel: "工作語言:",
        jobLangError: "請選擇工作語言。",
        locationLabel: "工作地點:",
        locationError: "請選擇工作地點。",
        selectOption: "選擇選項",
        consentText1: "我同意",
        termsLink: "條款和條件",
        consentText2: "的推薦朋友計劃。我確認已獲得朋友的同意，將其信息分享給Teleperformance用於招聘目的。",
        consentError: "您必須同意條款和條件。",
        nextBtn: "提交推薦",
        thankYouTitle: "感謝您的推薦!",
        referralMessage: "這是您朋友申請的個性化鏈接:",
        scanText: "掃描二維碼申請",
        followUs: "關注我們:",
        backText: "返回",
        copyText: "複製",
        whatsappText: "WhatsApp",
        lineText: "Line",
        wechatText: "微信",
        locationSocial: "社交媒體:",
        shareMessage: "查看Teleperformance的這個工作機會: ",
        termsTitle: "條款和條件",
        closeBtn: "關閉",
        copiedText: "已複製!",
        termsContent: `
            <h4>推薦朋友計劃條款</h4>
            <p>通過參與Teleperformance推薦朋友計劃，您同意以下條款:</p>
            <ol>
                <li>您必須是當前員工或授權代表才能推薦候選人。</li>
                <li>所有被推薦的候選人必須滿足該職位的最低資格要求。</li>
                <li>在提交被推薦人的信息之前，您必須獲得被推薦人的同意。</li>
                <li>推薦獎金(如適用)將根據公司政策支付。</li>
                <li>Teleperformance保留隨時修改或終止本計劃的權利。</li>
                <li>所有聘用決定均由Teleperformance全權決定。</li>
            </ol>
            <p>最後更新: ${new Date().toLocaleDateString('zh-HK')}</p>
        `,
        noJobError: "找不到符合所選條件的工作",
        wechatAlert: "要在微信上分享，請復制鏈接並在微信應用中手動分享。",
        loadError: "無法加載工作數據。請稍後再試。"
    }
};

const locationSocialLinks = {
    malaysia: [
        { url: "http://www.facebook.com/TPinMalaysia/", icon: "facebook", name: "Facebook" },
        { url: "http://www.instagram.com/tp_malaysia/", icon: "instagram", name: "Instagram" }
    ],
    thailand: [
        { url: "http://www.facebook.com/TPinThailand/", icon: "facebook", name: "Facebook" },
        { url: "http://www.instagram.com/tpinthailand/", icon: "instagram", name: "Instagram" }
    ],
    global: [
        { url: "https://www.linkedin.com/company/teleperformance", icon: "linkedin", name: "LinkedIn" },
        { url: "https://www.youtube.com/@TeleperformanceGroup", icon: "youtube", name: "YouTube" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        pageLangSelect: document.getElementById('page-lang-select'),
        fullName: document.getElementById('full-name'),
        phoneNumber: document.getElementById('phone-number'),
        email: document.getElementById('email'),
        jobLangSelect: document.getElementById('job-lang-select'),
        locationSelect: document.getElementById('location-select'),
        consentCheckbox: document.getElementById('consent-checkbox'),
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        nextBtn: document.getElementById('next-btn'),
        backBtn: document.getElementById('back-btn'),
        referralLink: document.getElementById('referral-link'),
        copyBtn: document.getElementById('copy-btn'),
        qrCodeCanvas: document.getElementById('qr-code-canvas'),
        shareWhatsapp: document.getElementById('share-whatsapp'),
        shareLine: document.getElementById('share-line'),
        shareWechat: document.getElementById('share-wechat'),
        locationSocialLinks: document.getElementById('location-social-links'),
        termsModal: document.getElementById('termsModal'),
        termsContent: document.getElementById('termsContent')
    };

    let currentLanguage = 'en';
    let currentLocation = '';
    let jobData = [];

    function init() {
        loadJobData();
        setupEventListeners();
        updatePageContent();
    }

    function loadJobData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                jobData = data;
                populateJobDropdowns();
            })
            .catch(error => {
                console.error('Error loading job data:', error);
                alert(translations[currentLanguage].loadError);
            });
    }

    function populateJobDropdowns() {
        const languages = [...new Set(jobData.map(job => job.Language))];
        const locations = [...new Set(jobData.map(job => job.Location))];

        elements.jobLangSelect.innerHTML = '';
        addOption(elements.jobLangSelect, '', translations[currentLanguage].selectOption, true, true);
        languages.forEach(lang => {
            addOption(elements.jobLangSelect, lang, lang);
        });

        elements.locationSelect.innerHTML = '';
        addOption(elements.locationSelect, '', translations[currentLanguage].selectOption, true, true);
        locations.forEach(loc => {
            addOption(elements.locationSelect, loc, loc);
        });
    }

    function addOption(select, value, text, disabled = false, selected = false) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        option.disabled = disabled;
        option.selected = selected;
        select.appendChild(option);
    }

    function updatePageContent() {
        const translation = translations[currentLanguage] || translations.en;
        
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
        
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translation[key]) el.placeholder = translation[key];
        });
        
        if (elements.termsContent) {
            elements.termsContent.innerHTML = translation.termsContent;
        }
        
        populateJobDropdowns();
    }

    function changeLanguage() {
        currentLanguage = elements.pageLangSelect.value;
        updatePageContent();
    }

    function validateForm() {
        let isValid = true;
        
        if (!elements.fullName.value.trim()) {
            elements.fullName.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.fullName.classList.remove('is-invalid');
        }
        
        if (!elements.phoneNumber.value.trim() || elements.phoneNumber.value.trim().length < 8) {
            elements.phoneNumber.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.phoneNumber.classList.remove('is-invalid');
        }
        
        if (!validateEmail(elements.email.value)) {
            elements.email.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.email.classList.remove('is-invalid');
        }
        
        if (!elements.jobLangSelect.value) {
            elements.jobLangSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.jobLangSelect.classList.remove('is-invalid');
        }
        
        if (!elements.locationSelect.value) {
            elements.locationSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.locationSelect.classList.remove('is-invalid');
        }
        
        if (!elements.consentCheckbox.checked) {
            elements.consentCheckbox.classList.add('is-invalid');
            isValid = false;
        } else {
            elements.consentCheckbox.classList.remove('is-invalid');
        }
        
        elements.nextBtn.disabled = !isValid;
        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function generateReferral() {
        if (!validateForm()) return false;
        
        const name = encodeURIComponent(elements.fullName.value.trim());
        const phone = encodeURIComponent(elements.phoneNumber.value.trim());
        const email = encodeURIComponent(elements.email.value.trim());
        const jobLanguage = elements.jobLangSelect.value;
        const location = elements.locationSelect.value;
        
        currentLocation = location.toLowerCase().includes('malaysia') ? 'malaysia' : 
                         location.toLowerCase().includes('thailand') ? 'thailand' : 'global';
        
        const job = jobData.find(
            item => item.Language === jobLanguage && 
                   item.Location === location
        );
        
        if (job) {
            const baseUrl = job['Evergreen link'].split('?')[0];
            const referralUrl = `${baseUrl}?ref=friend&name=${name}%7Cphone=${phone}%7Cemail=${email}`;
            
            elements.referralLink.value = referralUrl;
            generateQRCode(referralUrl);
            updateSocialLinks();
            return true;
        }
        
        alert(translations[currentLanguage].noJobError);
        return false;
    }

    function generateQRCode(url) {
        QRCode.toCanvas(elements.qrCodeCanvas, url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        }, function(error) {
            if (error) console.error('QR Code generation error:', error);
        });
    }

    function updateSocialLinks() {
        elements.locationSocialLinks.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'social-media-container';

        // Add TP Global section
        const globalSection = document.createElement('div');
        globalSection.className = 'social-media-section';
        
        const globalTitle = document.createElement('h6');
        globalTitle.textContent = 'TP Global';
        globalTitle.className = 'social-media-title';
        globalSection.appendChild(globalTitle);
        
        const globalLinks = document.createElement('div');
        globalLinks.className = 'social-media-links';
        
        locationSocialLinks.global.forEach(link => {
            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.className = `social-icon ${link.icon}`;
            anchor.target = "_blank";
            anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
            anchor.title = link.name;
            globalLinks.appendChild(anchor);
        });
        
        globalSection.appendChild(globalLinks);
        container.appendChild(globalSection);

        // Add TP Malaysia section if location is Malaysia
        if (currentLocation === 'malaysia') {
            const malaysiaSection = document.createElement('div');
            malaysiaSection.className = 'social-media-section';
            
            const malaysiaTitle = document.createElement('h6');
            malaysiaTitle.textContent = 'TP Malaysia';
            malaysiaTitle.className = 'social-media-title';
            malaysiaSection.appendChild(malaysiaTitle);
            
            const malaysiaLinks = document.createElement('div');
            malaysiaLinks.className = 'social-media-links';
            
            locationSocialLinks.malaysia.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.className = `social-icon ${link.icon}`;
                anchor.target = "_blank";
                anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
                anchor.title = link.name;
                malaysiaLinks.appendChild(anchor);
            });
            
            malaysiaSection.appendChild(malaysiaLinks);
            container.appendChild(malaysiaSection);
        }

        // Add TP Thailand section if location is Thailand
        if (currentLocation === 'thailand') {
            const thailandSection = document.createElement('div');
            thailandSection.className = 'social-media-section';
            
            const thailandTitle = document.createElement('h6');
            thailandTitle.textContent = 'TP Thailand';
            thailandTitle.className = 'social-media-title';
            thailandSection.appendChild(thailandTitle);
            
            const thailandLinks = document.createElement('div');
            thailandLinks.className = 'social-media-links';
            
            locationSocialLinks.thailand.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.className = `social-icon ${link.icon}`;
                anchor.target = "_blank";
                anchor.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
                anchor.title = link.name;
                thailandLinks.appendChild(anchor);
            });
            
            thailandSection.appendChild(thailandLinks);
            container.appendChild(thailandSection);
        }

        elements.locationSocialLinks.appendChild(container);
        updateShareButtons();
    }

    function updateShareButtons() {
        const shareUrl = encodeURIComponent(elements.referralLink.value);
        const shareText = translations[currentLanguage]?.shareMessage || translations.en.shareMessage;
        const encodedShareText = encodeURIComponent(shareText);
        
        elements.shareWhatsapp.onclick = () => {
            window.open(`https://wa.me/?text=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        elements.shareLine.onclick = () => {
            window.open(`https://social-plugins.line.me/lineit/share?url=${encodedShareText}${shareUrl}`, '_blank');
        };
        
        elements.shareWechat.onclick = () => {
            alert(translations[currentLanguage]?.wechatAlert);
        };
    }

    function copyToClipboard() {
        elements.referralLink.select();
        document.execCommand('copy');
        
        const originalText = elements.copyBtn.innerHTML;
        elements.copyBtn.innerHTML = `<i class="fas fa-check"></i> ${translations[currentLanguage]?.copiedText || 'Copied!'}`;
        setTimeout(() => {
            elements.copyBtn.innerHTML = originalText;
        }, 2000);
    }

    function showStep2() {
        if (generateReferral()) {
            elements.step1.style.display = 'none';
            elements.step2.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    function showStep1() {
        elements.step2.style.display = 'none';
        elements.step1.style.display = 'block';
    }

    function setupEventListeners() {
        elements.pageLangSelect.addEventListener('change', changeLanguage);
        
        elements.fullName.addEventListener('input', validateForm);
        elements.phoneNumber.addEventListener('input', validateForm);
        elements.email.addEventListener('input', validateForm);
        elements.jobLangSelect.addEventListener('change', validateForm);
        elements.locationSelect.addEventListener('change', validateForm);
        elements.consentCheckbox.addEventListener('change', validateForm);
        
        elements.nextBtn.addEventListener('click', showStep2);
        elements.backBtn.addEventListener('click', showStep1);
        
        elements.copyBtn.addEventListener('click', copyToClipboard);
        
        const termsModal = new bootstrap.Modal(elements.termsModal);
        document.querySelector('[data-bs-target="#termsModal"]').addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.show();
        });
    }

    init();
});
