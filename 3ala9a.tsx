/* eslint-disable react/no-unknown-property */
'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import type { ReactThreeFiber, RootState } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: ReactThreeFiber.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  className?: string;
  height?: number | string;
  width?: number | string;
  style?: CSSProperties;
  badgeTitle?: string;
  badgeSubtitle?: string;
  badgeFooter?: string;
  accentColor?: string;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  className,
  height = '22rem',
  width = '16rem',
  style,
  badgeTitle,
  badgeSubtitle,
  badgeFooter,
  accentColor
}: LanyardProps) {
  return (
    <div
      className={clsx(
        'relative z-0 flex transform scale-100 items-center justify-center overflow-visible origin-center',
        className
      )}
      style={{ height, width, ...(style ?? {}) }}
    >
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band
            badgeTitle={badgeTitle}
            badgeSubtitle={badgeSubtitle}
            badgeFooter={badgeFooter}
            accentColor={accentColor}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  badgeTitle?: string;
  badgeSubtitle?: string;
  badgeFooter?: string;
  accentColor?: string;
}

const segmentProps: Partial<RigidBodyProps> = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 4,
  linearDamping: 4
};

const CARD_GEOMETRY = new THREE.BoxGeometry(1.6, 2.3, 0.08);
const CLIP_GEOMETRY = new THREE.BoxGeometry(0.28, 0.3, 0.12);
const CLAMP_GEOMETRY = new THREE.BoxGeometry(0.32, 0.1, 0.16);

const CARD_SIZE = { width: 512, height: 768 };
const DEFAULT_ACCENT = '#38bdf8';

const colorToRgba = (color: THREE.Color, alpha = 1) => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  words.forEach((word, index) => {
    const testLine = line.length > 0 ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && index !== 0) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }

  return currentY;
};

interface BadgeTextureConfig {
  title?: string;
  subtitle?: string;
  footer?: string;
  accentColor?: string;
}

const createBadgeTexture = (config: BadgeTextureConfig): THREE.CanvasTexture | null => {
  if (typeof document === 'undefined') return null;

  const { title, subtitle, footer, accentColor = DEFAULT_ACCENT } = config;
  const canvas = document.createElement('canvas');
  canvas.width = CARD_SIZE.width;
  canvas.height = CARD_SIZE.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const accent = new THREE.Color(accentColor);
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colorToRgba(accent, 0.38));
  gradient.addColorStop(1, 'rgba(9, 13, 26, 0.96)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = colorToRgba(accent, 0.14);
  ctx.fillRect(44, 56, canvas.width - 88, 44);
  ctx.fillRect(44, canvas.height - 180, canvas.width - 88, 80);

  ctx.strokeStyle = colorToRgba(accent, 0.25);
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 52, canvas.width - 80, canvas.height - 104);

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(64, 120, canvas.width - 128, 2);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = '600 42px "Inter", "Arial", sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('ACH 48H PROTOTYPE', 64, 66);

  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = '700 78px "Inter", "Arial", sans-serif';
  let textY = 220;
  if (title) {
    textY = wrapText(ctx, title.toUpperCase(), 64, textY, canvas.width - 128, 86);
  } else {
    textY += 86;
  }

  if (subtitle) {
    ctx.fillStyle = colorToRgba(accent, 0.95);
    ctx.font = '500 48px "Inter", "Arial", sans-serif';
    textY = wrapText(ctx, subtitle, 64, textY + 18, canvas.width - 128, 62);
  }

  ctx.fillStyle = 'rgba(148, 163, 184, 0.82)';
  ctx.font = '400 36px "Inter", "Arial", sans-serif';
  const footerText = footer ?? 'Field Operations • Casablanca HQ';
  wrapText(ctx, footerText, 64, canvas.height - 146, canvas.width - 128, 48);

  ctx.fillStyle = colorToRgba(accent, 0.5);
  ctx.fillRect(64, canvas.height - 62, canvas.width - 128, 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

function Band({ maxSpeed = 50, minSpeed = 0, badgeTitle, badgeSubtitle, badgeFooter, accentColor }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  const badgeTexture = useMemo(
    () => createBadgeTexture({ title: badgeTitle, subtitle: badgeSubtitle, footer: badgeFooter, accentColor }),
    [badgeTitle, badgeSubtitle, badgeFooter, accentColor]
  );

  useEffect(() => {
    return () => {
      badgeTexture?.dispose();
    };
  }, [badgeTexture]);

  useFrame((state: RootState, delta: number) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={CARD_GEOMETRY}>
              <meshStandardMaterial
                map={badgeTexture ?? undefined}
                color={badgeTexture ? new THREE.Color('#ffffff') : new THREE.Color('#0f172a')}
                roughness={0.45}
                metalness={0.15}
              />
            </mesh>
            <mesh position={[0, 1.05, 0]} geometry={CLIP_GEOMETRY}>
              <meshStandardMaterial color="#a0aec0" metalness={0.55} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.88, 0.04]} geometry={CLAMP_GEOMETRY}>
              <meshStandardMaterial color="#e2e8f0" metalness={0.32} roughness={0.38} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color={accentColor ?? DEFAULT_ACCENT}
          depthTest={false}
          resolution={isSmall ? new THREE.Vector2(1000, 2000) : new THREE.Vector2(1000, 1000)}
          lineWidth={1.1}
          transparent
          opacity={0.95}
        />
      </mesh>
    </>
  );
}
