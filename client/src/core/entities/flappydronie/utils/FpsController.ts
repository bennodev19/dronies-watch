// https://gafferongames.com/post/fix_your_timestep/
// https://stackoverflow.com/questions/39042859/most-performant-way-to-call-update-loop-of-a-javascript-physics-engine
// https://stackoverflow.com/questions/25612452/html5-canvas-game-loop-delta-time-calculations
// https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
export class FpsController {
  public config: FpsControllerConfig;
  public fps = 0;

  public isDrawing = false;
  private stop = true;

  private frameDuration = 0;
  private now = 0;
  private then = 0;
  private elapsed = 0;
  private lag: number = 0;

  private updateCallback?: () => void;
  private renderCallback?: (lagOffset: number) => void;

  constructor(fps: number) {
    this.config = {
      fps,
    };
  }

  public startDrawing(
    updateCallback: () => void,
    renderCallback: (lagOffset: number) => void,
  ) {
    console.log('START DRAWING');
    this.renderCallback = renderCallback;
    this.updateCallback = updateCallback;

    this.stop = false;
    this.isDrawing = true;

    this.frameDuration = 1000 / this.config.fps;
    this.then = window.performance.now();

    this.draw();
  }

  private draw(now: number = window.performance.now()) {
    // Stop drawing
    if (this.stop) return;

    // Request another frame
    requestAnimationFrame((t) => this.draw(t));

    // Calculate elapsed time since last loop
    this.now = now;
    this.elapsed = this.now - this.then;
    this.then = now;

    // Add the elapsed time to the lag counter
    this.lag += this.elapsed;

    // Update the frame if the lag counter is greater than or
    // equal to the frame duration
    while (this.lag >= this.frameDuration) {
      // Update the logic
      if (this.updateCallback != null) this.updateCallback();

      // Reduce the lag counter by the frame duration
      this.lag -= this.frameDuration;
    }

    this.fps = Math.floor(1000 / this.elapsed);

    // Calculate the lag offset and use it to render the sprites
    if (this.renderCallback != null) {
      this.renderCallback(this.lag / this.frameDuration);
    }
  }

  public stopDrawing() {
    // Weired check because off 'TypeError: Cannot set properties of null (setting 'stop')' issue
    if (this != null) {
      this.stop = true;
      this.isDrawing = false;
    }
  }
}

type FpsControllerConfig = {
  fps: number;
};
