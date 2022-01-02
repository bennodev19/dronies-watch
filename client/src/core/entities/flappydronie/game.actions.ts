import {
  bg_h,
  bg_w,
  bird_h,
  bird_w,
  fg_h,
  fg_w,
  pipe_h,
  pipe_w,
} from './sprites';
import { Pipe, Bird } from './elements';
import {
  BACKGROUND_POSITION,
  BACKGROUNDS,
  BIRD,
  BIRD_DEFAULT_POSITION,
  CANVAS_DIMENSIONS,
  FOREGROUND_POSITION,
  FOREGROUNDS,
  FRAMES,
  GAME_STATUS,
  GAP,
  HIGH_SCORE,
  LATEST_SCORE,
  PIPES,
  SCORE,
  STATUS,
} from './game.controller';

export const startGame = () => {
  if (STATUS.value !== GAME_STATUS.SPLASH)
    BIRD.set(
      new Bird({ cx: BIRD_DEFAULT_POSITION.x, cy: BIRD_DEFAULT_POSITION.y }),
    );

  STATUS.set(GAME_STATUS.PLAYING);
};

export const endGame = () => {
  if (STATUS.value === GAME_STATUS.PLAYING) {
    STATUS.set(GAME_STATUS.SCORE);

    // Calculate High Score
    if (HIGH_SCORE.value < SCORE.value) {
      HIGH_SCORE.set(SCORE.value);
    }

    LATEST_SCORE.set(SCORE.value);
    SCORE.reset();
  }
};

export const resetGame = () => {
  BIRD.set(
    new Bird({ cx: BIRD_DEFAULT_POSITION.x, cy: BIRD_DEFAULT_POSITION.y }),
  );
  FRAMES.reset();
  PIPES.reset();
  STATUS.set(GAME_STATUS.SPLASH);
};

export const updateFrame = () => {
  FRAMES.set((f) => f + 1);

  // Update Scenery
  updateScenery();

  // Update Bird
  // TODO optimize as the screen is also re-rendered although the bird doesn't move
  BIRD.set((b) => updateBird(b), { force: true });
};

export const updateScenery = () => {
  if (
    STATUS.value === GAME_STATUS.SPLASH ||
    STATUS.value === GAME_STATUS.PLAYING
  ) {
    const foregrounds = FOREGROUNDS.nextStateValue;
    const backgrounds = BACKGROUNDS.nextStateValue;
    const canvasDimensions = CANVAS_DIMENSIONS.value;

    const newForegroundPos = (FOREGROUND_POSITION.value - 2) % (fg_w - 5); // -5 to hide white stripe between the two images

    foregrounds[0].move({
      cx: newForegroundPos,
      cy: canvasDimensions.height - fg_h, // Required when resizing
    });
    foregrounds[1].move({
      cx: newForegroundPos + (fg_w - 5), // -5 to hide white stripe between the two images,
      cy: canvasDimensions.height - fg_h, // Required when resizing
    });

    // Apply changes to UI
    FOREGROUND_POSITION.set(newForegroundPos);
    FOREGROUNDS.ingest();

    const newBackgroundPos = (BACKGROUND_POSITION.value - 0.5) % (bg_w - 5); // -5 to hide white stripe between the two images

    backgrounds[0].move({
      cx: newBackgroundPos,
      cy: canvasDimensions.height - bg_h, // Required when resizing
    });
    backgrounds[1].move({
      cx: newBackgroundPos + (bg_w - 5), // -5 to hide white stripe between the two images
      cy: canvasDimensions.height - bg_h, // Required when resizing
    });

    // Apply changes to UI
    BACKGROUND_POSITION.set(newBackgroundPos);
    BACKGROUNDS.ingest();

    // Update Pipes
    if (STATUS.value === GAME_STATUS.PLAYING) PIPES.set((p) => updatePipes(p));
  }
};

export const updateBird = (bird: Bird): Bird => {
  const canvasDimensions = CANVAS_DIMENSIONS.value;

  // If Splash Screen make the Bird hover
  if (STATUS.value === GAME_STATUS.SPLASH) {
    const hoverHeight = 280;
    bird.hover(canvasDimensions.height - hoverHeight);
  }

  if (
    STATUS.value === GAME_STATUS.PLAYING ||
    STATUS.value === GAME_STATUS.SCORE // Apply physics to the Bird also in the Score status, to drop the bird when hitting a Pipe
  ) {
    bird.calculateVelocity();

    // Handle collision with bottom
    if (
      bird.calculateCollision({
        cx: 0,
        cy: canvasDimensions.height - fg_h - 10,
        width: canvasDimensions.width,
        height: fg_h,
      })
    ) {
      // Set velocity to jump speed for correct rotation when crashing
      bird.setVelocity(bird.jumpForce);

      endGame();
    }

    // Handle collision with top
    if (
      bird.calculateCollision({
        cx: 0,
        cy: 0,
        width: canvasDimensions.width,
        height: 10,
      })
    ) {
      if (bird.cy <= 0) bird.move({ cy: 0 });

      // Bounce
      bird.setVelocity(2);
    }

    // Handle rotation
    if (STATUS.value === GAME_STATUS.PLAYING) bird.calculateRotation();
  }

  return bird;
};

export const jumpBird = () => {
  const bird = BIRD.nextStateValue;
  bird.jump();
  BIRD.ingest({ force: true });
};

export const updatePipes = (pipes: Pipe[]) => {
  // Generate a Pipe every 100 frame
  if (FRAMES.value % 100 === 0) pipes = pipes.concat(generatePipeSet());

  // Calculate collision and move Pipes
  pipes.forEach((pipe) => {
    // End Game, if collision with Pipe
    if (calculateCollisionWithPipe(pipe)) endGame();

    // Calculate Score
    if (
      pipe.cx <= BIRD_DEFAULT_POSITION.x &&
      !pipe.scored &&
      pipe.type === 'N'
    ) {
      SCORE.set((v) => v + 1);
      pipe.scored = true;
    }

    // Move the Pipe towards the left
    pipe.cx -= 2;

    // If the Pipe Set isn't visible anymore, remove it
    if (pipe.cx < -pipe_w && pipe.type === 'N') pipes.splice(0, 2); // Remove leading Pipe Set

    return pipe;
  });

  return pipes;
};

export const calculateCollisionWithPipe = (pipe: Pipe): boolean => {
  const bird = BIRD.value;
  const cx = Math.min(
    Math.max(bird.cx + bird_w / 2, pipe.cx),
    pipe.cx + pipe_w,
  );
  const cy = Math.min(
    Math.max(bird.cy + bird_h / 2, pipe.cy),
    pipe.cy + pipe_h,
  );

  // Closest difference
  const dx = bird.cx + bird_w / 2 - cx;
  const dy = bird.cy + bird_h / 2 - cy;

  // Vector length
  const d1 = dx * dx + dy * dy;
  const r = bird.radius * bird.radius;

  // Determine intersection/collision of the Pipe with the Bird
  return r > d1;
};

export const generatePipeSet = () => {
  const minHeight = 140;
  const variationRange = 200;
  const randomYPos =
    CANVAS_DIMENSIONS.value.height -
    (pipe_h + fg_h + minHeight + variationRange * Math.random());

  return [
    new Pipe({ cx: pipe_h, cy: randomYPos, type: 'S' }),
    new Pipe({ cx: pipe_h, cy: randomYPos + pipe_h + GAP.value, type: 'N' }),
  ];
};

export const getScoreTweet = (score: number) =>
  `https://twitter.com/intent/tweet?text=I%20just%20played%20Flappy%20Dronie%20and%20managed%20to%20score%20${score}%21%20Can%20you%20beat%20me%3F%20Try%20it%20here%20https%3A//dronies.watch/lab%20and%20train%20your%20@DronieNFT%21`;
