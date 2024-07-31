import { EmbedBuilder } from 'discord.js';

export default function AboutBot() {
    const reply = new EmbedBuilder()
        .setColor(0xdf6771)
        .setDescription(
            'A Tu Tu က​တော့ Discord မှာရှိတဲ့ မြန်မာ user ​တွေအကြား anonymously ချိတ်ဆက်​ပေးနိုင်မဲ့ Omegle လိုမျိုး matching လုပ်​ပေးနိုင်မဲ့ app ဖြစ်ပါတယ်။ User များသည် Bot ရဲ့ DM က​နေတစ်ဆင့်အခြား မြန်မာ user များနဲ့ anonymously ချိတ်ဆက်ကာစကား​ပြောနိုင်မှာပဲဖြစ်ပါတယ်။ ဒါ့အပြင် မိမိနဲ့ကိုက်ညီ​သော မြန်မာ Discord Server များကိုလည်း အလွယ်တကူ ရှာ​ဖွေနိုင်မှာဖြစ်ပါတယ်။'
        )
        .setImage(
            'https://us-east-1.tixte.net/uploads/ajax.tixte.co/AboutATuTuBot.png'
        )
        .setAuthor({
            name: 'မင်္ဂလာပါ။',
            iconURL:
                'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Folded%20hands/Default/3D/folded_hands_3d_default.png',
        });
    return { embeds: [reply] };
}
