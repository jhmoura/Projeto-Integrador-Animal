
        function escapeHTML(value) {
            return String(value).replace(/[&<>"']/g, character => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            })[character]);
        }

        function initLocationAutocomplete() {
            const locationInput = document.getElementById('location');
            if (!locationInput || !google.maps.places) {
                return;
            }

            const autocomplete = new google.maps.places.Autocomplete(locationInput, {
                types: ['geocode'],
                componentRestrictions: { country: 'br' },
                fields: ['formatted_address']
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    locationInput.value = place.formatted_address;
                }
            });
        }

        window.initLocationAutocomplete = initLocationAutocomplete;

        document.getElementById('mural-grid').addEventListener('click', event => {
            const button = event.target.closest('[data-phone]');
            if (button) {
                showContact(button.dataset.phone);
            }
        });

        const modal = document.getElementById('ad-modal');

        function openModal() {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        function closeModal() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restore scrolling
            document.getElementById('ad-form').reset(); // Clear form on close
        }

        // Close modal if clicking outside the form area
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Add CSS for simple fade in animation
        const style = document.createElement('style');
        style.textContent = `
            .animate-fadeIn {
                animation: fadeIn 0.2s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Simple custom alert equivalent using a custom UI element
        function showMessage(msg) {
            const msgBox = document.createElement('div');
            msgBox.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-[60] animate-fadeIn transition-opacity duration-300';
            msgBox.innerHTML = `<i class="fas fa-info-circle mr-2 text-brand-orange"></i> ${escapeHTML(msg)}`;
            document.body.appendChild(msgBox);

            setTimeout(() => {
                msgBox.style.opacity = '0';
                setTimeout(() => msgBox.remove(), 300);
            }, 3000);
        }

        function showContact(phone) {
            showMessage(`Telefone de contato: ${phone}`);
        }
