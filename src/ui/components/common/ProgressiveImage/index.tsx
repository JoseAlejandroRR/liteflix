
import axios from 'axios'

export const getFileNameFromPath = (filePath: string) => {
  return filePath.split('/').pop() || ''
}

async function checkImageInS3(imageKey: string): Promise<boolean> {
  try {
    const s3Url = `${import.meta.env.VITE_AWS_BUCKET_PUBLIC_URL}/${imageKey}`
    await axios.head(s3Url)
    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false
    }
  }

  return false
}

export const getImageFromCache = async (
  imageKey: string, originalUrl: string
): Promise<string> => {
  const s3Url = `${import.meta.env.VITE_AWS_BUCKET_PUBLIC_URL}/${imageKey}`
  const existsInS3 = await checkImageInS3(imageKey)

  if (existsInS3) {
    return s3Url
  }


  axios.get(`${import.meta.env.VITE_LITEFLIX_LAMBDA_IMAGES}?originURL=${originalUrl}`)
    .then((res) => {
      console.log('IMAGE GENERATED', res.data)
    }).catch((err) => {
      console.log('[ImagesGeneration] Error: ', err)
    })

  return originalUrl
}
