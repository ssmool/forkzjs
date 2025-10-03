        // === VARIÁVEIS GLOBAIS ===
        // Tamanho do bloco: 1MB (1024 * 1024 bytes). O limite de 1024MB foi ajustado para um valor prático.
        const CHUNK_SIZE = 1024 * 1024; 
        let fileQueue = [];
        let uploadServer = '';
        let allowedExtensions = [];

        // === INICIALIZAÇÃO ===
        document.addEventListener('DOMContentLoaded', () => {
            initializeForkzUp();
        });

        function initializeForkzUp() {
            const component = document.getElementById('forkzup-component');
            const forkzaButton = document.getElementById('forkza-filepicker');
            
            // 1. Ler e aplicar atributo server
            uploadServer = component.dataset.server || 'N/A';
            document.getElementById('server-url').textContent = uploadServer;

            // 2. Ler e exibir atributo pipio (arquivos pré-carregados, apenas simulação visual)
            const pipioFiles = component.dataset.pipio || 'Nenhum';
            document.getElementById('pipio-list').textContent = pipioFiles.replace(/,/g, ', ');

            // 3. Ler e aplicar atributo allow do <forkza>
            const allowAttr = forkzaButton.dataset.allow;
            if (allowAttr) {
                allowedExtensions = allowAttr.split(',').map(ext => ext.trim().toLowerCase());
                document.getElementById('allow-exts').textContent = allowedExtensions.join(', ');
            } else {
                 document.getElementById('allow-exts').textContent = 'Todos os tipos';
            }

            renderFilesTable();
        }

        // === FUNÇÕES DO UPLOADER CUSTOMIZADO (FORKZUP) ===

        // Função utilitária para gerar um GUID (UUID v4)
        function generateGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        // 1. Lida com a seleção de arquivos e verifica o tipo
        function handleFileSelect(event) {
            const files = Array.from(event.target.files);
            
            files.forEach(file => {
                const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

                if (allowedExtensions.length > 0 && !allowedExtensions.includes(ext)) {
                    console.error(`Arquivo ${file.name} ignorado. Extensão ${ext} não permitida.`);
                    return; 
                }

                file.id = generateGuid(); 
                file.status = 'Aguardando';
                fileQueue.push(file);
            });
            
            renderFilesTable();
            event.target.value = null; 
        }

        // 2. Renderiza a tabela de arquivos
        function renderFilesTable() {
            const tableBody = document.getElementById('files-table-body');
            tableBody.innerHTML = '';
            
            if (fileQueue.length === 0) {
                 tableBody.innerHTML = '<tr id="empty-row"><td colspan="5" class="py-4 text-center text-gray-500">Nenhum arquivo na fila.</td></tr>';
                 document.getElementById('upload-button').disabled = true;
                 return;
            }
            
            document.getElementById('upload-button').disabled = false;

            fileQueue.forEach(file => {
                const row = tableBody.insertRow();
                row.className = 'hover:bg-gray-100 transition duration-100';
                row.id = `row-${file.id}`;

                // Nome
                row.insertCell().textContent = file.name;

                // Tamanho
                row.insertCell().textContent = (file.size / CHUNK_SIZE).toFixed(2) + ' MB';

                // Blocos
                const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
                row.insertCell().textContent = chunkCount;

                // Status
                const statusCell = row.insertCell();
                statusCell.id = `status-cell-${file.id}`;
                statusCell.innerHTML = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">${file.status}</span>`;

                // Ações
                const actionCell = row.insertCell();
                actionCell.innerHTML = `<button onclick="removeFile('${file.id}')" class="text-red-600 hover:text-red-900 text-sm font-medium">Remover</button>`;
            });
        }
        
        function removeFile(fileId) {
            fileQueue = fileQueue.filter(f => f.id !== fileId);
            renderFilesTable();
        }

        // 3. Inicia o upload de todos os arquivos na fila
        async function startUploadQueue() {
            document.getElementById('upload-button').disabled = true;
            for (const file of fileQueue) {
                if (file.status !== 'Completo') {
                    await uploadFile(file);
                }
            }
            document.getElementById('upload-button').disabled = false;
        }

        // 4. Processa e envia cada arquivo em chunks (remote javascript)
        async function uploadFile(file) {
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            let offset = 0;
            let chunkIndex = 0;
            
            const updateStatus = (status, color) => {
                const statusElement = document.getElementById(`status-cell-${file.id}`);
                if (statusElement) {
                    const statusClass = color === 'green' ? 'bg-green-200 text-green-800' : 
                                        color === 'blue' ? 'bg-blue-200 text-blue-800' : 
                                        color === 'red' ? 'bg-red-200 text-red-800' : 'bg-yellow-100 text-yellow-800';
                                        
                    file.status = status;
                    statusElement.innerHTML = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">${status}</span>`;
                }
            };

            updateStatus('Processando (Chunking)...', 'blue');

            while (offset < file.size) {
                const chunk = file.slice(offset, offset + CHUNK_SIZE);
                const chunkBase64 = await fileChunkToBase64(chunk);

                // --- SIMULAÇÃO DE UPLOAD REMOTO VIA JAVASCRIPT ---
                console.log(`--- Upload para ${uploadServer} [Chunk ${chunkIndex + 1}/${totalChunks}] ---`);
                console.log(`Arquivo ID: ${file.id}`);
                console.log(`Chunk Base64 (Início): ${chunkBase64.substring(0, 50)}...`);
                
                // *** Aqui é onde a chamada real `fetch` (remote javascript) para o endpoint do Django ocorreria. ***
                /*
                try {
                    const response = await fetch(uploadServer, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            file_id: file.id,
                            chunk_index: chunkIndex,
                            total_chunks: totalChunks,
                            chunk_data: chunkBase64,
                            file_name: file.name
                        })
                    });
                    if (!response.ok) throw new Error('Upload falhou');
                } catch (error) {
                    console.error("Erro ao enviar chunk:", error);
                    updateStatus('Erro no Upload', 'red');
                    return;
                }
                */
                // Simula um delay para visualização do processo
                await new Promise(resolve => setTimeout(resolve, 50)); 
                // --------------------------------------------------

                offset += CHUNK_SIZE;
                chunkIndex++;
                updateStatus(`Enviando Bloco ${chunkIndex} de ${totalChunks}`, 'yellow');
            }

            updateStatus('Completo!', 'green');
            console.log(`Upload do arquivo ${file.name} (ID: ${file.id}) SIMULADO: COMPLETO.`);
        }

        // 5. Converte o Blob (Chunk) para Base64
        function fileChunkToBase64(chunk) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Retorna apenas a string Base64 (depois da vírgula)
                    const base64String = reader.result.split(',')[1]; 
                    resolve(base64String);
                };
                reader.onerror = error => reject(error);
                reader.readAsDataURL(chunk);
            });
        }
