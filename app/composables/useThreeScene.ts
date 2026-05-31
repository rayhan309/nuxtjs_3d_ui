import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface ThreeSceneContext {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  controls: OrbitControls
}

export interface ThreeSceneHandles {
  update?: (elapsed: number, delta: number) => void
  dispose?: () => void
}

export function useThreeScene(
  containerRef: Ref<HTMLElement | null>,
  init: (ctx: ThreeSceneContext) => ThreeSceneHandles | Promise<ThreeSceneHandles>,
) {
  let animationId = 0
  let handles: ThreeSceneHandles | null = null
  let resizeObserver: ResizeObserver | null = null
  let resizeHandler: (() => void) | null = null
  let renderer: WebGLRenderer | null = null
  let controls: OrbitControls | null = null

  onMounted(async () => {
    const container = containerRef.value
    if (!container)
      return

    const THREE = await import('three')

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    )
    camera.position.set(0, 0.5, 7)

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.minDistance = 4.5
    controls.maxDistance = 12
    controls.maxPolarAngle = Math.PI / 1.8

    handles = await init({ scene, camera, renderer, controls })

    const clock = new THREE.Clock()

    const animate = () => {
      if (!renderer || !controls)
        return

      animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()
      handles?.update?.(elapsed, delta)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    resizeHandler = () => {
      if (!renderer)
        return

      const width = container.clientWidth
      const height = Math.max(container.clientHeight, 1)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    resizeHandler()
    resizeObserver = new ResizeObserver(resizeHandler)
    resizeObserver.observe(container)
    window.addEventListener('resize', resizeHandler)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    resizeObserver?.disconnect()

    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }

    handles?.dispose?.()
    controls?.dispose()
    renderer?.dispose()

    const container = containerRef.value
    const canvas = renderer?.domElement
    if (canvas && container?.contains(canvas)) {
      container.removeChild(canvas)
    }

    handles = null
    renderer = null
    controls = null
    resizeHandler = null
  })
}

export function disposeObject3D(object: import('three').Object3D) {
  object.traverse((child) => {
    if ('geometry' in child && child.geometry) {
      (child as import('three').Mesh).geometry.dispose()
    }

    if ('material' in child && child.material) {
      const material = (child as import('three').Mesh).material
      if (Array.isArray(material)) {
        material.forEach(m => m.dispose())
      }
      else {
        material.dispose()
      }
    }
  })
}
