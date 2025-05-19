function getCharTypes (){
    const uppercase = document.querySelector('#include-uppercase').checked;
    const lowercase = document.querySelector('#include-lowercase').checked;
    const number = document.querySelector('#include-number').checked;
    const specialCharacter = document.querySelector('#include-special-character').checked;

    const charTypes = [];
    if (uppercase){
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }

    if (lowercase){
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }
    
    if (number){
        charTypes.push('0123456789')
    }

    if (specialCharacter){
        charTypes.push('!@#$%&*()_-=+{}[]/?<>:;.,')
    }
    return charTypes;
}

function getPasswordSize () {
    const size = document.querySelector('#size').value;
    if(isNaN(size) || size < 4 || size > 128) {
        message('Tamanho inválido, digite um número entre 4 e 128!', '#dc2626')
    }

    return size;
}

function generatePassword(size, charTypes){
    let passwordGenerated = '';
    const selectedChars = charTypes.join('');

    // Ensure at least one character from each selected character type
    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    // Generate remaining characters randomly from the selected character types
    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    // Shuffle the password string to enhance randomness
    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    // Return the generated password
    return passwordGenerated;
}

function message(text, status = 'success') {
      Toastify({
            text: text, 
            duration : 3000,
            style: {
                background: status === 'success' ? '#84cc16': '#dc2626',
                boxShadow: 'none'
            }
        }).showToast();
}

document.querySelector('#generate').addEventListener('click', function(){
    const size = getPasswordSize();
    const charTypes = getCharTypes();

    if(!size){
        return;
    }
    
    if(!charTypes.length){
        message('Selecione pelo menos um tipo de caractere!', 'warning')
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);
    document.querySelector('#password-container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
})

document.querySelector('#copy').addEventListener('click', function(){
    navigator.clipboard.writeText(document.querySelector('#password').textContent)
    message('Senha copiada com sucesso!', 'success');
})