import { productImages } from "@/config/galleryImages";
import tunnels from "@/assets/commercial-play-tunnels.jpg";
import mall from "@/assets/mall-unit-conversion.jpg";
import hotel from "@/assets/hotel-indoor-play.jpg";
export const b14Media: Record<string, string[]> = {
  "commercial-indoor-playground-slide-selection": [productImages.indoorPlayground, tunnels, productImages.softPlay],
  "commercial-indoor-playground-netting": [tunnels, productImages.indoorPlayground, productImages.softPlay],
  "indoor-playground-equipment-import-shipping-terms": [productImages.indoorPlayground, mall, productImages.softPlay],
  "indoor-playground-factory-acceptance-checklist": [productImages.indoorPlayground, tunnels, productImages.softPlay],
  "multi-site-indoor-playground-equipment-procurement": [mall, hotel, productImages.softPlay],
};
