import { productImages } from './galleryImages';
const { softPlay, indoorPlayground, trampolinePark, ninjaCourse } = productImages;
export const b16Media: Record<string, string[]> = {
  'indoor-playground-maintenance-and-cleaning-guide': [softPlay, indoorPlayground, trampolinePark],
  'soft-play-foam-and-material-specifications': [softPlay, indoorPlayground, softPlay],
  'daycare-indoor-playground-equipment': [softPlay, indoorPlayground, softPlay],
  'church-indoor-playground-equipment': [softPlay, indoorPlayground, ninjaCourse],
  'sensory-inclusive-play-equipment': [softPlay, indoorPlayground, softPlay],
};
