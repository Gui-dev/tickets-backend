export interface IUploadImagesProvider {
  uploadBannerImage(banner: any): Promise<string>
  uploadFlyersImages(flyers: any): Promise<string[]>
}
