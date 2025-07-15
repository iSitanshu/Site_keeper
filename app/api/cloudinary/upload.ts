import nextConnect from "next-connect";
import multer from "multer";
import cloudinary from "../../../utils/cloudinary";
import streamifier from "streamifier";
import { NextApiRequest, NextApiResponse } from 'next';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Extend the NextApiRequest to include Multer's file property
interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
}); // stores the file in memory as a buffer

const apiRoute = nextConnect<NextApiRequestWithFile, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Upload failed: ${(error as Error).message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req: NextApiRequestWithFile, res: NextApiResponse) => {
  try {

    if(!req.file) return res.status(400).json({ error: 'No image uploaded'});

    const fileBuffer: Buffer = req.file.buffer;

    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
            folder: "nextjs-uploads",
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if(error) reject(error);
            else if(result) resolve(result);
            else reject(new Error('Cloudinary upload result is undefined.'))
        }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
    });
    res.status(200).json({
        message: 'Image uploaded successfully',
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error); 
    res.status(500).json({ error: 'Image upload failed.' }); 
  }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false
    }
}