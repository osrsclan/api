import { ClanController } from '../modules/clans/clans.controller';
import { PlayerController } from '../modules/players/player.controller';

import { Constructable } from '../types';

export default [
    ClanController,
    PlayerController
] as Constructable[];