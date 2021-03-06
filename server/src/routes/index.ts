import { Router } from 'express';
import config from "../config";

// Routes
import v1Routes from './v1';

const router = Router();

router.use('/v1', v1Routes);
router.use('/info', (req, res) => {
  try {
    res.send({
      version: config.app.packageVersion,
      discord_login_uri: `${config.app.baseUrl}/auth/discord/login`,
      discord_revoke_uri: `${config.app.baseUrl}/auth/discord/revoke`,
      current_user_uri: `${config.app.baseUrl}/auth/user/current`,
      played_uri: `${config.app.baseUrl}/games/flappydronie/played`,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

export default router;
