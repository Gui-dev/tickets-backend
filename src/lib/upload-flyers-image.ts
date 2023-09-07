import { MultipartFile } from '@fastify/multipart'
import { FastifyReply } from 'fastify'
import { randomUUID } from 'crypto'

import { supabase } from '../services/supabase'

export const uploadFlyersImages = async (
  flyers: any,
  response: FastifyReply,
): Promise<Array<string> | FastifyReply> => {
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

// export const uploadFlyersImages = async (
//   flyers: any,
//   response: FastifyReply,
// ): Promise<Array<string> | FastifyReply> => {
//   const flyersUrl: string[] = []
//   if (flyers.length > 0) {
//     const urls = flyers.map(async (flyer: MultipartFile) => {
//       const flyerBuffer = await flyer.toBuffer()
//       const { data: flyerPath, error } = await supabase.storage
//         .from('tickets-bucket')
//         .upload(`flyers/${flyer.filename}`, flyerBuffer)
//       if (error) {
//         console.log(error)
//         return response.status(400).send({ error: 'Erro ao enviar imagem' })
//       }
//       const { data: flyerUrl } = supabase.storage
//         .from('tickets-bucket')
//         .getPublicUrl(flyerPath.path!)
//       return flyerUrl
//     })
//     flyersUrl.push(...urls)
//     return flyersUrl
//   }
//   const flyerBuffer = await flyers?.toBuffer()
//   const { data: flyerPath, error } = await supabase.storage
//     .from('tickets-bucket')
//     .upload(`flyers/${flyers.filename}`, flyerBuffer)
//   if (error) {
//     console.log(error)
//     return response.status(400).send({ error: 'Erro ao enviar imagem' })
//   }
//   const { data: flyerUrl } = supabase.storage
//     .from('tickets-bucket')
//     .getPublicUrl(flyerPath.path!)
//   flyersUrl.push(flyerUrl.publicUrl)

//   return flyersUrl
// }
