
INSERT INTO public.site_image_config (config_key, image_url) VALUES
  ('product.indoorPlayground', '6403bb90-39a1-4ec7-8ab1-e5ee439025ad/A_4_-_Photo.jpg'),
  ('product.trampolinePark', '4ab86f4f-2801-40c0-883c-51fb8b891a4a/1_42_-_E7_85_A7_E7_89_87.jpg'),
  ('product.ninjaCourse', '5f84657f-1a44-4d72-8617-ff75ea632882/1_10_-_Photo.jpg'),
  ('product.softPlay', 'dcbc5ed3-1863-4db6-bacf-59919b3abec6/1768294376731-g5jiv8.jpg'),
  ('project.fecCenter', 'df79ab35-d540-48bc-b93c-44569106b132/1768293490535-9pua6a.jpg'),
  ('project.indoorProject', '6403bb90-39a1-4ec7-8ab1-e5ee439025ad/A_4_-_Photo.jpg'),
  ('project.trampolineProject', '4ab86f4f-2801-40c0-883c-51fb8b891a4a/1_42_-_E7_85_A7_E7_89_87.jpg'),
  ('project.ninjaProject', '5f84657f-1a44-4d72-8617-ff75ea632882/1_10_-_Photo.jpg')
ON CONFLICT (config_key) DO UPDATE SET image_url = EXCLUDED.image_url, updated_at = now();
