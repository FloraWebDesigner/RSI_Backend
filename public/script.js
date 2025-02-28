document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired!");

  document.querySelectorAll('.table-form').forEach(form => {
      form.addEventListener('submit', function (event) {
          event.preventDefault(); 
          let fieldName = form.closest('tr').querySelector('[contenteditable]').getAttribute("data-field");
          let td = form.closest('tr').querySelector(`td[data-field="${fieldName}"]`);
          let hiddenInput = form.querySelector(`input[name="${fieldName}"]`);
          
          if (td && hiddenInput) {
              hiddenInput.value = td.innerText.trim();
              console.log(`Updated hidden input [${fieldName}] value:`, hiddenInput.value);
          }

          let formData = new FormData(form);
          formData.forEach((value, key) => {
              console.log(`FormData entry: ${key} = ${value}`);
          });

          fetch(form.action, {
              method: form.method,
              body: new URLSearchParams(formData),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              console.log("Form submitted successfully:", data);
              if (data.success) {
                  window.location.href = "/list";
              } else {
                  alert("Update failed! " + (data.message || ""));
              }
          })
          .catch(error => {
              console.error("Form submission failed:", error);
          });
      });
  });

  document.addEventListener('blur', function (event) {
      if (event.target.matches('td[contenteditable]')) {
          let fieldName = event.target.getAttribute("data-field");
          let form = event.target.closest('tr').querySelector('.edit-form');
          let hiddenInput = form.querySelector(`input[name="${fieldName}"]`);
          if (hiddenInput) {
              hiddenInput.value = event.target.innerText.trim();
              console.log(`Blurred updated input [${fieldName}] value:`, hiddenInput.value);
          }
      }
  }, true);
});



document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded fired!");

  document.querySelectorAll('.product-form').forEach(form => {
      form.addEventListener('submit', function (event) {
          event.preventDefault();

          // Loop through all editable fields and collect their values
          form.closest('tr').querySelectorAll('[contenteditable]').forEach(cell => {
              let fieldName = cell.getAttribute("data-field");
              let hiddenInput = form.querySelector(`input[name="${fieldName}"]`);
              
              if (hiddenInput) {
                  hiddenInput.value = cell.innerText.trim();
              }
          });

          // Collect selected checkbox values
          form.closest('tr').querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
              let fieldName = checkbox.getAttribute('name');
              let hiddenInput = form.querySelector(`input[name="${fieldName}"]`);
              
              if (hiddenInput) {
                  // Append selected value(s) to the hidden input
                  hiddenInput.value += checkbox.value + ",";
              }
          });

          // Create FormData and submit
          let formData = new FormData(form);
          formData.forEach((value, key) => {
              console.log(`FormData entry: ${key} = ${value}`);
          });

          fetch(form.action, {
              method: form.method,
              body: new URLSearchParams(formData),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  window.location.href = "/list";  // Redirect on success
              } else {
                  alert("Update failed! " + (data.message || ""));
              }
          })
          .catch(error => {
              console.error("Form submission failed:", error);
          });
      });
  });

  // Handle blur for inline editing
  document.addEventListener('blur', function (event) {
      if (event.target.matches('td[contenteditable]')) {
          let fieldName = event.target.getAttribute("data-field");
          let form = event.target.closest('tr').querySelector('.edit-form');
          let hiddenInput = form.querySelector(`input[name="${fieldName}"]`);
          if (hiddenInput) {
              hiddenInput.value = event.target.innerText.trim();
          }
      }
  }, true);

  // Handle origin field click and show checkboxes for selection
  document.querySelectorAll('[data-field="origin"]').forEach(cell => {
      cell.addEventListener('click', function () {
          let fieldName = cell.getAttribute("data-field");
          let form = cell.closest('tr').querySelector('.edit-form');

          // Dynamically render checkboxes for multiple options
          const origins = ['Origin 1', 'Origin 2', 'Origin 3']; // Example origins, replace with dynamic data if needed
          let checkboxHtml = origins.map(origin => {
              return `<label>
                        <input type="checkbox" name="origin" value="${origin}" /> ${origin}
                      </label><br/>`;
          }).join('');

          // Display checkboxes inside a modal or a dropdown next to the field
          let checkboxContainer = document.createElement('div');
          checkboxContainer.innerHTML = checkboxHtml;
          form.querySelector('.checkbox-container').appendChild(checkboxContainer);
      });
  });
});



  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("my_modal_4");
    if (!modal) {
      console.error("Modal not found! Check your HTML structure.");
      return;
  }
    const openButton = document.querySelector("button[onclick='my_modal_4.showModal()']");
    const closeButton = modal.querySelector("button[onclick='my_modal_4.close()']");
      
    openButton.addEventListener("click", function () {
      modal.showModal();
    });
  
    closeButton.addEventListener("click", function () {
      modal.close();
    });
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("my_modal_5");
    if (!modal) {
      console.error("Modal not found! Check your HTML structure.");
      return;
  }
    const openButton = document.querySelector("button[onclick='my_modal_5.showModal()']");
    const closeButton = modal.querySelector("button[onclick='my_modal_5.close()']");
      
    openButton.addEventListener("click", function () {
      modal.showModal();
    });
  
    closeButton.addEventListener("click", function () {
      modal.close();
    });
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.close();
      }
    });
  });



  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu li a').forEach(function(item) {
      item.addEventListener('click', function() {
        document.querySelectorAll('.menu li a').forEach(function(link) {
          link.classList.remove('current-menu');
        });
        item.classList.add('current-menu');
      });
    });
  });
  