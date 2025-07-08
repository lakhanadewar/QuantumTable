'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Loader from '@/components/ui/loader';

interface ElementModelViewerProps {
  name: string;
  modelUrl: string | null;
}

export default function ElementModelViewer({ name, modelUrl }: ElementModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!modelUrl || !mountRef.current) {
        setIsLoading(false);
        return;
    }
    
    setIsLoading(true);
    setError(null);
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.innerHTML = ''; // Clear previous renders
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Model loader
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.error('An error happened while loading the model:', err);
        setError('Model could not be loaded.');
        setIsLoading(false);
      }
    );

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if(currentMount){
        currentMount.innerHTML = '';
      }
    };
  }, [modelUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/50 backdrop-blur-sm overflow-hidden group">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Atomic Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square relative rounded-lg overflow-hidden bg-transparent border border-border/20 shadow-inner">
            <div ref={mountRef} className="w-full h-full" />
            {(isLoading || error || !modelUrl) && (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-card/50 pointer-events-none">
                {isLoading && <Loader />}
                {error && <p className="text-destructive text-sm px-4 text-center">{error}</p>}
                {!modelUrl && !error && <p className="text-muted-foreground">Model not available</p>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
