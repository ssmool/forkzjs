        class ForkzFormField extends HTMLElement {
            constructor() {
                super();
                this.input = null;
                this.errorElement = null;
                this.regexMap = {
                    'e-mail': /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    'telephon': /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/,
                    'mobile': /^\(\d{2}\)\s?9\d{4}-?\d{4}$/,
                    'site': /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
                    'number': /^\d+$/,
                    'text': /^\s*.+/, //
                    'password': /^.{8,}$/,
                    'currency': /^\d+(\,\d{2})?$/,
                    'empty': /.*/ //
                };
            }
            connectedCallback() {
                this.render();
                if (this.input) {
                    this.input.addEventListener('blur', this.validate.bind(this));
                    this.input.addEventListener('input', this.validate.bind(this));
                }
            }
            getRegex(regxKey) {
                const regex = this.regexMap[regxKey];
                if (regex) {
                    return regex;
                }
                try {
                    let pattern = regxKey.startsWith('/') && regxKey.endsWith('/') 
                                ? regxKey.slice(1, -1) 
                                : regxKey;
                    return new RegExp(pattern);
                } catch (e) {
                    console.error(`Regex inválida no atributo forkxregx: ${regxKey}`);
                    return this.regexMap['texto'];
                }
            }
            validate() {
                if (!this.input) return true;                
                const value = this.input.value.trim();
                const regxKey = this.getAttribute('forkxregx') || 'text';
                const required = regxKey !== 'empty';
                this.errorElement.textContent = '';
                this.input.classList.remove('border-red-500');
                if (required && value === '') {
                    this.errorElement.textContent = 'Throw: Empty field';
                    this.input.classList.add('border-red-500');
                    return false;
                }
                if (value !== '')
                    const regex = this.getRegex(regxKey);                    
                    if (!regex.test(value)) {
                        let errorMessage = `Invalid value, expected format: ${regxKey.toUpperCase()}.`;
                        this.errorElement.textContent = errorMessage;
                        this.input.classList.add('border-red-500');
                        return false;
                    }
                }
                return true;
            }
            render() {
                const fieldName = this.getAttribute('_forkx');
                const elementType = this.getAttribute('_orkz_kraftz') || 'input';
                const placeholder = this.getAttribute('placeholder') || '';
                this.innerHTML = '';
                this.input = document.createElement(elementType === 'password' || elementType === 'input' ? 'input' : elementType);
                this.input.className = 'forkz-input-base';
                this.input.setAttribute('id', fieldName);
                this.input.setAttribute('name', fieldName);
                this.input.setAttribute('placeholder', placeholder);
                if (elementType === 'input') {
                    this.input.setAttribute('type', 'text');
                } else if (elementType === 'password') {
                    this.input.setAttribute('type', 'password');
                }
                this.appendChild(this.input);
                this.errorElement = document.createElement('h6');
                this.errorElement.className = 'forkz-error';
                this.appendChild(this.errorElement);
            }
        }
        customElements.define('forkz-field', ForkzFormField);
        function loadFormData(data) {
            console.log("Loading data for editor bind:", data);            
            const customFields = document.querySelectorAll('forkz-field');
            customFields.forEach(field => {
                const key = field.getAttribute('_forkx');
                if (data[key] !== undefined) {
                    const inputElement = field.input; 
                    if (inputElement) {
                        inputElement.value = data[key];
                        field.validate(); 
                    }
                }
            });
            const genreSelect = document.getElementById('genre');
            if (genreSelect && data.genre !== undefined) {
                genreSelect.value = data.genre;
            }
            alert('Data loaded success! Form is done to edit.');
        }
        document.getElementById('movie-form').addEventListener('submit', function(e) {
            e.preventDefault();
            let isFormValid = true;
            const fields = this.querySelectorAll('forkz-field');
            fields.forEach(field => {
                if (!field.validate()) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                const formData = {};
                const formElements = this.elements;
                for (let i = 0; i < formElements.length; i++) {
                    const element = formElements[i];
                    if (element.name) {
                        formData[element.name] = element.value;
                    }
                }
                console.log('Valid Form. Data done to send json formatted:', formData);
                alert('[Success: (Verify the console output for JSON).');
            } else {
                console.error('Invalid Form. Verify marked errors.');
                alert('[Error: verify red fields checked.');
            }
        });
        document.getElementById('load-data-btn').addEventListener('click', () => {
             loadFormData(mockMovieData);
        });
