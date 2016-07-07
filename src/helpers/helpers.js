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
