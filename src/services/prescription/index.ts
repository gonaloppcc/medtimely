import { Readable } from 'stream';

export async function decompressQRCode(code: string): Promise<string> {
    // Prescription QR codes are first base64-encoded, and then gzipped.
    // So our pipeline is base64decode -> ungzip -> parse

    // const decompressed = await inflate(code);
    // return decompressed;

    const ds = new DecompressionStream('gzip');
    const buf = Buffer.from(code, 'base64');
    const blob = new Blob([buf]);
    const decompressedStream = blob.stream().pipeThrough(ds);
    const reader: ReadableStreamDefaultReader<string> =
        decompressedStream.getReader();

    let contents: string[] = [];

    while (true) {
        let { done, value } = await reader.read();
        if (done) {
            break;
        } else {
            contents.push(value!);
        }
    }

    return contents.join('');
}
