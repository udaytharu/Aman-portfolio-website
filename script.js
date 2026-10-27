document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THREE.JS TOPOGRAPHICAL BACKGROUND ---
    const canvas = document.querySelector('#webgl-canvas');
    const scene = new THREE.Scene();
    // Fog to fade out edges
    scene.fog = new THREE.FogExp2(0x050508, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create a plane and distort vertices to look like topography
    const geometry = new THREE.PlaneGeometry(300, 200, 60, 60);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00f3ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    const plane = new THREE.Mesh(geometry, material);
    
    // Displace vertices to create terrain
    const positions = plane.geometry.attributes.position;
    for(let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        // Math-based pseudo-random terrain
        const z = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 15 + Math.sin(x * 0.1) * 5;
        positions.setZ(i, z);
    }
    plane.geometry.computeVertexNormals();
    
    plane.rotation.x = -Math.PI / 2 + 0.2; // Tilt it flat
    plane.position.y = -30;
    plane.position.z = -50;
    scene.add(plane);

    camera.position.z = 30;
    camera.position.y = 10;

    // Mouse interaction setup
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Animation Loop
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate plane slowly
        plane.rotation.z = elapsedTime * 0.02;

        // Move vertices slightly like a wave over time
        const positions = plane.geometry.attributes.position;
        for(let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = Math.sin(x * 0.05 + elapsedTime * 0.5) * Math.cos(y * 0.05 + elapsedTime * 0.5) * 10;
            positions.setZ(i, z);
        }
        plane.geometry.attributes.position.needsUpdate = true;

        // Ease camera towards mouse position
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y + 10) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });


    // --- 2. GSAP SCROLL ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Generic reveal up
    gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            {
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%", 
                }
            }
        );
    });

    // Reveal from right
    gsap.utils.toArray('.gs-reveal-right').forEach(function(elem) {
        gsap.fromTo(elem, 
            { x: 50, opacity: 0 }, 
            {
                x: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });


    // --- 3. FORM HANDLER (Mock) ---
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
        btn.classList.add('bg-neonCyan', 'text-darkBase');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-neonCyan', 'text-darkBase');
            }, 3000);
        }, 1500);
    });
    
});