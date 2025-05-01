"use client";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Navbar/Footer";
import { Caraousal } from "../components/Caraousal";
import ContactUs from "../contact/ContactUs";
import Marqueee from "../components/Marqueee";
import LeftImgAbout from "../about/LeftImgAbout";
import Members from "../about/Members";
import VideoSlider from "../components/VideoSlider";
import MapOfIndia from "../components/MapOfIndia";
import SpeedDiall from "../components/SpeedDial/SpeedDiall";

export default function Home() {
  return (
    <div className="Pathik-Main bg-[#ebd7a7]">
      <audio autoPlay loop muted>
        <source src="/skjbmd.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>




    <Navbar />
    <Caraousal/>
    <Marqueee/>
    <LeftImgAbout
  img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Iskon_Temple%2C_Vrindawan.jpg/1200px-Iskon_Temple%2C_Vrindawan.jpg"
  heading="हम कौन हैं?"
  description="कृष्ण जन्मभूमि मुक्ति दल एक सामाजिक और धार्मिक संगठन है, जिसका मुख्य उद्देश्य मथुरा में भगवान श्रीकृष्ण की वास्तविक जन्मस्थली को उसके प्राचीन स्वरूप में पुनः स्थापित करना है। यह संगठन विभिन्न धार्मिक, कानूनी, और सामाजिक स्तरों पर सक्रिय रूप से काम कर रहा है, ताकि ऐतिहासिक स्थलों की सुरक्षा सुनिश्चित की जा सके। हम केवल धार्मिक कार्यों तक सीमित नहीं हैं, बल्कि भारतीय संस्कृति और सनातन परंपराओं के संरक्षण के लिए भी प्रयासरत हैं। हमारा विश्वास है कि श्रीकृष्ण की जन्मभूमि का पुनरुद्धार सिर्फ एक धार्मिक कार्य नहीं, बल्कि भारत की गौरवशाली सांस्कृतिक विरासत को पुनर्स्थापित करने का एक प्रयास है।"

  readMore="/about"
/>

<Members/>
<VideoSlider/>
<MapOfIndia />
    <ContactUs/>
    <Footer />
    <SpeedDiall/>
  </div>
  );
}
