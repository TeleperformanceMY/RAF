// Fetch JSON data and populate dropdowns
let jsonData = [];
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

// Update dropdown while keeping the current selected value if valid
function updateDropdownWithSelectedValue(dropdown, options, currentValue) {
  populateDropdown(dropdown, options);
  if (options.includes(currentValue)) {
    dropdown.value = currentValue;
  } else {
    dropdown.value = ''; // Reset to default if the current value is no longer valid
  }
}

// Event listener for language selection
languageSelect.addEventListener('change', function () {
  const selectedLanguage = this.value;

  // Filter locations based on the selected language
  const filteredLocations = selectedLanguage
    ? [...new Set(jsonData.filter(item => item.Language === selectedLanguage).map(item => item.Location))]
    : [...new Set(jsonData.map(item => item.Location))];

  // Update the locations dropdown
  updateDropdownWithSelectedValue(locationSelect, filteredLocations, locationSelect.value);

  // Update jobs dropdown if both language and location are selected
  updateJobsDropdown();

  // Update page content based on selected language
  updatePageContent(selectedLanguage);
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
  const facebookMessage2 = "Let's grow together! 🚀 #JoinTheTeam";
  const facebookCaption = encodeURIComponent(facebookMessage + " " + generatedLink.querySelector('a').href + " " + facebookMessage2);
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(generatedLink.querySelector('a').href)}&quote=${facebookCaption}`;
  window.open(facebookLink, "_blank");
});

// Share via TikTok
document.getElementById('share-button-tiktok').addEventListener('click', function () {
  const tiktokCaption = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const tiktokAppLink = `tiktok://share/video/YOUR_VIDEO_URL?text=${encodeURIComponent(tiktokCaption)}`;
  const tiktokWebLink = `https://www.tiktok.com/share?url=YOUR_VIDEO_URL`;
  window.open(tiktokAppLink, "_blank") || window.open(tiktokWebLink, "_blank");
});

// Translation function
function translate(language) {
  const translations = {
    english: {
      chooseLanguage: "Choose Your Language:",
      enterBMS: "Please key in your BMS ID",
      bmsIdPlaceholder: "Key in your BMS ID here.",
      chooseYourReferrerPreferred: "Choose for your referrer his preferred",
      languageLabel: "Language:",
      locationLabel: "Working location:",
      jobLabel: "Job Position:",
      nextButton: "Next",
      HowtoButton: "How To!",
      thankYou: "Thank you for your referral!"
    },
    japanese: {
      chooseLanguage: "言語を選択してください:",
      enterBMS: "BMS IDを入力してください",
      bmsIdPlaceholder: "ここにBMS IDを入力してください。",
      chooseYourReferrerPreferred: "紹介者の希望するものを選んでください",
      languageLabel: "言語:",
      locationLabel: "勤務地:",
      jobLabel: "職種:",
      nextButton: "次へ",
      HowtoButton: "使い方!",
      thankYou: "ご推薦ありがとうございます！"
    },
    korean: {
      chooseLanguage: "사용 언어를 선택 해 주세요 :",
      enterBMS: "BMS ID(사원번호)를 입력 해 주세요 ",
      bmsIdPlaceholder: "BMS ID를 여기에 입력해 주세요.",
      chooseYourReferrerPreferred: "추천인의 선호도를 선택하세요",
      languageLabel: "언어:",
      locationLabel: "근무 지역:",
      jobLabel: "직위:",
      nextButton: "다음",
      HowtoButton: "방법!",
      thankYou: "추천해 주셔서 감사합니다!"
    },
    malay: {
      chooseLanguage: "Pilih Bahasa Anda :",
      enterBMS: "Sila masukkan BMS ID anda",
      bmsIdPlaceholder: "Sila masukkan BMS ID di sini.",
      chooseYourReferrerPreferred: "Pilih pilihan yang disukai oleh pengganti anda",
      languageLabel: "Bahasa:",
      locationLabel: "Lokasi kerja:",
      jobLabel: "Jawatan kerja:",
      nextButton: "Seterusnya",
      HowtoButton: "Bagaimana!",
      thankYou: "Terima kasih atas rujukan anda!"
    }
  };
  return translations[language];
}

// Update page content based on selected language
function updatePageContent(language) {
  const translations = translate(language);

  // Update labels and texts
  document.querySelector(".language-selection label").textContent = translations.chooseLanguage;
  document.querySelector("#step1 h2").textContent = translations.enterBMS;
  document.querySelector("#bms-id").placeholder = translations.bmsIdPlaceholder;
  document.querySelectorAll("#step1 h2")[1].textContent = translations.chooseYourReferrerPreferred;
  document.querySelectorAll("#step1 h3")[0].textContent = translations.languageLabel;
  document.querySelectorAll("#step1 h3")[1].textContent = translations.locationLabel;
  document.querySelectorAll("#step1 h3")[2].textContent = translations.jobLabel;
  document.querySelector("#next-button").textContent = translations.nextButton;
}
