export function arrBuffToBase64(buffer) {
  let binary = '';
  let bytes = new Uint8Array( buffer );
  let len = bytes.byteLength;
  let i;
  for (i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[ i ]);
  }
  return window.btoa(binary);
}

export function uInt8ArrayToBase64(bytes) {
	let binary = '';
  let len = bytes.byteLength;
  let i;
  for (i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[ i ]);
  }
  return window.btoa(binary);
}

export function catEnglishToSpanish(category) {
    switch (category) {
      case 'gardening':
        return 'Jardinería';
      case 'carpentry':
        return 'Carpintería';
      case 'painting':
        return'Aplicación de Pintura';
      case 'electricity':
        return 'Electricista';
      case 'plumbing':
        return 'Fontanería';
      default:
        return'Categoría Inválida';
    }
}
