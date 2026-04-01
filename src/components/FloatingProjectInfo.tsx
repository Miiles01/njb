import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Participation } from "@/data/projects";

// Icons mapping
import EyeIcon from "@/assets/svgs/Eye.svg";
import BarIcon from "@/assets/svgs/bar-group-01.svg";
import StarIcon from "@/assets/svgs/star-01.svg";

const ICONS = {
    eye: EyeIcon,
    bar: BarIcon,
    star: StarIcon,
};

interface FloatingProjectInfoProps {
    participation: Participation[] | undefined;
    isVisible: boolean;
}

const FloatingProjectInfo = ({ participation, isVisible }: FloatingProjectInfoProps) => {
    const { t } = useLanguage();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [hasMoved, setHasMoved] = useState(false);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX + 20); // offset from cursor
            mouseY.set(e.clientY + 20);
            if (!hasMoved) setHasMoved(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY, hasMoved]);

    const [displayData, setDisplayData] = useState(participation);

    useEffect(() => {
        if (participation && participation.length > 0) {
            setDisplayData(participation);
        }
    }, [participation]);

    // Do not return null so the component stays mounted and tracks mouse variables
    // if (!displayData || displayData.length === 0) return null;

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                x,
                y,
                pointerEvents: "none",
                zIndex: 50,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: (isVisible && hasMoved) ? 1 : 0,
                scale: (isVisible && hasMoved) ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="hidden md:block" // Desktop only
        >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-black/5 min-w-[280px]">
                <h4 className="text-xs font-heading font-medium opacity-40 tracking-widest mb-4">
                    {t('projects.participation.title')}
                </h4>
                <div className="space-y-4">
                    {displayData?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center opacity-80">
                                <img src={ICONS[item.icon]} alt="" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-sm font-heading font-light tracking-tight text-black">
                                {t(item.textKey)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FloatingProjectInfo;
