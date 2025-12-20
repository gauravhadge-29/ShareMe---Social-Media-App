import { createClient } from "@sanity/client";
import imageUrlBuilder, { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: false,
    token: import.meta.env.VITE_SANITY_TOKEN,
})

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);