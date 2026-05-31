import type { Mesh, Object3D } from 'three'
import type { ThreeSceneContext, ThreeSceneHandles } from '~/composables/useThreeScene'
import { disposeObject3D } from '~/composables/useThreeScene'

const floatingProducts = [
  { position: [-2.2, 0.8, -0.5] as const, color: 0xf472b6, speed: 1.1, scale: 0.55 },
  { position: [2.4, -0.5, 0.2] as const, color: 0x22d3ee, speed: 0.9, scale: 0.5 },
  { position: [-1.2, -1.4, 1.5] as const, color: 0xfbbf24, speed: 1.3, scale: 0.45 },
  { position: [1.5, 1.6, -1.2] as const, color: 0x34d399, speed: 1.0, scale: 0.48 },
]

export async function createHomeHeroScene(ctx: ThreeSceneContext): Promise<ThreeSceneHandles> {
  const THREE = await import('three')
  const { scene, controls } = ctx

  scene.background = new THREE.Color('#030712')

  controls.autoRotate = true
  controls.autoRotateSpeed = 0.5

  const ambient = new THREE.AmbientLight(0xffffff, 0.35)
  scene.add(ambient)

  const directional = new THREE.DirectionalLight(0xffffff, 2)
  directional.position.set(4, 6, 4)
  directional.castShadow = true
  directional.shadow.mapSize.set(1024, 1024)
  scene.add(directional)

  const pointA = new THREE.PointLight(0x818cf8, 10, 20)
  pointA.position.set(-3, 2, 2)
  scene.add(pointA)

  const pointB = new THREE.PointLight(0xfbbf24, 6, 20)
  pointB.position.set(3, -1, -2)
  scene.add(pointB)

  const productsGroup = new THREE.Group()
  scene.add(productsGroup)

  const heroProduct = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 1.4, 1.4),
    new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x4338ca,
      emissiveIntensity: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
  )
  heroProduct.castShadow = true
  productsGroup.add(heroProduct)

  const floatMeshes: Array<{ mesh: Mesh, baseY: number, speed: number }> = []

  floatingProducts.forEach((item) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.4,
        metalness: 0.7,
        roughness: 0.25,
      }),
    )
    mesh.position.set(...item.position)
    mesh.scale.setScalar(item.scale)
    mesh.castShadow = true
    productsGroup.add(mesh)
    floatMeshes.push({ mesh, baseY: item.position[1], speed: item.speed })
  })

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4, 64),
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.4,
    }),
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -1.8
  floor.receiveShadow = true
  scene.add(floor)

  const starCount = 1500
  const starPositions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 40
    starPositions[i + 1] = (Math.random() - 0.5) * 40
    starPositions[i + 2] = (Math.random() - 0.5) * 40
  }

  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(starPositions, 3)),
    new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.04,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    }),
  )
  scene.add(stars)

  const disposables: Object3D[] = [productsGroup, floor, stars]

  return {
    update(elapsed) {
      heroProduct.rotation.y = elapsed * 0.4
      heroProduct.rotation.x = Math.sin(elapsed * 0.5) * 0.12
      productsGroup.rotation.y = elapsed * 0.08

      floatMeshes.forEach(({ mesh, baseY, speed }) => {
        mesh.position.y = baseY + Math.sin(elapsed * speed) * 0.35
        mesh.rotation.x = elapsed * speed * 0.4
        mesh.rotation.y = elapsed * speed * 0.3
      })

      stars.rotation.y = elapsed * 0.02
    },
    dispose() {
      disposables.forEach(disposeObject3D)
    },
  }
}
