// DOM Elements
const elements = {
  empLangSelect: document.getElementById('emp-lang-select'),
  languageSelect: document.getElementById('language-select'),
  locationSelect: document.getElementById('location-select'),
  jobSelect: document.getElementById('job-type-select'),
  generatedLink: document.getElementById('generated-link'),
  qrImg: document.getElementById('qrImg'),
  bmsIdInput: document.getElementById('bms-id'),
  step1: document.getElementById('step1'),
  step2: document.getElementById('step2'),
  jobTitleDisplay: document.getElementById('job-title-display'),
  jobLinkDisplay: document.getElementById('job-link-display')
};

// Application State
const state = {
  jsonData: [],
  currentLanguage: 'english',
  shareMessages: {
    default: "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey:",
    closing: "Let's grow together! 🚀 #JoinTheTeam"
  }
};

// Initialize the application
async function initApp() {
  try {
    await loadData();
    setupEventListeners();
    updatePageContent(state.currentLanguage);
  } catch (error) {
    console.error('Application initialization failed:', error);
    showErrorToUser("Failed to load application data. Please try again later.");
  }
}

// Load JSON data
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Network response was not ok');
    
    state.jsonData = await response.json();
    populateInitialDropdowns();
  } catch (error) {
    console.error('Error loading JSON data:', error);
    throw error;
  }
}

// Populate initial dropdowns
function populateInitialDropdowns() {
  const languages = [...new Set(state.jsonData.map(item => item.Language))];
  populateDropdown(elements.empLangSelect, languages);
  populateDropdown(elements.languageSelect, languages);

  const locations = [...new Set(state.jsonData.map(item => item.Location))];
  populateDropdown(elements.locationSelect, locations);
}

// Populate dropdown with options
function populateDropdown(dropdown, options) {
  if (!dropdown) return;
  
  dropdown.innerHTML = '';
  
  // Add default option if there are other options
  if (options.length > 0) {
    const defaultOption = new Option('-- Select --', '');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);
  }
  
  options.forEach(option => {
    dropdown.appendChild(new Option(option, option));
  });
}

// Translation dictionary
const translations = {
  english: {
    chooseLanguage: "Choose Your Language:",
    enterBMS: "Please enter your BMS ID",
    bmsIdPlaceholder: "Enter your BMS ID here",
    choosePreferences: "Choose Your Referral's Preferences",
    jobLanguageLabel: "Language:",
    locationLabel: "Working Location:",
    jobPositionLabel: "Job Position:",
    nextButton: "Next",
    thankYouMessage: "Thank you for your referral!",
    referralMessage: "As we grow in Malaysia and Thailand, become #MoreTogether as we #ElevateAsia, here are the links your friend can use so this is tagged to your profile in our Recruiting System.",
    invalidBMS: "Please enter a valid BMS ID.",
    noJobSelected: "Please select all required job details."
  },
  japanese: {
    chooseLanguage: "言語を選択してください:",
    enterBMS: "BMS IDを入力してください",
    bmsIdPlaceholder: "ここにBMS IDを入力してください。",
    choosePreferences: "紹介者の希望するものを選んでください",
    jobLanguageLabel: "言語:",
    locationLabel: "勤務地:",
    jobPositionLabel: "職種:",
    nextButton: "次へ",
    thankYouMessage: "ご推薦ありがとうございます！",
    referralMessage: "マレーシアとタイで成長し、#ElevateAsiaとして#MoreTogetherになるにつれ、友人が使用できるリンクがあります。これにより、採用システムのあなたのプロフィールにタグ付けされます。",
    invalidBMS: "有効なBMS IDを入力してください。",
    noJobSelected: "必要な職務詳細をすべて選択してください。"
  },
  korean: {
    chooseLanguage: "사용 언어를 선택 해 주세요 :",
    enterBMS: "BMS ID(사원번호)를 입력 해 주세요 ",
    bmsIdPlaceholder: "BMS ID를 여기에 입력해 주세요.",
    choosePreferences: "추천인의 선호도를 선택하세요",
    jobLanguageLabel: "언어:",
    locationLabel: "근무 지역:",
    jobPositionLabel: "직위:",
    nextButton: "다음",
    thankYouMessage: "추천해 주셔서 감사합니다!",
    referralMessage: "말레이시아와 태국에서 성장하고 #ElevateAsia를 지향하며 #MoreTogether가 되어가는 가운데, 친구가 사용할 수 있는 링크는 다음과 같습니다. 이 링크는 귀하의 프로필에 태그되어 채용 시스템에 추가됩니다.",
    invalidBMS: "유효한 BMS ID를 입력해 주세요.",
    noJobSelected: "필요한 모든 직무 정보를 선택해 주세요."
  },
  // Add more languages as needed
};

// Update page content based on selected language
function updatePageContent(language) {
  const lang = language || state.currentLanguage;
  const translation = translations[lang] || translations.english;
  
  state.currentLanguage = lang;
  
  // Update form labels and placeholders
  document.querySelector(".language-selection label").textContent = translation.chooseLanguage;
  elements.bmsIdInput.placeholder = translation.bmsIdPlaceholder;
  
  // Update button texts
  const nextButton = document.querySelector('#step1 button');
  if (nextButton) nextButton.textContent = translation.nextButton;
  
  // Update step 2 content
  const thankYouMessage = document.getElementById('thank-you-message');
  const referralMessage = document.getElementById('referral-message');
  if (thankYouMessage) thankYouMessage.textContent = translation.thankYouMessage;
  if (referralMessage) referralMessage.textContent = translation.referralMessage;
}

// Filter and update dropdowns based on selections
function updateDropdowns() {
  const empLanguage = elements.empLangSelect.value;
  
  // Filter job languages based on employee language selection
  const filteredLanguages = empLanguage
    ? [...new Set(state.jsonData.filter(item => item.Language === empLanguage).map(item => item.Language))]
    : [...new Set(state.jsonData.map(item => item.Language))];
  
  populateDropdown(elements.languageSelect, filteredLanguages);
  
  // Filter locations based on job language selection
  const jobLanguage = elements.languageSelect.value;
  const filteredLocations = jobLanguage
    ? [...new Set(state.jsonData.filter(item => item.Language === jobLanguage).map(item => item.Location))]
    : [...new Set(state.jsonData.map(item => item.Location))];
  
  populateDropdown(elements.locationSelect, filteredLocations);
  updateJobsDropdown();
}

// Update jobs dropdown based on selected language and location
function updateJobsDropdown() {
  const selectedLanguage = elements.languageSelect.value;
  const selectedLocation = elements.locationSelect.value;
  
  if (selectedLanguage && selectedLocation) {
    const jobs = [...new Set(state.jsonData
      .filter(item => item.Language === selectedLanguage && item.Location === selectedLocation)
      .map(item => item.Positions))];
    
    populateDropdown(elements.jobSelect, jobs);
    
    // If only one job exists, select it automatically
    if (jobs.length === 1) {
      elements.jobSelect.value = jobs[0];
      updateJobPreview();
    }
  } else {
    populateDropdown(elements.jobSelect, []);
  }
}

// Update job preview section
function updateJobPreview() {
  const selectedJob = elements.jobSelect.value;
  if (!selectedJob) return;
  
  const selectedLanguage = elements.languageSelect.value;
  const selectedLocation = elements.locationSelect.value;
  
  const jobData = state.jsonData.find(
    item => item.Language === selectedLanguage && 
           item.Location === selectedLocation && 
           item.Positions === selectedJob
  );
  
  if (jobData) {
    elements.jobTitleDisplay.textContent = jobData.Positions;
    elements.jobLinkDisplay.href = jobData['Job Link'] || '#';
    elements.jobLinkDisplay.textContent = 'View Job Details';
  }
}

// Generate referral link and move to next step
function nextStep() {
  const bmsId = elements.bmsIdInput.value.trim();
  const selectedJob = elements.jobSelect.value;
  
  // Validate inputs
  if (!bmsId) {
    showAlert(translations[state.currentLanguage]?.invalidBMS || "Please enter a valid BMS ID.");
    return;
  }
  
  if (!selectedJob) {
    showAlert(translations[state.currentLanguage]?.noJobSelected || "Please select all required job details.");
    return;
  }
  
  const selectedLanguage = elements.languageSelect.value;
  const selectedLocation = elements.locationSelect.value;
  
  const jobData = state.jsonData.find(
    item => item.Language === selectedLanguage && 
           item.Location === selectedLocation && 
           item.Positions === selectedJob
  );
  
  if (jobData) {
    const finalLink = `${jobData['Evergreen link']}${bmsId}`;
    displayGeneratedLink(finalLink);
    generateQrCode(finalLink);
    showStep(2);
  }
}

// Display generated referral link
function displayGeneratedLink(link) {
  elements.generatedLink.innerHTML = `
    <div class="link-container">
      <input type="text" value="${link}" id="generated-link-input" readonly>
      <button id="copy-link-btn" class="btn btn-sm btn-outline-secondary">
        <i class="fas fa-copy"></i>
      </button>
    </div>
  `;
  
  // Add copy functionality
  document.getElementById('copy-link-btn').addEventListener('click', copyToClipboard);
}

// Copy link to clipboard
function copyToClipboard() {
  const input = document.getElementById('generated-link-input');
  input.select();
  document.execCommand('copy');
  
  // Show feedback
  const copyBtn = document.getElementById('copy-link-btn');
  const originalHTML = copyBtn.innerHTML;
  copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  
  setTimeout(() => {
    copyBtn.innerHTML = originalHTML;
  }, 2000);
}

// Generate QR code
function generateQrCode(url) {
  if (!url) return;
  
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&format=png&margin=10&data=${encodeURIComponent(url)}`;
  elements.qrImg.src = qrCodeUrl;
  elements.qrImg.alt = "QR Code for job referral link";
}

// Share functionality
function setupShareButtons() {
  const shareButtons = {
    whatsapp: {
      id: 'share-button-whatsapp',
      baseUrl: 'https://wa.me/?text='
    },
    line: {
      id: 'share-button-line',
      baseUrl: 'https://social-plugins.line.me/lineit/share?url='
    },
    facebook: {
      id: 'share-button-facebook',
      baseUrl: 'https://www.facebook.com/sharer/sharer.php?u='
    },
    instagram: {
      id: 'share-button-IG',
      baseUrl: 'instagram://library?AssetPath='
    },
    tiktok: {
      id: 'share-button-TikTok',
      baseUrl: 'https://www.tiktok.com/upload?lang=en'
    }
  };
  
  Object.values(shareButtons).forEach(button => {
    const element = document.getElementById(button.id);
    if (element) {
      element.addEventListener('click', () => shareLink(button.baseUrl));
    }
  });
}

// Share link via social media
function shareLink(baseUrl) {
  const link = document.querySelector('#generated-link-input')?.value;
  if (!link) return;
  
  const message = `${state.shareMessages.default} ${link} ${state.shareMessages.closing}`;
  const shareUrl = `${baseUrl}${encodeURIComponent(message)}`;
  
  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}

// Show alert message
function showAlert(message) {
  alert(message); // Replace with a custom modal in production
}

// Show error to user
function showErrorToUser(message) {
  // This could be enhanced with a proper error display component
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.textContent = message;
  document.body.prepend(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Toggle between steps
function showStep(stepNumber) {
  elements.step1.style.display = stepNumber === 1 ? 'block' : 'none';
  elements.step2.style.display = stepNumber === 2 ? 'block' : 'none';
  
  if (stepNumber === 2) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Setup event listeners
function setupEventListeners() {
  elements.empLangSelect.addEventListener('change', () => {
    updatePageContent(elements.empLangSelect.value);
    updateDropdowns();
  });
  
  elements.languageSelect.addEventListener('change', updateDropdowns);
  elements.locationSelect.addEventListener('change', updateDropdowns);
  elements.jobSelect.addEventListener('change', updateJobPreview);
  
  // Refresh button
  const refreshBtn = document.querySelector('.refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', refreshPage);
  }
  
  // Initialize share buttons
  setupShareButtons();
}

// Refresh the page
function refreshPage() {
  window.location.reload();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
