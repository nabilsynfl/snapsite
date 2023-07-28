const deleteThumbnail = (req, res) => {
  const imageName = req.params.imageName;

  // Proses penghapusan gambar menggunakan fs.unlink
  // Pastikan Anda menghandle error jika terjadi kesalahan saat menghapus file
  fs.unlink(imageName, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      return res.status(500).json({ error: "Failed to delete image" });
    }
    res.json({ message: "Image deleted successfully" });
  });
};

module.exports = {
  deleteThumbnail
}