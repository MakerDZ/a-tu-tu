import { generate } from 'text-to-image';

export default async function TextToImage(text: string) {
    const dataUri = await generate(text, {
        bgColor: '#ffffff00',
        textColor: '#C0C0C1',
        fontSize: 13,
        fontWeight: 'normal',
        textAlign: 'left',
    });
    return dataUri;
}
