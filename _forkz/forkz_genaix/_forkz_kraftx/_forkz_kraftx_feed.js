    <script>
        class ForkzStrArr extends HTMLElement {
            connectedCallback() {
                const dataPath = this.getAttribute('fillz');
                if (!dataPath) return;

                const dataArray = this.evaluateDataPath(dataPath);
                if (!Array.isArray(dataArray)) {
                    this.innerHTML = `<h6 class="text-red-400">Throw: fillz="${dataPath}" não retornou um array.</h6>`;
                    return;
                }

                this.innerHTML = '';
                dataArray.forEach(item => {
                    const itemContainer = document.createElement('div');
                    itemContainer.className = 'border border-gray-600 p-3 rounded-md mb-3';
                    const titleElement = document.createElement('h4');
                    titleElement.className = 'text-lg font-semibold text-indigo-300 mb-2';
                    titleElement.textContent = `[ID: ${item.node_id}] ${item.title}`;
                    itemContainer.appendChild(titleElement);
                    const forkzStrInstance = document.createElement('forkz-str'); 
                    forkzStrInstance.setAttribute('_forkx', `update-${item.node_id}`);
                    forkzStrInstance.setAttribute('content', item.content);
                    forkzStrInstance.setAttribute('_forkz_assets', 'assets'); 
                    itemContainer.appendChild(forkzStrInstance);
                    this.appendChild(itemContainer);
                    setTimeout(() => forkzStrInstance.loadContent(item.content), 0);
                });
            }
            evaluateDataPath(path) {
                // Remove {{ }}
                const key = path.replace(/\{\{|\}\}/g, '').trim().split('.')[1];
                return window.mockOlympicsData ? window.mockOlympicsData[key] : [];
            }
        }
        customElements.define('forkz-str-arr', ForkzStrArr); // CORREÇÃO: Adicionado hífen
        class ForkzStr extends HTMLElement {
            constructor() {
                super();
                this.editor = null;
                this.currentFontSize = 16;
                this.popup = null;
            }
            connectedCallback() {
                this.render();
                const initialContent = this.getAttribute('content');
                if (initialContent && this.editor) {
                    this.loadContent(initialContent);
                }
            }
            loadContent(content) {
                 if (this.editor) {
                    this.editor.innerHTML = content;
                 }
            }
            handleFontSize(increase) {
                if (!this.editor) return;
                const step = 2;
                this.currentFontSize = increase 
                    ? Math.min(this.currentFontSize + step, 30) 
                    : Math.max(this.currentFontSize - step, 12); 
                this.editor.style.fontSize = `${this.currentFontSize}px`;
            }
            insertEmbed(url) {
                if (!this.editor) return;
                
                let embedHTML = `
                    <div class="media-embed-url my-4">
                        <span class="text-sm font-semibold text-yellow-300 block mb-2">🔗 URL EMBED: ${url.substring(0, 50)}...</span>
                        <iframe src="${url}" width="100%" height="250" style="border:none; border-radius: 5px;">
                            <p>Browser Version not support iframes.</p>
                        </iframe>
                    </div>
                `;
                document.execCommand('insertHTML', false, embedHTML);
            }
            insertMedia(url, type, title, position, shape) {
                if (!this.editor) return;
                let mediaHTML = '';
                let alignmentClass = '';
                let shapeClass = '';
                if (position === 'left' || position === 'right') {
                    alignmentClass = `float-${position} mr-4 ml-4 mb-2`; 
                } else if (position === 'top' || position === 'bottom') {
                    alignmentClass = 'block mx-auto mb-2';
                }
                if (shape === 'circulo') {
                    shapeClass = 'rounded-full';
                } else if (shape === 'rounde-10px') {
                    shapeClass = 'rounded-[10px]';
                } else {
                    shapeClass = 'rounded-lg';
                }                
                const finalClasses = `max-w-[300px] w-auto h-auto ${alignmentClass} ${shapeClass} shadow-lg`;
                if (type === 'image') {
                    mediaHTML = `<img src="${url}" alt="${title}" title="${title}" class="${finalClasses}" />`;
                } else if (type === 'video') {
                    mediaHTML = `
                        <video controls class="${finalClasses}">
                            <source src="${url}" type="video/mp4">
                            Browser not support tag video
                        </video>`;
                } else if (type === 'audio') {
                    const fileName = title.replace(/\.(mp3|ogg)$/i, '');
                    mediaHTML = `
                        <div class="media-audio-embed bg-gray-700">
                            <span class="text-sm font-semibold text-green-300">🎵 File Audio: ${fileName}</span>
                            <audio controls class="mt-2 w-full">
                                <source src="${url}" type="audio/mp3">
                                Browser not support tag audio
                            </audio>
                        </div>`;
                }
                document.execCommand('insertHTML', false, mediaHTML);
            }
            showPopup(url, type, title) {
                if (this.popup) this.popup.remove();
                const isVideo = type === 'video';                
                const content = document.createElement('div');
                content.className = 'popup-content';
                content.innerHTML = `
                    <h3 class="text-xl font-semibold mb-3 text-white">${title}</h3>
                    ${isVideo 
                        ? `<video controls class="popup-media" style="max-width: 600px; max-height: 400px;"><source src="${url}" type="video/mp4"></video>`
                        : `<img src="${url}" alt="${title}" class="popup-media" style="max-width: 600px; max-height: 400px;"/>`
                    }
                    <div class="flex justify-between items-center mt-4">
                        <a href="${url}" download="${title}.${isVideo ? 'mp4' : 'jpg'}" 
                           class="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                        </a>
                        <button class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md" onclick="this.closest('.popup-overlay').remove()">Fechar</button>
                    </div>
                `;
                this.popup = document.createElement('div');
                this.popup.className = 'popup-overlay';
                this.popup.addEventListener('click', (e) => {
                    if (e.target === this.popup) this.popup.remove();
                });
                this.popup.appendChild(content);
                document.body.appendChild(this.popup);
            }
            render() {
                const controls = document.createElement('div');
                controls.className = 'flex justify-between items-center mb-2';
                controls.innerHTML = `
                    <span class="text-sm text-gray-400">Controles de Fonte:</span>
                    <div class="space-x-2">
                        <button id="font-minus" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-full text-lg shadow-md">-</button>
                        <button id="font-plus" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-full text-lg shadow-md">+</button>
                    </div>
                `;
                this.appendChild(controls);
                this.editor = document.createElement('div');
                this.editor.className = 'forkzstr-editor focus:border-indigo-500 transition duration-150';
                this.editor.setAttribute('contenteditable', 'true');
                this.editor.setAttribute('spellcheck', 'false');
                this.editor.setAttribute('placeholder', this.getAttribute('content') || 'RIA HTML TEXT EDITOR');
                this.appendChild(this.editor);
                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'mt-4 pt-4 border-t border-gray-600';
                galleryContainer.innerHTML = '<span class="text-sm font-medium text-gray-300 block mb-3">Galeria de Mídia (Click for Append Midia or Preview):</span>';
                const gallery = document.createElement('div');
                gallery.className = 'flex flex-wrap gap-3';
                const assetsKey = this.getAttribute('_forkz_assets');
                const assets = assetsKey && window.mockOlympicsData ? window.mockOlympicsData[assetsKey] : [];
                const embedBtn = document.createElement('button');
                embedBtn.textContent = 'Embed External URL';
                embedBtn.className = 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs py-2 px-3 rounded-lg transition duration-200';
                embedBtn.onclick = () => {
                    const embedUrl = prompt("Append URL EMBED (ex: https://www.google.com/webhp?hl=pt-BR&igu=1):");
                    if (embedUrl) {
                        this.insertEmbed(embedUrl);
                    }
                };
                galleryContainer.appendChild(embedBtn);
                galleryContainer.appendChild(document.createElement('div')).className = 'h-3';
                galleryContainer.appendChild(gallery);
                assets.forEach(asset => {
                    const item = document.createElement('div');
                    item.className = 'relative group';                    
                    const isVideo = asset.type === 'video';
                    const isAudio = asset.type === 'audio';
                    const thumbnail = document.createElement(isVideo ? 'video' : 'img');
                    thumbnail.src = asset.url;
                    thumbnail.className = 'media-thumbnail rounded-[10px]';
                    if (isVideo) {
                        thumbnail.setAttribute('poster', 'https://placehold.co/80x80/000/fff?text=MP4');
                    } else if (isAudio) {
                         thumbnail.src = 'https://placehold.co/80x80/000/fff?text=MP3/OGG';
                    }
                    const icon = document.createElement('div');
                    icon.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black bg-opacity-40 text-white text-xl rounded-[10px]';
                    icon.innerHTML = isAudio ? '🔊' : '➕';                    
                    item.appendChild(thumbnail);
                    item.appendChild(icon);
                    item.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (isAudio) {
                            this.insertMedia(asset.url, asset.type, asset.title, 'left', 'rounde-10px');
                        } else if (asset.type === 'image' || isVideo) {
                            this.insertMedia(asset.url, asset.type, asset.title, asset.position, asset.shape);
                            this.showPopup(asset.url, asset.type, asset.title);
                        }
                    });                    
                    gallery.appendChild(item);
                });
                this.appendChild(galleryContainer);
                this.querySelector('#font-plus').addEventListener('click', () => this.handleFontSize(true));
                this.querySelector('#font-minus').addEventListener('click', () => this.handleFontSize(false));
            }
        }
        customElements.define('forkz-str', ForkzStr); // CORREÇÃO: Adicionado hífen
        function loadNewsData(data) {
            console.log("Simulando carregamento de dados da notícia:", data);
            document.getElementById('article-title').textContent = data.title;
            document.getElementById('article-date').textContent = `Publicado em: ${data.date}`;
            const forkzStr = document.querySelector('forkz-str[_forkx="main_content"]'); // CORREÇÃO: Usando a nova tag
            if (forkzStr) {
                 const initialContent = forkzStr
            }
            const repContainer = document.getElementById('repetition-container');
            if (repContainer) {
                 repContainer.innerHTML = '';
                 const arrElement = document.createElement('forkz-str-arr');
                 arrElement.setAttribute('fillz', '{{_data.updates}}');
                 repContainer.appendChild(arrElement);
            }
            alert('[SUCCESS - Data loaded success and binded...]');
        }
        function share(platform) {
            const articleTitle = encodeURIComponent(document.getElementById('article-title').textContent);
            const currentUrl = encodeURIComponent(window.location.href);
            let shareUrl = '';
            switch(platform) {
                case 'mailto':
                    shareUrl = `mailto:?subject=${articleTitle}&body=Confira esta notícia: ${articleTitle}%0A%0A${currentUrl}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&quote=${articleTitle}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${articleTitle}`;
                    break;
                case 'twitter': // Novo X
                    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${articleTitle}`;
                    break;
                case 'instagram':
                    alert('ADD INSTAGRAM API SHARE TO CASE FOR SHARE');
                    return;
                default:
                    return;
            }
            window.open(shareUrl, '_blank');
        }
        function exportTo(type) {
            const articleTitle = window.mockOlympicsData.title || 'Content Export';
            if (type === 'rss') {
                alert('Exposrte Simulator for Feed RSS');
            } else if (type === 'html') {
                const mainContent = document.querySelector('forkz-str[_forkx="main_content"] .forkzstr-editor').innerHTML; // CORREÇÃO: Usando a nova tag
                const htmlContent = `
<!DOCTYPE html>
<html>
<head><title>${articleTitle}</title></head>
<body>
    <h1>${articleTitle}</h1>
    ${mainContent}
    <p>Exported content by forkz_lib.</p>
</body>
</html>`;
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = articleTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }
        document.getElementById('load-data-btn').addEventListener('click', () => {
             loadNewsData(window.mockOlympicsData);
        });
