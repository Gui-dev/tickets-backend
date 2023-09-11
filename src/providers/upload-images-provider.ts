import { FastifyReply } from 'fastify'
import { randomUUID } from 'crypto'
import { MultipartFile } from '@fastify/multipart'

import { supabase } from '../services/supabase'

export class UploadImagesProvider {
  public static async uploadBannerImage(
    banner: any,
    response: FastifyReply,
  ): Promise<string | FastifyReply> {
    const bannerBuffer = await banner.toBuffer()
    const { data: bannerPath, error } = await supabase.storage
      .from('tickets-bucket')
      .upload(`banner/${randomUUID()}-${banner?.filename}`, bannerBuffer)
    if (error) {
      console.log(error)
      return response.status(400).send({ error: 'Erro ao enviar imagem' })
    }
    const { data: getBannerUrl } = supabase.storage
      .from('tickets-bucket')
      .getPublicUrl(bannerPath.path!)
    return getBannerUrl.publicUrl
  }

  public static async uploadFlyersImages(
    flyers: any,
    response: FastifyReply,
  ): Promise<Array<string> | FastifyReply> {
    const flyersUrl: string[] = []

    if (flyers.length > 0) {
      const urlsPromises = flyers.map(async (flyer: MultipartFile) => {
        const flyerBuffer = await flyer?.toBuffer()
        const { data: flyerPath, error } = await supabase.storage
          .from('tickets-bucket')
          .upload(`flyers/${randomUUID()}-${flyer.filename}`, flyerBuffer)

        if (error) {
          console.log(error)
          return response.status(400).send({ error: 'Erro ao enviar imagem' })
        }

        const { data: flyerUrl } = supabase.storage
          .from('tickets-bucket')
          .getPublicUrl(flyerPath.path!)

        return flyerUrl.publicUrl
      })

      const urls = await Promise.all(urlsPromises)
      flyersUrl.push(...urls)
    } else {
      const flyerBuffer = await flyers.toBuffer()
      const { data: flyerPath, error } = await supabase.storage
        .from('tickets-bucket')
        .upload(`flyers/${randomUUID()}-${flyers.filename}`, flyerBuffer)

      if (error) {
        console.log(error)
        return response.status(400).send({ error: 'Erro ao enviar imagem' })
      }

      const { data: flyerUrl } = supabase.storage
        .from('tickets-bucket')
        .getPublicUrl(flyerPath.path!)

      flyersUrl.push(flyerUrl.publicUrl)
    }

    return flyersUrl
  }
}
