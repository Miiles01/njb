import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
    { text: "Ventas", type: "pill" },
    { text: "Marketing", type: "circle" },
    { text: "Customer Experience", type: "pill" },
    { text: "Funnels", type: "pill" },
    { text: "CRM", type: "circle" },
    { text: "Vibe Coding", type: "pill" },
    { text: "Branding", type: "pill" },
    { text: "Automatización con IA", type: "pill" }
];

const SkillsGravity = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Engine
        const engine = Matter.Engine.create();
        engineRef.current = engine;
        const { world } = engine;
        engine.gravity.y = 1.2;

        const getDimensions = () => ({
            width: containerRef.current?.offsetWidth || 0,
            height: containerRef.current?.offsetHeight || 0
        });

        let { width, height } = getDimensions();

        // 1. "Safe Zone" Boundary Calculation
        const THICKNESS = 1000;
        const DESKTOP_H = 64;
        const MOBILE_H = 48;
        const SAFE_PADDING = window.innerWidth < 768 ? 30 : 60;

        const currentTagH = window.innerWidth < 768 ? MOBILE_H : DESKTOP_H;

        // Ground and wall insets to prevent visual clipping
        const groundY = height - (currentTagH / 2) - SAFE_PADDING;
        const wallInset = SAFE_PADDING + 40;

        const ground = Matter.Bodies.rectangle(width / 2, groundY + THICKNESS / 2, width * 10, THICKNESS, { isStatic: true });
        const wallLeft = Matter.Bodies.rectangle(-THICKNESS / 2 + wallInset, height / 2, THICKNESS, height * 10, { isStatic: true });
        const wallRight = Matter.Bodies.rectangle(width + THICKNESS / 2 - wallInset, height / 2, THICKNESS, height * 10, { isStatic: true });
        const ceiling = Matter.Bodies.rectangle(width / 2, -2000, width * 10, THICKNESS, { isStatic: true });

        Matter.World.add(world, [ground, wallLeft, wallRight, ceiling]);

        // 2. Create Mixed Skill Bodies (Aligning with Matter.js Mixed Demo)
        const skillBodies = SKILLS.map((skill, index) => {
            const isMobile = window.innerWidth < 768;
            const fontSize = isMobile ? 18 : 22;
            const x = (width * 0.2) + (Math.random() * (width * 0.6));
            const y = -200 - (index * 150);

            let body, w, h;

            if (skill.type === "circle") {
                const radius = isMobile ? 50 : 70;
                body = Matter.Bodies.circle(x, y, radius, {
                    restitution: 0.85, // Highly bouncy
                    friction: 0.05,
                    density: 0.002,
                });
                w = h = radius * 2;
            } else {
                w = skill.text.length * (fontSize * 0.6) + (isMobile ? 50 : 80);
                h = currentTagH;
                body = Matter.Bodies.rectangle(x, y, w, h, {
                    restitution: 0.75, // Bouncy but stable
                    friction: 0.08,
                    density: 0.002,
                    chamfer: { radius: h / 2 }
                });
            }

            return { body, id: index, type: skill.type, w, h };
        });

        Matter.World.add(world, skillBodies.map(b => b.body));

        // 3. Mouse Interaction & Hard Constraint
        const mouse = Matter.Mouse.create(containerRef.current);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.15,
                render: { visible: false }
            }
        });

        Matter.World.add(world, mouseConstraint);

        // EXTRA: Mouse Clipping Magic (Prevents dragging elements through walls)
        Matter.Events.on(engine, 'beforeUpdate', () => {
            if (mouse.position.x < wallInset) mouse.position.x = wallInset;
            if (mouse.position.x > width - wallInset) mouse.position.x = width - wallInset;
            if (mouse.position.y > groundY) mouse.position.y = groundY;
        });

        const runner = Matter.Runner.create();
        runnerRef.current = runner;

        // 4. Smooth Sync Function
        const updateDOM = () => {
            skillBodies.forEach((item, index) => {
                const domElement = itemRefs.current[index];
                if (domElement) {
                    const { x, y } = item.body.position;
                    const angle = item.body.angle;
                    domElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
                }
            });
        };

        Matter.Events.on(engine, 'afterUpdate', updateDOM);

        const handleResize = () => {
            if (!containerRef.current) return;
            const newDim = getDimensions();
            const tagH = window.innerWidth < 768 ? MOBILE_H : DESKTOP_H;
            const pad = window.innerWidth < 768 ? 30 : 60;
            const winset = pad + 40;

            Matter.Body.setPosition(ground, { x: newDim.width / 2, y: newDim.height - (tagH / 2) - pad + THICKNESS / 2 });
            Matter.Body.setPosition(wallLeft, { x: -THICKNESS / 2 + winset, y: newDim.height / 2 });
            Matter.Body.setPosition(wallRight, { x: newDim.width + THICKNESS / 2 - winset, y: newDim.height / 2 });
        };

        window.addEventListener('resize', handleResize);

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 85%",
            onEnter: () => {
                Matter.Runner.run(runner, engine);
            },
            once: true
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            Matter.Events.off(engine, 'afterUpdate', updateDOM);
            Matter.World.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, []);

    return (
        <div className="mb-48 pt-32 px-4 md:px-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-12 text-center dynamic-text tracking-tighter leading-none">
                Mis principales enfoques
            </h2>

            <div
                ref={containerRef}
                id="contenedor-gravedad"
                style={{ borderRadius: "50px" }}
                className="w-full h-[65vh] md:h-[80vh] bg-secondary/5 border border-border/10 overflow-hidden relative cursor-grab active:cursor-grabbing shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)]"
            >
                {/* Visual Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] bg-[length:48px_48px]" />
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    {SKILLS.map((skill, index) => (
                        <div
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                transform: "translate(-50%, -1000px)",
                                width: skill.type === "circle" ? (window.innerWidth < 768 ? "100px" : "140px") : "auto",
                                height: skill.type === "circle" ? (window.innerWidth < 768 ? "100px" : "140px") : (window.innerWidth < 768 ? "48px" : "64px"),
                                padding: skill.type === "circle" ? "0" : "0 40px",
                                backgroundColor: "#154FD1",
                                color: "white",
                                borderRadius: skill.type === "circle" ? "50%" : "9999px",
                                fontSize: window.innerWidth < 768 ? "18px" : "22px",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                userSelect: "none",
                                boxShadow: "0 15px 45px rgba(21, 79, 209, 0.3)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                willChange: "transform",
                                pointerEvents: "auto",
                                textAlign: "center",
                            }}
                            className="font-heading hover:scale-105 transition-transform"
                        >
                            {skill.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsGravity;
