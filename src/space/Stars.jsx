import * as THREE from 'three';

export default function createStarfield( {numStars = 500} = {}) {

    const vertices = []
    const colors = []
    for (let i = 0; i < numStars; i++) {
      const vertex = new Vector3();
      vertex.x = 800 * Math.random() - 300;
      vertex.y = 800 * Math.random() - 300;
      vertex.z = 800 * Math.random() - 300;
      vertices.push(vertex.x, vertex.y, vertex.z);
      colors.push(new Color(1, 1, 1));
    }

    this.around = new BufferGeometry()
    this.around.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
    this.around.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));

    const aroundMaterial = new PointsMaterial({
      size: 2,
      sizeAttenuation: true, 
      color: 0x4d76cf,
      transparent: true,
      opacity: 1,
      map: this.options.textures.gradient,
    });

    this.aroundPoints = new Points(this.around, aroundMaterial);
    this.aroundPoints.name = "Star";
    this.aroundPoints.scale.set(1, 1, 1);
    this.group.add(this.aroundPoints);
  }