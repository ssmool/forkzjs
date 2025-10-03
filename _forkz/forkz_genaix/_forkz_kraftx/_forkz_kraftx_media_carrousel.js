        class ForkzImg extends HTMLElement {
            constructor() {
                super();
                this.currentData = [];
                this.mainMediaPlaceholder = null;
                this.thumbnailContainer = null;
            }
            connectedCallback() {
                this.dataPath = this.getAttribute('source');
                this.bound = this.getAttribute('bound') || 'square';
                this.pos = this.getAttribute('pos') || 'bottom';
                this.cartz = this.getAttribute('cartz') || 'horizontal';
                this.thumbsSize = parseInt(this.getAttribute('thumbs-size') || 80, 10);
                this.renderStructure();
                this.loadData();
            }
            loadData(_data) {
                const key = this.dataPath ? this.dataPath.replace(/\{\{|\}\}/g, '').trim().split('.')[1] : null;
                this.currentData = _data ? _data[key] : [];
                if (this.currentData.length > 0) {
                    this.populateGallery();
                } else {
                    this.innerHTML = `<p class="text-center text-red-400 mt-4">Throw: Can't load the content media font"${this.dataPath}".</p>`;
                }
            }
            getShapeClass(isMain = false) {
                switch (this.bound) {
                    case 'circle':
                        return 'rounded-full';
                    case 'corner': // 10px radius
                        return isMain ? 'rounded-xl' : 'rounded-[10px]';
                    case 'card':
                        return 'rounded-lg'; 
                    case 'square':
                    default:
                        return 'rounded-lg';
                }
            }
            renderStructure() {
                let wrapperClasses = 'flex gap-4';
                let mainImageClasses = 'flex-1';
                let thumbnailStripClasses = 'flex-shrink-0'; 
                if (this.pos === 'left' || this.pos === 'right') {
                    wrapperClasses += ' flex-row items-start';
                    thumbnailStripClasses += this.cartz === 'vertical' ? ' flex flex-col space-y-2' : ' flex flex-row space-x-2';
                    if (this.pos === 'left') {
                        wrapperClasses = wrapperClasses.replace('flex-row', 'flex-row-reverse');
                    }
                } 
                else { 
                    wrapperClasses += ' flex-col';
                    mainImageClasses += ' order-1';
                    thumbnailStripClasses += this.cartz === 'horizontal' ? ' flex flex-row space-x-2 overflow-x-auto p-2' : ' flex flex-col space-y-2 max-h-[300px] overflow-y-auto p-2';
                    if (this.pos === 'top') {
                        mainImageClasses += ' order-2';
                    } else { // default bottom
                         mainImageClasses += ' order-2';
                    }
                }
                this.innerHTML = `
                    <div class="${wrapperClasses}">
                        <div id="main-image-wrapper" class="${mainImageClasses}">
                            <!-- Placeholder para o media principal (img ou video) -->
                            <div id="main-media-placeholder" class="w-full ${this.getShapeClass(true)} overflow-hidden shadow-xl" style="aspect-ratio: 4/3; background-color: #2c3440;">
                                <p class="p-4 text-center text-gray-400">Choose a Thumbnail</p>
                            </div>
                            <h4 id="main-image-title" class="text-center mt-2 text-lg font-semibold text-teal-300"></h4>
                        </div>
                        <div id="thumbnail-strip" class="p-2 bg-gray-600 rounded-lg ${thumbnailStripClasses}">
                        </div>
                    </div>
                `;                
                this.mainMediaPlaceholder = this.querySelector('#main-media-placeholder');
                this.mainImageTitleElement = this.querySelector('#main-image-title');
                this.thumbnailContainer = this.querySelector('#thumbnail-strip');
            }
            populateGallery() {
                this.thumbnailContainer.innerHTML = '';                
                this.currentData.forEach((item, index) => {
                    const thumbWrapper = document.createElement('div');
                    thumbWrapper.className = `cursor-pointer relative ${this.bound === 'card' ? 'flex flex-col' : ''}`;
                    const isVideo = item.type === 'video';
                    const thumbnail = document.createElement('img');                    
                    if (isVideo) {
                        thumbnail.src = 'https://placehold.co/120x120/000/fff?text=MP4';
                        thumbnail.setAttribute('title', `Vídeo: ${item.title}`);
                    } else {
                        thumbnail.src = item.url;
                    }
                    thumbnail.alt = item.title;
                    thumbnail.dataset.url = item.url;
                    thumbnail.dataset.title = item.title;
                    thumbnail.dataset.index = index;
                    thumbnail.dataset.type = item.type;
                    thumbnail.className = `forkzimg-thumbnail-img ${this.getShapeClass()} shadow-md`;
                    thumbnail.style.width = `${this.thumbsSize}px`;
                    thumbnail.style.height = `${this.thumbsSize}px`;
                    thumbWrapper.appendChild(thumbnail);
                    if (isVideo) {
                        const playIcon = document.createElement('div');
                        playIcon.className = 'media-video-thumb-icon';
                        playIcon.textContent = '▶️';
                        thumbWrapper.appendChild(playIcon);
                    }
                    if (this.bound === 'card') {
                        const label = document.createElement('div');
                        label.className = 'forkzimg-card-label w-full';
                        label.textContent = item.title;
                        label.style.width = `${this.thumbsSize}px`; 
                        thumbWrapper.appendChild(label);
                    }
                    thumbnail.addEventListener('click', () => this.setMainImage(index));
                    this.thumbnailContainer.appendChild(thumbWrapper);
                });
                this.setMainImage(0);
            }
            setMainImage(index) {
                if (!this.currentData || this.currentData.length === 0) return;
                const selectedItem = this.currentData[index];
                const isVideo = selectedItem.type === 'video';
                this.mainMediaPlaceholder.innerHTML = ''; // Limpa o conteúdo anterior
                let mediaElement;
                if (isVideo) {
                    mediaElement = document.createElement('video');
                    mediaElement.setAttribute('controls', true);
                    mediaElement.setAttribute('loop', true); 
                    mediaElement.setAttribute('autoplay', true); // Inicia automaticamente
                    mediaElement.className = `forkzimg-main-media ${this.getShapeClass(true)}`;
                    mediaElement.innerHTML = `<source src="${selectedItem.url}" type="video/mp4"> Seu navegador não suporta vídeo.`;
                } else {
                    mediaElement = document.createElement('img');
                    mediaElement.src = selectedItem.url;
                    mediaElement.className = `forkzimg-main-media ${this.getShapeClass(true)}`;
                }
                mediaElement.alt = selectedItem.title;
                this.mainMediaPlaceholder.appendChild(mediaElement);
                this.mainImageTitleElement.textContent = selectedItem.title;
                this.thumbnailContainer.querySelectorAll('.forkzimg-thumbnail-img').forEach(img => {
                    img.classList.remove('active');
                });
                const activeThumb = this.thumbnailContainer.querySelector(`[data-index="${index}"]`);
                if (activeThumb) {
                    activeThumb.classList.add('active');
                    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }
        }
        customElements.define('forkz-img', ForkzImg); 
        class ForkzStrArr extends HTMLElement {
            connectedCallback() {
                const dataPath = this.getAttribute('fillz');
                if (!dataPath) return;
                const dataArray = this.evaluateDataPath(dataPath);
                if (!Array.isArray(dataArray)) {
                    this.innerHTML = `<h6 class="text-red-400">Throw: fillz="${dataPath}" can't return array.</h6>`;
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
                const key = path.replace(/\{\{|\}\}/g, '').trim().split('.')[1];
                return window.mockOlympicsData ? window.mockOlympicsData[key] : [];
            }
        }
        customElements.define('forkz-str-arr', ForkzStrArr); 
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
                            <p>Browser not support iframes.</p>
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
                            Browser not support a vídeo tag.
                        </video>`;
                } else if (type === 'audio') {
                    const fileName = title.replace(/\.(mp3|ogg)$/i, ''); 
                    mediaHTML = `
                        <div class="media-audio-embed bg-gray-700">
                            <span class="text-sm font-semibold text-green-300">🎵 Áudio File: ${fileName}</span>
                            <audio controls class="mt-2 w-full">
                                <source src="${url}" type="audio/mp3">
                            Browser not support a audio tag.
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
                this.editor.setAttribute('placeholder', this.getAttribute('content') || 'Digite seu texto rico aqui...');
                this.appendChild(this.editor);
                const galleryContainer = document.createElement('div');
                galleryContainer.className = 'mt-4 pt-4 border-t border-gray-600';
                galleryContainer.innerHTML = '<span class="text-sm font-medium text-gray-300 block mb-3">Midia Gallery (Click to Append or Preview):</span>';
                const gallery = document.createElement('div');
                gallery.className = 'flex flex-wrap gap-3';
                const assetsKey = this.getAttribute('_forkz_assets');
                const assets = assetsKey && window.mockOlympicsData ? window.mockOlympicsData[assetsKey] : [];
                const embedBtn = document.createElement('button');
                embedBtn.textContent = 'Embed URL Externa';
                embedBtn.className = 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs py-2 px-3 rounded-lg transition duration-200';
                embedBtn.onclick = () => {
                    const embedUrl = prompt("Append a URL to EMBED (ex: https://www.google.com/webhp?hl=pt-BR&igu=1):");
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
                    const thumbnail = document.createElement(isAudio ? 'img' : (isVideo ? 'video' : 'img'));
                    thumbnail.src = asset.url;
                    thumbnail.className = 'media-thumbnail rounded-[10px]';
                    if (isVideo) {
                        thumbnail.setAttribute('poster', 'https://placehold.co/80x80/000/fff?text=MP4');
                    } else if (isAudio) {
                         thumbnail.src = 'https://placehold.co/80x80/000/fff?text=MP3/OGG';
                    }
                    const icon = document.createElement('div');
                    icon.className = 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black bg-opacity-40 text-white text-xl rounded-[10px]';
                    icon.innerHTML = isAudio ? '🔊' : (isVideo ? '▶️' : '➕');
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
        customElements.define('forkz-str', ForkzStr); 
        window.mockOlympicsData = ''
        function loadNewsData(data) {
            console.log("Loading data:", data);            
            document.getElementById('article-title').textContent = data.title;
            document.getElementById('article-date').textContent = `Published: ${data.date}`;
            const forkzStr = document.querySelector('forkz-str[_forkx="main_content"]'); 
            if (forkzStr) {
                 const initialContent = `<p>News uploaded successfully! Click on the thumbnails below to insert media with positioning (left/right) or use the 'Embed URL' button.</p>`;
                 forkzStr.loadContent(initialContent);
            }
            const repContainer = document.getElementById('repetition-container');
            if (repContainer) {
                 repContainer.innerHTML = '';
                 const arrElement = document.createElement('forkz-str-arr'); 
                 arrElement.setAttribute('fillz', '{{_data.updates}}');
                 repContainer.appendChild(arrElement);
            }
            document.querySelectorAll('forkz-img').forEach(imgEl => {
                imgEl.loadData();
            });
            console.log('Data loaded, Galery Editor success loaded!');
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
                case 'twitter': 
                    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${articleTitle}`;
                    break;
                case 'instagram':
                    console.log('Sharing to Instagram requires API or app, notification simulation: News copied to clipboard!');
                    return;
                default:
                    return;
            }
            window.open(shareUrl, '_blank');
        }
        function exportTo(type) {
            const articleTitle = window.mockOlympicsData.title || 'Export success';   
            if (type === 'rss') {
                console.log('Simulating export to RSS format. This would generate an XML file with the news and metadata.');
            } else if (type === 'html') {
                const mainContent = document.querySelector('forkz-str[_forkx="main_content"] .forkzstr-editor').innerHTML;
                const htmlContent = `
<!DOCTYPE html>
<html>
<head><title>${articleTitle}</title></head>
<body>
    <h1>${articleTitle}</h1>
    ${mainContent}
    <p>Conteúdo exportado via forkz_lib.</p>
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
        window.onload = () => {
             document.querySelectorAll('forkz-img').forEach(imgEl => {
                 imgEl.loadData();
             });
        };
