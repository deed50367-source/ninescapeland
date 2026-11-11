import { productImages } from './galleryImages';
import party from '@/assets/party-room-commercial.jpg';
import mall from '@/assets/mall-unit-conversion.jpg';
export const b15Media: Record<string, string[]> = {
  'private-indoor-playground-party-room-design': [party, productImages.indoorPlayground, productImages.softPlay],
  'ninja-warrior-course-for-kids-indoor-playground': [productImages.ninjaCourse, productImages.indoorPlayground, productImages.trampolinePark],
  'themed-indoor-playground-design': [productImages.indoorPlayground, mall, productImages.softPlay],
  'modular-reconfigurable-indoor-play-equipment': [productImages.softPlay, productImages.indoorPlayground, productImages.softPlay],
  'complete-indoor-play-center-solutions': [productImages.indoorPlayground, mall, productImages.softPlay],
};
