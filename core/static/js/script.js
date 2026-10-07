
        // Initial state data representing the grid items
        let adsData = [
            {
                id: 1,
                status: 'perdido',
                animalName: 'BENTO (Golden Retriever)',
                location: 'Curitiba/PR',
                date: '12/10',
                imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400&h=300',
                phone: '(41) 99999-0001'
            },
            {
                id: 2,
                status: 'visto',
                animalName: 'Vira-lata (SRD)', // Often unknown if just seen
                location: 'São Paulo/SP',
                date: '14/10',
                imageUrl: 'https://images.unsplash.com/photo-1537151608804-ea6f23c360fb?auto=format&fit=crop&q=80&w=400&h=300',
                phone: '(11) 98888-0002'
            },
            {
                id: 3,
                status: 'perdido',
                animalName: 'LUNA',
                location: 'Campinas/SP',
                date: '15/10',
                imageUrl: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=400&h=300',
                phone: '(19) 97777-0003'
            },
            {
                id: 4,
                status: 'visto',
                animalName: 'Vira-lata (SRD)',
                location: 'Rio de Janeiro/RJ',
                date: '16/10',
                imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=300',
                phone: '(21) 96666-0004'
            }
        ];

        // Function to render the cards based on current state
        function renderCards() {
            const grid = document.getElementById('mural-grid');
            grid.innerHTML = ''; // Clear existing content

            if (adsData.length === 0) {
                grid.innerHTML = '<p class="col-span-full text-center text-gray-500 py-10">Nenhum animal cadastrado ainda.</p>';
                return;
            }

            adsData.forEach(ad => {
                const isLost = ad.status === 'perdido';
                const tagColor = isLost ? 'bg-status-lost' : 'bg-status-found';
                const tagText = isLost ? 'Perdido' : 'Status: Visto';

                // Fallback image handling just in case
                const bgImage = ad.imageUrl ? ad.imageUrl : 'https://placehold.co/400x300/e2e8f0/64748b?text=Sem+Foto';

                const cardHTML = `
                    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">

                        <!-- Image Container -->
                        <div class="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
                            <img src="${bgImage}" alt="${ad.animalName || 'Animal'}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='https://placehold.co/400x300/e2e8f0/64748b?text=Erro+na+Imagem'">

                            <!-- Tags -->
                            <div class="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">Foto</div>
                            <div class="absolute top-3 right-3 ${tagColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                ${tagText}
                            </div>
                        </div>

                        <!-- Card Content -->
                        <div class="p-4 flex-grow flex flex-col">
                            <h4 class="font-bold text-gray-800 text-lg mb-2 line-clamp-1">Nome: <span class="font-normal text-gray-600">${ad.animalName || 'Não identificado'}</span></h4>

                            <div class="text-sm text-gray-600 space-y-1 mb-4 flex-grow">
                                <p><i class="fas fa-map-marker-alt w-5 text-center text-gray-400"></i> <strong class="text-gray-700">${isLost ? 'Perdido' : 'Encontrado'} em:</strong> <span class="line-clamp-1 inline">${ad.location}</span></p>
                                <p><i class="fas fa-calendar-alt w-5 text-center text-gray-400"></i> <strong class="text-gray-700">Data:</strong> ${ad.date}</p>
                                <p><i class="fas fa-envelope w-5 text-center text-gray-400"></i> <strong class="text-gray-700">Contato:</strong> <a href="#" class="text-teal-600 hover:underline">Ver Mais</a></p>
                            </div>

                            <!-- Actions -->
                            <div class="flex gap-2 mt-auto">
                                <button onclick="showContact('${ad.phone}')" class="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold py-2 px-3 rounded shadow transition text-center">
                                    Ver Detalhes
                                </button>
                                <button class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-2 px-3 rounded shadow-sm border border-gray-200 transition flex items-center justify-center gap-2">
                                    <i class="fas fa-share-alt"></i> Compartilhar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                grid.innerHTML += cardHTML;
            });
        }

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
            msgBox.innerHTML = `<i class="fas fa-info-circle mr-2 text-brand-orange"></i> ${msg}`;
            document.body.appendChild(msgBox);

            setTimeout(() => {
                msgBox.style.opacity = '0';
                setTimeout(() => msgBox.remove(), 300);
            }, 3000);
        }

        function showContact(phone) {
            showMessage(`Telefone de contato: ${phone}`);
        }

        // Handle form submission
        function submitForm() {
            const form = document.getElementById('ad-form');

            // Basic HTML5 validation check
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Gather data
            const statusNode = document.querySelector('input[name="status"]:checked');
            if(!statusNode) {
                showMessage("Por favor, selecione se o animal está perdido ou foi visto.");
                return;
            }

            const status = statusNode.value;
            let animalName = document.getElementById('animalName').value.trim();
            const location = document.getElementById('location').value.trim();
            const imageUrl = document.getElementById('imageUrl').value.trim();
            const responsibleName = document.getElementById('responsibleName').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if(!animalName && status === 'visto') {
                animalName = 'Animal Encontrado (Sem identificação)';
            } else if (!animalName && status === 'perdido') {
                animalName = 'Desconhecido';
            }

            // Create new ad object
            const newAd = {
                id: Date.now(), // simple unique id
                status: status,
                animalName: animalName.toUpperCase(),
                location: location,
                imageUrl: imageUrl,
                phone: phone,
                // generate a simple current date format dd/mm
                date: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})
            };

            // Add to state array at the beginning
            adsData.unshift(newAd);

            // Update UI
            renderCards();
            closeModal();
            showMessage("Cartaz publicado com sucesso!");
        }

        // Initialize the app by rendering existing cards
        window.onload = () => {
            renderCards();
        };