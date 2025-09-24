'use client'

import React, { JSX, useEffect, useRef, useState } from 'react'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Group, Mesh, Box3, Vector3 } from 'three'
import { motion } from 'motion/react'

const Logo3D = ({ className = '' }: { className?: string }) => {
  const mousePosition = useRef({ x: 0, y: 0 })
  const [modelLoaded, setModelLoaded] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const handleMouseMove = (e: MouseEvent) => {
      // Cancel previous animation frame to throttle updates
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      animationFrame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1 // Normalize to -1 to 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1 // Normalize to -1 to 1 (inverted)
        mousePosition.current = { x, y }
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className={`relative z-10 w-full h-full  ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: modelLoaded ? 0.95 : 0 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <Canvas camera={{ position: [0, 45, 0], fov: 30 }} shadows>
          <Environment preset="city" background={false} environmentIntensity={0.5} />

          {/* Key light - main directional light */}
          <directionalLight
            position={[10, 15, 10]}
            intensity={2}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            shadow-bias={-0.0001}
          />

          {/* Fill light - softer light from opposite side */}
          <directionalLight position={[-5, 10, -5]} intensity={0.5} color="#4a90e2" />

          {/* Rim light - creates edge lighting */}
          <directionalLight position={[-10, 5, 15]} intensity={0.8} color="#ffffff" />

          {/* Ambient light - overall scene illumination */}
          <ambientLight intensity={0.1} color="#404040" />

          <LogoModel
            position={[0, 0, 0]}
            mousePosition={mousePosition}
            onLoad={() => setModelLoaded(true)}
          />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </motion.div>
    </div>
  )
}

const LogoModel = (
  props: JSX.IntrinsicElements['group'] & {
    mousePosition: React.MutableRefObject<{ x: number; y: number }>
    onLoad: () => void
  },
) => {
  const { scene } = useGLTF('/models/relux-logo-3d.glb')
  const { mousePosition, onLoad, ...groupProps } = props
  const ref = useRef<Group>(null!)

  useEffect(() => {
    if (scene) {
      // Reset any existing transforms
      scene.position.set(0, 0, 0)
      scene.rotation.set(0, 0, 0)
      scene.scale.set(1.4, 1.4, 1.4)

      // Center the mesh by calculating its bounding box
      const box = new Box3().setFromObject(scene)
      const center = box.getCenter(new Vector3())
      scene.position.copy(center).multiplyScalar(-1)

      // Apply metallic material to all meshes
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      // Model is loaded and ready
      onLoad()
    }
  }, [scene, onLoad])

  useFrame(() => {
    if (ref.current) {
      // Smoothly tilt based on global mouse position
      const tiltStrength = 0.5
      const targetRotationX = -mousePosition.current.y * tiltStrength
      const targetRotationZ = -mousePosition.current.x * tiltStrength

      // Lerp for smooth movement
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.1
      ref.current.rotation.z += (targetRotationZ - ref.current.rotation.z) * 0.1
    }
  })

  // Reset group transforms when component mounts/remounts
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(0, 0, 0)
      ref.current.rotation.set(0, 0, 0)
      ref.current.scale.set(1, 1, 1)
    }
  }, [])

  return (
    <group ref={ref} {...groupProps}>
      <primitive object={scene} />
    </group>
  )
}

export default Logo3D
