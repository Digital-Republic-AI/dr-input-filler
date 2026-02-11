// Utility functions for data generation

const DATA_TYPES = {
  FILL_CPF: 'fillCPF',
  FILL_CNPJ: 'fillCNPJ',
  FILL_RG: 'fillRG',
  FILL_EMAIL: 'fillEmail',
  FILL_NAME: 'fillName',
  FILL_CELULAR: 'fillCelular',
  FILL_LOREM: 'fillLorem',
};

const DATA_TYPE_LABELS = {
  [DATA_TYPES.FILL_CPF]: 'CPF',
  [DATA_TYPES.FILL_CNPJ]: 'CNPJ',
  [DATA_TYPES.FILL_RG]: 'RG',
  [DATA_TYPES.FILL_EMAIL]: 'Email',
  [DATA_TYPES.FILL_NAME]: 'Nome',
  [DATA_TYPES.FILL_CELULAR]: 'Celular',
  [DATA_TYPES.FILL_LOREM]: 'Lorem Ipsum',
};

const DEFAULT_SETTINGS = {
  notification: true,
  copy: true,
  cpf: { format: 'formatted' },
  cnpj: { format: 'formatted' },
  rg: { format: 'formatted' },
  name: { format: 'full' },
  celular: { format: 'formatted' },
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

class CNPJGenerator {
  static FIRST_DIGIT_MULTIPLIERS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  static SECOND_DIGIT_MULTIPLIERS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  static generateValidCNPJ() {
    const digits = [];
    for (let i = 0; i < 8; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    digits.push(0, 0, 0, 1);

    digits.push(CNPJGenerator._calculateCheckDigit(digits, CNPJGenerator.FIRST_DIGIT_MULTIPLIERS));
    digits.push(CNPJGenerator._calculateCheckDigit(digits, CNPJGenerator.SECOND_DIGIT_MULTIPLIERS));

    return digits.join('');
  }

  static _calculateCheckDigit(digits, multipliers) {
    let sum = 0;
    for (let i = 0; i < multipliers.length; i++) {
      sum += digits[i] * multipliers[i];
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  static formatCNPJ(cnpj) {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) return cnpj;
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}

class RGGenerator {
  static generateRG() {
    const digits = [];
    for (let i = 0; i < 8; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }

    let sum = 0;
    for (let i = 0; i < 8; i++) {
      sum += digits[i] * (2 + i);
    }
    const remainder = sum % 11;
    const checkDigit = remainder === 10 ? 'X' : String(remainder);
    digits.push(checkDigit);

    return digits.join('');
  }

  static formatRG(rg) {
    const clean = rg.replace(/[^\dXx]/g, '');
    if (clean.length !== 9) return rg;
    return clean.replace(/(\d{2})(\d{3})(\d{3})([\dXx])/, '$1.$2.$3-$4');
  }
}

class CelularGenerator {
  static DDD_CODES = [
    11, 12, 13, 14, 15, 16, 17, 18, 19,
    21, 22, 24, 27, 28,
    31, 32, 33, 34, 35, 37, 38,
    41, 42, 43, 44, 45, 46,
    47, 48, 49,
    51, 53, 54, 55,
    61, 62, 63, 64, 65, 66, 67, 68, 69,
    71, 73, 74, 75, 77, 79,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  static generate() {
    const ddd = CelularGenerator.DDD_CODES[Math.floor(Math.random() * CelularGenerator.DDD_CODES.length)];
    let number = '9';
    for (let i = 0; i < 8; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return `${ddd}${number}`;
  }

  static formatCelular(celular) {
    const clean = celular.replace(/\D/g, '');
    if (clean.length !== 11) return celular;
    return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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
