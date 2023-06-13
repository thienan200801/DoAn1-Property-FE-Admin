const imageBaseUrl = process.env.REACT_APP_BASE_IMAGE_URL;
const imageUrlRegex = /src="([^"]*)"/;
const imageUrlRegexGlobal = new RegExp(imageUrlRegex, "g");

export function convertImageNameToImageUrl(imageName) {
  return `${imageBaseUrl}/${imageName}`;
}

export function convertImageUrlToImageName(imageUrl) {
  return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
}

export function replaceImageUrlByImageName(content) {
  const imageArray = [...content.matchAll(imageUrlRegexGlobal, "g")];
  const imageUrlArray = imageArray.map((image) => {
    return image[1];
  });

  let newContent = content;
  for (let imageUrl of imageUrlArray) {
    const imageName = convertImageUrlToImageName(imageUrl);
    newContent = newContent.replaceAll(imageUrl, imageName);
  }

  return newContent;
}

export function replaceImageNameByImageUrl(content) {
  const imageArray = [...content.matchAll(imageUrlRegexGlobal, "g")];
  const imageNameArray = imageArray.map((image) => {
    return image[1];
  });

  let newContent = content;
  for (let imageName of imageNameArray) {
    const imageUrl = convertImageNameToImageUrl(imageName);
    newContent = newContent.replaceAll(imageName, imageUrl);
  }

  return newContent;
}
