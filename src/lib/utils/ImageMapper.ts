import * as d3 from 'd3';

export default class ImageMapper {
  container: HTMLDivElement;
  mapper: HTMLElement;
  svg: HTMLElement;
  imageCanvas: HTMLImageElement;
  polygon: HTMLElement | null;
  selectedCircle: any;
  options: Object;
  imageSize: any;
  scale: number;
  points: any;
  polygonPoints: String

  constructor(container: HTMLDivElement, mapper: HTMLElement, svg: HTMLElement, imageCanvas: HTMLImageElement, options: Object) {
    this.container = container;
    this.mapper = mapper;
    this.svg = svg;
    this.imageCanvas = imageCanvas;
    this.selectedCircle = null;
    this.options = options;
    this.imageSize = {
      nWidth: this.imageCanvas.naturalWidth,
      nHeight: this.imageCanvas.naturalHeight,
      width: this.imageCanvas.width,
      height: this.imageCanvas.height
    }
    this.scale = 1;
    this.polygon = null;
    this.points = [];
    this.polygonPoints = '';

    // Functions
    this.init();
    this.resize();
    this.events();
  }

  init() {
    this.polygon = d3.select(this.svg).select('polygon');
  }

  resize() {
    this.scale = this.container.offsetWidth / this.imageSize.nWidth;
    this.container.style.height = this.imageSize.nHeight * this.scale + 'px';
    this.mapper.style.transform = `scale(${this.scale})`;
    this.mapper.style.width = this.imageSize.nWidth + 'px';
    this.svg.setAttribute('viewBox', `0 0 ${this.imageSize.nWidth} ${this.imageSize.nHeight}`);
  }

  onClick(e: MouseEvent) {
    const x = e.offsetX;
    const y = e.offsetY;

    if (e.target.tagName !== 'circle' && !e.shiftKey) {
      d3.select(this.svg).append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 3 / this.scale)
        .style('fill', '#1f7a1a');

      const circle = d3.select(this.svg).select('circle:last-child');
      this.points.push({ pos: [x, y], circle: circle });

      this.updatePolygon();

    } else if (e.target.tagName === 'circle' && e.shiftKey) {
      this.selectedCircle = e.target;

      const selectedCircleX = parseInt(this.selectedCircle.getAttribute('cx'));
      const selectedCircleY = parseInt(this.selectedCircle.getAttribute('cy'));

      const index = this.points.findIndex((point: any) => {
        return point.pos[0] === selectedCircleX && point.pos[1] === selectedCircleY;
      });

      this.points.splice(index, 1);
      this.updatePolygon();
      this.selectedCircle.remove();
    }
  }

  onDrag(e: MouseEvent, initialTarget: any) {
    const x = e.offsetX;
    const y = e.offsetY;

    console.log(initialTarget.tagName)

    if (initialTarget.tagName === 'circle') {
      this.selectedCircle = initialTarget;

      const selectedCircleX = parseInt(this.selectedCircle.getAttribute('cx'));
      const selectedCircleY = parseInt(this.selectedCircle.getAttribute('cy'));

      const index = this.points.findIndex((point: any) => {
        return point.pos[0] === selectedCircleX && point.pos[1] === selectedCircleY;
      });

      this.points[index].pos = [x, y];
      this.points[index].circle.attr('cx', x).attr('cy', y);

      this.updatePolygon();
    }
  }

  updatePolygon() {
    this.polygonPoints = this.points.map((point: any) => {
      const [x, y] = point.pos;
      return `${x},${y}`;
    }).join(' ');

    this.polygon.attr('points', this.polygonPoints);
  }

  getPoints() {
    return this.polygonPoints;
  }

  events() {
    window.addEventListener('resize', this.resize.bind(this));

    let delta: Number = 6;
    let startX: any = 0;
    let startY: any = 0;
    let initialTarget: any;

    this.svg.addEventListener('mousedown', function (event) {
      startX = event.pageX;
      startY = event.pageY;
      initialTarget = event.target;
    });

    this.svg.addEventListener('mouseup', (event) => {
      const diffX: Number = Math.abs(event.pageX - startX);
      const diffY: Number = Math.abs(event.pageY - startY);

      if (diffX < delta && diffY < delta) {
        this.onClick(event);

      } else {
        this.onDrag(event, initialTarget);
      }
    });
  }


}