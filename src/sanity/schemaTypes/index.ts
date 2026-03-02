import { type SchemaTypeDefinition } from 'sanity';

import { siteSettings } from './siteSettings';
import { service } from './service';
import { galleryCategory } from './galleryCategory';
import { galleryItem } from './galleryItem';
import { post } from './post';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [siteSettings, service, galleryCategory, galleryItem, post],
};
