const ytdl = require('ytdl-core');
const fs = require('fs');
const {getVideoTitle, sanitizeTitle} = require('../utils/getVideoTitleYoutube.js')

const postDownloader = async (req, res) => {
  
  try {

    const videoUrl = req.body.videoUrl;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required in the request body.' });
    }

    const videoTitle = await getVideoTitle(videoUrl);
    const cleanTitle = sanitizeTitle(videoTitle);
    const savePath = `c:/Users/nabil/Downloads/downloader/${cleanTitle}.mp4`; // Replace this with your desired save path

    let downloadedBytes = 0;

    const downloadStream = ytdl(videoUrl, { quality: 'highest', filter: 'audioandvideo' });
    const writeStream = fs.createWriteStream(savePath);

    downloadStream.pipe(writeStream);

    // Tambahkan pendengar acara info untuk mendapatkan informasi video
    downloadStream.on('info', (videoInfo, format) => {
      const totalBytes = videoInfo.videoDetails.lengthSeconds * format.bitrate || 0;
      const totalInMB = totalBytes / (1024 * 1024); // Mengkonversi bytes ke MB

      downloadStream.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        const downloadedInMB = downloadedBytes / (1024 * 1024); // Mengkonversi bytes ke MB
        const progress = (downloadedBytes / totalBytes) * 100;

        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        process.stdout.write(`Downloading: ${downloadedInMB.toFixed(2)} MB / ${totalInMB.toFixed(2)} MB (${progress.toFixed(2)}%)`);
      });
    });

    downloadStream.on('finish', () => {
      console.log('\nDownload completed:', videoUrl);
      res.json({ message: 'Download complete!' });
    });

    downloadStream.on('error', (error) => {
      console.error('An error occurred during download:', error.message);
      res.status(500).json({ error: 'An error occurred during download.', details: error.message });
    });

  } catch (error) {
    return res.status(500).json({
      message: "Terjadi Error",
      serverMessage: error.message
    });
  }
};

module.exports = postDownloader;
