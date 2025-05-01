import React from "react";
import Image from "next/image";
import 'animate.css';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";

const objectives = [
  {
    title: "वृद्धाश्रम",
    description: "लोगों को रोजगार देना एवं प्रशिक्षण देना।",
    icon: "/ourwork/vridhashram.png",
  },
  {
    title: "कंबल वितरण",
    description: "गरीबों में समय-समय पर कंबल का वितरण करना।",
    icon: "/ourwork/blanket.png",
  },
  {
    title: "सामूहिक भोज",
    description: "समय-समय पर सामूहिक भोज का आयोजन।",
    icon: "/ourwork/feast.png",
  },
  {
    title: "गौ सेवा",
    description: "गौ माता की सेवा करना एवं गौशाला का विकास।",
    icon: "/ourwork/cow.png",
  },
  {
    title: "गुरुकुल व शिक्षा",
    description: "गुरुकुल बनाना, उसका विकास और शिक्षा के क्षेत्र में कार्य करना।",
    icon: "/ourwork/gurukul.png",
  },
  {
    title: "संतों का प्रचार",
    description: "संतों के कार्यों और विचारों का प्रचार-प्रसार करना।",
    icon: "/ourwork/saint.png",
  },
  {
    title: "जनजागरूकता",
    description: "स्वास्थ्य, शिक्षा तथा अपने अधिकारों के सम्बंध में लोगों को जागरूक करना।",
    icon: "/ourwork/awareness.png",
  },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#ebd7a7] flex flex-col justify-center items-center text-center px-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#6b240c] mb-4 animate__animated animate__fadeInDown">
          हमारे कार्य
        </h1>

        <p className="text-xl text-[#3e3e3e] mb-8 max-w-2xl animate__animated animate__fadeIn">
          हम अपने उद्देश्यों की पूर्ति की दिशा में लगातार कार्य कर रहे हैं। हमारा प्रयास है कि
          श्रीकृष्ण जन्मभूमि की वास्तविकता को सबके सामने लाया जाए और सनातन संस्कृति को संजोया जाए |
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full px-4">
          {objectives.map((obj, index) => (
            <div
              key={index}
              className="bg-[#fffaf0] border border-[#d1a464] rounded-xl p-6 shadow-md flex flex-col items-center animate__animated animate__zoomIn"
            >
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src={obj.icon}
                  alt={obj.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h2 className="text-xl font-bold text-[#6b240c] mb-2">{obj.title}</h2>
              <p className="text-[#3e3e3e]">{obj.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#fffaf0] shadow-lg border border-[#d1a464] rounded-xl p-8 text-[#3e3e3e] animate__animated animate__fadeInUp max-w-5xl text-justify">
          <h2 className="text-3xl font-bold text-[#6b240c] mb-4 text-center">हमारा दृष्टिकोण और प्रतिबद्धता</h2>
          <p className="mb-4 text-lg leading-relaxed">
            हमारा उद्देश्य केवल सेवा करना नहीं, बल्कि समाज को उसकी जड़ों से जोड़ना है। हम यह मानते हैं कि जब तक समाज के हर वर्ग — वृद्ध, गरीब, संत, विद्यार्थी और गौमाता — को सम्मान और सहायता नहीं मिलेगी,
            तब तक सच्चे अर्थों में सांस्कृतिक जागृति संभव नहीं है।
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            वृद्धाश्रमों में रह रहे बुज़ुर्गों को रोज़गार और प्रशिक्षण देकर हम उन्हें फिर से आत्मनिर्भर बनाने का प्रयास कर रहे हैं।
            इसी तरह, ठंड में कंबल वितरण से लेकर समय-समय पर भोजन सेवा तक, हर प्रयास में हमारा एक ही मकसद है — "सेवा ही धर्म है"।
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            गौसेवा, गुरुकुल की स्थापना, शिक्षा का प्रचार, संतों के विचारों का प्रसार,
            एवं लोगों को स्वास्थ्य, शिक्षा तथा अपने अधिकारों के प्रति जागरूक करना — ये केवल कार्य नहीं,
            बल्कि हमारे विश्वास हैं जो सनातन संस्कृति को पुनः जीवित करने में सहायक बनेंगे।
          </p>
          <p className="text-lg font-medium leading-relaxed text-center text-[#6b240c] mt-6">
            हम आपके सहयोग और आशीर्वाद के साथ इस यात्रा को आगे बढ़ा रहे हैं।
            आइए, मिलकर एक ऐसा भारत बनाएं जो परंपरा में रचा-बसा हो और प्रगति की ओर अग्रसर हो।
          </p>
        </div>

        {/* श्री कृष्ण जन्म भूमि मुक्ति दल Section */}
        <div className="mt-12 bg-[#fff0e0] shadow-lg border border-[#d1a464] rounded-xl p-8 text-[#3e3e3e] animate__animated animate__fadeInUp max-w-5xl text-justify">
          <h2 className="text-3xl font-bold text-[#6b240c] mb-4 text-center">श्री कृष्ण जन्म भूमि मुक्ति दल</h2>

          <p className="text-xl font-semibold text-center text-[#6b240c] mb-6">
            "अहिंसा परमो धर्म, धर्म हिंसा तथैव चः"
          </p>

          <h3 className="text-2xl font-bold text-[#6b240c] mb-4">श्री कृष्ण जन्म भूमि मुक्ति दल का संकल्प:</h3>

          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>गौ हत्या पर पूर्ण प्रतिबंध कराना।</li>
            <li>श्री कृषण जन्मभूमि तथा श्री काशी विश्वनाथ सहित सभी सनातन के मंदिरों व प्रतीक चिन्हों को मुक्त कराना।</li>
            <li>सभी मंदिरों को सरकारी नियंत्रण से मुक्त कराकर वैदिक बोर्ड का गठन करवाना।</li>
            <li>भारत को हिंदू राष्ट्र घोषित कराना तथा हिंदू राष्ट्र का नया संविधान बनवाना।</li>
            <li>ग्राम स्तर पर पुजारी नियुक्त करना, मंदिरों का जीर्णोद्धार करना और जहां मंदिर नहीं हैं वहां नए मंदिरों का निर्माण करना।</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}