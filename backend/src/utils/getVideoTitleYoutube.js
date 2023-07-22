const ytdl = require('ytdl-core');

const getVideoTitle = async (videoUrl) => {
  try {
    const videoInfo = await ytdl.getInfo(videoUrl);
    return videoInfo.videoDetails.title;
  } catch (error) {
    console.error('Error getting video title:', error.message);
    throw new Error('Failed to get video title.');
  }
};

const sanitizeTitle = (title) => {
  // Mengganti karakter ilegal dengan karakter kosong ('')
  const sanitizedTitle = title.replace(/[\\/:"*?<>|]/g, '');
  
  // Mengganti spasi dengan '-'
  return sanitizedTitle.replace(/\s+/g, '-');
};

module.exports = {
  getVideoTitle,
  sanitizeTitle
}