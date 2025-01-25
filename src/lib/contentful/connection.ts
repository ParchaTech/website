import { createClient, type EntryFieldTypes } from "contentful";

/* Content Types */
export interface Speaker {
  contentTypeId: "speaker";
  fields: {
    name: EntryFieldTypes.Text;
    jobPosition: EntryFieldTypes.Text;
    photo: EntryFieldTypes.AssetLink;
    companyLogo: EntryFieldTypes.AssetLink;
    frequentSpeaker: EntryFieldTypes.Boolean;
  };
}

export interface Talk {
  contentTypeId: "talk";
  fields: {
    slug: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    date: EntryFieldTypes.Date;
    location: EntryFieldTypes.Text;
    signUpUrl: EntryFieldTypes.Text;
    thumbnail: EntryFieldTypes.AssetLink;
    color: EntryFieldTypes.Text;
    ctaDisabled: EntryFieldTypes.Boolean;
    speaker: EntryFieldTypes.EntryLink<Speaker>;
  };
}

/* Contentful client connection */
export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
