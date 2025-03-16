document.addEventListener("DOMContentLoaded", function () {
//   console.log("DOMContentLoaded loaded!");
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


document.querySelectorAll("button[data-id]").forEach(button => {
    button.addEventListener("click", function() {

        console.log("Button clicked, product ID: ", this.getAttribute('data-id'));
        const productId = this.getAttribute('data-id');
        console.log("product ID :",productId);
        if (this.classList.contains("product-edit")) {
            console.log("Edit button clicked, fetching product data...");
            fetchProductData(productId); 
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
        console.log("Modal element exists.");
    } else {
        console.error("Modal element not found on page load.");
    }
});

async function fetchProductData(productId) { 

        let response = await fetch(`/business/edit/${productId}`);
        if (!response.ok) throw new Error("Failed to load product data");

        let productData = await response.json();
        console.log("mydata: ", productData);

        const productIdInput = document.getElementById("editProductId");
        if (productIdInput) {
            productIdInput.value = productId;  
            console.log("Product ID set:", productIdInput.value);
        } else {
            console.error("Product ID input not found!");
        }

        const modal = document.getElementById("my_modal_5");
        if (!modal) {
            console.error("Modal not found.");
            return;
        }

        console.log("Product Name: ", productData.ProductName);
        console.log("Product Link: ", productData.ProductLink);
        console.log("Product Description: ", productData.Desc);

        const productNameInput = document.getElementById('EditProductName');
        if (productNameInput) {
            productNameInput.value = productData.ProductName || "";
            console.log("ProductName Input Value Set: ", productNameInput.value);
        } else {
            console.error("ProductName Input not found!");
        }
        const productLinkInput = document.getElementById('EditProductLink');
        if (productLinkInput) {
            productLinkInput.value = productData.ProductLink || "";
            console.log("ProductLink Input Value Set: ", productLinkInput.value);
        } else {
            console.error("ProductLink Input not found!");
        }

        const descTextarea = document.getElementById("EditDesc");
        if (descTextarea) {
            descTextarea.value = productData.Desc || "";
            console.log("Desc Textarea Value Set: ", descTextarea.value);
        } else {
            console.error("Desc Textarea not found!");
        }

        fillCheckboxes("Category", productData.Category || []);
        fillCheckboxes("Origin", productData.Origin || []);
        fillCheckboxes("RawMaterial", productData.RawMaterial || []);
        fillCheckboxes("Type", productData.Type || []);
        fillCheckboxes("Color", productData.Color || []);
        fillCheckboxes("ManufactoringProcess", productData.ManufactoringProcess || []);

        modal.showModal();
    }

    function fillCheckboxes(fieldName, fieldValues) {
        const checkboxes = document.querySelectorAll(`input[name="${fieldName}[]"]`);
        checkboxes.forEach(checkbox => {
            console.log("Checking checkbox:", checkbox);
            console.log("Field values:", fieldValues);
            const isChecked = fieldValues.some(field => field._id === checkbox.value);
            checkbox.checked = isChecked;
            console.log(`Checkbox for ${fieldName} (ID: ${checkbox.id}) - Checked: ${isChecked}`);
        });
    }
    
    


document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("my_modal_5");
    const closeButton = modal.querySelector("button[onclick='closeEditModal()']");

    if (modal && closeButton) {
        closeButton.addEventListener("click", function () {
            modal.close();
        });

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.close();
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".product-form-edit").addEventListener("submit", async function(e) {
        e.preventDefault(); 
        
        const formData = new FormData(this);
        
        if (!formData.get("productId")) {
            const hiddenProductId = document.getElementById("editProductId")?.value;
            if (hiddenProductId) {
                formData.set("productId", hiddenProductId);
                console.log("Manually set productId:", hiddenProductId);
            } else {
                console.error("Error: productId is missing!");
                return;
            }
        }

        const multiSelectFields = ["Category[]", "RawMaterial[]", "Origin[]", "Type[]", "Color[]", "ManufactoringProcess[]"];
        
        const data = Object.fromEntries(formData.entries());

        multiSelectFields.forEach(field => {
            data[field.replace("[]", "")] = formData.getAll(field); 
        });

        console.log("Submitting data:", data);

        try {
            let response = await fetch('/business/edit/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            // let updatedProduct = await response.json();
            // console.log("Product updated:", updatedProduct);
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }

            document.getElementById("my_modal_5").close();
            // location.reload(); 

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });

});



document.addEventListener('DOMContentLoaded', function() {
    let currentPath = window.location.pathname; 
    
    document.querySelectorAll('.menu a').forEach(function(link) {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('current-menu');
      } else {
        link.classList.remove('current-menu'); 
      }
    });
  });
  