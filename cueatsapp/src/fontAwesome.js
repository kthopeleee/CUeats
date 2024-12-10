// src/fontAwesome.js

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as solidStar, faAngleLeft, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

library.add(solidStar, regularStar, faAngleLeft, faCirclePlus);