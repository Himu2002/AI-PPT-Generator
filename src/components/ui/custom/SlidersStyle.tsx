import ProffessionalSlider from '../../../assets/professional.jpg';
import ModernGradientSlider from '../../../assets/modern-gradient.jpg';
import DarkSlider from '../../../assets/dark.jpg';
import PastelSlider from '../../../assets/pastel-ppt.jpg';
import MinWHiteSlider from '../../../assets/Minimalist-White.jpg';
import TechSlider from '../../../assets/tech.jpg';
import { useState } from 'react';


const Design_Styles = [
    {
        styleName: "Professional Blue 💼",
        colors: {
            primary: "#0A66C2",
            secondary: "#1C1C1C",
            accent: "#E8F0FE",
            background: "#FFFFFF",
            gradient: "linear-gradient(135deg, #0A66C2, #E8F0FE)",
        },
        designGuide: "🧠 Create a professional corporate-style presentation",
        icon: "Briefcase",
        bannerImage: ProffessionalSlider,
    },
    {
        styleName: "Modern Gradient 🌈",
        colors: {
            primary: "#1C1C1C",
            secondary: "#F5F5F5",
            accent: "#E0E0E0",
            background: "#FFFFFF",
            gradient: "linear-gradient(135deg, #FFFFFF, #F5F5F5)",
        },
        designGuide: "🧠 Create a clean and minimal presentation",
        icon: "Sparkles",
        bannerImage: ModernGradientSlider,
    },
    {
        styleName: "Elegant Dark 🌑",
        colors: {
            primary: "#0D0D0D",
            secondary: "#1F1F1F",
            accent: "#FFD700",
            background: "#0D0D0D",
            gradient: "linear-gradient(135deg, #0D0D0D, #1F1F1F)",
        },
        designGuide: "🧠 Create a luxury-style dark presentation",
        icon: "Star",
        bannerImage: DarkSlider,
    },
    {
        styleName: "Creative Pastel 🎨",
        colors: {
            primary: "#F6D6FF",
            secondary: "#D6F6FF",
            accent: "#FFD6E0",
            background: "#FFFFFF",
            gradient: "linear-gradient(135deg, #F6D6FF, #D6F6FF)",
        },
        designGuide: "🧠 Create a soft creative pastel presentation",
        icon: "Palette",
        bannerImage: PastelSlider,
    },
    {
        styleName: "Minimalist White ⚪",
        colors: {
            primary: "#007AFF",
            secondary: "#00C6FF",
            accent: "#FF9500",
            background: "#FFFFFF",
            gradient: "linear-gradient(135deg, #007AFF, #00C6FF)",
        },
        designGuide:
            "🧠 Design a sleek startup pitch deck with blue-orange theme",
        icon: "Rocket",
        bannerImage: MinWHiteSlider,
    },
    {
        styleName: "Startup Pitch 🚀",
        colors: {
            primary: "#00FFFF",
            secondary: "#FF00FF",
            accent: "#0A0A0A",
            background: "#1A1A1A",
            gradient: "linear-gradient(135deg, #00FFFF, #FF00FF)",
        },
        designGuide:
            "🧠 Generate a futuristic neon-style PPT with glowing effects",
        icon: "Zap",
        bannerImage: TechSlider,
    },
];

type Props = {
    selectStyle: any
}

export type DesignStyle = {
    styleName: string;
    colors: any,
    designGuide: string,
    icon: string,
    bannerImage: string
}

function SlidersStyle({ selectStyle }: Props) {
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

    return (
        <div className='mt-5 '>
            <h2 className='font-bold text-xl'>Select Slider Style</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                {Design_Styles.map((design, index) => (
                    <div key={index} className={`cursor-pointer border-2 rounded-2xl p-2 ${selectedStyle === design.styleName ? 'p-2 border-primary rounded-2xl' : 'border-transparent'}`}
                        onClick={() => { setSelectedStyle(design.styleName); selectStyle(design) }}>
                        <img src={design.bannerImage} alt={design.styleName}
                            width={300}
                            height={300}
                            className='w-full h-30 rounded-2xl object-cover hover:scale-105 transition-all'
                        />
                        <h2 className='font-medium text-center mt-2'>
                            {design.styleName}
                        </h2>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SlidersStyle