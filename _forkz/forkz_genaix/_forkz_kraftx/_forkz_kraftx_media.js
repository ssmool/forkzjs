        // Mock data structure for Krafter Menu (Existing)
        const mockMenuData = [{ id: 1, label: "_nill", link: "_nill", icon: "_nill" },{id: 0,label: "_nil",link: "_nil;",icon: "_nill",subItems: [{ id: 0, label: "_nil", link: "_nil" },{id: 0,label: "_nill",link: "_nill",subItems: [{ id: 0, label: "_nill", link: "_nill" }]}]},];
         const mockPlaylistData = [{ id: 0, title: "_nill", type: '_nill', url: "_nill", duration: "0.00", poster: "_nill" }},];
        class ForksKrafter extends HTMLElement {
            constructor() {
                super();
                this.menuId = `krafter-${Math.random().toString(36).substr(2, 9)}`;
                this.menuData = mockMenuData;
                this.activeToggles = new Set();
            }
            connectedCallback() {
                this.render();
            }
            getAttr(name, defaultValue) {
                return this.getAttribute(name) || defaultValue;
            }
            render() {
                const position = this.getAttr('position', 'embedded');
                const type = this.getAttr('type', 'rounded');
                const orientation = this.getAttr('orientation', 'vertical');
                const background = this.getAttr('background', 'white');
                const isFloating = position !== 'embedded';
                let classes = ['forks_krafter', `krafter-${type}`, `krafter-${orientation}`];
                if (isFloating) {
                    classes.push('krafter-float', `krafter-${position.replace('-', '_')}`);
                }
                this.className = classes.join(' ');
                this.style.backgroundColor = background;
                const ul = this.createMenu(this.menuData);
                this.innerHTML = '';
                this.appendChild(ul);                
                this.removeEventListener('click', this.handleToggle.bind(this));
                this.addEventListener('click', this.handleToggle.bind(this));
                this.addEventListener('click', this.handleItemClick.bind(this));
            }
            createMenu(items) {
                const ul = document.createElement('ul');                
                items.forEach(item => {
                    const li = document.createElement('li');
                    if (item.subItems && item.subItems.length > 0) {
                        li.classList.add('krafter-has-submenu');
                        if (this.activeToggles.has(item.id)) {
                             li.classList.add('krafter-open');
                        }
                    }
                    const contentWrapper = document.createElement('div');
                    contentWrapper.className = 'krafter-item-wrapper';
                    const linkOrContent = document.createElement(item.link ? 'a' : 'div');
                    linkOrContent.className = 'krafter-item-content';
                    if (item.link) {
                        linkOrContent.setAttribute('href', item.link);
                    }
                    linkOrContent.innerHTML = `${item.icon || ''} ${item.label}`;
                    contentWrapper.appendChild(linkOrContent);
                    if (item.subItems && item.subItems.length > 0) {
                        const toggleButton = document.createElement('button');
                        toggleButton.className = 'krafter-toggle-btn';
                        toggleButton.setAttribute('data-item-id', item.id);
                        toggleButton.innerHTML = this.activeToggles.has(item.id) ? '−' : '+';
                        contentWrapper.appendChild(toggleButton);
                    }
                    li.appendChild(contentWrapper);
                    if (item.subItems && item.subItems.length > 0) {
                        const subUl = this.createMenu(item.subItems);
                        li.appendChild(subUl);
                    }                    
                    ul.appendChild(li);
                });
                return ul;
            }
            handleToggle(event) {
                const button = event.target.closest('.krafter-toggle-btn');
                if (!button) return;
                event.preventDefault();
                event.stopPropagation();
                const listItem = button.closest('li');
                const itemId = parseInt(button.getAttribute('data-item-id'));
                if (listItem.classList.contains('krafter-open')) {
                    listItem.classList.remove('krafter-open');
                    button.textContent = '+';
                    this.activeToggles.delete(itemId);
                } else {
                    listItem.classList.add('krafter-open');
                    button.textContent = '−';
                    this.activeToggles.add(itemId);
                }
            }
            handleItemClick(event) {
                 const item = event.target.closest('.krafter-item-content');
                 if (item && item.tagName === 'A') {
                    console.log(`Navegando para: ${item.getAttribute('href')}`);
                 }
                 const message = document.getElementById('message-box');
                 if (message) {
                    message.textContent = `Item do Menu Clicado: ${item.textContent.trim().split(' ')[0]}`;
                    message.classList.remove('hidden');
                    setTimeout(() => message.classList.add('hidden'), 2000);
                 }
            }
        }
        customElements.define('forks-krafter', ForksKrafter);
        class ForksMediaElement extends HTMLElement {
            constructor(mediaType) {
                super();
                this.mediaType = mediaType;
                this.currentTrackIndex = 0;
                this.playlistData = mockPlaylistData.filter(item => item.type === mediaType);
                this.isMinimized = false;
                this.isFirstLoad = true;
            }
            connectedCallback() {
                this.render();
            }
            getAttr(name, defaultValue) {
                return this.getAttribute(name) || defaultValue;
            }
            render() {
                const playerStyle = this.getAttr('player', 'rectangular'); // float or embedded
                const shapeStyle = this.getAttr('shape', 'rectangular'); // round, square, rectangular
                const playlistDisplay = this.getAttr('playlist', 'none');
                this.className = `forkz_media_player player-${shapeStyle}`;
                if (playerStyle === 'float') {
                    this.classList.add('player-float');
                    if (this.isMinimized) {
                        this.classList.add('minimized');
                    }
                } else {
                    this.classList.remove('player-float');
                    this.classList.remove('minimized');
                }
                this.innerHTML = '';
                const mediaWrapper = document.createElement('div');
                mediaWrapper.className = 'media-wrapper';
                const mediaElement = document.createElement(this.mediaType);
                mediaElement.setAttribute('controls', '');
                mediaElement.className = 'media-content';
                mediaElement.addEventListener('ended', this.playNextTrack.bind(this));
                this.mediaElement = mediaElement;                
                mediaWrapper.appendChild(mediaElement);
                this.appendChild(mediaWrapper);
                if (playerStyle === 'float') {
                    const floatControls = document.createElement('div');
                    floatControls.className = 'float-controls';                    
                    const minimizeBtn = this.createButton('−', 'float-btn float-btn-minimize', this.toggleMinimize.bind(this));
                    const maximizeBtn = this.createButton('+', 'float-btn float-btn-maximize', this.toggleMinimize.bind(this));
                    floatControls.appendChild(minimizeBtn);
                    floatControls.appendChild(maximizeBtn);
                    mediaWrapper.appendChild(floatControls);
                    if (this.isMinimized) {
                         mediaWrapper.addEventListener('click', this.toggleMinimize.bind(this));
                    }
                }
                if (playlistDisplay === 'display' && this.playlistData.length > 0) {
                    const playlist = this.createPlaylist();
                    this.appendChild(playlist);
                }
                this.loadTrack(this.currentTrackIndex);
            }
            createButton(text, className, handler) {
                const btn = document.createElement('button');
                btn.textContent = text;
                btn.className = className;
                btn.addEventListener('click', handler);
                return btn;
            }
            toggleMinimize(event) {
                if (event) {
                    event.stopPropagation();
                }
                this.isMinimized = !this.isMinimized;
                this.render(); // Re-render to apply classes
            }
            createPlaylist() {
                const ul = document.createElement('ul');
                ul.className = 'forkz-playlist';
                ul.setAttribute('forkz_lib', 'catalag_movies');
                this.playlistData.forEach((item, index) => {
                    const li = document.createElement('li');
                    li.setAttribute('_forkx', '_data');
                    li.textContent = `${item.title} (${item.duration})`;
                    li.setAttribute('data-index', index);
                    if (index === this.currentTrackIndex) {
                        li.classList.add('active');
                    }
                    li.addEventListener('click', () => {
                        this.loadTrack(index);
                    });
                    ul.appendChild(li);
                });
                return ul;
            }
            loadTrack(index) {
                if (index < 0 || index >= this.playlistData.length) return;                
                this.currentTrackIndex = index;
                const track = this.playlistData[index];
                this.mediaElement.setAttribute('src', track.url);                
                if (this.mediaType === 'video' && track.poster) {
                    this.mediaElement.setAttribute('poster', track.poster);
                }
                this.mediaElement.load();
                const message = document.getElementById('message-box');
                const shouldAttemptPlay = !this.isFirstLoad;                
                if (this.isFirstLoad) {
                    this.isFirstLoad = false;                }
                if (shouldAttemptPlay) {
                    this.mediaElement.play().then(() => {
                        if (message) {
                            message.textContent = `Playing: ${track.title}`;
                            message.classList.remove('hidden', 'bg-red-600');
                            message.classList.add('bg-indigo-600');
                            setTimeout(() => message.classList.add('hidden'), 2000);
                        }
                    }).catch(error => {
                        console.error("Throw automatic play start (Autoplay denied):", error);
                        if (message) {
                            message.textContent = `Automatic play denied. Start with playe option manual or choose a playlist item to listening.`;
                            message.classList.remove('hidden', 'bg-indigo-600');
                            message.classList.add('bg-red-600');
                            setTimeout(() => {
                                message.classList.add('hidden');
                                message.classList.remove('bg-red-600');
                                message.classList.add('bg-indigo-600');
                            }, 4000);
                        }
                    });
                } else {
                    if (message) {
                         message.textContent = `Midia loaded. Click on the player to listening.`;
                         message.classList.remove('hidden', 'bg-red-600');
                         message.classList.add('bg-indigo-600');
                         setTimeout(() => message.classList.add('hidden'), 2000);
                    }
                }
                const playlistElement = this.querySelector('.forkz-playlist');
                if (playlistElement) {
                    this.querySelectorAll('.forkz-playlist li').forEach(li => {
                        li.classList.remove('active');
                    });                    
                    const activeItem = this.querySelector(`[data-index="${index}"]`);
                    if (activeItem) {
                        activeItem.classList.add('active');
                    }
                }
            }
            playNextTrack() {
                let nextIndex = this.currentTrackIndex + 1;
                if (nextIndex >= this.playlistData.length) {
                    nextIndex = 0; // Loop to first track
                }
                this.loadTrack(nextIndex);
            }
        }
        class ForksVideo extends ForksMediaElement {
            constructor() {
                super('video');
            }
        }        
        class ForksAudio extends ForksMediaElement {
            constructor() {
                super('audio');
            }
        }
        customElements.define('forkz-video', ForksVideo);
        customElements.define('forkz-audio', ForksAudio);
