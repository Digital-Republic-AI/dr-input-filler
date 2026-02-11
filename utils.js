// Utility functions for data generation

const DATA_TYPES = {
  FILL_CPF: 'fillCPF',
  FILL_EMAIL: 'fillEmail',
  FILL_NAME: 'fillName',
  FILL_LOREM: 'fillLorem',
};

const DATA_TYPE_LABELS = {
  [DATA_TYPES.FILL_CPF]: 'CPF',
  [DATA_TYPES.FILL_EMAIL]: 'Email',
  [DATA_TYPES.FILL_NAME]: 'Nome',
  [DATA_TYPES.FILL_LOREM]: 'Lorem Ipsum',
};

const DEFAULT_SETTINGS = {
  notification: true,
  copy: true,
  cpf: { format: 'formatted' },
  name: { format: 'full' },
  lorem: { sentences: 2 },
};

class CPFGenerator {
  static generateValidCPF() {
    // Generate first 9 digits randomly
    const digits = [];
    for (let i = 0; i < 9; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }

    // Calculate first verification digit
    let sum = 0;
    let multiplier = 10;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * multiplier;
      multiplier--;
    }
    let remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;
    digits.push(firstDigit);

    // Calculate second verification digit
    sum = 0;
    multiplier = 11;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * multiplier;
      multiplier--;
    }
    remainder = sum % 11;
    const secondDigit = remainder < 2 ? 0 : 11 - remainder;
    digits.push(secondDigit);

    return digits.join('');
  }

  static formatCPF(cpf) {
    // Format CPF as XXX.XXX.XXX-XX
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      return cpf;
    }
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  static validateCPF(cpf) {
    // Remove formatting
    const cleanCPF = cpf.replace(/\D/g, '');

    // Check length
    if (cleanCPF.length !== 11) {
      return false;
    }

    // Check if all digits are the same (invalid)
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false;
    }

    // Validate first check digit
    let sum = 0;
    let multiplier = 10;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * multiplier;
      multiplier--;
    }
    let remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cleanCPF[9]) !== firstDigit) {
      return false;
    }

    // Validate second check digit
    sum = 0;
    multiplier = 11;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * multiplier;
      multiplier--;
    }
    remainder = sum % 11;
    const secondDigit = remainder < 2 ? 0 : 11 - remainder;

    return parseInt(cleanCPF[10]) === secondDigit;
  }
}

class EmailGenerator {
  static FIRST_NAMES = [
    'joao', 'maria', 'pedro', 'ana', 'lucas', 'julia', 'carlos', 'fernanda',
    'rafael', 'camila', 'bruno', 'larissa', 'gustavo', 'beatriz', 'diego',
    'amanda', 'thiago', 'leticia', 'andre', 'patricia',
  ];

  static LAST_NAMES = [
    'silva', 'santos', 'oliveira', 'souza', 'pereira', 'costa', 'rodrigues',
    'almeida', 'nascimento', 'lima', 'araujo', 'fernandes', 'barbosa', 'ribeiro',
    'martins', 'carvalho', 'gomes', 'rocha', 'monteiro', 'moreira',
  ];

  static DOMAINS = [
    'email.com', 'teste.com', 'exemplo.com.br', 'mail.com', 'provedor.com.br',
  ];

  static generate() {
    const first = EmailGenerator._pickRandom(EmailGenerator.FIRST_NAMES);
    const last = EmailGenerator._pickRandom(EmailGenerator.LAST_NAMES);
    const number = Math.floor(Math.random() * 100);
    const domain = EmailGenerator._pickRandom(EmailGenerator.DOMAINS);
    return `${first}.${last}${number}@${domain}`;
  }

  static _pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
}

class PersonNameGenerator {
  static FIRST_NAMES = [
    'Ana', 'Beatriz', 'Camila', 'Daniela', 'Fernanda', 'Gabriela', 'Helena',
    'Isabela', 'Julia', 'Larissa', 'Maria', 'Natalia', 'Patricia', 'Rafaela',
    'Sofia', 'Bruno', 'Carlos', 'Diego', 'Eduardo', 'Felipe', 'Gustavo',
    'Henrique', 'Igor', 'Joao', 'Lucas', 'Marcos', 'Pedro', 'Rafael',
    'Thiago', 'Vinicius',
  ];

  static LAST_NAMES = [
    'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues',
    'Almeida', 'Nascimento', 'Lima', 'Araujo', 'Fernandes', 'Barbosa',
    'Ribeiro', 'Martins', 'Carvalho', 'Gomes', 'Rocha', 'Monteiro', 'Moreira',
    'Teixeira', 'Vieira', 'Cardoso', 'Mendes', 'Correia', 'Nunes', 'Pinto',
    'Freitas', 'Machado', 'Lopes',
  ];

  static generate(format = 'full') {
    const first = PersonNameGenerator._pickRandom(PersonNameGenerator.FIRST_NAMES);
    const last = PersonNameGenerator._pickRandom(PersonNameGenerator.LAST_NAMES);

    const formatters = {
      full: () => `${first} ${last}`,
      first: () => first,
      last: () => last,
    };

    return (formatters[format] || formatters.full)();
  }

  static _pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
}

class LoremIpsumGenerator {
  static WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
    'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
    'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
    'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
    'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
    'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
    'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum',
  ];

  static MIN_WORDS_PER_SENTENCE = 6;
  static MAX_WORDS_PER_SENTENCE = 14;

  static generate(sentenceCount = 2) {
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(LoremIpsumGenerator._generateSentence());
    }
    return sentences.join(' ');
  }

  static _generateSentence() {
    const range = LoremIpsumGenerator.MAX_WORDS_PER_SENTENCE - LoremIpsumGenerator.MIN_WORDS_PER_SENTENCE;
    const wordCount = LoremIpsumGenerator.MIN_WORDS_PER_SENTENCE + Math.floor(Math.random() * (range + 1));
    const words = [];

    for (let i = 0; i < wordCount; i++) {
      const word = LoremIpsumGenerator.WORDS[Math.floor(Math.random() * LoremIpsumGenerator.WORDS.length)];
      words.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }

    return words.join(' ') + '.';
  }
}
