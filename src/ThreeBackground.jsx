import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Animated particle network rendered behind the hero section.
// Reacts to the current theme and respects reduced-motion preferences.
export default function ThreeBackground({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 55

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const PARTICLE_COUNT = 140
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      velocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03,
      })
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleColor = theme === 'dark' ? 0x67e8f9 : 0x0891b2
    const lineColor = theme === 'dark' ? 0x22d3ee : 0x06b6d4

    const particleMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.6,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, particleMaterial)
    scene.add(points)

    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.15,
    })
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineSegments)

    const LINK_DISTANCE = 16

    function updateLinks() {
      const linePositions = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const distSq = dx * dx + dy * dy + dz * dz
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            )
          }
        }
      }
      lineGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      )
    }

    updateLinks()

    function resize() {
      const { clientWidth, clientHeight } = container
      if (clientWidth === 0 || clientHeight === 0) return
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    let frameId
    let frameCount = 0

    function animate() {
      frameId = requestAnimationFrame(animate)

      if (!prefersReducedMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          positions[i * 3] += velocities[i].x
          positions[i * 3 + 1] += velocities[i].y
          positions[i * 3 + 2] += velocities[i].z

          if (Math.abs(positions[i * 3]) > 50) velocities[i].x *= -1
          if (Math.abs(positions[i * 3 + 1]) > 30) velocities[i].y *= -1
          if (Math.abs(positions[i * 3 + 2]) > 30) velocities[i].z *= -1
        }
        geometry.attributes.position.needsUpdate = true

        frameCount++
        if (frameCount % 3 === 0) updateLinks()

        scene.rotation.y += 0.0006
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      geometry.dispose()
      lineGeometry.dispose()
      particleMaterial.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
