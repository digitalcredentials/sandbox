import {
	Encoder,
	QRAlphanumeric,
} from "@nuintun/qrcode";

export async function encodeToRawQrCodeUrl (document: object) {
	const qrcode = new Encoder();
	qrcode.setEncodingHint(true);
	qrcode.write(JSON.stringify(document));
	qrcode.make();
	return qrcode.toDataURL();
}
