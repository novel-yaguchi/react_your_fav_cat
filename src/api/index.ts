import DataHandler from "./data_handler";
import PseudoHandler, { Data } from "./pseudo_handler";

const CAT_API_PATH = "https://cataas.com/cat";
const IMAGE_PREFIX = "data:image/jpeg;base64, ";

/**
 * Get a single cat image from Web.
 *
 * Require `await` keyword to call
 *   b/c this costs secs for data transfer.
 */
export const getCatImage = async () => {
  const cat = new DataHandler(CAT_API_PATH);

  const srcBase64 = await cat.getAsBase64();

  return IMAGE_PREFIX + srcBase64;
};

/**
 * Get multiple cat images from Web.
 * Search target could be specified the second parameter.
 *
 * Require `await` keyword to call
 *   b/c this costs secs for data transfer.
 *
 * @param amount The amount of cat images to get.
 * @param keyword Optional parameter to specify cat genre like tag.
 */
export const getCatImagesWithKeyword = async (amount: number, keyword = "") => {
  const cat = keyword
    ? new DataHandler(`${CAT_API_PATH}/${keyword}`)
    : new DataHandler(`${CAT_API_PATH}`);

  const images = await Promise.all(
    [...Array(amount)].map(async () => {
      return IMAGE_PREFIX + (await cat.getAsBase64());
    })
  ).catch(() => "");

  return images;
};

/**
 * Save user cat data to Storage.
 * Data to be saved should be Array<CatStrInfo>
 *
 * CatStrInfo = {
 *   image: cat image
 *   date: Date
 * }
 *
 * Require `await` keyword to call
 *   b/c this costs secs for data transfer.
 *
 * @param data data to be saved.
 */
export const saveCatData = async (data: Data) => {
  const saver = new PseudoHandler("./data/save");

  const result = await saver.post(data);

  return result;
};

/**
 * Load user cat data from Storage.
 *
 * Require `await` keyword to call
 *   b/c this costs secs for data transfer.
 */
export const loadCatData = async () => {
  const loader = new PseudoHandler("./data/load");

  const result = await loader.get();

  return result;
};

export default {
  getCatImage,
  getCatImagesWithKeyword,
  saveCatData,
  loadCatData
};
