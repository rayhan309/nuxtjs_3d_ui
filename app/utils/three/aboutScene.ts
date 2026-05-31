import type { Mesh, Object3D } from 'three'
import type { ThreeSceneContext, ThreeSceneHandles } from '~/composables/useThreeScene'
import { disposeObject3D } from '~/composables/useThreeScene'

export async function createAboutScene(ctx: ThreeSceneContext): Promise<ThreeSceneHandles> {
  const THREE = await import('three')
  const { scene, controls } = ctx

  scene.background = new THREE.Color('#0a0f1e')

  controls.autoRotate = true
  controls.autoRotateSpeed = 0.4
  controls.enableZoom = false

  scene.add(new THREE.AmbientLight(0xffffff, 0.4))

  const directional = new THREE.DirectionalLight(0xffffff, 1.5)
  directional.position.set(3, 5, 2)
  scene.add(directional)

  const point = new THREE.PointLight(0x818cf8, 8, 20)
  point.position.set(-2, -1, 3)
  scene.add(point)

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4338ca,
      emissiveIntensity: 0.3,
      wireframe: true,
    }),
  )
  scene.add(core)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.8, 0.02, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5,
    }),
  )
  ring.rotation.x = Math.PI / 2
  scene.add(ring)

  const orbData = [
    { position: [1.5, 0.8, 0] as const, color: 0x22d3ee, speed: 0.8 },
    { position: [-1.4, -0.6, 0.5] as const, color: 0xf472b6, speed: 1.1 },
  ]

  const orbs: Array<{ mesh: Mesh, base: readonly [number, number, number], speed: number }> = []

  orbData.forEach((item) => {
    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 2,
      }),
    )
    mesh.position.set(...item.position)
    scene.add(mesh)
    orbs.push({ mesh, base: item.position, speed: item.speed })
  })

  const disposables: Object3D[] = [core, ring, ...orbs.map(o => o.mesh)]

  return {
    update(elapsed) {
      core.rotation.x = elapsed * 0.25
      core.rotation.y = elapsed * 0.35
      ring.rotation.z = elapsed * 0.3

      orbs.forEach(({ mesh, base, speed }) => {
        mesh.position.y = base[1] + Math.sin(elapsed * speed) * 0.25
        mesh.rotation.y = elapsed * speed
      })
    },
    dispose() {
      disposables.forEach(disposeObject3D)
    },
  }
}
