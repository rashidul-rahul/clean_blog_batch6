// Form validation and submission handling for Create Blog page

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createBlogForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validate URL if provided
        const imageUrl = document.getElementById('featuredImage');
        if (imageUrl.value.trim()) {
            try {
                new URL(imageUrl.value);
                imageUrl.classList.remove('is-invalid');
            } catch (e) {
                imageUrl.classList.add('is-invalid');
                isValid = false;
            }
        }

        return isValid;
    }

    // Remove invalid class on input
    form.querySelectorAll('.form-control, .form-select').forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });

    // Character counter for blog content (optional)
    const blogContent = document.getElementById('blogContent');
    const charCounterDiv = document.createElement('div');
    charCounterDiv.className = 'char-counter';
    blogContent.parentNode.appendChild(charCounterDiv);

    blogContent.addEventListener('input', function() {
        const count = this.value.length;
        charCounterDiv.textContent = `${count} characters`;
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide previous messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Validate form
        if (!validateForm()) {
            errorMessage.classList.remove('d-none');
            errorMessage.querySelector('div').textContent = 'Please fill in all required fields correctly.';
            return;
        }

        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Collect form data
        const formData = {
            title: document.getElementById('blogTitle').value,
            subtitle: document.getElementById('blogSubtitle').value,
            author: document.getElementById('authorName').value,
            category: document.getElementById('category').value,
            featuredImage: document.getElementById('featuredImage').value,
            content: document.getElementById('blogContent').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            publishStatus: document.querySelector('input[name="publishStatus"]:checked').value,
            createdAt: new Date().toISOString()
        };

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Remove loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;

            // Show success message
            successMessage.classList.remove('d-none');
            
            // Log form data (for demonstration)
            console.log('Blog Post Data:', formData);

            // Optionally reset form after successful submission
            setTimeout(() => {
                if (confirm('Blog post created successfully! Would you like to create another post?')) {
                    form.reset();
                    successMessage.classList.add('d-none');
                    charCounterDiv.textContent = '';
                } else {
                    // Redirect to home page or blog list
                    window.location.href = 'index.html';
                }
            }, 2000);

            // In a real application, you would send this data to your backend:
            /*
            fetch('/api/blog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                successMessage.classList.remove('d-none');
                // Handle success
            })
            .catch(error => {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                errorMessage.classList.remove('d-none');
                // Handle error
            });
            */
        }, 1500);
    });

    // Clear form button
    const clearButton = form.querySelector('button[type="reset"]');
    clearButton.addEventListener('click', function() {
        // Remove all validation classes
        form.querySelectorAll('.form-control, .form-select').forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        // Hide messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');
        
        // Reset character counter
        charCounterDiv.textContent = '';
    });

    // Auto-save to localStorage (optional feature)
    let autoSaveTimer;
    form.addEventListener('input', function() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            const draftData = {
                title: document.getElementById('blogTitle').value,
                subtitle: document.getElementById('blogSubtitle').value,
                author: document.getElementById('authorName').value,
                category: document.getElementById('category').value,
                featuredImage: document.getElementById('featuredImage').value,
                content: document.getElementById('blogContent').value,
                tags: document.getElementById('tags').value,
                lastSaved: new Date().toISOString()
            };
            localStorage.setItem('blogDraft', JSON.stringify(draftData));
            console.log('Draft auto-saved');
        }, 2000);
    });

    // Load draft from localStorage on page load
    const savedDraft = localStorage.getItem('blogDraft');
    if (savedDraft) {
        const shouldLoadDraft = confirm('A draft was found. Would you like to continue editing it?');
        if (shouldLoadDraft) {
            const draft = JSON.parse(savedDraft);
            document.getElementById('blogTitle').value = draft.title || '';
            document.getElementById('blogSubtitle').value = draft.subtitle || '';
            document.getElementById('authorName').value = draft.author || '';
            document.getElementById('category').value = draft.category || '';
            document.getElementById('featuredImage').value = draft.featuredImage || '';
            document.getElementById('blogContent').value = draft.content || '';
            document.getElementById('tags').value = draft.tags || '';
            
            // Update character counter
            if (draft.content) {
                charCounterDiv.textContent = `${draft.content.length} characters`;
            }
        } else {
            localStorage.removeItem('blogDraft');
        }
    }
});
