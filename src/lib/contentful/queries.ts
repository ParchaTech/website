import { contentfulClient } from "@/lib/contentful/connection";
import { type Talk, type Speaker } from "@/lib/contentful/connection";
import { type Asset, type UnresolvedLink } from "contentful";

const getAssetURL = (
  unresolvedAsset: UnresolvedLink<"Asset"> | Asset<undefined, string>,
) => {
  if (unresolvedAsset && "fields" in unresolvedAsset) {
    const asset = unresolvedAsset as Asset;
    const assetURL = asset.fields.file?.url?.toString();
    return `https:${assetURL}`;
  }

  return "";
};

export const getTalkEntries = async () => {
  const today = new Date().toISOString();

  const talkEntries = await contentfulClient.getEntries<Talk>({
    content_type: "talk",
    //@ts-ignore
    "fields.date[gt]": today,
    order: "fields.date",
  });

  const talksList = talkEntries?.items?.map((item) => {
    const {
      title,
      date,
      location,
      description,
      signUpUrl,
      thumbnail,
      color,
      ctaDisabled,
    } = item.fields;

    const fullImageURL = getAssetURL(thumbnail);

    return {
      title,
      date: new Date(date).toLocaleString("es-Es", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      location,
      description,
      signUpUrl,
      thumbnail: fullImageURL,
      color,
      ctaDisabled,
    };
  });

  return talksList;
};

export const getFrequentSpeakers = async () => {
  const speakerEntries = await contentfulClient.getEntries<Speaker>({
    content_type: "speaker",
    "fields.frequentSpeaker": true,
  });

  const frequentSpeakerList = speakerEntries.items?.map((item) => {
    const { name, jobPosition, photo, companyLogo } = item.fields;

    const photoURL = getAssetURL(photo);
    const companyLogoURL = getAssetURL(companyLogo);

    const nameFix = name.replace(" ", "<br/>");
    const jobPositionFix = jobPosition.replace(" ", "<br/>");

    return {
      name: nameFix,
      jobPosition: jobPositionFix,
      photoURL,
      companyLogoURL,
    };
  });

  return frequentSpeakerList;
};

export const getAssets = async (matchString: string) => {
  const assets = await contentfulClient.getAssets({
    "fields.title[match]": matchString,
    order: ["fields.file.fileName"],
  });

  return assets.items.map((item) => {
    return getAssetURL(item);
  });
};

export const getAsset = async (assetId: string) => {
  const asset = await contentfulClient.getAsset(assetId);

  return getAssetURL(asset);
};
