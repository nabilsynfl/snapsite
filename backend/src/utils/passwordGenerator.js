// Fungsi untuk menghasilkan karakter acak dari string yang diberikan
function getRandomCharacter(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
  }
  
  // Fungsi untuk menghasilkan password dengan panjang tertentu
  function generatePassword(length) {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_-+=[]{}|;:,.<>?';
  
    let password = '';
  
    // Pastikan minimal panjang password adalah 8 karakter
    if (length < 8) {
      throw new Error('Panjang password harus minimal 8 karakter.');
    }
  
    // Tambahkan minimal satu karakter dari setiap kategori
    password += getRandomCharacter(uppercaseLetters);
    password += getRandomCharacter(lowercaseLetters);
    password += getRandomCharacter(numbers);
    password += getRandomCharacter(specialCharacters);
  
    // Tambahkan karakter lain hingga mencapai panjang yang diinginkan
    for (let i = 4; i < length; i++) {
      const characterSets = [uppercaseLetters, lowercaseLetters, numbers, specialCharacters];
      const randomSetIndex = Math.floor(Math.random() * characterSets.length);
      password += getRandomCharacter(characterSets[randomSetIndex]);
    }
  
    // Acak urutan karakter password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
  
    return password;
  }
  
  // Contoh penggunaan: generatePassword(12) akan menghasilkan password 12 karakter
  const password = generatePassword(12);
  console.log(password);
  