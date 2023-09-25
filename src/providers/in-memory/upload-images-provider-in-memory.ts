import { IUploadImagesProvider } from '../contracts/upload-images-provider'

export class UploadImagesProviderInMemory implements IUploadImagesProvider {
  public async uploadBannerImage(banner: any): Promise<string> {
    return 'http://fake-url/image.jepg'
  }

  public async uploadFlyersImages(flyers: any): Promise<string[]> {
    return ['http://fake-url/image.jepg']
  }
}
