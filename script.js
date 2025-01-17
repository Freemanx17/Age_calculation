function calculateAge() {
  const dateInput = document.getElementById('birthdate').value;

  if (!dateInput) {
    alert('الرجاء إدخال تاريخ ميلادك.');
    return;
  }

  const birthDateObj = new Date(dateInput);
  if (isNaN(birthDateObj)) {
    alert('تاريخ غير صالح. الرجاء إدخال تاريخ صحيح.');
    return;
  }

  const today = new Date();
  let years = today.getFullYear() - birthDateObj.getFullYear();
  let months = today.getMonth() - birthDateObj.getMonth();
  let days = today.getDate() - birthDateObj.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // عرض العمر
  document.getElementById('result').innerHTML = `
    عمرك: <strong>${years} سنة، ${months} أشهر، و${days} أيام.</strong>
  `;

  // جلب الأحداث التاريخية
  fetchHistoricalEvents(dateInput);
}

function resetForm() {
  document.getElementById('birthdate').value = '';
  document.getElementById('result').innerHTML = '';
  document.getElementById('events-list').innerHTML = '';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

// جلب الأحداث التاريخية من Wikipedia API (باللغة العربية)
function fetchHistoricalEvents(date) {
  const [year, month, day] = date.split('-');
  const url = `https://ar.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`; // الرابط باللغة العربية

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const events = data.events || [];
      const eventsList = document.getElementById('events-list');
      eventsList.innerHTML = '';

      if (events.length === 0) {
        eventsList.innerHTML = '<li>لم يتم العثور على أحداث لهذا التاريخ.</li>';
        return;
      }

      events.forEach(event => {
        const listItem = document.createElement('li');
        listItem.textContent = `${event.year}: ${event.text}`;
        eventsList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('حدث خطأ أثناء جلب الأحداث:', error);
      document.getElementById('events-list').innerHTML = '<li>حدث خطأ أثناء جلب الأحداث.</li>';
    });
}