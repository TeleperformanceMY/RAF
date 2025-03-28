// Fetch JSON data and populate dropdowns
let jsonData = [];
const empLangSelect = document.getElementById('emp-lang-select');
const languageSelect = document.getElementById('language-select');
const locationSelect = document.getElementById('location-select');
const jobSelect = document.getElementById('job-type-select');
const generatedLink = document.getElementById('generated-link');
const qrImg = document.getElementById('qrImg');

fetch('data.json') // Ensure this path matches your folder structure
  .then(response => response.json())
  .then(data => {
    jsonData = data;

    const languages = [...new Set(data.map(item => item.Language))];
    populateDropdown(empLangSelect, languages);
    populateDropdown(languageSelect, languages);

    const locations = [...new Set(data.map(item => item.Location))];
    populateDropdown(locationSelect, locations);
  })
  .catch(error => console.error('Error loading JSON data:', error));

// Populate a dropdown with options
function populateDropdown(dropdown, options) {
  dropdown.innerHTML = ''; // Clear previous options
  dropdown.appendChild(new Option('--Select--', '')); // Default "Select" option
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.text = option;
    dropdown.appendChild(opt);
  });
}

// Translation function
function translate(language) {
  const translations = {
    english: {
      chooseLanguage: "Choose Your Language:",
      enterBMS: "Please key in your BMS ID",
      bmsIdPlaceholder: "Key in your BMS ID here.",
      choosePreferences: "Choose Your Referral's Preferences",
      jobLanguageLabel: "Job Language:",
      locationLabel: "Working Location:",
      jobPositionLabel: "Job Position:",
      nextButton: "Next",
      thankYouMessage: "Thank you for your referral!",
      referralMessage: "As we grow in Malaysia and Thailand, become #MoreTogether as we #ElevateAsia, here are the links your friend can use so this is tagged to your profile into our Recruiting System."
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
      referralMessage: "マレーシアとタイで成長し、#ElevateAsiaとして#MoreTogetherになるにつれ、友人が使用できるリンクがあります。これにより、採用システムのあなたのプロフィールにタグ付けされます。"
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
      referralMessage: "말레이시아와 태국에서 성장하고 #ElevateAsia를 지향하며 #MoreTogether가 되어가는 가운데, 친구가 사용할 수 있는 링크는 다음과 같습니다. 이 링크는 귀하의 프로필에 태그되어 채용 시스템에 추가됩니다."
    }
    // Add more languages as needed
  };
  return translations[language];
}

// Update page content based on selected language
function updatePageContent(language) {
  const translations = translate(language);

  document.querySelector(".language-selection label").textContent = translations.chooseLanguage;
  document.getElementById("enter-bms-label").textContent = translations.enterBMS;
  document.getElementById("bms-id").placeholder = translations.bmsIdPlaceholder;
  document.getElementById("choose-preferences-label").textContent = translations.choosePreferences;
  document.getElementById("job-language-label").textContent = translations.jobLanguageLabel;
  document.getElementById("location-label").textContent = translations.locationLabel;
  document.getElementById("job-position-label").textContent = translations.jobPositionLabel;
  document.getElementById("next-button").textContent = translations.nextButton;
  document.getElementById("thank-you-message").textContent = translations.thankYouMessage;
  document.getElementById("referral-message").textContent = translations.referralMessage;
}

// Event listener for language selection
empLangSelect.addEventListener('change', function () {
  const selectedLanguage = this.value;

  // Update page content
  updatePageContent(selectedLanguage);

  // Filter job languages based on the selected page language
  const filteredLanguages = selectedLanguage
    ? [...new Set(jsonData.filter(item => item.Language === selectedLanguage).map(item => item.Language))]
    : [...new Set(jsonData.map(item => item.Language))];

  // Update the job language dropdown
  populateDropdown(languageSelect, filteredLanguages);
});

// Event listener for job language selection
languageSelect.addEventListener('change', function () {
  const selectedLanguage = this.value;

  // Filter locations based on the selected job language
  const filteredLocations = selectedLanguage
    ? [...new Set(jsonData.filter(item => item.Language === selectedLanguage).map(item => item.Location))]
    : [...new Set(jsonData.map(item => item.Location))];

  // Update the locations dropdown
  populateDropdown(locationSelect, filteredLocations);

  // Update jobs dropdown if both language and location are selected
  updateJobsDropdown();
});

// Event listener for location selection
locationSelect.addEventListener('change', function () {
  updateJobsDropdown();
});

// Update jobs dropdown based on selected language and location
function updateJobsDropdown() {
  const selectedLanguage = languageSelect.value;
  const selectedLocation = locationSelect.value;

  if (selectedLanguage && selectedLocation) {
    const jobs = jsonData
      .filter(item => item.Language === selectedLanguage && item.Location === selectedLocation)
      .map(item => item.Positions);
    populateDropdown(jobSelect, jobs);
  } else {
    populateDropdown(jobSelect, []);
  }
}

// Generate referral link and move to the next step
function nextStep() {
  const bmsId = document.getElementById('bms-id').value;
  if (!bmsId) {
    alert("Please enter a valid BMS ID.");
    return;
  }

  const selectedLanguage = languageSelect.value;
  const selectedLocation = locationSelect.value;
  const selectedJob = jobSelect.value;

  const jobData = jsonData.find(
    item => item.Language === selectedLanguage && item.Location === selectedLocation && item.Positions === selectedJob
  );

  if (jobData) {
    const finalLink = jobData["Evergreen link"] + bmsId;
    generatedLink.innerHTML = `<a href="${finalLink}" target="_blank">${finalLink}</a>`;
    generateQrCode(finalLink);
  }

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

// Function to generate QR code
function generateQrCode(url) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
  qrImg.src = qrCodeUrl;
}

// Refresh the page
function refreshPage() {
  location.reload();
}

// Share via WhatsApp
document.getElementById('share-button-whatsapp').addEventListener('click', function () {
  const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const message2 = "Let's grow together! 🚀 #JoinTheTeam";
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message + " " + generatedLink.querySelector('a').href + " " + message2)}`;
  window.open(whatsappLink, "_blank");
});

// Share via Line
document.getElementById('share-button-line').addEventListener('click', function () {
  const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const message2 = "Let's grow together! 🚀 #JoinTheTeam";
  const lineLink = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message + " " + generatedLink.querySelector('a').href + " " + message2)}`;
  window.open(lineLink, "_blank");
});

// Share via Facebook
document.getElementById('share-button-facebook').addEventListener('click', function () {
  const facebookMessage = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const facebookMessage2 = "Let's grow together! 🚀 #JoinThe
