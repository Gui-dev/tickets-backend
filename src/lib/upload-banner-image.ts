import { MultipartFile } from '@fastify/multipart'
import { FastifyReply } from 'fastify'
import { supabase } from '../services/supabase'
import { randomUUID } from 'crypto'

export const uploadBannerImage = async (
  banner: MultipartFile,
  response: FastifyReply,
): Promise<string | FastifyReply> => {
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
