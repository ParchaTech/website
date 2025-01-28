import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import {
  getTalkEntries,
  getFrequentSpeakers,
  getAsset,
  getAssets,
} from "@/lib/contentful/queries";

// Use vi.hoisted() to move this declaratio at the top level of the file, to be able to call it inside vi.mock()
const mockedGetEntries = vi.hoisted(() => vi.fn());
const mockedGetAssets = vi.hoisted(() => vi.fn());
const mockedGetSingleAsset = vi.hoisted(() => vi.fn());

// Mocked the Contentful connection file with a variable to change getEntries output
vi.mock("@/lib/contentful/connection", () => ({
  contentfulClient: {
    getEntries: mockedGetEntries,
    getAssets: mockedGetAssets,
    getAsset: mockedGetSingleAsset,
  },
}));

describe("Contentful Frequent Speakers queries", () => {
  beforeAll(() => {
    mockedGetEntries.mockResolvedValue({
      items: [
        {
          fields: {
            name: "Pepito Perez",
            jobPosition: "Job 1",
            photo: { sys: { id: "1" } },
            companyLogo: {
              fields: {
                file: {
                  url: "//images.ctfassets.net/yadj1kx9rmg0/4gp6taAwW4CmSgumq2ekUm/9da0cd1936871b8d72343e895a00d611/Nyan_cat_250px_frame.png",
                },
              },
            },
            frequentSpeaker: true,
          },
        },
      ],
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("Get list of frequent speakers", async () => {
    const speakers = await getFrequentSpeakers();

    expect(speakers).toBeDefined();
    expect(speakers).toBeInstanceOf(Array);
    expect(speakers.length).toBeGreaterThan(0);
    expect(speakers[0].jobPosition).toBeTruthy();
  });

  test("Check speaker name format", async () => {
    const speakers = await getFrequentSpeakers();
    const testSpeaker = speakers[0];

    expect(testSpeaker.name).toContain("<br/>");
    expect(testSpeaker.name).toEqual("Pepito<br/>Perez");
  });

  test("Check speaker assets URL format", async () => {
    const speakers = await getFrequentSpeakers();
    const testSpeaker = speakers[0];

    expect(testSpeaker.companyLogoURL).toContain("https:");
  });
});

describe("Contentful Talk queries", () => {
  beforeAll(() => {
    mockedGetEntries.mockResolvedValue({
      items: [
        {
          fields: {
            title: "Talk 1",
            date: new Date().toISOString(),
            location: "Location 1",
            description: "Description 1",
            signUpUrl: "https://example.com",
            thumbnail: { sys: { id: "1" } },
            color: "#000000",
            ctaDisabled: false,
          },
        },
      ],
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("Get list of talk entries", async () => {
    const talks = await getTalkEntries();

    expect(talks).toBeDefined();
    expect(talks).toBeInstanceOf(Array);
    expect(talks.length).toBeGreaterThan(0);
    expect(talks[0].color).toBeTruthy();
  });

  test("Check talk date format", async () => {
    const talks = await getTalkEntries();
    const testTalk = talks[0];

    expect(testTalk.date).toContain(",");
  });
});

describe("Contentful Assets queries", () => {
  beforeAll(() => {
    mockedGetAssets.mockResolvedValue({
      items: [
        {
          fields: {
            fileName: "test-image",
            file: {
              url: "//images.ctfassets.net/RandomTestID/Nyan_cat_250px_frame.png",
            },
          },
        },
        {
          fields: {
            fileName: "test-image-2",
            file: {
              url: "//images.ctfassets.net/RandomTestID/Nyan_cat_250px_frame.png",
            },
          },
        },
      ],
    });

    mockedGetSingleAsset.mockResolvedValue({
      fields: {
        fileName: "test-image",
        file: {
          url: "//images.ctfassets.net/RandomTestID/Nyan_cat_250px_frame.png",
        },
      },
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("Get assets list", async () => {
    const assets = await getAssets("test");

    expect(assets).toBeDefined();
    expect(assets).toBeInstanceOf(Array);
    expect(assets.length).toBeGreaterThan(0);
    expect(assets[0]).toBeTypeOf("string");
  });

  test("Get asset", async () => {
    const asset = await getAsset("SomeRandomID");

    expect(asset).toBeDefined();
    expect(asset).toBeTypeOf("string");
    expect(asset).toContain("https:");
  });
});
