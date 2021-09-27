
export const FREE_HEIGHT = (height => {
  const min = 750;
  const header = 55;
  const optimism = height - header;
  return optimism > min ? optimism : min;
})(window.innerHeight);

export const NEW_ID = 'new';

export const ENTITY_TYPE = {
  USER: 'USER',
  ROLE: 'ROLE',
  TAG: 'TAG',
};

export const IMG_DIR = {
  DEFAULT: 'DEFAULT',
  RECIPE: 'RECIPE',
  FOOD: 'FOOD',
  USER: 'USER',
};

export const STATUS = {
  DISABLED: 'DISABLED',
  ENABLED: 'ENABLED',
  DRAFT: 'DRAFT',
};

export const PERMISSION = {
  USER: {
    CREATE: 'create_user',
    UPDATE: 'update_user',
    DELETE: 'delete_user',
    ENABLE: 'enable_disable_user',
    DISABLE: 'enable_disable_user',
  },
  ROLE: {
    CREATE: 'create_role',
    UPDATE: 'update_role',
    DELETE: 'delete_role',
  },
  CATEGORY: {
    CREATE: 'create_update_category',
    UPDATE: 'create_update_category',
    DELETE: 'delete_category',
  },
};
