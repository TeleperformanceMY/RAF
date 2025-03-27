// Fetch JSON data and populate dropdowns
let jsonData = [];

fetch('data.json') // Ensure this path matches your folder structure
  .then(response => response.json())
  .then(data => {
    jsonData = data;

    const languages = [...new Set(data.map(item => item.Language))];
    populateDropdown(document.getElementById('language-select'), languages);

    const locations = [...new Set(data.map(item => item.Location))];
    populateDropdown(document.getElementById('location-select'), locations);
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
document.getElementById('language-select').addEventListener('change', function () {
  const selectedLanguage = this.value;

  // Filter locations based on the selected language
  const filteredLocations = selectedLanguage
    ? [...new Set(jsonData.filter(item => item.Language === selectedLanguage).map(item => item.Location))]
    : [...new Set(jsonData.map(item => item.Location))];

  // Update the locations dropdown
  updateDropdownWithSelectedValue(
    document.getElementById('location-select'),
    filteredLocations,
    document.getElementById('location-select').value
  );

  // Update jobs dropdown if both language and location are selected
  updateJobsDropdown();
});

// Event listener for location selection
document.getElementById('location-select').addEventListener('change', function () {
  updateJobsDropdown();
});

// Update jobs dropdown based on selected language and location
function updateJobsDropdown() {
  const selectedLanguage = document.getElementById('language-select').value;
  const selectedLocation = document.getElementById('location-select').value;

  if (selectedLanguage && selectedLocation) {
    const jobs = jsonData
      .filter(item => item.Language === selectedLanguage && item.Location === selectedLocation)
      .map(item => item.Positions);
    populateDropdown(document.getElementById('job-type-select'), jobs);
  } else {
    populateDropdown(document.getElementById('job-type-select'), []);
  }
}

// Generate referral link and move to the next step
function nextStep() {
  const bmsId = document.getElementById('bms-id').value;
  if (!bmsId) {
    alert("Please enter a valid BMS ID.");
    return;
  }

  const selectedLanguage = document.getElementById('language-select').value;
  const selectedLocation = document.getElementById('location-select').value;
  const selectedJob = document.getElementById('job-type-select').value;

  const jobData = jsonData.find(
    item => item.Language === selectedLanguage && item.Location === selectedLocation && item.Positions === selectedJob
  );

  if (jobData) {
    const finalLink = jobData["Evergreen link"] + bmsId;
    document.getElementById('generated-link').innerHTML = `<a href="${finalLink}" target="_blank">${finalLink}</a>`;
  }

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
}

// Refresh the page
function refreshPage() {
  location.reload();
}

// Share via WhatsApp
document.getElementById('share-button-whatsapp').addEventListener('click', function () {
  const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const message2 = "Let's grow together! 🚀 #JoinTheTeam";
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message + " " + document.getElementById('generated-link').querySelector('a').href + " " + message2)}`;
  window.open(whatsappLink, "_blank");
});

// Share via Line
document.getElementById('share-button-line').addEventListener('click', function () {
  const message = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const message2 = "Let's grow together! 🚀 #JoinTheTeam";
  const lineLink = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(message + " " + document.getElementById('generated-link').querySelector('a').href + " " + message2)}`;
  window.open(lineLink, "_blank");
});

// Share via Facebook
document.getElementById('share-button-facebook').addEventListener('click', function () {
  const facebookMessage = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const facebookMessage2 = "Let's grow together! 🚀 #JoinTheTeam";
  const facebookCaption = encodeURIComponent(facebookMessage + " " + document.getElementById('generated-link').querySelector('a').href + " " + facebookMessage2);
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(document.getElementById('generated-link').querySelector('a').href)}&quote=${facebookCaption}`;
  window.open(facebookLink, "_blank");
});

// Share via TikTok
document.getElementById('share-button-tiktok').addEventListener('click', function () {
  const tiktokCaption = "🌟 Exciting news! Join our amazing team at Teleperformance! 🌟 We're expanding our family and want you to be a part of it. Click the link below to start your new journey :";
  const tiktokAppLink = `tiktok://share/video/YOUR_VIDEO_URL?text=${encodeURIComponent(tiktokCaption)}`;
  const tiktokWebLink = `https://www.tiktok.com/share?url=YOUR_VIDEO_URL`;
  window.open(tiktokAppLink, "_blank") || window.open(tiktokWebLink, "_blank");
});
